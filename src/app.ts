import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import GlobalErrorHandler from './app/middlewares/GlobalErrorHandler'
import router from './app/routers'
const app: Application = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome To Future Gym!')
})

app.use('/api/v1', router)

// Handle Global Error
app.use(GlobalErrorHandler)
//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})

export default app
