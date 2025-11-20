# Database BTL2 - Full-Stack Application

A full-stack web application built with React and Node.js for managing items with database integration. This project demonstrates CRUD operations, database connectivity (MySQL/MSSQL), and modern web development practices.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Development](#development)

## ✨ Features

- **Items Management**: Full CRUD operations for items
- **Search Functionality**: Search items by name
- **RESTful API**: Clean API design with Express
- **Database Support**: Compatible with both MySQL and MSSQL
- **Stored Procedures**: Support for database stored procedures
- **Modern UI**: React-based single-page application
- **Responsive Design**: Works on desktop and mobile devices

## 🛠 Tech Stack

### Frontend (Client)
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool and dev server

### Backend (Server)
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MySQL2** - MySQL database driver
- **MSSQL** - SQL Server database driver
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
database_BTL2/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── api/           # API client functions
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   │   ├── ItemsList.jsx
│   │   │   ├── ItemForm.jsx
│   │   │   └── ItemDetail.jsx
│   │   ├── styles/        # CSS styles
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                # Backend application
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   │   └── db.js      # Database connection
│   │   ├── controllers/   # Request handlers
│   │   │   └── items.controller.js
│   │   ├── routes/        # API routes
│   │   │   └── items.routes.js
│   │   ├── services/      # Business logic
│   │   │   └── items.service.js
│   │   ├── app.js         # Express app setup
│   │   └── server.js      # Server entry point
│   └── package.json
├── package.json           # Root package.json (workspaces)
├── .gitignore
└── README.md
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MySQL** or **MSSQL** database server
- **Git**

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HuyH2/database_BTL2.git
   cd database_BTL2
   ```

2. **Install dependencies**
   
   Using npm (recommended for workspaces):
   ```bash
   npm install
   ```
   
   Or install separately:
   ```bash
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

## ⚙️ Configuration

### Database Setup

1. **Create a database** (MySQL example):
   ```sql
   CREATE DATABASE btl2_db;
   USE btl2_db;
   ```

2. **Create the items table**:
   ```sql
   CREATE TABLE items (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     description TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

3. **Optional: Create stored procedures** (for MySQL):
   ```sql
   DELIMITER //
   
   CREATE PROCEDURE create_item(
     IN p_name VARCHAR(255),
     IN p_description TEXT
   )
   BEGIN
     INSERT INTO items (name, description) VALUES (p_name, p_description);
   END //
   
   CREATE PROCEDURE calculate_score(IN p_id INT)
   BEGIN
     -- Your scoring logic here
     SELECT 0 as score;
   END //
   
   DELIMITER ;
   ```

### Environment Variables

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=4000

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Database Configuration
DB_CLIENT=mysql          # or 'mssql' for SQL Server
DB_HOST=localhost
DB_PORT=3306            # 3306 for MySQL, 1433 for MSSQL
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=btl2_db
```

**For MSSQL**, change the configuration:
```env
DB_CLIENT=mssql
DB_HOST=localhost
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=your_password
DB_NAME=btl2_db
```

## 🏃 Running the Application

### Development Mode

1. **Start the backend server**:
   ```bash
   cd server
   npm run dev
   ```
   Server will run on http://localhost:4000

2. **Start the frontend (in a new terminal)**:
   ```bash
   cd client
   npm run dev
   ```
   Client will run on http://localhost:5173

### Production Mode

1. **Build the frontend**:
   ```bash
   cd client
   npm run build
   ```

2. **Start the backend**:
   ```bash
   cd server
   npm start
   ```

## 📡 API Endpoints

### Items Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/items` | Get all items (supports `?q=search_term`) |
| `GET` | `/api/items/search?q=term` | Search items by name |
| `GET` | `/api/items/:id` | Get item by ID |
| `POST` | `/api/items` | Create a new item |
| `POST` | `/api/items/:id/score` | Calculate score for an item |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Check server health |

### Request/Response Examples

**Create Item**:
```bash
POST /api/items
Content-Type: application/json

{
  "name": "Sample Item",
  "description": "This is a sample item"
}
```

**Response**:
```json
{
  "insertId": 1
}
```

**Get All Items**:
```bash
GET /api/items
```

**Response**:
```json
[
  {
    "id": 1,
    "name": "Sample Item",
    "description": "This is a sample item",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

## 🗄️ Database Schema

### Items Table

| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT |
| name | VARCHAR(255) | NOT NULL |
| description | TEXT | NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

## 💻 Development

### Client Development

The client uses Vite for fast development and hot module replacement:

- **Main App**: `src/App.jsx` - Routes and navigation
- **Pages**:
  - `ItemsList.jsx` - Display and search items
  - `ItemForm.jsx` - Create new items
  - `ItemDetail.jsx` - View item details
- **API**: `src/api/items.js` - API client functions

### Server Development

The server follows MVC architecture:

- **Routes**: Define API endpoints
- **Controllers**: Handle HTTP requests/responses
- **Services**: Business logic and database operations
- **Config**: Database connection and configuration

### Code Style

- Use ES6+ features
- Follow existing code patterns
- Keep functions small and focused
- Use async/await for asynchronous operations

### Testing

Health check endpoint:
```bash
curl http://localhost:4000/health
```

Expected response:
```json
{"ok": true}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is created for educational purposes (BTL2 - Bài Tập Lớn 2).

## 👥 Authors

- HuyH2

## 🙏 Acknowledgments

- React documentation
- Express.js documentation
- Vite documentation
- MySQL/MSSQL documentation