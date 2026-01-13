# GameHub

A full-fledged, modern, dark-themed, fully-responsive ecommerce frontend
application.

## Demo

<div align="center">
    <img src="https://github.com/ahmadnourallah/portfolio/blob/main/src/assets/gamehub.webp?raw=true" height="800">
</div>

Check out the live version deployed on Vercel
[here](https://gamehub-lilac.vercel.app/).

## Description

Powered by Typescript and Next.js, GameHub is a frontend ecommerce platform for
creating a game catalgoue. It also comes equipped with a cart system that could
be developed later to add payment functionalities.

The platform offers a sleek dark theme, along with search functionality,
pagination, categories and carousels.

Thanks to the role-based authentication system, users can browse the products
and add them to their cart, and admins can perform all CRUD operations on games
and categories and examine other users' carts.

The dashboard system features an advanced table widget to filter, search and
sort products and categories. It also enables admins to upload files, create
tags, and delete products.

## Features

- :white_check_mark: Built with Nextjs 15’s App Router, Typescript and Tailwind
  CSS.
- :white_check_mark: Role-based authentication with Auth.js.
- :white_check_mark: A dashboard system for CRUD operations with advanced
  tables.
- :white_check_mark: A cart system using the Context API.
- :white_check_mark: Sleek animations and carousels.
- :white_check_mark: Lazy image loading.
- :white_check_mark: Support for file upload.
- :white_check_mark: Instant notification system.

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ahmadnourallah/gamehub
```

2. Install dependencies:

```bash
npm install
```

### Environment Variables

Before deploying the platform, make sure to define the following environment
variables:

- `NEXT_PUBLIC_API`: The URL of the backend system. It must refer to an
  accessible RESTful API with resources defined similar to those in
  [Game Store API](https://github.com/ahmadnourallah/game-store-api).
- `NEXTAUTH_SECRET`: A confidential cryptographic key used to sign and verify
  JWTs for authentication. You can generate a random one using:
  `node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"`.
- `HOSTNAMES`: An array of hostnames you will use to fetch your images.

### Deployment

You can fire up the development server using:

```bash
npm run dev
```

Building the application can be done by running:

```bash
npm run build
```

You can preview the production build through:

```bash
npm run start
```

## Technologies

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=ts,nextjs,tailwind" />
  </a>
</p>

The system is built with the latest technologies:

- TypeScript
- Next.js 15
- Tailwind CSS
- Motion
- TanStack Query
- Mantine Tables
- Embla Carousel
- React Toastify

## License

This project is licensed under the GNU GPLv3 License - see the LICENSE.md file
for details.
