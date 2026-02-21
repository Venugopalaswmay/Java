# Amala Adhyapana - Learning Made Easy (Frontend)

This is the Angular front-end for the Amala Adhyapana web application, a vibrant and dynamic learning platform. Designed with a mobile-first philosophy, it uses rich CSS abstractions, modern typography, glassmorphism, and responsive layouts to ensure a premium user experience across all devices.

## Technology Stack
- **Angular 19**: Frontend framework including Standalone Components.
- **SCSS**: Used for styling with CSS variables, Flexbox, CSS Gradients, and animations. No utility frameworks like Tailwind were used; all styling is robust, custom CSS.
- **RxJS**: For managing data streams.
- **HttpClient**: Integrated for fetching REST APIs from the Spring Boot backend.

## Design Highlights
- **Responsive Layout**: Adapts gracefully to Monitors, Tablets, and Mobile phones.
- **Glassmorphism**: Elegant translucent UI elements built with `backdrop-filter`.
- **Custom Theme**: Carefully curated HSL color palette highlighting primary (`hsl(253, 90%, 65%)`) and accent colors.
- **Typography Integration**: Uses custom Google Fonts (`Outfit` for headings, `Inter` for body).

## Prerequisites
- Node.js (Version 18.13.0 or higher recommended)
- npm (Node Package Manager)
- Angular CLI (can be run via `npx`)

## Running the Application

1. **Start the backend server first** (so the APIs resolve correctly).
2. **Navigate to the frontend directory:**
   ```bash
   cd amala-adhyapana/frontend
   ```
3. **Install dependencies** (if not done yet):
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm start
   ```

The application will be available at [http://localhost:4200/](http://localhost:4200/). 

> **Development Note:** The Angular app implements a fallback UI state. If the Java back-end is not reachable, the Landing Component catches the HTTP error and automatically loads embedded mock data to ensure the UI design is still viewable and testable.

## Documentation
The source code incorporates clear types and interfaces (e.g., `Course` interface in `course.service.ts`) explaining data structures. Components are self-contained using Angular new Standalone architecture (`@Component({ standalone: true })`).
