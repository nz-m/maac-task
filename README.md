# MAAC_TASK Blog Application using NestJS

A simple blog application built with **NestJS** that supports user registration, authentication, and CRUD operations on blog posts.

## Features

- User registration and authentication (JWT)
- CRUD operations on blogs
- User-specific blogs (only the creator can update or delete their blogs)

## Requirements

- **Node.js** and **npm** installed
- **Database** (MySQL)

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/nz-m/maac-task.git
    cd maac-task
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file from the example:

    ```bash
    cp .env.example .env
    ```

4. Set your environment variables in the `.env` file (e.g., database connection, JWT secret).

## Running the App

1. Start the application:

    ```bash
    npm run start
    ```

2. Or run in development mode (auto-reload on file changes):

    ```bash
    npm run start:dev
    ```

