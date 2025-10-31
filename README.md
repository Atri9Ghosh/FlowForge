# FlowForge - Mini Zapier Clone

A full-stack web application built with the MERN stack that allows users to create automated workflows connecting triggers and actions.

![FlowForge Dashboard](https://placehold.co/800x400?text=FlowForge+Dashboard)

## 🌟 Features

- **User Authentication**: Secure login and registration with Clerk
- **Workflow Creation**: Visual interface to create workflows (Trigger → Action)
- **Background Processing**: Job queue management with BullMQ and Redis
- **Real-time Updates**: Live status monitoring with Socket.io
- **Multiple Integrations**: Gmail, GitHub, and Telegram APIs
- **Dashboard**: View all workflows, run history, and statuses
- **Retry Logic**: Automatic retry for failed jobs
- **Failure Tracking**: Detailed logs for debugging
- **Dockerized**: Containerized deployment with Docker Compose

## 🧩 Tech Stack

- **Frontend**: React, React Router, Socket.io Client
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Prisma ORM
- **Job Queue**: BullMQ with Redis
- **Real-Time**: Socket.io
- **Authentication**: Clerk
- **Deployment**: Docker, Docker Compose, GitHub Actions

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Quick Setup

1. **Clone the repository**:
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

### Manual Setup

See [SETUP.md](SETUP.md) for detailed instructions.

## 📁 Project Structure

```
flowforge/
├── backend/
│   ├── controllers/     # Request handlers
│   ├── models/         # Database models (Prisma)
│   ├── queue/          # Job queue implementation
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   ├── server.js       # Main server file
│   └── worker.js       # Background job worker
├── frontend/
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # React context providers
│   │   ├── hooks/      # Custom hooks
│   │   ├── pages/      # Page components
│   │   ├── utils/      # Utility functions
│   │   └── App.js      # Main app component
│   └── .env            # Frontend environment variables
├── redis/              # Redis Docker configuration
├── .github/workflows/  # GitHub Actions
├── docker-compose.yml  # Docker orchestration
├── setup.sh            # Setup script (macOS/Linux)
├── setup.bat           # Setup script (Windows)
├── SETUP.md            # Detailed setup instructions
└── README.md           # This file
```

## 🛠️ API Endpoints

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

## 🎯 Workflow Integrations

### Triggers
- **Gmail**: New email received
- **GitHub**: New issue, New pull request

### Actions
- **Gmail**: Send email
- **GitHub**: Create issue, Comment on issue
- **Telegram**: Send message

## 🐳 Docker Deployment

The application is fully containerized with Docker:

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs
```

## 🔄 GitHub Actions

The project includes CI/CD workflows for:
- Automated testing on push/PR
- Build verification
- Artifact storage

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Clerk](https://clerk.dev) for authentication
- [Prisma](https://prisma.io) for ORM
- [BullMQ](https://docs.bullmq.io) for job queue
- [Socket.io](https://socket.io) for real-time communication