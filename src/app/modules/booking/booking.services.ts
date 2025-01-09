import { BookingClass } from '@prisma/client'
import prisma from '../../helpers/prisma'
import { AppError } from '../../utils/AppError'
import httpStatus from 'http-status'

const createBookingSchedule = async (
  traineeId: string,
  payload: BookingClass,
) => {
  payload.traineeId = traineeId
  // 1. Check is class schedule exit?
  const schedule = await prisma.classSchedule.findUnique({
    where: {
      id: payload.scheduleId,
    },
  })
  if (!schedule) {
    throw new AppError(httpStatus.NOT_FOUND, 'Class schedule not found.')
  }

  // 2. Check if the trainee already booked!
  const isAlreadyBooked = await prisma.bookingClass.findFirst({
    where: {
      scheduleId: payload.scheduleId,
      traineeId: payload.traineeId,
    },
  })

  if (isAlreadyBooked) {
    throw new AppError(
      httpStatus.ALREADY_REPORTED,
      "You're already booked this class schedule!",
    )
  }

  // 3. Check is the class schedule already booked 10 trainee.
  const isExistBookingSchedule = await prisma.bookingClass.findMany({
    where: {
      scheduleId: payload.scheduleId,
    },
  })

  if (isExistBookingSchedule.length >= 10) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Class schedule is full. Maximum 10 trainees allowed per schedule.',
    )
  }

  // 4. Check if the trainee has already booked a class in the same time slot

  const overlappingBooking = await prisma.bookingClass.findMany({
    where: {
      traineeId: payload.traineeId,
    },
    include: {
      schedules: true,
    },
  })

  if (overlappingBooking.length > 0) {
    const isOverlapped = overlappingBooking.some(existingBookings => {
      const bookedStartTime = new Date(existingBookings.schedules.startTime)
      const bookedEndTime = new Date(existingBookings.schedules.endTime)
      const newBookingStartTime = new Date(schedule.startTime)
      const newBookingEndTime = new Date(schedule.endTime)

      return (
        newBookingStartTime < bookedEndTime &&
        newBookingEndTime > bookedStartTime
      )
    })

    if (isOverlapped) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'You have already booked another class in the same time slot.',
      )
    }
  }

  const data = await prisma.bookingClass.create({
    data: payload,
  })

  return data
}
const retrieveMyAllBookingSchedule = async (traineeId: string) => {
  const data = await prisma.bookingClass.findMany({
    where: { traineeId },
    include: {
      schedules: {
        include: {
          trainer: true,
        },
      },
    },
  })

  return data
}
const retrieveSingleBookingSchedule = async (id: string) => {
  const data = await prisma.bookingClass.findUnique({
    where: {
      id: id,
    },
  })

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'booking not found!')
  }

  return data
}
const updateBookingSchedule = async (
  id: string,
  payload: Partial<BookingClass>,
) => {
  const isExistBookingSchedule = await prisma.bookingClass.findUnique({
    where: { id },
  })

  if (!isExistBookingSchedule) {
    throw new AppError(httpStatus.NOT_FOUND, 'booking not found!')
  }

  const data = await prisma.bookingClass.update({
    where: {
      id: id,
    },
    data: payload,
  })

  return data
}
const updateBookingScheduleStatus = async (
  id: string,
  payload: { status: 'BOOKED' | 'CANCELED' },
) => {
  const isExistBookingSchedule = await prisma.bookingClass.findUnique({
    where: { id },
  })

  if (!isExistBookingSchedule) {
    throw new AppError(httpStatus.NOT_FOUND, 'booking not found!')
  }

  const data = await prisma.bookingClass.update({
    where: {
      id: id,
    },
    data: {
      status: payload.status,
    },
  })

  return data
}
const deleteBookingSchedule = async (id: string) => {
  const data = await prisma.bookingClass.delete({
    where: { id },
  })

  if (!data) {
    throw new AppError(httpStatus.BAD_REQUEST, 'booking delete failed!')
  }

  return data
}

export const bookingServices = {
  createBookingSchedule,
  retrieveMyAllBookingSchedule,
  updateBookingSchedule,
  deleteBookingSchedule,
  retrieveSingleBookingSchedule,
  updateBookingScheduleStatus,
}
