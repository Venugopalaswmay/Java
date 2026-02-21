# Amala Adhyapana - Learning Made Easy (Backend)

This is the Java Spring Boot back-end for the Amala Adhyapana web application, providing robust REST APIs for a modern learning platform.

## Technology Stack
- **Java 17**: Core programming language.
- **Spring Boot 3.4.x**: Main application framework.
- **Spring Data JPA**: For data persistence and ORM.
- **H2 Database**: In-memory relational database for easy development and testing.
- **Springdoc OpenAPI (Swagger)**: For automated and interactive API documentation.
- **Lombok**: For boilerplate code reduction.

## Prerequisites
- Java Development Kit (JDK) 17 or higher.
- Maven (optional, wrapper is included).

## Running the Application

1. **Navigate to the backend directory:**
   ```bash
   cd amala-adhyapana/backend
   ```
2. **Start the Spring Boot application:**
   Using the Maven wrapper:
   ```bash
   ./mvnw spring-boot:run
   ```
   The server will start on port `8080`.

## API Documentation

The REST APIs are fully documented using OpenAPI 3.0 specification. 
Once the server is running, you can access the interactive Swagger UI at:
- **Swagger UI:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **OpenAPI JSON specification:** `http://localhost:8080/v3/api-docs`

Use the Swagger UI to freely interact with the endpoints (`GET /api/courses`, `POST /api/courses`).

## Database Management

The application is configured to use an H2 in-memory database which is seeded with mock data on startup using a `CommandLineRunner` (`DataLoader.java`).
You can access the H2 console to view the raw data:
- **URL:** [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
- **JDBC URL:** `jdbc:h2:mem:amaladb`
- **Username:** `sa`
- **Password:** *(leave blank)*
