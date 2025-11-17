# File Browser Server

A Node.js GraphQL API for browsing the file system.  
It exposes a GraphQL schema that lets clients list directory contents (files and folders) along with metadata such as size, permissions, and timestamps, with cursor-based pagination.

---

## 1. Prerequisites

Make sure you have:

- **Node.js**: v16+ (LTS recommended)
- **npm**: comes with Node.js

You can verify your versions with:
node -v npm -v


---

## 2. Installation

From the project root (`file-browser-server`):

npm install

This installs all required dependencies, including:

- `express` – HTTP server
- `apollo-server-express` / `apollo-server` – GraphQL server
- `graphql` – GraphQL schema & execution
- `mime-types` – MIME type utilities
- `nodemon` – development-time auto-reload (if configured in npm scripts)

---

## 3. Running the App

### 3.1 Development Mode (with auto-reload)

If there is a `dev` script in `package.json` (commonly configured with `nodemon`):
npm run dev


This will:

- Start the server
- Automatically restart on file changes

### 3.2 Production / Simple Run

If there is a `start` script in `package.json` (commonly `node src/index.js`):


When the server starts, check the console output for the URL of the GraphQL endpoint (typically something like `http://localhost:<PORT>/graphql`).

---

## 4. Using the GraphQL API

Once the server is running:

1. Open the printed server URL in a browser (for example, `http://localhost:4000/graphql`).
2. Use the GraphQL IDE (GraphQL Playground / Apollo Sandbox, depending on configuration) to run queries.

Example query to list directory contents:
graphql query BrowseDirectory(path: String!,cursor: String, limit: Int) { directory(path:path, cursor: cursor, limit:limit) { entries { name path size extension createdAt isDirectory mode permissions uid gid } nextCursor } }

json { "path": ".", "limit": 100 }

---

## 5. Environment Configuration

Common configuration options (exact details depend on `src/index.js`):

- **`PORT`**: Port for the HTTP server  
  Example:

  ```bash
  PORT=4000 npm start
  ```

If no `PORT` is provided, the server typically falls back to a default (check the startup log or the server entry file).

---

## 6. Docker (If Using the Provided Dockerfile)

From the project root:

### 6.1 Build the image
 docker build -t file-browser-server .

