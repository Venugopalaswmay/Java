package com.nutrition.scanner.model;

public class Warning {
    private String ingredient;
    private String matchedAlias;
    private String riskLevel;
    private String message;

    public Warning() {}

    public Warning(String ingredient, String matchedAlias, String riskLevel, String message) {
        this.ingredient = ingredient;
        this.matchedAlias = matchedAlias;
        this.riskLevel = riskLevel;
        this.message = message;
    }

    public String getIngredient() { return ingredient; }
    public void setIngredient(String ingredient) { this.ingredient = ingredient; }

    public String getMatchedAlias() { return matchedAlias; }
    public void setMatchedAlias(String matchedAlias) { this.matchedAlias = matchedAlias; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
