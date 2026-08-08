# Backend - Spring Boot REST API

Spring Boot application providing REST API endpoints for the Professional Network Explorer, backed by CognoDB graph database.

## Technology Stack

- **Java 21** - Modern Java with records, pattern matching, and enhanced switch expressions
- **Spring Boot 3.2.8** - Application framework with auto-configuration
- **Neo4j Java Driver 5.16.0** - Official Bolt protocol driver for Neo4j/CognoDB
- **Maven** - Build automation and dependency management

## Project Structure

```
src/main/java/com/wexa/
├── config/
│   └── CorsConfig.java              # CORS configuration for frontend access
├── controller/
│   ├── GraphController.java         # Main API endpoints
│   └── HealthController.java        # Health check endpoint
├── dto/
│   ├── PersonDto.java               # Person data transfer object
│   └── CompanyDto.java              # Company data transfer object
├── exception/
│   └── GlobalExceptionHandler.java  # Centralized error handling
├── service/
│   └── GraphService.java            # Business logic & Cypher queries
├── GraphAppApplication.java         # Spring Boot main class
└── Neo4jConfig.java                  # Database connection configuration
```

## Configuration

### Environment Variables

The application requires the following environment variables:

- `COGNODB_URI` - Bolt protocol URI (e.g., `bolt+s://instance.databases.cognodb.cloud`)
- `COGNODB_USER` - Database username (typically `cognodb`)
- `COGNODB_PASSWORD` - Database password

### Application Properties

`src/main/resources/application.properties`:
```properties
server.port=8080
spring.main.banner-mode=off
server.error.include-message=always
server.error.include-binding-errors=always
server.error.include-stacktrace=on_param
server.error.include-exception=false
```

## API Endpoints

### Health Check
**GET** `/api/health`

Returns the health status of the application and database connectivity.

**Response:**
```json
{
  "status": "healthy",
  "database": "connected"
}
```

### Find People by Skill
**GET** `/api/people-by-skill?skill={skillName}`

Finds all professionals who possess a specific skill.

**Parameters:**
- `skill` (string, required): Name of the skill to search for

**Response:**
```json
[
  {
    "id": "p1",
    "name": "Aisha Patel",
    "title": "Product Lead",
    "company": "NovaTech",
    "skills": ["Product Strategy", "AI Ethics", "Stakeholder Management"]
  }
]
```

### Company Skill Network
**GET** `/api/company-skill-network?skill={skillName}`

Finds companies that have professionals with a specific skill.

**Parameters:**
- `skill` (string, required): Name of the skill

**Response:**
```json
[
  {
    "name": "NovaTech",
    "people": ["Marcus Lee", "Aisha Patel"]
  }
]
```

### Find Path Between People
**GET** `/api/path-between-people?fromId={personId}&toId={personId}`

Discovers collaboration paths between two professionals.

**Parameters:**
- `fromId` (string, required): Starting person ID
- `toId` (string, required): Target person ID

**Response:**
```json
[
  {
    "nodes": [
      {
        "id": 0,
        "type": "node",
        "labels": ["Person"],
        "properties": {"id": "p1", "name": "Aisha Patel", "title": "Product Lead"}
      }
    ],
    "relationships": [
      {
        "id": 0,
        "type": "COLLABORATED_WITH",
        "start": 0,
        "end": 1,
        "properties": {}
      }
    ]
  }
]
```

## Error Handling

The application uses global exception handling to return consistent error responses:

### Configuration Error (503 Service Unavailable)
```json
{
  "error": "Configuration error",
  "message": "Missing CognoDB connection environment variables..."
}
```

### Database Unavailable (503 Service Unavailable)
```json
{
  "error": "Database unavailable",
  "message": "Unable to connect to the graph database..."
}
```

### General Error (500 Internal Server Error)
```json
{
  "error": "Internal server error",
  "message": "Error details..."
}
```

## Running the Application

### Prerequisites
- Java 21 or higher
- Maven 3.6 or higher
- CognoDB instance with connection details

### Development Mode
```bash
./mvnw spring-boot:run
```

### Production Build
```bash
./mvnw clean package
java -jar target/wexa-graph-backend-0.0.1-SNAPSHOT.jar
```

### With Environment Variables
```bash
export COGNODB_URI=bolt+s://your-instance.databases.cognodb.cloud
export COGNODB_USER=cognodb
export COGNODB_PASSWORD=your-password
./mvnw spring-boot:run
```

## Cypher Query Examples

### Multi-hop Traversal
The path finding query demonstrates the power of graph databases:

```cypher
MATCH path=(p1:Person {id: $fromId})-[:WORKS_AT|COLLABORATED_WITH|HAS_SKILL*1..4]-(p2:Person {id: $toId})
RETURN nodes(path) AS nodes, relationships(path) AS rels
LIMIT 5
```

This single query:
- Traverses multiple relationship types
- Supports variable path lengths (1-4 hops)
- Returns both nodes and relationships
- Limits results for performance

### Optional Relationships
The skill search query uses optional matches:

```cypher
MATCH (p:Person)-[:HAS_SKILL]->(:Skill {name: $skill})
OPTIONAL MATCH (p)-[:WORKS_AT]->(c:Company)
OPTIONAL MATCH (p)-[:HAS_SKILL]->(s2:Skill)
RETURN p.id, p.name, p.title, c.name, collect(DISTINCT s2.name) AS skills
```

This ensures results even if a person has no company or additional skills.

## Security

- All Cypher queries use parameterized statements to prevent injection
- Credentials are read from environment variables, never hardcoded
- CORS is configured to allow frontend access
- Error messages don't expose sensitive database information

## Testing

### Manual Testing with curl
```bash
# Health check
curl http://localhost:8080/api/health

# Find people by skill
curl "http://localhost:8080/api/people-by-skill?skill=Graph%20Databases"

# Company network
curl "http://localhost:8080/api/company-skill-network?skill=AI%20Strategy"

# Find path
curl "http://localhost:8080/api/path-between-people?fromId=p1&toId=p5"
```

## Deployment

### Environment Setup
Ensure the following environment variables are set in your deployment environment:
- `COGNODB_URI`
- `COGNODB_USER`
- `COGNODB_PASSWORD`

### Recommended Platforms
- **Heroku**: Create a `Procfile` with `web: java -jar target/wexa-graph-backend-0.0.1-SNAPSHOT.jar`
- **AWS Elastic Beanstalk**: Use the Java platform
- **Google Cloud Platform**: Use App Engine standard or flexible environment
- **DigitalOcean**: Use App Platform with Docker

### Docker Deployment
Create a `Dockerfile`:
```dockerfile
FROM eclipse-temurin:21-jdk-alpine
COPY target/wexa-graph-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
```

Build and run:
```bash
docker build -t wexa-backend .
docker run -p 8080:8080 -e COGNODB_URI=$COGNODB_URI -e COGNODB_USER=$COGNODB_USER -e COGNODB_PASSWORD=$COGNODB_PASSWORD wexa-backend
```

## Troubleshooting

### Connection Issues
- Verify CognoDB instance is running
- Check firewall rules allow Bolt protocol (port 7687)
- Ensure credentials are correct

### Memory Issues
- Increase JVM heap size: `java -Xmx512m -jar ...`
- Adjust connection pool size in Neo4jConfig

### Slow Queries
- Check query execution plan in CognoDB console
- Add indexes for frequently queried properties
- Use `LIMIT` to restrict result sets
