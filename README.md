# WEXA AI Graph App - Professional Network Explorer

A full-stack graph database application built with Spring Boot, Next.js, and CognoDB (Neo4j-compatible Bolt graph database) for exploring professional networks, skills, and company connections.

## 🎯 Use Case

**Professional Network Explorer** - A knowledge network for professionals and companies that enables users to:
- Find professionals by specific skills
- Discover companies connected through shared talent
- Explore collaboration paths between professionals
- Visualize career networks and relationships

## 🧠 Why a Graph Database?

Graph databases excel when relationships and multi-hop connections are the primary focus of your application. This use case is ideal for graph databases because:

1. **Natural Relationship Modeling**: Professional networks are inherently relational - people work at companies, have skills, and collaborate with each other. These relationships are first-class citizens in a graph database.

2. **Multi-hop Traversals**: Finding collaboration paths between professionals requires traversing multiple relationship types (WORKS_AT, COLLABORATED_WITH, HAS_SKILL) across varying depths. In a relational database, this would require complex recursive queries or multiple JOINs.

3. **Performance**: Graph queries like "find the shortest path between two people" execute in O(1) time complexity for the traversal, whereas relational databases require O(n) table scans.

4. **Flexible Schema**: As professionals gain new skills or change companies, the graph structure accommodates these changes without schema migrations.

**Relational Database Challenges:**
- Finding paths between entities requires recursive CTEs or multiple self-joins
- Many-to-many relationships (person ↔ skill) require junction tables
- Complex queries become unreadable and slow as the network grows
- Adding new relationship types requires schema changes

## 📊 Data Model

### Graph Schema

```
┌─────────────┐       WORKS_AT       ┌─────────────┐
│   Person    │◄─────────────────────│  Company    │
│             │                      │             │
│ - id        │                      │ - name      │
│ - name      │                      │             │
│ - title     │                      └─────────────┘
└─────────────┘
       │
       │ HAS_SKILL
       │
       ▼
┌─────────────┐
│   Skill     │
│             │
│ - name      │
└─────────────┘

┌─────────────┐ COLLABORATED_WITH ┌─────────────┐
│   Person    │◄─────────────────►│   Person    │
└─────────────┘                    └─────────────┘
```

### Node Types
- **Person**: Professional with ID, name, and job title
- **Company**: Organization where people work
- **Skill**: Technical or professional capability

### Relationship Types
- **WORKS_AT**: Person → Company (current employment)
- **HAS_SKILL**: Person → Skill (person possesses this skill)
- **COLLABORATED_WITH**: Person ↔ Person (bidirectional collaboration)

## 🏗️ Project Structure

```
wexa-graph-app/
├── backend/                    # Spring Boot REST API
│   ├── src/main/java/com/wexa/
│   │   ├── config/            # CORS configuration
│   │   ├── controller/        # REST endpoints
│   │   ├── dto/               # Data transfer objects
│   │   ├── exception/         # Global error handling
│   │   ├── service/           # Business logic & Cypher queries
│   │   ├── GraphAppApplication.java
│   │   └── Neo4jConfig.java   # Database connection
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/                   # Next.js React application
│   ├── components/            # Reusable UI components
│   │   └── Layout.js          # Shared layout with navigation
│   ├── pages/                 # Next.js pages
│   │   ├── api/               # API routes (proxy)
│   │   ├── index.js           # Home page
│   │   ├── skill.js           # Search by skill page
│   │   ├── company.js         # Company network page
│   │   └── path.js            # Path finder page
│   ├── .env.local.example
│   ├── next.config.js
│   └── package.json
├── data/                       # Seed data
│   └── load-data.sh           # Cypher script to populate graph
├── .env.example               # Environment variables template
└── README.md
```

## 🚀 Setup Instructions

### 1. Create CognoDB Cloud Instance

