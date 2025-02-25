# Project Overview

This project is a web application built with Next.js for the frontend and NestJS for the backend. The application is structured into two main directories: `app` and `service`.

## Directory Structure

- `app/`: Contains the Next.js frontend application.
- `service/`: Contains the NestJS backend application.

## Backend (NestJS)

The backend application is built using NestJS and is located in the `service/` directory. It provides a robust API to handle various operations such as user management and memory management. The application uses Sequelize for ORM and includes comprehensive unit tests.

### Key Files and Directories

- `src/`: Contains the source code for the backend application.
  - `common/`: Contains common decorators and filters
  - `configuration/`: Contains app configurations
  - `resources/`: Contains the resource modules such as `users` and `memories`.
    - `users/`: Manages user-related operations.
      - `users.controller.ts`: Handles HTTP requests for user operations.
      - `users.service.ts`: Contains the business logic for user operations.
    - `memories/`: Manages memory-related operations.
      - `memories.controller.ts`: Handles HTTP requests for memory operations.
      - `memories.service.ts`: Contains the business logic for memory operations.
    - `memories-media/`: Manages memory-media-related operations.
      - `memories-media.controller.ts`: Handles HTTP requests for memory media operations.
      - `memories-media.service.ts`: Contains the business logic for memory media operations.
    - `share/`: Manages share-related operations.
      - `share.controller.ts`: Handles HTTP requests for share operations.
      - `share.service.ts`: Contains the business logic for share operations.
- `docker-compose.yaml`: Configuration file for Docker Compose to set up the development environment.
- `package.json`: Lists the dependencies and scripts for the backend application.
- `migrations`: Contains migration files for models

### Limitations

1. The authentication functionality is very limited. Very basic login and sign up without any security considerations.
2. Files are getting stored on disk storage for ease. In a production environment I would store them on a distributed cloud storage like S3 or similar.

### Running the backend application

1.  Install node version manager (nvm) from [here](https://github.com/nvm-sh/nvm#install--update-script)
2.  Run following commands to setup node version and node modules

        cd service
        nvm install v20.18.0
        nvm use
        npm install

3.  Start docker containers

        npm run containers:up

4.  Run migrations

        npm run migrations:up

5.  Start development server

        npm run start:dev

6.  Your server should be running at [http://localhost:5001](http://localhost:5001)

## Frontend (Next.js)

The frontend application is built using Next.js and is located in the `app/` directory. It includes various components and pages to provide a seamless user experience. The application uses Tailwind CSS for styling and follows best practices for modern web development.

### Key Files and Directories

- `src/`: Contains the source code for the frontend application.
  - `app/`: Contains Next app routes, layouts and pages.
  - `components/`: Contains reusable components
  - `forms/`: Contains form schemas, and actions.
  - `interfaces/`: Contains common interfaces like IUser, IMemory and IMemoryMedia
  - `lib/`: Contains reusable libraries.
  - `store/`: Contain zustand stores for user and memory managment.
- `cypress`: Contains E2E tests and fixtures
- `next.config.ts`: Configuration file for Next.js.
- `tailwind.config.ts`: Configuration file for Tailwind CSS.
- `package.json`: Lists the dependencies and scripts for the frontend application.

### Running the frontend application

1.  Install node version manager (nvm) from [here](https://github.com/nvm-sh/nvm#install--update-script)
2.  Run following commands to setup node version and node modules

        cd app
        nvm install v20.18.0
        nvm use
        npm install

3.  Start development server

        npm run dev

4.  Your server should be running at [http://localhost:3000](http://localhost:3000)

## Recording

https://github.com/user-attachments/assets/2247444a-78ab-43cc-a7f3-0f78f9c924e3
