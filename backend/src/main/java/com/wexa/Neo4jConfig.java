package com.wexa;

import org.neo4j.driver.AuthTokens;
import org.neo4j.driver.Driver;
import org.neo4j.driver.GraphDatabase;
import org.neo4j.driver.SessionConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Neo4jConfig {

    @Bean
    public Driver neo4jDriver() {
        String uri = System.getenv("COGNODB_URI");
        String user = System.getenv("COGNODB_USER");
        String password = System.getenv("COGNODB_PASSWORD");

        if (uri == null || user == null || password == null) {
            throw new IllegalStateException(
                    "Missing CognoDB connection environment variables: COGNODB_URI, COGNODB_USER, COGNODB_PASSWORD");
        }

        return GraphDatabase.driver(uri, AuthTokens.basic(user, password));
    }

    @Bean
    public SessionConfig defaultSessionConfig() {
        return SessionConfig.builder().withDefaultAccessMode(org.neo4j.driver.AccessMode.READ).build();
    }
}
