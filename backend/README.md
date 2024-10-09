# Tree Backend

## Overview

**Tree Backend** is a Node.js Express application designed to serve tree data from a MongoDB database. This project provides a robust API that can be used to interact with and retrieve tree-related data. It is built with modern technologies and is easy to extend or integrate with other systems.

## Features

- **Node.js and Express**: Fast, unopinionated, and minimal web framework.
- **MongoDB**: NoSQL database for storing tree data.
- **D3.js**: Integration with tree visualization libraries.
- **Mocha & Chai**: Comprehensive testing setup for both unit and API tests.
- **Environment Configuration**: Easily manage environment variables with `dotenv`.
- **Cross-Origin Resource Sharing (CORS)**: Enabled for secure API access.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) 
- [MongoDB](https://www.mongodb.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/poonamshirode/tree.git
cd tree/backend
```

### 2. Install Dependencies

To install the necessary dependencies for the project, run the following command:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and define the following environment variables:

```bash
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.dwrwa.mongodb.net/?retryWrites=true&w=majority
```

### 4. Seeding the Database

To populate the database with sample tree data, you can use the seeding script provided in the project. This script clears any existing data and inserts predefined sample data into your MongoDB database.

To seed the database, run the following command:

```bash
npm run seed
```

### 5. Running the Dev Server

To start the dev server, run the following command in your terminal:

```bash
npm start
```

### 6. Testing

To run the tests for this project, you can use the following commands:

- **Running API Tests**: To run the API tests, use the following command:

  ```bash
  npm run test:api
  ```

- **Running Unit Tests**: To run the unit tests, use the following command:
  ```bash
  npm run test:api
  ```

## Project Structure

The project is organized into several key directories and files. Here's an overview of the structure:

```
tree-backend/
├── src/
│   ├── config/
│   │   └── db.js          # MongoDB connection setup
│   ├── controllers/
│   │   └── dataController.js  # Handles data fetching logic
│   ├── models/
│   │   └── dataModel.js   # Mongoose model for tree data
│   ├── routes/
│   │   └── dataRoutes.js  # Express routes
│   ├── seed.js            # Script to seed the database
│   └── server.js          # Express server setup
├── tests/
│   └── data.test.js       # API tests
├── .env                # Environment variables
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

## Dependencies

- **body-parser**: Middleware for parsing incoming request bodies.
- **cors**: Middleware for enabling CORS.
- **dotenv**: Loads environment variables from `.env` file.
- **express**: Web framework for Node.js.
- **mongoose**: MongoDB object modeling tool.

## Dev Dependencies

- **chai**: Assertion library for Node.js.
- **chai-http**: HTTP integration testing with Chai assertions.
- **mocha**: JavaScript test framework for Node.js.
- **mongodb-memory-server**: In-memory MongoDB server for testing.
- **sinon**: Test spies, stubs, and mocks.
- **supertest**: HTTP assertions made easy.
