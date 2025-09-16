# Superhero Database

This is the frontend part of the Superhero Database test project, built with React, TypeScript, and Vite. It allows creating, editing, viewing, and deleting superheroes with images.

# Features

- List of superheroes.

- Create superhero with form and image upload.

- Edit superhero with pre-filled form and image management (add/remove).

- View details of a superhero with image carousel.

- Delete superhero.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

## Installation

```js
git clone https://github.com/Andrey9019/superhero-database-test-front.git
cd superhero-database-test-front
```

Install dependencies:

```js
npm install
```

Create .env file:

```js
VITE_API_URL=http://localhost:5001  # or your backend URL
```

## Usage

Run the development server:

```js
npm run dev
```

Open http://localhost:5173 in the browser.

Use the form to add/edit superheroes, view list and details.

## Deployment

Frontend deployed on Vercel: https://superhero-database-test-front.vercel.app

Backend deployed on Render: https://superhero-database-test-back.onrender.com

Note: Render may have cold start delays (30-60s for first request).
