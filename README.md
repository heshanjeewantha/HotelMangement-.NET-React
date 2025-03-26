# Hotel Management API

This is a RESTful API for managing hotel operations, including user authentication, user management, and (potentially) room and booking services. Built with ASP.NET Core, it uses JWT authentication, Entity Framework Core with SQL Server, and supports a frontend application via CORS.

## Features
- User registration and login with JWT authentication
- User management (CRUD operations)
- Role-based authorization (Admin and User roles)
- Token blacklisting for logout functionality
- CORS support for frontend integration

## Technologies
- **Backend:** ASP.NET Core 8
- **Database:** SQL Server (via Entity Framework Core)
- **Authentication:** JWT (JSON Web Tokens)
- **Dependency Injection:** Built-in ASP.NET Core DI
- **API Documentation:** Swagger/OpenAPI
- **Frontend:** React with Vite

## Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (LocalDB or full instance)
- [Postman](https://www.postman.com/downloads/) (for testing API endpoints)
- [Node.js](https://nodejs.org/en) (for frontend development)

## Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/hotel-management-api.git
cd hotel-management-api
```

### 2. Configure the Database
Update the connection string in `appsettings.json`:
```json
{
    "ConnectionStrings": {
        "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=HotelManagementDb;Trusted_Connection=True;MultipleActiveResultSets=true"
    }
}
```
Run migrations to create the database:
```sh
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### 3. Configure JWT Settings
Update `appsettings.json` with your JWT configuration:
```json
{
    "Jwt": {
        "Key": "your-very-long-secret-key-here",
        "Issuer": "https://localhost:7013",
        "Audience": "https://localhost:7013"
    }
}
```

### 4. Build and Run the Backend
Build the project:
```sh
dotnet build
```
Run the API:
```sh
dotnet run
```
The API will be available at `https://localhost:7013`.

### 5. Test with Swagger
Open a browser and navigate to [https://localhost:7013/swagger](https://localhost:7013/swagger) to explore and test the API endpoints.

## Setting up the React Frontend

### 1. Navigate to the Frontend Directory
```sh
cd frontend
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Configure API Base URL
Update `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=https://localhost:7013/api
```

### 4. Start the Frontend
```sh
npm run dev
```
The frontend will be available at `http://localhost:5173`.

## API Endpoints

### Authentication

#### Register a new user
**POST** `/api/auth/register`
```json
Body: { "email": "string", "password": "string", "fullName": "string", "role": "string" }
Response: { "token": "jwt-token" }
```

#### Login a user
**POST** `/api/auth/login`
```json
Body: { "email": "string", "password": "string" }
Response: { "token": "jwt-token" }
```

#### Logout a user
**POST** `/api/auth/logout`
```json
Headers: Authorization: Bearer <token>
Response: "Logged out successfully"
```

### User Management

#### Get all users (Admin only)
**GET** `/api/auth/users`
```json
Headers: Authorization: Bearer <admin-token>
Response: Array of user objects
```

#### Get a user by ID (Admin only)
**GET** `/api/auth/users/{id}`
```json
Headers: Authorization: Bearer <admin-token>
Response: User object
```

#### Update a user
**PUT** `/api/auth/users/{id}`
```json
Headers: Authorization: Bearer <token>
Body: { "fullName": "string", "email": "string", "role": "string" }
Response: "User updated successfully"
```

#### Delete a user
**DELETE** `/api/auth/users/{id}`
```json
Headers: Authorization: Bearer <token>
Response: "User deleted successfully"
```

## Notes
- **Token Blacklisting:** The current implementation uses an in-memory blacklist. For production, replace it with a persistent store (e.g., SQL Server or Redis).
- **CORS:** Configured to allow requests from `http://localhost:3000`. Update the origin in `Program.cs` if your frontend runs on a different URL.
- **Roles:** Supports "Admin" and "User" roles. Assign roles during registration.

## License
This project is licensed under the MIT License.
