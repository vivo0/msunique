# Microsoft / Unique Challenge - AI Innovation in Finance

# Hacking the Metrics: Decoding Annual Report Dynamics and Cross-Sector Comparison

Case Introduction:

Problem: Business analysts struggle to extract meaningful insights from extensive annual reports, making sector-wide comparison and trend analysis a cumbersome process.

This challenge is not just a showcase of technical prowess but a crucible for innovative solutions that can reshape how financial analysis is done. We aim to foster ideas that could be integrated into our product roadmap, revolutionizing the way our customers engage with our tools and services. The goal is to create a tool that not only serves UNIQUE AG but also has the potential to be adopted by Microsoft's broader partner and customer base, thereby enhancing the financial analysis ecosystem.
Our product team is eager to discover new ideas and innovative contributions that could influence our strategic thinking and product development. We look forward to seeing how these insights can shape the future of our offerings and enhance the way customers interact with our technology.

Users of the solution:

- Business analysts and investors seeking comprehensive, comparative insights into company performance for informed decision-making.

## Expected outcome:

Expected Solution:

- A tool that simplifies the extraction and comparison of key data from annual reports, enabling efficient trend analysis and KPI benchmarking across different companies and sectors.

Participants are expected to present their solutions in a dynamic and engaging format that provides a comprehensive overview of the problem, the proposed solution, and its potential impact. Key elements of the presentation should include:

- High-Level Overview: Clearly articulate the problem being addressed and the innovative approach taken in your solution.
- Live Demo: We strongly encourage showcasing a live demo of your prototype to demonstrate its user interface and key functionalities in action. A live demonstration is much more impactful than walking through code, and it vividly illustrates the practical application
  and effectiveness of your solution.
- Solution's Impact: Discuss how your tool facilitates the extraction and comparison of data from annual reports, its efficiency improvements, and the advantage it offers in market overview and analysis.

## The Pitch:

[Watch the Pitch Video on Loom](https://www.loom.com/share/3919271c5cc14ef5a1d91dbf8b023887?sid=0acefc58-d3b6-4931-8ab7-784b12a1eaab)

## Deep Dive Slides:

[Slides](https://github.com/swisshacks/msunique/blob/main/Hackathon%202024_Deep%20Dive%20Presentation.pdf)

## Further Information:

gpt-4o is deployed in six regions guaranteeing high consumption throughput. Additionally, there will be a Discord channel for our teams where we can exchange ideas, ask questions, or report issues. We will try to answer all questions during the hackathon. [Join the Discord channel](https://discord.gg/8JKBvhU7).

## Resources:

The primary technology stack for this challenge is based on Azure compute and services provided by Microsoft, including access to GPT-4o for data analysis and interpretation. While these Microsoft technologies form the backbone of the challenge's tech infrastructure, participants are encouraged to integrate other technologies and tools as they see fit to enhance their solutions.

## Judging Criteria:

- Creativity (20%): Originality of the solution and innovative use of technology.
- Visual Design (20%): User interface and experience design quality.
- Feasibility (20%): Practicality of implementing the proposed solution.
- Impact (20%): Potential to transform business analysis practices.
- Technical Implementation (20%): Effectiveness in using the provided technologies.

## Point of Contact:

- Pascal Hauri PhD, Data Scientist, Unique AG [linkedIn](https://www.linkedin.com/in/pascalhauri/)
- Fabian Schläpfer PhD, Data Scientist, Unique AG

## Price:

The winning team will be granted an exclusive opportunity to present their prototype in front of the C-level executives at Unique AG, providing a unique platform to showcase their innovation and potential impact on the industry. Following the presentation, a networking apéro will be organized, offering a valuable chance for the team to engage in discussions, receive feedback, and connect personally with the company's top leadership in a relaxed and informal setting. This experience not only highlights the recognition of the team's hard work but also opens doors for future opportunities and collaborations.

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
- GPT-4 for natural language processing

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
You can set these in a `.env` file in the root directory of the project.

### Limitations and Future Work

As this is a hackathon project developed by a single person, there are several areas for improvement:

- Enhance error handling and input validation
- Implement more sophisticated AI models for financial analysis
- Expand the range of financial metrics and comparisons
- Optimize performance for handling larger volumes of reports
- Implement robust testing, including unit and integration tests
