package com.wexa.dto;

import java.util.List;

public class CompanyDto {
    private String name;
    private List<String> people;

    public CompanyDto() {
    }

    public CompanyDto(String name, List<String> people) {
        this.name = name;
        this.people = people;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getPeople() {
        return people;
    }

    public void setPeople(List<String> people) {
        this.people = people;
    }
}
