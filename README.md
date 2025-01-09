## Gym Class Scheduling and Membership Management System Task

## Project Overview

- The Gym Class Scheduling and Membership Management System is a powerful, all-in-one solution designed to simplify gym operations and enhance user experiences. This system caters to three user roles— **Admins**, **Trainers**, and **Trainees** —offering tailored features and functionalities for each.

## ERD Diagram :

![Relational Diagram](gym-management.drawio.png)

## Technology Stack

- Programming Language: TypeScript
- Web Framework: Express.js
- ORM: Prisma
- Database: PostgreSQL
- Authentication: JSON Web Tokens (JWT)

## API Endpoints

### Authentication

1. **Login**

   - POST : ` /api/v1/auth/login`
   - **req.body:** `{ email, password }`
   - **response:** `{  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwibmFtZSI6Ik1SLiBVc2VyIiwicm9sZSI6IlRSQUlORUUiLCJpZCI6IjAzMWY0ZmRlLWZhYTgtNDEzYi05MWQwLWMzZDM4ZTQzYmI5ZiIsImlhdCI6MTczNjQyOTA5MSwiZXhwIjoxNzM2ODYxMDkxfQ.LCfwLWHxbJeD6unC4Zb5pN7-ujyxMf-MhRclFbvrclY",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwibmFtZSI6Ik1SLiBVc2VyIiwicm9sZSI6IlRSQUlORUUiLCJpZCI6IjAzMWY0ZmRlLWZhYTgtNDEzYi05MWQwLWMzZDM4ZTQzYmI5ZiIsImlhdCI6MTczNjQyOTA5MSwiZXhwIjoxNzY3OTY1MDkxfQ.wdsrvXxlsqJfNrnISoQERrsonv3bWRvURs0OGTkELJE"
} }`

2. **Create as a Trainee account**
   - POST : `/api/v1/users/create-user`
   - **req.body:** `{ firstName,lastName, email, password ,phone}`
   - **response** `{ statusCode,success,message,data  }`

### Admin Endpoints

1. **Create Trainer**

   - POST: ` /api/v1/admin/trainers`
   - **Parameters:** `{ firstName,lastName, email, password,phone }`
   - **Response:** `{ statusCode,success,message,data  }`

2. **Schedule Class**
   - POST `/api/v1/class-schedule`
   - **Parameters:** `{ date, startTime, endTime, trainerId }`
   - **Response:** `{ statusCode,success,message,data  }`

### Trainer Endpoints

1. **View Assigned Classes**
   - GET `/api/v1/trainers/schedules`
   - **Response:** `{ success, schedules }`

### Trainee Endpoints

1. **Book Class**

   - `POST /api/trainees/book`
   - **Parameters:** `{ scheduleId }`
   - **Response:** `{ success, booking }`

2. **Cancel Booking**
   - `DELETE /api/trainees/bookings/:id`
   - **Response:** `{ success, message }`

## Database Schema

### User Model

- id: unique
- firstName: string
- lastName: string
- fullName: string
- email: string
- password: string
- phone: string
- role: ADMIN | TRAINER | TRAINEE
- createdAt: Date
- updatedAt: Date
- schedules: Array<string>
- bookingClass: Array<string>

### Schedule Model

- id: unique id
- date: Date
- startTime: Date
- endTime: Date
- trainerId: Trainer Id
- trainees: Trainees Array []
- maxTrainee: number
- totalCurrentTrainee: number
- createdAt: Date
- updatedAt: Date
- bookingClass: Array<string>

### Booking Model

- id: unique id
- scheduleId: FK shedule id
- traineeId: FK trainer id
- status: Booked | Canceled
- createdAt: Date
- updatedAt: Date

## User Login

### Admin

- Email: admin@gmail.com
- Password: admin123@

### Trainer

- Email: trainer6@gmail.com
- Password: trainer123

### Trainee

- Email: user4@gmail.com
- Password: user123

## Instructions to Run Locally

1. ## Clone the repository: https://github.com/Ashik-Rahman100/gym-management
2. Install dependencies:

