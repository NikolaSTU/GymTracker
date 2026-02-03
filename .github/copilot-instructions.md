# Copilot Instructions

## General Guidelines
- First general instruction
- Second general instruction

## Code Style
- Use specific formatting rules
- Follow naming conventions

## Project-Specific Rules
- Keep Response DTOs under `GymTracker/Infrastructure/ResponseDTOs` (not `API/...`) and avoid creating duplicate folders. If a folder already exists, do not create an alternative duplicate path.
- The project targets .NET 9; the React app lives in `Front-End/` and uses Vite with the default development port 5173 for the front end.