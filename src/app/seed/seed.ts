import { HashPassword } from '../helpers/hash-password'
import prisma from '../helpers/prisma'

export const seedAdmin = async () => {
  // Check if a SUPER_ADMIN already exists
  const isExistSuperAdmin = await prisma.user.findFirst({
    where: {
      email: 'admin@gmail.com',
    },
  })

  // If no SUPER_ADMIN exists, create one
  if (!isExistSuperAdmin) {
    const hashPassword = await HashPassword('admin123@')

    const userData = await prisma.user.create({
      data: {
        firstName: 'Mr.',
        lastName: 'Admin',
        fullName: 'Mr. Admin',
        email: 'admin@gmail.com',
        role: 'ADMIN',
        password: hashPassword,
        profileImage:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      },
    })

    console.log('Super Admin already exists.')
    return userData
  }
}
