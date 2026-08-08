# Quick Setup Guide

This guide will help you get the Professional Network Explorer running in under 10 minutes.

## Prerequisites

- Java 21 or higher
- Node.js 18 or higher
- Python 3.9 or higher (for data loading script)
- Maven 3.6 or higher
- A CognoDB Cloud account (free tier available)

## Step 1: Create CognoDB Database (2 minutes)

1. Sign up at [https://console.cognodb.com/signup](https://console.cognodb.com/signup)
2. Create a free `c0` instance (no credit card required)
3. Select a region closest to you
4. Copy the connection details:
   - **Connection URI**: `bolt+s://<instance-id>.databases.cognodb.com`
   - **Username**: `cognodb`
   - **Password**: (shown only once - copy it immediately!)

## Step 2: Clone and Configure (2 minutes)

```bash
# Clone the repository
git clone https://github.com/Rajkumar7633/Wexai.git
cd Wexai

# Copy environment template
cp .env.example .env

# Edit .env with your CognoDB credentials
# Replace the placeholder values with your actual credentials
```

Edit `.env` file:
```env
COGNODB_URI=bolt+s://your-instance-id.databases.cognodb.com
COGNODB_USER=cognodb
COGNODB_PASSWORD=your-generated-password
BACKEND_URL=http://localhost:8080
```

## Step 3: Load Seed Data (1 minute)

```bash
cd data
./load-data.sh
```

This will create:
- 5 professionals with roles and companies
- 3 companies
- 15 skills
- All relationships between them

## Step 4: Start Backend (2 minutes)

```bash
cd ../backend
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

Verify it's running:
```bash
curl http://localhost:8080/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "database": "connected"
}
```

## Step 5: Start Frontend (2 minutes)

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

## Step 6: Access the Application

Open your browser and navigate to: `http://localhost:3000`

## Troubleshooting

### Backend Issues

**Problem**: "Missing CognoDB connection environment variables"
**Solution**: Ensure you created `.env` file with correct credentials

**Problem**: "Database unavailable"
**Solution**: 
- Check your CognoDB instance is running
- Verify your credentials are correct
- Check network connectivity

### Frontend Issues

**Problem**: "Unable to connect to backend"
**Solution**: 
- Ensure backend is running on port 8080
- Check `.env.local` has correct `BACKEND_URL`

**Problem**: Module not found errors
**Solution**: Run `npm install` in frontend directory

### Data Loading Issues

**Problem**: "No module named 'neo4j'"
**Solution**: Install Python driver:
```bash
pip3 install neo4j
```

**Problem**: Cypher syntax error
**Solution**: Ensure you're using the latest load-data.sh script

## Testing the Application

### Test 1: Health Check
```bash
curl http://localhost:8080/api/health
```

### Test 2: Skill Search
```bash
curl "http://localhost:8080/api/people-by-skill?skill=Graph%20Databases"
```

### Test 3: Company Network
```bash
curl "http://localhost:8080/api/company-skill-network?skill=AI%20Strategy"
```

### Test 4: Path Finding
```bash
curl "http://localhost:8080/api/path-between-people?fromId=p1&toId=p5"
```

## Available Data

### Person IDs
- `p1`: Aisha Patel - Product Lead at NovaTech
- `p2`: Marcus Lee - Senior Backend Engineer at NovaTech
- `p3`: Priya Singh - Data Scientist at BrightEdge
- `p4`: Olivia Ramirez - Growth Marketing Manager at BrightEdge
- `p5`: Eric Chen - Technical Program Manager at Skyline Labs

### Sample Skills to Search
- "Graph Databases"
- "Java"
- "Machine Learning"
- "AI Strategy"
- "Product Strategy"

### Companies
- NovaTech
- BrightEdge
- Skyline Labs

## Next Steps

Once everything is running:

1. Try the **Skill Search** page to find professionals by skill
2. Explore the **Company Network** to see talent distribution
3. Use the **Path Finder** to discover collaboration connections
4. Check the main README for detailed documentation

## Getting Help

If you encounter issues:

1. Check the main [README.md](README.md) for detailed documentation
2. Review the [DATA_MODEL.md](DATA_MODEL.md) for graph schema
3. Check the backend [README.md](backend/README.md) for API details
4. Check the frontend [README.md](frontend/README.md) for UI details

## Security Notes

- Never commit `.env` file to git
- Never share your CognoDB password
- Use different credentials for production
- Keep your dependencies updated
