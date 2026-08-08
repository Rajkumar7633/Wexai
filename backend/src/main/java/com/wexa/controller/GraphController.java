package com.wexa.controller;

import com.wexa.dto.CompanyDto;
import com.wexa.dto.PersonDto;
import com.wexa.service.GraphService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class GraphController {

    private final GraphService graphService;

    public GraphController(GraphService graphService) {
        this.graphService = graphService;
    }

    @GetMapping("/api/people-by-skill")
    public ResponseEntity<List<PersonDto>> peopleBySkill(@RequestParam String skill) {
        return ResponseEntity.ok(graphService.findPeopleBySkill(skill));
    }

    @GetMapping("/api/company-skill-network")
    public ResponseEntity<List<CompanyDto>> companySkillNetwork(@RequestParam String skill) {
        return ResponseEntity.ok(graphService.findCompaniesBySkillNetwork(skill));
    }

    @GetMapping("/api/path-between-people")
    public ResponseEntity<List<Map<String, Object>>> pathBetweenPeople(@RequestParam String fromId,
            @RequestParam String toId) {
        return ResponseEntity.ok(graphService.findPathBetweenPeople(fromId, toId));
    }
}
