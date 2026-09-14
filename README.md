# Journal Entry API 

📔A full-stack personal journal application built with Spring Boot, MongoDB, JWT authentication, and React. The application provides authenticated users with private journal management and AI-powered analysis of journal entries.
Development Focus: The frontend UI was AI-generated and was used primarily as a presentation layer. My primary focus in this project was backend development, including REST API design, Spring Boot architecture, JWT authentication, Spring Security, MongoDB persistence, authorization, validation, exception handling, and AI API integration.
The backend exposes a REST API with stateless JWT authentication, user-specific data access, role-based admin endpoints, centralized exception handling, and MongoDB persistence.
---

## ✨ Features

* 🔐 User registration and authentication
* 🔑 Stateless JWT-based authentication
* 🔒 BCrypt password hashing
* 👤 User-specific journal entries
* 📝 Create, read, update, and delete journal entries
* 🤖 AI-powered journal analysis using OpenRouter
* 🧠 Automatic mood, summary, and tag generation
* 🛡️ Role-based access control for admin endpoints
* ✅ Request validation with centralized error handling
* 🌐 React frontend with protected routes
* 🔄 Axios JWT interceptor for authenticated API requests
* ❤️ Health-check endpoint
* 🗄️ MongoDB Atlas persistence
* 🔗 User-to-journal relationships using MongoDB `@DBRef`

---

## 🛠️ Tech Stack

### Backend

| Layer            | Technology                   |
| ---------------- | ---------------------------- |
| Language         | Java 21                      |
| Framework        | Spring Boot 3.5.6            |
| Security         | Spring Security              |
| Authentication   | JWT                          |
| Password Hashing | BCrypt                       |
| Database         | MongoDB Atlas                |
| Database Access  | Spring Data MongoDB          |
| Build Tool       | Maven                        |
| Validation       | Spring Boot Validation       |
| AI Integration   | OpenAI Java SDK + OpenRouter |
| JSON Processing  | Jackson                      |
| Utilities        | Lombok                       |

### Frontend

| Layer       | Technology   |
| ----------- | ------------ |
| UI          | React 18     |
| Build Tool  | Vite         |
| HTTP Client | Axios        |
| Routing     | React Router |
| Language    | JavaScript   |

---

## 🏗️ Architecture

The backend follows a layered architecture:

```text
                    ┌──────────────────┐
                    │   React Frontend │
                    │   Vite + Axios   │
                    └────────┬─────────┘
                             │ REST / JSON
                             ▼
                    ┌──────────────────┐
                    │    Controller    │
                    │  HTTP / Routing  │
                    └────────┬─────────┘
                             ▼
                    ┌──────────────────┐
                    │     Service      │
                    │  Business Logic  │
                    └──────┬─────┬─────┘
                           │     │
              ┌────────────┘     └──────────────┐
              ▼                                  ▼
      ┌──────────────────┐              ┌──────────────────┐
      │    Repository    │              │    AI Service    │
      │ Spring Data Mongo│              │ OpenRouter / AI  │
      └────────┬─────────┘              └──────────────────┘
               │
               ▼
      ┌──────────────────┐
      │  MongoDB Atlas   │
      └──────────────────┘
```

---

## 📁 Project Structure

```text
Journal_Demo/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/PranavRaut/Journal_Demo/
│   │   │   │       ├── config/
│   │   │   │       ├── controller/
│   │   │   │       ├── entity/
│   │   │   │       ├── exception/
│   │   │   │       ├── filter/
│   │   │   │       ├── repository/
│   │   │   │       ├── service/
│   │   │   │       └── utils/
│   │   │   └── resources/
│   │   │       └── application.yml
│   │   │
│   │   └── test/
│   │
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

### Backend responsibilities

| Package      | Responsibility                                       |
| ------------ | ---------------------------------------------------- |
| `controller` | REST API endpoints and HTTP request handling         |
| `service`    | Application and business logic                       |
| `repository` | MongoDB data access                                  |
| `entity`     | MongoDB document and response models                 |
| `config`     | Spring Security, CORS, and application configuration |
| `filter`     | JWT request authentication                           |
| `exception`  | Centralized exception and error handling             |
| `utils`      | JWT generation and validation                        |

---

## 🔐 Authentication & Authorization

The API uses **stateless JWT authentication**.

### Authentication flow

```text
User
 │
 │  POST /public/signup
 ▼
Create Account
 │
 │  POST /public/login
 ▼
AuthenticationManager
 │
 │  Valid Credentials
 ▼
JWT Generated
 │
 │  Authorization: Bearer <token>
 ▼
