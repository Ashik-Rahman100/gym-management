import { User } from '@prisma/client'
import prisma from '../../helpers/prisma'
import { AppError } from '../../utils/AppError'
import httpStatus from 'http-status'
import { HashPassword } from '../../helpers/hash-password'

const createUser = async (payload: User) => {
  payload.fullName = `${payload.firstName} ${payload.lastName}`
  const hashPassword = await HashPassword(payload.password)
  payload.password = hashPassword
  payload.role = 'TRAINEE'
  const data = await prisma.user.create({
    data: payload,
  })

  return data
}

const createAdmin = async (payload: User) => {
  payload.fullName = `${payload.firstName} ${payload.lastName}`
  const hashPassword = await HashPassword(payload.password)
  payload.password = hashPassword
  payload.role = 'ADMIN'
  const data = await prisma.user.create({
    data: payload,
  })

  return data
}

const createTrainer = async (payload: User) => {
  payload.fullName = `${payload.firstName} ${payload.lastName}`
  const hashPassword = await HashPassword(payload.password)
  payload.password = hashPassword
  payload.role = 'TRAINER'
  const data = await prisma.user.create({
    data: payload,
  })

  return data
}

const retrieveAllUsers = async () => {
  const data = await prisma.user.findMany({})

  return data
}
const retrieveMyProfile = async (id: string) => {
  const data = await prisma.user.findFirst({
    where: {
      id: id,
    },
  })

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
  }

  return data
}
const updateUser = async (id: string, payload: Partial<User>) => {
  const isExistUser = await prisma.user.findUnique({
    where: { id },
  })

  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
  }

  const data = await prisma.user.update({
    where: {
      id: id,
    },
    data: payload,
  })

  return data
}
const deleteUser = async (id: string) => {
  const data = await prisma.user.delete({
    where: { id },
  })

  if (!data) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User delete failed!')
  }

  return data
}

export const userServices = {
  createUser,
  retrieveAllUsers,
  updateUser,
  deleteUser,
  retrieveMyProfile,
  createAdmin,
  createTrainer,
}
