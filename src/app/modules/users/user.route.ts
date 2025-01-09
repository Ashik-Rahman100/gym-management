import { Role } from '@prisma/client'
import express from 'express'
import Auth from '../../middlewares/Auth'
import ValidationRequest from '../../utils/ValidationRequest'
import { userController } from './user.controller'
import { userValidation } from './user.validation'
const router = express.Router()

router.post(
  '/create-admin',
  ValidationRequest(userValidation.createUserValidation),
  userController.createAdmin,
)
router.post(
  '/create-trainer',
  Auth(Role.ADMIN),
  ValidationRequest(userValidation.createUserValidation),
  userController.createTrainer,
)
router.post(
  '/create-user',
  ValidationRequest(userValidation.createUserValidation),
  userController.createUser,
)
router.get('/', userController.retrieveAllUsers)
router.get(
  '/my-profile',
  Auth(Role.ADMIN, Role.TRAINEE, Role.TRAINER),
  userController.retrieveMyProfile,
)
router.patch('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

export const userRoute = router