JwtFilter
 │
 ▼
SecurityContext
 │
 ▼
Protected Endpoint
```

### JWT behavior

* Passwords are hashed using BCrypt before being stored.
* Successful login returns a JWT.
* The JWT contains the authenticated username as its subject.
* Tokens expire after **1 hour**.
* Protected requests must include the JWT using the `Authorization` header.
* The JWT filter validates the token before allowing access to protected resources.

Example:

```http
Authorization: Bearer <your-jwt-token>
```

---

## 🛡️ Authorization Rules

| Endpoint        | Access              |
| --------------- | ------------------- |
| `/public/**`    | Public              |
| `/journal/**`   | Authenticated users |
| `/user/**`      | Authenticated users |
| `/admin/**`     | `ADMIN` role only   |
| `/ai/**`        | Authenticated users |
| Other endpoints | Authenticated users |

---

## 📡 REST API

### Public Endpoints

| Method | Endpoint               | Description                  | Authentication |
| ------ | ---------------------- | ---------------------------- | -------------- |
| `GET`  | `/public/health-check` | Check API health             | ❌              |
| `POST` | `/public/signup`       | Register a new user          | ❌              |
| `POST` | `/public/login`        | Authenticate and receive JWT | ❌              |

### Journal Endpoints

| Method   | Endpoint             | Description                                        | Authentication |
| -------- | -------------------- | -------------------------------------------------- | -------------- |
| `GET`    | `/journal/entries`   | Get all journal entries for the authenticated user | 🔒             |
| `POST`   | `/journal/add`       | Create a new journal entry                         | 🔒             |
| `GET`    | `/journal/id/{myId}` | Get a journal entry by ID                          | 🔒             |
| `PUT`    | `/journal/id/{myId}` | Update a journal entry                             | 🔒             |
| `DELETE` | `/journal/id/{myId}` | Delete a journal entry                             | 🔒             |
| `GET`    | `/journal/dbcheck`   | Verify the active MongoDB database                 | 🔒             |

### User Endpoints

| Method | Endpoint | Description                                       | Authentication |
| ------ | -------- | ------------------------------------------------- | -------------- |
| `PUT`  | `/user`  | Update the authenticated user's username/password | 🔒             |

### AI Endpoint

| Method | Endpoint      | Description                      | Authentication |
| ------ | ------------- | -------------------------------- | -------------- |
| `POST` | `/ai/analyze` | Analyze journal content using AI | 🔒             |

### Admin Endpoints

| Method | Endpoint           | Description          | Authentication |
| ------ | ------------------ | -------------------- | -------------- |
| `GET`  | `/admin/get-users` | Retrieve users       | 👑 `ADMIN`     |
| `POST` | `/admin`           | Create an admin user | 👑 `ADMIN`     |

---

## 🤖 AI Journal Analysis

Journal creation is integrated with an AI analysis service.

When a journal entry is created:

```text
Journal Entry
      │
      ▼
Save Entry to MongoDB
      │
      ▼
Send Content to OpenRouter
      │
      ▼
AI Analysis
      │
      ├── Mood
      ├── Summary
      └── Tags
      │
      ▼
Update Journal Entry
      │
      ▼
Associate Entry with User
```

The AI service requests a structured JSON response containing:

```json
{
  "mood": "short description of the mood",
  "summary": "one sentence summary",
  "tags": [
    "tag1",
    "tag2",
    "tag3"
  ]
}
```

The generated information is stored alongside the journal entry.

If AI analysis fails, the exception is caught so that the journal entry can still be associated with the user.

The project uses the **OpenAI Java SDK** to communicate with the OpenRouter-compatible API.

---

## 🗃️ Data Model

### User

```text
User
├── id
├── userName
├── password
├── email
├── sentimentAnalysis
├── roles[]
└── journalEntries[]
```

### Journal Entry

```text
JournalEntry
├── id
├── title
├── content
├── date
├── mood
├── summary
└── tags[]
```

Users maintain references to their journal entries through MongoDB's `@DBRef` relationship.

---

## 🚨 Error Handling

The backend uses a centralized `@RestControllerAdvice` to provide consistent error responses.

Supported cases include:

| Situation               | HTTP Status                 |
| ----------------------- | --------------------------- |
| Validation failure      | `400 Bad Request`           |
| Invalid authentication  | `401 Unauthorized`          |
| Duplicate username      | `409 Conflict`              |
| Resource not found      | `404 Not Found`             |
| Rate limit exceeded     | `429 Too Many Requests`     |
| Unexpected server error | `500 Internal Server Error` |

Example error response:

```json
{
  "timestamp": "2026-09-13T12:00:00Z",
  "status": 400,
  "error": "Validation failed",
  "fields": {
    "userName": "Username is required"
  }
}
```

---

## ⚙️ Environment Variables

The backend reads sensitive configuration from environment variables rather than hard-coding secrets.

Create the required environment variables:

```text
MONGODB_URI=<your-mongodb-connection-string>
MONGODB_DATABASE=Journaldb
JWT_SECRET=<your-jwt-secret>
OPENAI_API_KEY=<your-openrouter-api-key>
```

The frontend uses:

```text
VITE_API_BASE_URL=<your-backend-api-url>
```

For local development:

```text
VITE_API_BASE_URL=http://localhost:8080
```

> **Never commit real API keys, JWT secrets, or MongoDB credentials to GitHub.**

---

## 🚀 Running Locally

### Prerequisites

Make sure the following are installed:

* Java 21
* Maven
* Node.js and npm
* MongoDB Atlas account
* OpenRouter API key

---

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Journal_Demo
```

---

### 2. Configure the backend

Set the required environment variables:

```text
MONGODB_URI
MONGODB_DATABASE
JWT_SECRET
OPENAI_API_KEY
```

Then start the Spring Boot backend:

```bash
cd backend
./mvnw spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

---

### 3. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The Vite development server runs on:

```text
http://localhost:5173
```

---

## 🧪 Testing

The backend includes Spring Boot test infrastructure.

Run the test suite from the `backend` directory:

```bash
./mvnw test
```

---

## 🔑 Example API Usage

### Register

```http
POST /public/signup
Content-Type: application/json
```

```json
{
  "userName": "pranav",
  "password": "securePassword123"
}
```

---

### Login

```http
POST /public/login
Content-Type: application/json
```

```json
{
  "userName": "pranav",
  "password": "securePassword123"
}
```

The API returns a JWT:

```text
eyJhbGciOiJIUzI1NiJ9...
```

---

### Create Journal Entry

```http
POST /journal/add
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

```json
{
  "title": "A Productive Day",
  "content": "Today I worked on my Spring Boot project and learned more about JWT authentication."
}
```

The backend automatically attempts AI analysis and can populate:

```json
{
  "mood": "motivated",
  "summary": "The entry describes a productive learning-focused day.",
  "tags": [
    "learning",
    "spring-boot",
    "productivity"
  ]
}
```

---

### Get User's Journal Entries

```http
GET /journal/entries
Authorization: Bearer <your-jwt-token>
```

Only the authenticated user's journal entries are returned.

---

### Update a Journal Entry

```http
PUT /journal/id/{entryId}
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

```json
{
  "title": "Updated Title",
  "content": "Updated journal content."
}
```

---

### Delete a Journal Entry

```http
DELETE /journal/id/{entryId}
Authorization: Bearer <your-jwt-token>
```

Successful deletion returns:

```text
204 No Content
```

---

## 🔒 Security Considerations

The project implements several security mechanisms:

* BCrypt password hashing
* Stateless JWT authentication
* JWT validation through a custom security filter
* Role-based authorization for admin endpoints
* Protected journal and user endpoints
* Password field configured as write-only in JSON responses
* Sensitive configuration loaded through environment variables
* CSRF disabled for the stateless REST API
* CORS configured for the frontend

---

## 🎨 Frontend

The React frontend provides:

* Login and signup pages
* Protected application routes
* Journal entry listing
* Journal entry creation/editing
* Journal entry deletion
* Authentication state management
* Automatic JWT attachment to API requests
* Automatic logout and redirect when the API returns `401 Unauthorized`

Frontend routing:

| Route          | Purpose                 |
| -------------- | ----------------------- |
| `/login`       | User login              |
| `/signup`      | User registration       |
| `/`            | Journal entry list      |
| `/new`         | Create journal entry    |
| `/entries/:id` | View/edit journal entry |

---

## 📌 Future Improvements

Potential improvements for the project include:

* Refresh token support
* More granular authorization rules
* Pagination for journal entries
* Search and filtering
* Automated integration tests
* API documentation with OpenAPI/Swagger
* Improved AI failure handling and retry strategies
* Production frontend deployment
* Production CORS configuration
* Docker containerization
* CI/CD pipeline
* Observability with structured logging and metrics

---

## 👨‍💻 Author

**Pranav Raut**

Information Technology Undergraduate
Java Backend Developer | Spring Boot | REST APIs | MongoDB

---

## 📄 License

This project is intended for learning and portfolio purposes.

