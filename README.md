# User Directory

A full-stack user directory built with React, TypeScript, .NET 8 Web API, Entity Framework Core and SQLite. It supports listing, creating, updating and deleting user records.

## Technology and design

- **Frontend:** React 18, TypeScript, Vite, React Router, Zod validation, React Hot Toast and responsive CSS.
- **Backend:** ASP.NET Core 8 Web API, controller-based REST endpoints, DTO validation, service layer and EF Core.
- **Database:** SQLite; configurable through `Database:Path` / `Database__Path`. The default is `/data/app.db`.
- **Tests:** Vitest + Testing Library for frontend validation; xUnit for backend service tests.
- **DevOps:** Dockerfiles and Docker Compose for local containerized development.
- **AI disclosure:** OpenAI ChatGPT was used as a coding assistant to help draft and review the implementation. The author should review, run, and understand the code before submission.

## Structure

```text
frontend/                         React app, pages, API client, validation and tests
backend/UserDirectory.Api/        .NET API, controllers, DTOs, EF Core and services
backend/UserDirectory.Api.Tests/  xUnit service tests
Dockerfile.api                    API container image
Dockerfile.frontend               Frontend container image
docker-compose.yml                Local multi-container setup
```

## Run locally

**Prerequisites:** .NET 8 SDK, Node.js 20+ and npm.

1. Start the API:
   ```bash
   cd backend/UserDirectory.Api
   ASPNETCORE_URLS=http://localhost:5080 dotnet run
   ```
   On Windows PowerShell, use `$env:ASPNETCORE_URLS="http://localhost:5080"; dotnet run`.
2. In a second terminal, start the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Open `http://localhost:5173`. Swagger is available at `http://localhost:5080/swagger` when the API runs in Development.

The API creates the SQLite database on startup. For local development, change `Database:Path` in `appsettings.json` to a writable path if `/data` is not available. Alternatively set `Database__Path` to an absolute path.

## Run with Docker

From the repository root:

```bash
docker compose up --build
```

Open the frontend at `http://localhost:3000`; the API is at `http://localhost:5080` and the SQLite database is persisted in the `user-directory-data` named volume. The compose configuration sets Development mode so Swagger is enabled.

## API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/users` | List users |
| GET | `/api/users/{id}` | Get one user |
| POST | `/api/users` | Create user (returns `201 Created`) |
| PUT | `/api/users/{id}` | Update user (`204 No Content`) |
| DELETE | `/api/users/{id}` | Delete user (`204 No Content`) |

The API validates `name` (2–100 characters), `age` (integer 0–120), `city` (required), `state` (required) and `pincode` (4–10 characters). Invalid request bodies return `400`; unknown IDs return `404`. The frontend handles loading, empty, success and error states.

## Tests

```bash
# Backend, from repository root
dotnet test backend/UserDirectory.Api.Tests/UserDirectory.Api.Tests.csproj

# Frontend
cd frontend
npm install
npm test
npm run build
```

## Security notes

Authentication is intentionally not enabled by default so the required CRUD workflow works immediately in a local interview demo. The Add and List pages are public in this baseline. For a production deployment, configure OAuth2/OIDC with Microsoft Entra ID or Auth0, validate JWT bearer tokens in the API, and protect the Add route; do not commit client secrets. This is a documented follow-up rather than a claim that authentication is already implemented.

## Development process

1. Define a user model and request DTO with server-side validation.
2. Add a service layer and REST controller backed by EF Core/SQLite.
3. Build the Add and List routes and centralize HTTP calls in one API client.
4. Validate form inputs on the client and show loading, error, empty and success states.
5. Add tests and container configuration, then verify the app locally before publishing the repository.
