# Personal Task Management App

A full-stack task management application built with React, Express.js, and MongoDB. Users can create, update, mark complete, and delete their personal tasks with secure authentication.

## Features

### User Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Password hashing with bcrypt

### Task Management
- Create new tasks with title and description
- Update existing tasks
- Mark tasks as complete/incomplete
- Delete tasks
- Filter tasks by status (All, Pending, Completed)

### User Dashboard
- Personal dashboard for each user
- Task statistics (Total, Completed, Pending)
- Clean and responsive UI
- Real-time task updates

### Security
- Protected API routes
- User data isolation (users only see their own tasks)
- Input validation and sanitization
- CORS enabled for development

## Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Development Tools
- **nodemon** - Development server
- **React Scripts** - Build tooling

## Project Structure

```
task-manager/
├── backend/
│   ├── models/
│   │   ├── User.js          # User model
│   │   └── Task.js          # Task model
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── tasks.js         # Task management routes
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── package.json
│   └── index.js             # Express server setup
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js     # Main dashboard
│   │   │   ├── Login.js         # Login component
│   │   │   ├── Register.js      # Registration component
│   │   │   ├── TaskForm.js      # Add/edit task form
│   │   │   ├── TaskList.js      # Task list display
│   │   │   └── ProtectedRoute.js # Route protection
│   │   ├── contexts/
│   │   │   └── AuthContext.js   # Authentication context
│   │   ├── hooks/
│   │   │   └── useTasks.js      # Task management hook
│   │   ├── services/
│   │   │   └── api.js           # API service
│   │   ├── styles/
│   │   │   ├── Auth.css         # Authentication styles
│   │   │   ├── Dashboard.css    # Dashboard styles
│   │   │   ├── TaskForm.css     # Task form styles
│   │   │   └── TaskList.css     # Task list styles
│   │   ├── App.js
│   │   └── App.css
│   ├── package.json
│   └── .env
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB installation)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd task-manager/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd task-manager/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update the `.env` file if needed:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

### Running the Application

1. Start the backend server (from `task-manager/backend`):
   ```bash
   npm run dev
   ```

2. Start the frontend development server (from `task-manager/frontend`):
   ```bash
   npm start
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tasks
- `GET /api/tasks` - Get all tasks for authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion status
- `DELETE /api/tasks/:id` - Delete a task

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

## Database Setup (MongoDB Atlas)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Replace `your_mongodb_atlas_connection_string` in the backend `.env` file

## Key Features Implementation

### Authentication Flow
1. User registers or logs in
2. Backend validates credentials and returns JWT token
3. Frontend stores token in localStorage
4. Token is included in all API requests
5. Protected routes check token validity

### Task Management
1. Tasks are associated with user ID
2. All task operations are filtered by the authenticated user
3. Real-time updates through React hooks
4. Optimistic UI updates for better user experience

### State Management
- React Context API for authentication state
- Custom hooks for task operations
- Local state for form management
- Persistent authentication through localStorage

## Security Considerations
- Passwords are hashed using bcrypt
- JWT tokens for stateless authentication
- Input validation on both frontend and backend
- CORS configured for development
- User data isolation at database level

## Development Tips
- Use MongoDB Compass for database visualization
- Check browser console for API errors
- Use React DevTools for state inspection
- Postman for API testing

## Building for Production

### Frontend
```bash
cd task-manager/frontend
npm run build
```

### Backend
```bash
cd task-manager/backend
npm start
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License
This project is licensed under the ISC License.
