# API Documentation

## Deployment

- **Production URL**: [https://task-management-backend-0eqb.onrender.com/](https://task-management-backend-0eqb.onrender.com/)

## Folder Structure

/project-root 
|-- /src | |-- /controllers | | |-- authController.js | | |-- taskController.js | |-- /models | | |-- userModel.js | | |-- taskModel.js | |-- /routes | | |-- authRoutes.js | | |-- taskRoutes.js | |-- /middlewares | | |-- authMiddleware.js | |-- app.js | |-- server.js |-- /config | |-- dbConfig.js | |-- jwtConfig.js |-- /public | |-- index.html |-- /tests | |-- auth.test.js | |-- task.test.js |-- .env |-- .gitignore |-- README.md |-- package.json



---

## Overview

This API allows users to manage tasks, including user authentication and task CRUD operations. The following documentation outlines the various endpoints available, the request formats, and the expected responses.

---

## Authentication

### POST /api/auth/register

- **Description:** Register a new user.
- **Request body:**
    ```json
    {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "password123",
        "role": "admin" // Optional. Defaults to 'user' if not provided.
    }
    ```
- **Response:**
    ```json
    {
        "message": "Register successful",
        "user": {
            "_id": "userId",
            "name": "John Doe",
            "email": "john.doe@example.com",
            "role": "admin"
        }
    }
    ```

### POST /api/auth/login

- **Description:** Log in a user.
- **Request body:**
    ```json
    {
        "email": "john.doe@example.com",
        "password": "password123"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Login successful",
        "token": "jwt-token",
        "user": {
            "_id": "userId",
            "name": "John Doe",
            "email": "john.doe@example.com",
            "role": "admin"
        }
    }
    ```

---

## Task Management

### GET /api/tasks

- **Description:** Retrieve all tasks.
- **Headers:**
    ```
    Authorization: Bearer <token>
    ```
- **Query Parameters:** Optional `status`, `priority`
- **Response:**
    ```json
    [
        {
            "_id": "taskId",
            "title": "Task Title",
            "description": "Task Description",
            "priority": "medium",
            "status": "pending"
        }
    ]
    ```

### POST /api/tasks

- **Description:** Create a new task.
- **Headers:**
    ```
    Authorization: Bearer <token>
    ```
- **Request body:**
    ```json
    {
        "title": "New Task",
        "description": "Task Description",
        "priority": "high",
        "status": "pending"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Task created successfully",
        "task": {
            "_id": "taskId",
            "title": "New Task",
            "description": "Task Description",
            "priority": "high",
            "status": "pending"
        }
    }
    ```

### PUT /api/tasks/:id

- **Description:** Update an existing task.
- **Headers:**
    ```
    Authorization: Bearer <token>
    ```
- **Request body:**
    ```json
    {
        "title": "Updated Task Title",
        "description": "Updated Task Description",
        "priority": "low",
        "status": "completed"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Task updated successfully",
        "task": {
            "_id": "taskId",
            "title": "Updated Task Title",
            "description": "Updated Task Description",
            "priority": "low",
            "status": "completed"
        }
    }
    ```

### DELETE /api/tasks/:id

- **Description:** Delete a task.
- **Headers:**
    ```
    Authorization: Bearer <token>
    ```
- **Response:**
    ```json
    {
        "message": "Task deleted successfully"
    }
    ```
