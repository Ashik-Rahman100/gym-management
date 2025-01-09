import { z } from 'zod'

// Create BookingClass Schema
export const createBookingClassSchema = z.object({
  scheduleId: z.string().uuid({ message: 'Schedule ID must be a valid UUID' }),
})

// Update BookingClass Schema
export const updateBookingClassSchema = z.object({
  scheduleId: z
    .string()
    .uuid({ message: 'Schedule ID must be a valid UUID' })
    .optional(),
})

export const bookingScheduleValidation = {
  createBookingClassSchema,
  updateBookingClassSchema,
}
