# Journal Entry API 📔

A Spring Boot REST API for personal journal entry management, with MongoDB persistence and Spring Security-based authentication.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Language | Java 21 |
| Framework | Spring Boot 3 |
| Security | Spring Security (HTTP Basic Auth, BCrypt) |
| Database | MongoDB Atlas |
| Build Tool | Maven |
| Utilities | Lombok |

---

## Features
- User signup
- User update (authenticated)
- Create journal entries (per user)
- Get all entries for a user
- Get entry by ID
- Update entry
- Delete entry
- Health check endpoint

---

## Project Structure

| Folder | Responsibility |
|--------|----------------|
| `controller` | REST endpoints |
| `service` | Business logic |
| `repository` | Database layer (Spring Data MongoDB) |
| `entity` | Data models |
| `config` | Spring Security configuration |

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/health-check` | Public | Health check |
| POST | `/create-user` | Public | Register a new user |
| PUT | `/user` | Authenticated | Update the logged-in user's details |
| GET | `/journal/{username}` | Authenticated | Get all entries for a user |
| POST | `/journal/{username}` | Authenticated | Create a new entry for a user |
| GET | `/journal/id/{id}` | Authenticated | Get entry by ID |
| PUT | `/journal/id/{username}/{id}` | Authenticated | Update entry by ID |
| DELETE | `/journal/id/{username}/{id}` | Authenticated | Delete entry by ID |

Authentication uses HTTP Basic — send credentials as `username:password` in the `Authorization` header.

---

## Getting Started

1. Clone the repo and add your own `src/main/resources/application.properties` (not committed — see `.gitignore`) with your MongoDB URI:
   ```properties
   spring.data.mongodb.uri=<your-mongodb-uri>
   spring.data.mongodb.database=Journaldb
   ```
2. Run with `./mvnw spring-boot:run`
3. Hit `/health-check` to confirm the app is up.

---

## Known Limitations / Roadmap

This is an active learning project — the core CRUD + auth flow works, but a few things are still being hardened:

- **Authorization tightening**: endpoints currently trust the `username` path variable rather than deriving it from the authenticated session; moving this to `SecurityContextHolder`-based checks.
- **DTO layer**: request/response bodies currently map directly to entities; adding DTOs to control exactly what's exposed in API responses.
- **JWT migration**: moving from HTTP Basic to stateless JWT-based auth.
- **Validation**: adding Bean Validation (`@Valid`, `@NotBlank`, etc.) on incoming requests.
- **Tests**: expanding beyond the default Spring context test to real unit/integration coverage.

---

## License
Personal learning project.
