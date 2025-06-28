# NextStep - Job Tracking Application

A full-stack job tracking application built with React, TypeScript, Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Register and login with JWT tokens
- **Job Management**: Add, edit, delete, and view job applications
- **Status Tracking**: Track job applications with different statuses (applied, interviewing, offered, rejected)
- **Modern UI**: Beautiful, responsive interface with smooth animations
- **Real-time Updates**: Instant feedback for all CRUD operations

## Tech Stack

### Frontend
- React 19 with TypeScript
- Vite for build tooling
- React Router for navigation
- CSS Modules for styling
- Axios for API calls

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- CORS enabled for cross-origin requests

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NextStep
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

1. **Backend Setup**
   - Create a `.env` file in the `backend` directory
   - Add your MongoDB connection string:
     ```
     MONGODB_URI=mongodb://localhost:27017/nextstep
     JWT_SECRET=your_jwt_secret_here
     PORT=3000
     ```

2. **Frontend Setup**
   - The frontend is configured to connect to `http://localhost:3000`
   - No additional configuration needed

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   The server will run on `http://localhost:3000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` to access the application

## Usage

### Authentication
1. Register a new account or login with existing credentials
2. JWT tokens are automatically stored in localStorage
3. Protected routes will redirect to login if not authenticated

### Job Management
1. **Add a Job**: Click the "Add New Job" button to create a new job application
2. **View Jobs**: All your job applications are displayed in a responsive grid
3. **Edit Jobs**: Click the edit icon (✏️) on any job card to modify details
4. **Delete Jobs**: Click the delete icon (🗑️) to remove a job (with confirmation)
5. **Track Status**: Update job status to track your application progress

### Job Fields
- **Company**: The company name (required)
- **Position**: The job title/position (required)
- **Location**: Job location (optional)
- **Status**: Application status (applied, interviewing, offered, rejected)
- **Link**: URL to the job posting (optional)
- **Notes**: Additional notes about the application (optional)

## API Endpoints

### Authentication
- `POST /register` - Register a new user
- `POST /login` - Login user

### Jobs (Protected Routes)
- `GET /jobs` - Get all jobs for the authenticated user
- `POST /addjob` - Create a new job
- `PUT /updatejob/:id` - Update a job
- `DELETE /deletejob/:id` - Delete a job

## Project Structure

```
NextStep/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── jobController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Job.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── jobRoutes.js
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── auth/
    │   │   │   ├── AuthContainer.tsx
    │   │   │   ├── Login.tsx
    │   │   │   ├── Register.tsx
    │   │   │   ├── ProtectedRoute.tsx
    │   │   │   └── api.ts
    │   │   └── jobs/
    │   │       ├── JobList.tsx
    │   │       ├── JobCard.tsx
    │   │       ├── JobForm.tsx
    │   │       ├── api.ts
    │   │       └── jobs.module.css
    │   ├── pages/
    │   │   └── Dashboard.tsx
    │   └── App.tsx
    └── package.json
```

## Development

### Backend Development
- The server uses nodemon for development (auto-restart on file changes)
- MongoDB connection is handled in `config/db.js`
- JWT middleware protects job routes

### Frontend Development
- Vite provides fast hot module replacement
- TypeScript ensures type safety
- CSS Modules prevent style conflicts

## Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Ensure MongoDB is accessible
3. Deploy to platforms like Heroku, Railway, or Vercel

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to platforms like Vercel, Netlify, or GitHub Pages
3. Update API base URL for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License. 