Task and User Management API
A Node.js application for managing tasks and user authentication. It uses Express for the server, Mongoose for MongoDB interactions, and JWT for user authentication.

Features
User registration and login with JWT-based authentication.
Task management (CRUD operations) for authenticated users.
Role-based access control (admin and user).
Error handling and validation.
Table of Contents
Installation
Environment Variables
Running the Application
API Endpoints
User Endpoints
Task Endpoints
Authentication Middleware
Models
User Model
Task Model
Project Structure
License
Installation
Clone the repository:

git clone https://github.com/Akhil97Negi/task-management-backend
Change directory:

cd task-user-management-api
Install dependencies:

npm install
Environment Variables
Create a .env file in the root of the project and add the following environment variables:

PORT=6000
URL=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
Replace your_mongodb_connection_string with your actual MongoDB connection string, and your_jwt_secret_key with a secret key for JWT.

Running the Application
To start the application, run:

npm start
The server will start on the specified port (default is 6000).

API Endpoints
User Endpoints
Register a new user

URL: /users/register
Method: POST
Body Parameters:
{
  "username": "string",
  "email": "string",
  "password": "string"
}
Response:
201 Created - User registered successfully
400 Bad Request - Missing required fields
409 Conflict - Email already exists
User login

URL: /users/login
Method: POST
Body Parameters:
{
  "email": "string",
  "password": "string"
}
Response:
200 OK - Login successful, returns JWT token
400 Bad Request - Missing required fields
401 Unauthorized - Incorrect password
404 Not Found - Email not registered
Get all users

URL: /users/all
Method: GET
Headers: Authorization: Bearer <token>
Response:
200 OK - Returns list of all users
401 Unauthorized - Token not provided or invalid
403 Forbidden - Insufficient role privileges
Task Endpoints
Get all tasks

URL: /tasks
Method: GET
Headers: Authorization: Bearer <token>
Query Parameters (optional): priority, status
Response:
200 OK - Returns list of tasks
401 Unauthorized - Token not provided or invalid
Create a new task

URL: /tasks
Method: POST
Headers: Authorization: Bearer <token>
Body Parameters:
{
  "title": "string",
  "description": "string",
  "priority": "low|medium|high"
}
Response:
201 Created - Task created successfully
400 Bad Request - Missing required fields
409 Conflict - Task with this title already exists
Update a task

URL: /tasks/:id
Method: PUT
Headers: Authorization: Bearer <token>
Body Parameters:
{
  "title": "string",
  "description": "string",
  "priority": "low|medium|high",
  "status": "pending|in-progress|completed"
}
Response:
200 OK - Task updated successfully
404 Not Found - Task not found
Delete a task

URL: /tasks/:id
Method: DELETE
Headers: Authorization: Bearer <token>
Response:
200 OK - Task deleted successfully
404 Not Found - Task not found
Authentication Middleware
The Auth middleware checks the validity of the JWT token and ensures that the user has the required role to access certain routes.

Usage example in a route:

javascript
const Auth = require('../middlewares/authMiddleware');
taskRouter.get('/', Auth(['admin', 'user']), getAllTasks);
Models
User Model
Fields:
username: String, required
email: String, unique, required
password: String, required
role: String, enum: ['admin', 'user'], default: 'user'
Task Model
Fields:
title: String, required
description: String, required
priority: String, enum: ['low', 'medium', 'high'], required
status: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending'
Project Structure

|-- src
|   |-- configs
|   |   |-- db.js
|   |-- controllers
|   |   |-- taskController.js
|   |   |-- userController.js
|   |-- middlewares
|   |   |-- authMiddleware.js
|   |-- models
|   |   |-- taskModel.js
|   |   |-- userModel.js
|   |-- routes
|   |   |-- taskRouter.js
|   |   |-- userRouter.js
|-- .env
|-- server.js
|-- package.json
|-- README.md
   
