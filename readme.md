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
We have parsed the data from the document JSON to create a new JSON with the keys "section" extracted from the document index and the corresponding section content. This structured approach allows us to store the data more efficiently in the vector database, thereby enhancing the chatbot's performance.

### Find the metrics
Abbiamo scelto una serie di metriche, un LLM si occupa di cercare queste metriche nei documenti di ogni compagnia 

### Limitations and Future Work

As this is a hackathon project developed by a single person, there are several areas for improvement:

- Enhance error handling and input validation
- Implement more sophisticated AI models for financial analysis
- Expand the range of financial metrics and comparisons
- Optimize performance for handling larger volumes of reports
- Implement robust testing, including unit and integration tests