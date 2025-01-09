-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('BOOKED', 'CANCELED');

-- AlterTable
ALTER TABLE "booking-class" ADD COLUMN     "status" "BookingStatus" NOT NULL DEFAULT 'BOOKED';
