# Journal Entry API 📔

A Spring Boot REST API for personal journal entry management.

## Tech Stack
- Java 21
- Spring Boot 3
- MongoDB
- Maven

## Features
- Create journal entries
- Get all entries
- Get entry by ID
- Update entry
- Delete entry
- Health check endpoint

## Project Structure
- `controller` — REST endpoints
- `service` — Business logic
- `repository` — Database layer
- `entity` — Data models

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /journal | Get all entries |
| GET | /journal/id/{id} | Get entry by ID |
| POST | /journal | Create entry |
| PUT | /journal/id/{id} | Update entry |
| DELETE | /journal/id/{id} | Delete entry |
| GET | /health-check | Health check |

## Coming Soon
- Spring Security
- User authentication
- MongoDB Atlas integration
