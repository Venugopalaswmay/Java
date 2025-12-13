# TypeScript AWS Lambda with MongoDB - A Guide for Java Developers

This project demonstrates how to build a serverless API using TypeScript, MongoDB, and Docker, specifically tailored for developers coming from a Java background.

## 🏗 Project Structure vs Java Equivalent

| TypeScript File | Java Equivalent | Purpose |
|----------------|-----------------|---------|
| `package.json` | `pom.xml` / `build.gradle` | Dependency management and build scripts. |
| `tsconfig.json` | Compiler arguments | Configures how TypeScript compiles to JavaScript (bytecode). |
| `src/models/User.ts` | JPA Entity / POJO | Defines the data structure and database schema. |
| `src/controllers/UserController.ts` | `@RestController` | Handles incoming HTTP requests and business logic. |
| `src/database.ts` | `DataSource` / `EntityManager` | Manages the database connection pool. |
| `src/index.ts` | `main()` / `Application.java` | Entry point for the AWS Lambda function. |

## 🚀 Key Concepts for Java Developers

### 1. Typing (`interface` vs `class`)
In Java, you almost always use classes. In TypeScript, we often use `interface` to define the *shape* of data (like a DTO) without compiling to any runtime code.
- See `src/models/User.ts`: `interface IUser` defines the shape for TypeScript, while `UserSchema` defines the validation for MongoDB at runtime.

### 2. Async/Await vs Threads
Java traditionally uses threads for concurrency. JavaScript is single-threaded but non-blocking.
- `async/await` is similar to Java's `CompletableFuture` or reactive programming (Project Reactor), but with synchronous-looking syntax.
- **Important**: You must `await` database calls, otherwise execution continues immediately without waiting for the result.

### 3. Dependency Injection
In this simple example, we import modules directly (e.g., `import User from '../models/User'`). In larger TypeScript apps, frameworks like NestJS provide `@Inject` annotations similar to Spring.

## 🛠 Setup & Running

### Prerequisites
- Node.js (v18+)
- Docker
- MongoDB (running locally or Atlas URI)

### Installation
```bash
npm install
```

### Running Locally
To run the API locally (mimicking Lambda):
```bash
npm run dev
```
The server will start at `http://localhost:3000`.

### Docker Build
To package the application as a Docker image for AWS Lambda:
```bash
docker build -t ts-lambda-mongo .
```

## 🧪 Testing the Endpoint

**Create User (POST)**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Java Dev", "email": "java@example.com"}'
```

**Get Users (GET)**
```bash
curl http://localhost:3000/users
```
