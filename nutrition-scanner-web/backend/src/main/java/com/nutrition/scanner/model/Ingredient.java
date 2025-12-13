package com.nutrition.scanner.model;

import java.util.List;

public class Ingredient {
    private String id;
    private String name;
    private List<String> aliases;
    private String riskLevel; // HIGH, MEDIUM, LOW, NONE
    private String description;

    public Ingredient() {}

    public Ingredient(String id, String name, List<String> aliases, String riskLevel, String description) {
        this.id = id;
        this.name = name;
        this.aliases = aliases;
        this.riskLevel = riskLevel;
        this.description = description;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<String> getAliases() { return aliases; }
    public void setAliases(List<String> aliases) { this.aliases = aliases; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
