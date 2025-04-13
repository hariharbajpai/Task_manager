# TaskWave - MERN Stack Task Scheduler


A full-stack task management application with JWT authentication, built with the MERN stack (MongoDB, Express, React, Node.js) and Tailwind CSS.

## ✨ Features Implemented

### ✅ Authentication
- User registration with name, email, and password
- JWT-based login system
- Protected routes using middleware
- Password hashing with bcryptjs

### ✅ Task Management
- Create tasks with title, description, and due date
- Mark tasks as complete/incomplete
- Update task details
- Delete tasks
- View all tasks in a dashboard

### ✅ Technical Implementation
- **Backend**:
  - RESTful API with Express.js
  - MongoDB with Mongoose for data modeling
  - JWT authentication middleware
  - Error handling middleware
- **Frontend**:
  - React with Vite
  - Tailwind CSS for styling
  - Axios for API calls
  - React Router for navigation

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM
- React Icons
- Framer Motion (for animations)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcryptjs
- CORS

## 📂 Project Structure

taskwave/
├── frontend/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/ # Reusable components
│ │ ├── pages/ # Page components
│ │ ├── context/ # React context
│ │ ├── services/ # API services
│ │ └── App.jsx # Main app component
│ └── tailwind.config.js
│
├── backend/ # Node.js backend
│ ├── config/ # DB configuration
│ ├── controllers/ # Route controllers
│ ├── middleware/ # Auth and error middleware
│ ├── models/ # Mongoose models
│ ├── routes/ # API routes
│ ├── utils/ # Utility functions
│ └── server.js # Server entry point
│
├── .env # Environment variables
└── README.md


## 🚀 API Endpoints

| Method | Endpoint                | Description                     | Protected |
|--------|-------------------------|---------------------------------|-----------|
| POST   | /api/auth/register      | Register new user               | No        |
| POST   | /api/auth/login         | Login user                      | No        |
| POST   | /api/tasks              | Create new task                 | Yes       |
| GET    | /api/tasks              | Get all tasks for user          | Yes       |
| PUT    | /api/tasks/:id          | Update task                     | Yes       |
| DELETE | /api/tasks/:id          | Delete task                     | Yes       |

## 🔧 Setup Instructions

### Backend Setup
1. Navigate to backend folder:

    ```cd backend```

2. Install dependencies:

    ```npm install```
3. Create a .env file with:
    ```
    MONGO_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/taskwave

    JWT_SECRET=your_jwt_secret

    JWT_EXPIRE=30d

    PORT=5000
 
## Start the server:

```node server.js```


## Frontend Setup

### Navigate to frontend folder:

 
```cd frontend```

### Install dependencies:

 
```npm install```

### Start the development server:

```npm run dev```

## 📝 Testing
- All APIs have been thoroughly tested with Postman:
- Authentication flows (register/login)
- Task CRUD operations
- Error scenarios (invalid data, unauthorized access)

## 🎨 UI Features
- Responsive design
- 3D card layout for tasks
- Interactive dashboard
- Clean, modern interface with Tailwind CSS

## 🔮 Future Enhancements
- Task categories/labels
- Drag-and-drop reordering
- Calendar view
- Email reminders
- User profile management

