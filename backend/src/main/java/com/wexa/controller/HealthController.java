package com.wexa.controller;

import org.neo4j.driver.Driver;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthController {

    private final Driver driver;

    public HealthController(Driver driver) {
        this.driver = driver;
    }

    @GetMapping("/api/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        try {
            driver.verifyConnectivity();
            response.put("status", "healthy");
            response.put("database", "connected");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("status", "unhealthy");
            response.put("database", "disconnected");
            response.put("error", e.getMessage());
            return ResponseEntity.status(503).body(response);
        }
    }
}
