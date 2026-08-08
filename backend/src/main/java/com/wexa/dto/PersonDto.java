package com.wexa.dto;

import java.util.List;

public class PersonDto {
    private String id;
    private String name;
    private String title;
    private String company;
    private List<String> skills;

    public PersonDto() {
    }

    public PersonDto(String id, String name, String title, String company, List<String> skills) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.company = company;
        this.skills = skills;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }
}
