# 🐳 A Beginner's Guide to Docker for Amala Adhyapana

Welcome! If you are new to Docker, this guide will explain exactly what the generated Docker files do in plain English. 

---

## 📦 1. What is Docker?

Imagine you wrote a recipe (your code) for a delicious cake, and it baked perfectly in your kitchen (your computer). But when you gave the recipe to a friend, their cake tasted awful because their oven temperature was slightly different, or they used a different brand of flour.

In software, this is the classic **"It works on my machine!"** problem. 

**Docker solves this.** Instead of just giving your friend the recipe, Docker puts your entire kitchen (the code, the exact oven, the exact ingredients, the operating system) into a standardized **"Container"**. When your friend turns on the container, they are using *your* kitchen. It will work exactly the same everywhere.

---

## 📜 2. What is a Dockerfile? (The Recipe)

A `Dockerfile` is a text file that contains step-by-step instructions on how to build your Docker Container (your kitchen). We have two Dockerfiles in this project: one for the Java Backend and one for the Angular Frontend.

Both of our Dockerfiles use a clever trick called a **"Multi-Stage Build"**. 
Imagine a restaurant:
* **Stage 1 (The Kitchen):** You need huge pots, pans, and raw ingredients to cook the meal. This takes up a lot of space.
* **Stage 2 (The Dining Table):** The customer doesn't need the dirty pots and pans; they only want the finished, plated meal.

Multi-stage builds do exactly this. They use heavy tools to *build* the app, but only copy the finished, lightweight "plated meal" into the final container. This makes our Docker images small, fast, and secure.

### ☕ The Backend Dockerfile (`backend/Dockerfile`)
1. **Stage 1 (Build):** We start with an image that has the full Java Development Kit (`jdk`). We copy your Java code and use Maven (the builder) to compile it into a single `.jar` file (the finished meal).
2. **Stage 2 (Runtime):** We start fresh with a tiny image that *only* has the Java Runtime Environment (`jre` - just enough to run Java, but not build it). We create a restricted `spring` user for security (so hackers can't get "root" access). We copy the `.jar` file from Stage 1, and tell Docker to run it on port `8080`.

### 🅰️ The Frontend Dockerfile (`frontend/Dockerfile`)
1. **Stage 1 (Build):** We start with an image containing `Node.js` (needed to understand Angular). We copy your code and run `npm run build`, which crunches your complex Angular/TypeScript code into simple, raw HTML, CSS, and pure JavaScript.
2. **Stage 2 (Serve with Nginx):** Angular just produces static files, it relies on a web server to hand those files to users. We use a tiny program called **Nginx** (pronounced "Engine-X") for this. We copy the raw HTML/CSS from Stage 1 into the Nginx folder and start the server on port `80`.

---

## 🚦 3. What is Nginx? (`frontend/nginx.conf`)

If a user visits your website, they are asking a server for files. **Nginx is like a highly efficient waiter**. When the user asks for the homepage, Nginx hands them `index.html`. 

Our specific Nginx configuration (`nginx.conf`) does one very important thing: **Routing**. 
In single-page applications like Angular, there is only *one* real HTML file (`index.html`). If a user tries to go directly to `http://yourwebsite.com/courses`, the server might get confused and say "I don't have a file called courses.html!" (A 404 Error). 
Our `nginx.conf` tells the waiter: *"If anyone asks for a file you can't find, just give them `index.html` anyway, and let Angular figure out what to show them."*

---

## 🎼 4. What is Docker Compose? (`docker-compose.yml`)

We have a backend container and a frontend container. If we want them to talk to each other, we could start them one by one and manually connect them, but that's tedious.

**Docker Compose is the orchestra conductor.** 
The `docker-compose.yml` file is the sheet music. It tells Docker:
1. "Hey, build the backend container and name it `amala-backend`."
2. "Next, build the frontend container, name it `amala-frontend`, but wait until the backend is running first."
3. "Open port `8080` for the backend, and port `4200` for the frontend so I can access them from my browser."
4. "Put them both on a private network called `amala-network` so they can securely talk to each other."

---

## 🚀 5. How to Start Everything!

Because we have Docker Compose, you don't need to type out dozens of commands. You just need one.

Open your terminal in the root folder of the project (`amala-adhyapana`), and type:

```bash
docker-compose up --build
```

* `--build` tells Docker to read your Dockerfiles and bake fresh cakes (create new images).
* `up` tells Docker to turn everything on according to the `docker-compose.yml` file.

To stop the servers, you can press `Ctrl + C` in the terminal, or run:
```bash
docker-compose down
```

Happy containerizing! 🎉
