# Pokemon Battle Web Application

This project is a Full-Stack Application using Vite + React as a frontend and Node.js Express as a backend.

## Prerequesites

- [nodejs](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

1. CLone the repository:

   ```bash
   git clone git@github.com:reneSpeaks/pokemon-battle.git
   cd pokemon-battle
   ```
   
2. Install dependencies:

   ```bash
   npm install
   ```
   
## Running the Application

To start the application, both front- and backend must be running simultaneously. Use the following commands:

1. For the Frontend:

    ```bash
    npm run dev
    ```

The Frontend will start running on [http://localhost:5173](http://localhost:5173)
   
2. For the Backend:

    ```bash
    npm run server
    ```

The Backend will start running on [http://localhost:3001](http://localhost:3001)

## Configuration

Environment-specific configurations can be set in `.env` file. take a look at the `example.env` file.

Create a new `.env` file and then copy the contents of `example.env` into it, you may change the `JWT_SECRET` and `PORT` values.