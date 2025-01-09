import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  access_token: process.env.JWT_SECRET,
  refresh_token: process.env.JWT_REFRESH_SECRET,
  refresh_in: process.env.REFRESH_EXPIRES_IN,
  access_in: process.env.EXPIRES_IN,
  salt: process.env.SALT_ROUND,
}
