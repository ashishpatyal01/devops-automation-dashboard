# DevOps Automation Dashboard

A small beginner project demonstrating Docker, Docker Compose, health checks, Node.js and GitHub Actions.

## Requirements
- Docker Desktop
- Git
- A GitHub account (only needed for the CI workflow)

## Run locally with Docker
Open PowerShell in this project folder:

```powershell
docker compose up -d --build
docker compose ps
```

Open http://localhost:5000

## Useful commands

```powershell
docker compose logs -f dashboard
docker compose restart dashboard
docker compose stop
docker compose down
docker compose up -d --build
```

`docker compose down` does not delete named volumes. This project currently does not use a database or named volumes.

## API endpoints
- `GET /api/health` - health-check endpoint
- `GET /api/status` - runtime and memory information
- `GET /api/pipeline` - learning pipeline stages

## GitHub Actions
1. Create a GitHub repository.
2. Push this project to the repository's `main` branch.
3. Open the **Actions** tab.
4. The workflow installs dependencies, runs tests, and builds a Docker image.

## Learning note
The dashboard monitors the Node.js process running inside its container. It does not control or stop arbitrary Docker containers. Use Docker Compose commands in PowerShell to manage this project.
