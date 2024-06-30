## Backend

The backend of this application handles the core functionality of reading financial reports using AI and provides endpoints for the frontend to consume. It's responsible for processing annual reports, extracting key metrics, and facilitating cross-sector comparisons.

### Key Features

- AI-powered parsing of annual reports
- Extraction of key financial metrics
- API endpoints for frontend data consumption
- Cross-sector comparison analytics

### Technology Stack

- Python
- FastAPI
- Docker
- GPT-4o for natural language processing
- Pinecone

### Running the Application

To run the entire application (both frontend and backend), follow these steps:

1. Ensure you have Docker and Docker Compose installed on your system.
2. Clone the repository
3. Build and start the Docker containers:
   `docker-compose build`
   `docker-compose up`
4. The backend API will be available at `http://localhost:8000` (or the port specified in your configuration)

### API Documentation

Once the backend is running, you can access the API documentation at `http://localhost:8000/docs`. This Swagger UI provides details on all available endpoints and allows for easy testing.

### Environment Variables

Make sure to set up the necessary environment variables before running the application.
You can set these in a `.env` file in backend and frontend directories.

## How the app works

### Parsing Data
We have designed a process to extract specific metrics from company documents using GPT-4o. The extracted metrics are then organized and stored in a JSON file in order to efficiently store information and don't overuse tokens to extract the same data.

### Find the metrics
We have selected a set of metrics. GPT-4o is responsible for extracting these metrics from the documents of each company and saving them in a JSON file.

### Bot
In addition to the LLM for extracting metrics, there are two other agents: one specialized in extracting information from companies individually and second is specialized in comparing two different companies with the information gathered by the first agent.
