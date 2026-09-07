# Journal Entry API 📔

A Spring Boot REST API for personal journal entry management, with MongoDB persistence, JWT-based authentication, and optional AI-powered journal analysis.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Language | Java 21 |
| Framework | Spring Boot 3 |
| Security | Spring Security + JWT + BCrypt |
| Database | MongoDB Atlas |
| Build Tool | Maven |
| AI | OpenAI API via OpenRouter |
| Utilities | Lombok |

---

## Features

- User signup
- JWT-based authentication
- BCrypt password hashing
- User-specific journal entries
- Create journal entries
- Get all entries for the authenticated user
- Get entry by ID
- Update journal entries
- Delete journal entries
- Optional AI-powered journal analysis
- Health check endpoint

---

## Project Structure

| Folder | Responsibility |
|--------|----------------|
| `controller` | REST endpoints |
| `service` | Business logic |
| `repository` | Database access |
| `entity` | Data models |
| `config` | Spring Security and JWT configuration |

---

## Authentication Flow

The API uses **stateless JWT authentication**.

1. Register a user.
2. Login using the user's credentials.
3. The login endpoint returns a JWT.
4. Include the JWT as a Bearer token when accessing protected endpoints.

Example:

```text
Authorization: Bearer <your-jwt-token>
