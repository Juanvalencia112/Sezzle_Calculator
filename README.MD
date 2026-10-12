# Sezzle Calculator - Juan David Valencia

## Project structure

This application has two main parts:

* **Frontend:** React, TypeScript, and Vite. It includes a responsive calculator UI(te design is based on the xiomi claculator I usually use on my phone), keyboard input, and basic input validation.
* **Backend:** A REST API written Go that handles the operations and returns the result as jSON.

The frontend is served with Nginx in the docker setup, while the backend runs on Go's net/http package. Docker Compose starts both services together.

## Requirements

To run the project with Docker, you need Docker and Docker Compose.

For running the services separately, you'll need:

* Go 1.22 or newer
* Node.js 20 or newer
* npm

## Running the application

### Option 1: Docker Compose

From the project root, run:

```bash
docker-compose up --build
```

Once the containers have started, open http://localhost:3000 in your browser.

To stop the services, press `Ctrl + C`. If you started them in detached mode, run:

```bash
docker-compose down
```

### Option 2: Run locally

You can also start the backend and frontend in separate terminals.

**1. Start the backend**

```bash
cd backend
go run .
```

The API runs on port `8080`.

**2. Start the frontend**

Open another terminal and run:

```bash
cd frontend
npm install
npm run dev
```

Vite will print the local development URL in the terminal, http://localhost:5173.

Make sure the frontend is configured to send its requests to the backend at `http://localhost:8080`.

## API

The backend exposes one calculation endpoint:

### `POST /api/calculate`

It accepts two numbers and an operation, then returns the calculated result.

**Example request**

```json
{
  "a": 15,
  "b": 3,
  "operation": "divide"
}
```

The supported operations are:

| Operation  | Description                |
| ---------- | -------------------------- |
| `add`      | Addition (+)       |
| `subtract` | Subtraction (-)   |
| `multiply` | Multiplication (*) |
| `divide`   | Division (÷)       |

**Successful response — `200 OK`**

```json
{
  "result": 5
}
```

**Error response — `400 Bad Request`**

Invalid operations and division by zero return an error response. For example:

```json
{
  "error": "cannot divide by zero"
}
```

## Running the tests

The backend includes  tests for the arithmetic operations and someedge cases, including division by zero and invalid operators.

To run themexecute the command from the project root:

```bash
cd backend
go test -v
```


## Features

* Addition, subtraction, multiplication, and division
* Frontend validation and backend error handling
* Keyboard support for entering calculations
* Responsive interface inspired by Xiaomi design (my phone: Redmi Note 12S)
* React and TypeScript frontend with a Go REST API
* Docker Compose setup with a multi-stage frontend build