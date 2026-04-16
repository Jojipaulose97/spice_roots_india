# 🌶️ Spice Roots India

A full-stack ecommerce platform for authentic Indian spices, built with a modern monorepo architecture.

## Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose

## Project Structure

```
spice-roots-india/
├── apps/
│   ├── web/          # Next.js frontend
│   └── server/       # Express API server
```

## Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- MongoDB

### Development

```bash
# Install dependencies
npm install

# Start development servers
docker-compose up
```

### Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Features

- 🛒 Product catalog with categories & filters
- 👤 User authentication & accounts
- 🛠️ Admin dashboard with analytics
- 📦 Order management
- 📋 Event management with bulk import

## License

MIT
