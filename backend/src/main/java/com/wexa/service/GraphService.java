package com.wexa.service;

import com.wexa.dto.CompanyDto;
import com.wexa.dto.PersonDto;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Record;
import org.neo4j.driver.Session;
import org.neo4j.driver.SessionConfig;
import org.neo4j.driver.Value;
import org.neo4j.driver.Values;
import org.neo4j.driver.types.Entity;
import org.neo4j.driver.types.Node;
import org.neo4j.driver.types.Relationship;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GraphService {

    private final Driver driver;
    private final SessionConfig sessionConfig;

    public GraphService(Driver driver, SessionConfig sessionConfig) {
        this.driver = driver;
        this.sessionConfig = sessionConfig;
    }

    public List<PersonDto> findPeopleBySkill(String skill) {
        String query = "MATCH (p:Person)-[:HAS_SKILL]->(:Skill {name: $skill}) " +
                "OPTIONAL MATCH (p)-[:WORKS_AT]->(c:Company) " +
                "OPTIONAL MATCH (p)-[:HAS_SKILL]->(s2:Skill) " +
                "RETURN p.id AS id, p.name AS name, p.title AS title, c.name AS company, collect(DISTINCT s2.name) AS skills";

        try (Session session = driver.session(sessionConfig)) {
            return session.executeRead(tx -> {
                var result = tx.run(query, Values.parameters("skill", skill));
                List<PersonDto> output = new ArrayList<>();
                while (result.hasNext()) {
                    Record record = result.next();
                    output.add(new PersonDto(
                            record.get("id").asString(),
                            record.get("name").asString(),
                            record.get("title").asString(),
                            record.get("company").isNull() ? null : record.get("company").asString(),
                            record.get("skills").asList(Value::asString)));
                }
                return output;
            });
        }
    }

    public List<Map<String, Object>> findPathBetweenPeople(String fromId, String toId) {
        String query = "MATCH path=(p1:Person {id: $fromId})-[:WORKS_AT|COLLABORATED_WITH|HAS_SKILL*1..4]-(p2:Person {id: $toId}) "
                +
                "RETURN nodes(path) AS nodes, relationships(path) AS rels LIMIT 5";

        try (Session session = driver.session(sessionConfig)) {
            return session.executeRead(tx -> {
                var result = tx.run(query, Values.parameters("fromId", fromId, "toId", toId));
                List<Map<String, Object>> output = new ArrayList<>();
                while (result.hasNext()) {
                    Record record = result.next();
                    output.add(Map.of(
                            "nodes", record.get("nodes").asList(this::serializeEntity),
                            "relationships", record.get("rels").asList(this::serializeEntity)));
                }
                return output;
            });
        }
    }

    public List<CompanyDto> findCompaniesBySkillNetwork(String skill) {
        String query = "MATCH (c:Company)<-[:WORKS_AT]-(p:Person)-[:HAS_SKILL]->(s:Skill {name: $skill}) " +
                "RETURN c.name AS company, collect(DISTINCT p.name) AS people LIMIT 20";

        try (Session session = driver.session(sessionConfig)) {
            return session.executeRead(tx -> {
                var result = tx.run(query, Values.parameters("skill", skill));
                List<CompanyDto> output = new ArrayList<>();
                while (result.hasNext()) {
                    Record record = result.next();
                    output.add(new CompanyDto(
                            record.get("company").asString(),
                            record.get("people").asList(Value::asString)));
                }
                return output;
            });
        }
    }

    private Map<String, Object> serializeEntity(Value value) {
        Entity entity = value.asEntity();
        Map<String, Object> result = new HashMap<>();
        result.put("id", entity.id());
        if (entity instanceof Node node) {
            result.put("type", "node");
            result.put("labels", node.labels());
            result.put("properties", node.asMap());
        } else if (entity instanceof Relationship rel) {
            result.put("type", "relationship");
            result.put("start", rel.startNodeId());
            result.put("end", rel.endNodeId());
            result.put("properties", rel.asMap());
        }
        return result;
    }
}
