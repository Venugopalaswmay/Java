# Spring Boot Exception Handling Demo

This project demonstrates a production-ready approach to handling exceptions in a Spring Boot application. It utilizes `@RestControllerAdvice` to centralize error handling, ensuring consistent API responses and separating error logic from business logic.

## Key Concepts

### 1. Centralized Exception Handling (`@RestControllerAdvice`)
Instead of `try-catch` blocks in every controller, we use a global exception handler.
- **Annotation**: `@RestControllerAdvice` is a specialization of `@Component` that allows you to handle exceptions across the whole application.
- **Benefit**: Keeps controllers clean and ensures every error returns a consistent JSON format.

### 2. Standardized Error Response
API consumers expect a predictable error structure. We defined `ErrorResponse` to include:
- `timestamp`: When it happened.
- `status`: HTTP status code (e.g., 400, 404, 500).
- `error`: Short error type.
- `message`: User-friendly message.
- `path`: The URI that failed.
- `validationErrors`: (Optional) Detailed list of invalid fields for 400 Errors.

### 3. Custom Exceptions
We define specific exceptions for different error categories:
- `ResourceNotFoundException`: Mapped to HTTP 404. Used when an entity ID is invalid.
- `BusinessException`: Mapped to HTTP 409 (Conflict). Used when a business rule is violated (e.g., duplicate name).

### 4. Input Validation
Using Jakarta Validation (`@NotNull`, `@Min`, `@NotBlank`) on DTOs ensures data integrity before it reaches the service layer.
- `MethodArgumentNotValidException` is automatically thrown by Spring when `@Valid` fails.
- Our global handler catches this and converts it into a readable list of field errors.

## Project Structure

```
src/main/java/com/example/exceptionhandling/
├── controller/
│   └── ProductController.java       # Simulated endpoints
├── dto/
│   ├── ErrorResponse.java           # Standard JSON error format
│   └── ProductDTO.java              # Data Transfer Object with validation
├── exception/
│   ├── GlobalExceptionHandler.java  # THE CORE LOGIC
│   ├── BusinessException.java       # Custom exception
│   └── ResourceNotFoundException.java # Custom exception
├── service/
│   └── ProductService.java          # Logic that throws exceptions
└── DemoApplication.java             # Entry point
```

## How to Run

1.  **Build the project**:
    ```bash
    mvn clean install
    ```
2.  **Run the application**:
    ```bash
    mvn spring-boot:run
    ```

## Testing the Endpoints

Use `curl` or Postman to test these scenarios:

### 1. Success Case
```bash
curl -X GET http://localhost:8080/products/1
```
**Response**: 200 OK with product details.

### 2. Resource Not Found (404)
```bash
curl -X GET http://localhost:8080/products/999
```
**Response**:
```json
{
  "timestamp": "2023-10-27T10:00:00",
  "status": 404,
  "error": "Not Found",
  "message": "Product with ID 999 not found",
  "path": "/products/999"
}
```

### 3. Validation Failure (400)
Sending an invalid product (empty name, negative price).
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"", "price":-10}' http://localhost:8080/products
```
**Response**:
```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "Validation Failed",
  "validationErrors": [
    {"field": "name", "message": "Product name is required"},
    {"field": "price", "message": "Price must be non-negative"}
  ]
}
```

### 4. Business Rule Violation (409)
Trying to create a product named "Duplicate".
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"Duplicate", "price":50}' http://localhost:8080/products
```
**Response**: 409 Conflict with "Product with name 'Duplicate' already exists".

### 5. Unexpected System Error (500)
```bash
curl -X GET http://localhost:8080/products/error
```
**Response**: 500 Internal Server Error with "An unexpected error occurred".

## Running with Docker

You can also run this application using Docker to avoid installing Java locally.

1.  **Build and Run**:
    ```bash
    docker-compose up --build
    ```
2.  **Access**:
    The application will be available at `http://localhost:8080`.
3.  **Stop**:
    Press `Ctrl+C` or run:
    ```bash
    docker-compose down
    ```