```bash
  yarn install
```

-

3. Configure environment variables:

- DATABASE_URL="Connect to Supabase via connection pooling with Supavisor."

- DIRECT_URL="Direct connection to the database. Used for migrations."
- PORT = 5000
- SALT_ROUND = 12
- JWT_SECRET = d620e4c8b5a85df3943faccc29c1e047fc4aa2a39c73fc5276d91c8ad6fe9b83973f4a220102d7c6d4c3f41d680b62cc
- EXPIRES_IN = 5d
- JWT_REFRESH_SECRET = 651be369d628257bb39dc96b915a837453a59d368917a0c1529178d02f12e107602ccb09638ddb812c97ffbbbdc78966
- REFRESH_EXPIRES_IN = 365d
- NODE_ENV= development

4. Run Migrations:

- npx prisma migrate dev

5. Start the server:

- yarn run dev

6. Access the server at `http://localhost:5000`

## Live Hosting Link

[Gym Management System](https://gym-management-theta.vercel.app)

## Testing Instructions

### 1. **Users API**

- **Create Admin/Trainer/Trainee**

  - Endpoint: `POST api/v1/users/create-admin`
  - Payload:
    ```json
    {
      "firstName": "MR.",
      "lastName": "User",
      "email": "admin@gmail.com",
      "password": "admin123@"
    }
    ```
  - Expected Response:
    - **201 Created**: Admin user created successfully.
    - **400 Bad Request**: Validation errors.

- **Create Trainer**

  - Endpoint: `POST api/v1/users/create-trainer`
  - Requires: `Authorization` header with an admin token.
  - Payload: Same as "Create Admin."
  - Expected Response: Same as "Create Admin."

  - **Create Trainee**
  - Endpoint: `POST api/v1/users/create-trainee`
  - Requires: `Authorization` header with an admin token.
  - Payload: Same as "Create Admin."
  - Expected Response: Same as "Create Admin."

- **My Profile**
  - Endpoint: `GET api/v1/users/my-profile`
  - Requires: `Authorization` header with a valid token.
  - Expected Response: User profile details.

### 2. **Class Schedule API**

- **Create Class Schedule**
  - Endpoint: `POST api/v1/class-schedule/`
  - Requires: `Authorization` header with an admin token.
  - Payload:
    ```json
    {
      "date": "2025-01-10T00:00:00Z",
      "startTime": "2025-01-10T06:00:00Z",
      "endTime": "2025-01-10T08:00:00Z",
      "trainerId": "8f7e6bef-d38c-4e2e-bab7-6d74b4430614"
    }
    ```
  - Expected Response:
    - **201 Created**: Schedule created successfully.
    - **400 Bad Request**: Time overlaps or validation errors.
- **Retrieve All Schedules**
  - Endpoint: `GET /class-schedule/`
  - Expected Response: Retrieve all class schedules successfully!

### 3. **Booking Schedule API**

- **Create Booking**
  - Endpoint: `POST /booking-schedule/`
  - Requires: `Authorization` header with a trainee token.
  - Payload:
    ```json
    {
      "scheduleId": "a1629104-2260-4664-b580-e518a5c0c437"
    }
    ```
  - Expected Response:
    - **201 Created**: Class booked successfully!
    - **400 Bad Request**: Class schedule not found, You're already booked this class schedule, Class schedule is full. Maximum 10 trainees allowed per schedule, You have already booked another class in the same time slot, or validation errors.
- **Retrieve My Bookings**
  - Endpoint: `GET /booking-schedule/my-booking-schedules`
  - Requires: `Authorization` header with a trainee token.
  - Expected Response: List of bookings for the trainee.

### 4. **Authentication**

- **Login**
  - Endpoint: `POST /auth/login`
  - Payload:
    ```json
    {
      "email": "user@gmail.com",
      "password": "password"
    }
    ```
  - Expected Response:
    - **200 OK**: Returns an access token.
    - **401 Unauthorized**: Invalid credentials.
