# Contributing to Professional Network Explorer

Thank you for your interest in contributing to this project! This document provides guidelines for contributing.

## Development Setup

### Prerequisites
- Java 21+
- Node.js 18+
- Python 3.9+
- Maven 3.6+
- CognoDB Cloud account

### Setup Steps

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/Wexai.git
   cd Wexai
   ```

3. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. Set up environment:
   ```bash
   cp .env.example .env
   # Edit .env with your CognoDB credentials
   ```

5. Load seed data:
   ```bash
   cd data
   ./load-data.sh
   ```

6. Start backend:
   ```bash
   cd ../backend
   mvn spring-boot:run
   ```

7. Start frontend (in new terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Code Structure

### Backend (`backend/`)
- `src/main/java/com/wexa/`
  - `config/` - Configuration classes (CORS, etc.)
  - `controller/` - REST API endpoints
  - `dto/` - Data transfer objects
  - `exception/` - Global exception handling
  - `service/` - Business logic and Cypher queries

### Frontend (`frontend/`)
- `components/` - Reusable React components
- `pages/` - Next.js pages (file-based routing)
- `pages/api/` - API routes (if needed)

## Development Guidelines

### Backend
- Follow Java naming conventions
- Use parameterized Cypher queries
- Add appropriate error handling
- Update documentation for API changes

### Frontend
- Follow React best practices
- Use functional components with hooks
- Handle loading and error states
- Ensure responsive design

### Graph Database
- Use meaningful node labels
- Use descriptive relationship types
- Optimize queries with proper indexes
- Test multi-hop traversals

## Testing

### Manual Testing Checklist
- [ ] Health check endpoint returns healthy status
- [ ] Skill search returns correct results
- [ ] Company network query works
- [ ] Path finding finds valid paths
- [ ] UI handles loading states
- [ ] UI handles error states
- [ ] UI handles empty states

### API Testing
```bash
# Health check
curl http://localhost:8080/api/health

# Skill search
curl "http://localhost:8080/api/people-by-skill?skill=Graph%20Databases"

# Company network
curl "http://localhost:8080/api/company-skill-network?skill=AI%20Strategy"

# Path finding
curl "http://localhost:8080/api/path-between-people?fromId=p1&toId=p5"
```

## Commit Guidelines

### Commit Message Format
```
type(scope): subject

body

footer
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```
feat(frontend): add dark mode toggle
fix(backend): handle null company in person query
docs(readme): update setup instructions
```

## Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass
3. Update CHANGELOG.md if applicable
4. Submit pull request with:
   - Clear description of changes
   - Screenshots for UI changes
   - Testing performed
   - Related issues

## Code Review Guidelines

### What Reviewers Look For
- Code follows project structure
- Proper error handling
- Security best practices
- Performance considerations
- Documentation updates
- Testing coverage

### What Contributors Should Expect
- Constructive feedback
- Suggestions for improvements
- Questions about implementation
- Approval process may take time

## Issue Reporting

### Bug Reports
Include:
- Environment details (OS, Java version, etc.)
- Steps to reproduce
- Expected vs actual behavior
- Error messages/stack traces
- Screenshots if applicable

### Feature Requests
Include:
- Clear description of the feature
- Use case/benefit
- Potential implementation approach
- Alternative solutions considered

## Questions or Issues?

For questions about this project:
- Open an issue on GitHub
- Check existing documentation
- Review similar issues/PRs

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
