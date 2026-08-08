# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project structure with Spring Boot backend and Next.js frontend
- Graph data model with Person, Company, and Skill nodes
- Multi-hop Cypher query support for path finding
- REST API endpoints for skill search, company network, and path finding
- Modern UI with loading states, error handling, and empty states
- Shared Layout component with navigation
- Comprehensive documentation (README, DATA_MODEL, SETUP guides)
- Environment configuration templates
- Seed data loading script for CognoDB
- Health check endpoint for monitoring
- CORS configuration for frontend-backend communication
- Global exception handling
- MIT License

### Backend Features
- Spring Boot 3.2.8 with Java 21
- Neo4j Java Driver 5.16.0 for Cog connectivity
- Parameterized Cypher queries for security
- Type-safe DTOs (PersonDto, CompanyDto)
- Graceful error handling for database unavailability

### Frontend Features
- Next.js 14.2.18 with React 18.3.1
- Responsive design with modern styling
- Three main pages: Skill Search, Company Network, Path Finder
- API proxy via Next.js rewrites
- Environment-based configuration

### Documentation
- Main README with comprehensive setup instructions
- Data model documentation with Mermaid diagrams
- Backend-specific README with API details
- Frontend-specific README with UI details
- Quick setup guide for fast installation
- Contributing guidelines
- MIT License

## [0.1.0] - 2026-08-09

### Initial Release
- Complete graph database application for professional network exploration
- Fully functional backend and frontend
- Seed data with 5 professionals, 3 companies, 15 skills
- Multi-hop path finding between professionals
- Company skill network analysis
- Professional skill search