1. Sign up at [https://console.cognodb.com/signup](https://console.cognodb.com/signup)
2. Create a free `c0` instance (no credit card required)
3. Select a region closest to you
4. Copy the connection URI (format: `bolt+s://<instance-id>.databases.cognodb.cloud`)
5. Copy the generated password for user `cognodb` (shown only once!)

### 2. Configure Environment Variables

Copy the example environment file and add your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your CognoDB credentials:
```env
COGNODB_URI=bolt+s://your-instance-id.databases.cognodb.cloud
COGNODB_USER=cognodb
COGNODB_PASSWORD=your-generated-password
BACKEND_URL=http://localhost:8080
```

For the frontend, create:
```bash
cp frontend/.env.local.example frontend/.env.local
```

### 3. Load Seed Data

The seed data creates a sample professional network with 5 people, 3 companies, and various skills.

```bash
cd data
./load-data.sh
```

This script:
- Creates unique constraints for efficient lookups
- Inserts 5 professionals with their roles and companies
- Associates each professional with multiple skills
- Creates collaboration relationships between professionals

### 4. Start the Backend

```bash
cd backend
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

Verify health:
```bash
curl http://localhost:8080/api/health
```

### 5. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

## 🔍 Main Cypher Queries

### 1. Find People by Skill
**Endpoint**: `GET /api/people-by-skill?skill=Graph Databases`

**Cypher Query**:
```cypher
MATCH (p:Person)-[:HAS_SKILL]->(:Skill {name: $skill})
OPTIONAL MATCH (p)-[:WORKS_AT]->(c:Company)
OPTIONAL MATCH (p)-[:HAS_SKILL]->(s2:Skill)
RETURN p.id AS id, p.name AS name, p.title AS title, 
       c.name AS company, 
       collect(DISTINCT s2.name) AS skills
```

**Why Graph?**: Single traversal from skill to people with optional joins to company and all skills. In SQL, this would require 3+ JOINs.

### 2. Company Skill Network
**Endpoint**: `GET /api/company-skill-network?skill=AI Strategy`

**Cypher Query**:
```cypher
MATCH (c:Company)<-[:WORKS_AT]-(p:Person)-[:HAS_SKILL]->(s:Skill {name: $skill})
RETURN c.name AS company, collect(DISTINCT p.name) AS people
LIMIT 20
```

**Why Graph?**: Traverses from skill → people → companies in one query. Relational would require self-joins on junction tables.

### 3. Find Collaboration Path (Multi-hop)
**Endpoint**: `GET /api/path-between-people?fromId=p1&toId=p5`

**Cypher Query**:
```cypher
MATCH path=(p1:Person {id: $fromId})-[:WORKS_AT|COLLABORATED_WITH|HAS_SKILL*1..4]-(p2:Person {id: $toId})
RETURN nodes(path) AS nodes, relationships(path) AS rels
LIMIT 5
```

**Why Graph?**: Variable-length path traversal across multiple relationship types. This is extremely difficult in SQL - would require recursive CTEs and is very slow.

## 🎨 Features

### Frontend Features
- **Modern UI**: Clean, responsive design with Tailwind-inspired styling
- **Shared Layout**: Consistent navigation across all pages
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Graceful error messages with user-friendly text
- **Empty States**: Helpful messages when no results are found
- **Path Visualization**: Visual representation of collaboration paths
- **Responsive Design**: Works on desktop and mobile devices

### Backend Features
- **RESTful API**: Clean, well-documented endpoints
- **CORS Support**: Frontend can communicate with backend
- **Health Check**: `/api/health` endpoint for monitoring
- **Global Exception Handling**: Consistent error responses
- **Parameterized Queries**: Protection against Cypher injection
- **Type Safety**: Strongly typed DTOs for all responses
- **Graceful Degradation**: Handles database unavailability

## 📦 Technology Stack

### Backend
- **Java 21** - Modern Java with enhanced features
- **Spring Boot 3.2.8** - Enterprise-grade application framework
- **Neo4j Java Driver 5.16.0** - Official driver for Bolt protocol
- **Maven** - Dependency management and build tool

### Frontend
- **Next.js 14.2.5** - React framework with SSR support
- **React 18.3.1** - UI library
- **JavaScript (ES6+)** - Modern JavaScript features

### Database
- **CognoDB Cloud** - Managed graph database (Neo4j-compatible)
- **Bolt Protocol 5.0-5.4** - Binary protocol for efficient communication
- **openCypher** - Graph query language

## 🧪 Testing the Application

### Manual Testing Steps

1. **Test Health Check**
   ```bash
   curl http://localhost:8080/api/health
   ```
   Expected: `{"status":"healthy","database":"connected"}`

2. **Test Skill Search**
   - Navigate to `http://localhost:3000/skill`
   - Enter "Graph Databases" and search
   - Verify professionals are displayed with their skills

3. **Test Company Network**
   - Navigate to `http://localhost:3000/company`
   - Enter "AI Strategy" and search
   - Verify companies and their professionals are shown

4. **Test Path Finding**
   - Navigate to `http://localhost:3000/path`
   - Enter from ID: `p1`, to ID: `p5`
   - Verify collaboration paths are displayed

## 📸 Screenshots

### Home Page
The landing page provides clear navigation to all three main features with visual cards and descriptions.

### Skill Search Page
Users can search for professionals by skill name. Results show each person's name, title, company, and all their skills as tags.

### Company Network Page
Discover companies that have professionals with specific skills. Each company card shows the organization name and all relevant professionals.

### Path Finder Page
Find collaboration paths between two professionals using their IDs. The page visualizes the path with a graphical representation and provides raw data for inspection.

## 🔐 Security Considerations

- Credentials are stored in environment variables, never committed to git
- Parameterized Cypher queries prevent injection attacks
- CORS is configured to allow frontend communication
- Error messages don't expose sensitive database information

## 🚀 Deployment

### Backend Deployment
The backend can be deployed to any platform that supports Java:
- Heroku (with Procfile)
- AWS Elastic Beanstalk
- Google Cloud Platform
- DigitalOcean App Platform

Environment variables must be set in the deployment platform.

### Frontend Deployment
The frontend can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any static hosting service

Set `BACKEND_URL` environment variable to point to the deployed backend.

## 📝 License

This project was created as a take-home assignment for Wexa AI.

## 🤝 Contributing

This is a demonstration project for the Wexa AI assignment. For questions or feedback, please contact hr@wexa.ai.
