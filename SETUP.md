# FlowForge Setup Instructions

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Quick Setup

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd flowforge
   ```

2. **Run the setup script**:
   - On macOS/Linux: `./setup.sh`
   - On Windows: `setup.bat`

3. **Configure environment variables**:
   - Update `backend/.env` with your API keys
   - Update `frontend/.env` with your Clerk publishable key

## Manual Setup

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with the following variables:
```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/flowforge?schema=public"

# Server
PORT=5000
FRONTEND_URL=http://localhost:3000

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here

# Redis
REDIS_URL=redis://localhost:6379

# Integration API Keys
GMAIL_API_KEY=your_gmail_api_key_here
GITHUB_TOKEN=your_github_token_here
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

### 3. Database Setup

Initialize the database with Prisma:
```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Running the Application

#### Using Docker Compose (Recommended)

```bash
docker-compose up -d
```

This will start all services:
- PostgreSQL database on port 5432
- Redis on port 6379
- Backend API on port 5000
- Frontend on port 3000

#### Running Services Individually

1. **Start the database and Redis**:
   ```bash
   docker-compose up -d postgres redis
   ```

2. **Start the backend**:
   ```bash
   cd backend
   npm run dev
   ```

3. **Start the worker** (in a separate terminal):
   ```bash
   cd backend
   npm run dev-worker
   ```

4. **Start the frontend** (in a separate terminal):
   ```bash
   cd frontend
   npm start
   ```

## Accessing the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## Stopping the Application

If you're using Docker Compose:
```bash
docker-compose down
```

## API Endpoints

### Authentication
- `POST /api/users` - Create user
- `GET /api/users/profile` - Get user profile

### Workflows
- `GET /api/workflows` - Get all workflows
- `GET /api/workflows/:id` - Get a specific workflow
- `POST /api/workflows` - Create a new workflow
- `PUT /api/workflows/:id` - Update a workflow
- `DELETE /api/workflows/:id` - Delete a workflow
- `PATCH /api/workflows/:id/toggle` - Toggle workflow active status

## Project Structure

```
flowforge/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── queue/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   └── worker.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.js
│   └── .env
├── redis/
├── docker-compose.yml
└── README.md
```