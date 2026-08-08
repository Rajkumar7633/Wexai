#!/usr/bin/env bash
set -e

if [ -z "$COGNODB_URI" ] || [ -z "$COGNODB_USER" ] || [ -z "$COGNODB_PASSWORD" ]; then
  echo "Please set COGNODB_URI, COGNODB_USER, and COGNODB_PASSWORD"
  exit 1
fi

cat <<'EOF' > /tmp/load-graph.cypher
CREATE CONSTRAINT unique_person_id IF NOT EXISTS FOR (p:Person) REQUIRE p.id IS UNIQUE;
CREATE CONSTRAINT unique_company_name IF NOT EXISTS FOR (c:Company) REQUIRE c.name IS UNIQUE;
CREATE CONSTRAINT unique_skill_name IF NOT EXISTS FOR (s:Skill) REQUIRE s.name IS UNIQUE;

WITH [
  {id: 'p1', name: 'Aisha Patel', title: 'Product Lead', company: 'NovaTech', skills: ['Product Strategy','AI Ethics','Stakeholder Management']},
  {id: 'p2', name: 'Marcus Lee', title: 'Senior Backend Engineer', company: 'NovaTech', skills: ['Java','Graph Databases','Distributed Systems']},
  {id: 'p3', name: 'Priya Singh', title: 'Data Scientist', company: 'BrightEdge', skills: ['Machine Learning','Graph Analytics','Python']},
  {id: 'p4', name: 'Olivia Ramirez', title: 'Growth Marketing Manager', company: 'BrightEdge', skills: ['Performance Marketing','A/B Testing','Customer Retention']},
  {id: 'p5', name: 'Eric Chen', title: 'Technical Program Manager', company: 'Skyline Labs', skills: ['Program Management','Cross-functional Leadership','AI Strategy']}
] AS persons
UNWIND persons AS person
MERGE (p:Person {id: person.id})
SET p.name = person.name, p.title = person.title
MERGE (c:Company {name: person.company})
MERGE (p)-[:WORKS_AT]->(c)
WITH p, person
UNWIND person.skills AS skillName
MERGE (s:Skill {name: skillName})
MERGE (p)-[:HAS_SKILL]->(s)

MERGE (p1:Person {id: 'p1'})
MERGE (p2:Person {id: 'p2'})
MERGE (p3:Person {id: 'p3'})
MERGE (p4:Person {id: 'p4'})
MERGE (p5:Person {id: 'p5'})
MERGE (p1)-[:COLLABORATED_WITH]->(p2)
MERGE (p2)-[:COLLABORATED_WITH]->(p3)
MERGE (p3)-[:COLLABORATED_WITH]->(p5)
MERGE (p4)-[:COLLABORATED_WITH]->(p5);
EOF

python3 - <<'PY'
from neo4j import GraphDatabase
import os

uri = os.environ['COGNODB_URI']
user = os.environ['COGNODB_USER']
password = os.environ['COGNODB_PASSWORD']

driver = GraphDatabase.driver(uri, auth=(user, password))
with driver.session() as session:
    with open('/tmp/load-graph.cypher', 'r') as f:
        query = f.read()
    session.run(query)
print('Data loaded successfully.')
PY
