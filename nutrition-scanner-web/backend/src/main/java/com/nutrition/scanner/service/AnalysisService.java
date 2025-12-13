package com.nutrition.scanner.service;

import com.nutrition.scanner.model.Ingredient;
import com.nutrition.scanner.model.Warning;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class AnalysisService {

    // In-memory storage for user preferences (Avoid List)
    private final Map<String, Ingredient> avoidList = new ConcurrentHashMap<>();

    // Mock database for alias expansion
    private final Map<String, Ingredient> ingredientDatabase = new HashMap<>();

    public AnalysisService() {
        // Initialize mock database
        initializeDatabase();
    }

    private void initializeDatabase() {
        addDbEntry("sugar", Arrays.asList("sucrose", "high fructose corn syrup", "cane sugar", "dextrose", "maltose"), "MEDIUM", "Excessive sugar intake is linked to obesity.");
        addDbEntry("milk", Arrays.asList("lactose", "whey", "casein", "milk solids", "cream"), "HIGH", "Dairy product, common allergen.");
        addDbEntry("peanuts", Arrays.asList("peanut butter", "peanut oil", "arachis oil"), "HIGH", "Common severe allergen.");
        addDbEntry("gluten", Arrays.asList("wheat", "barley", "rye", "malt"), "HIGH", "Avoid if you have Celiac disease.");
    }

    private void addDbEntry(String name, List<String> aliases, String risk, String desc) {
        ingredientDatabase.put(name, new Ingredient(UUID.randomUUID().toString(), name, aliases, risk, desc));
    }

    public List<Ingredient> getAvoidList() {
        return new ArrayList<>(avoidList.values());
    }

    public Ingredient addIngredientToAvoid(String name) {
        String normalized = name.toLowerCase().trim();
        if (avoidList.containsKey(normalized)) {
            return avoidList.get(normalized);
        }

        Ingredient dbEntry = ingredientDatabase.get(normalized);
        Ingredient newIngredient;

        if (dbEntry != null) {
            newIngredient = new Ingredient(UUID.randomUUID().toString(), normalized, dbEntry.getAliases(), dbEntry.getRiskLevel(), dbEntry.getDescription());
        } else {
            // Generic entry if unknown
            newIngredient = new Ingredient(UUID.randomUUID().toString(), normalized, new ArrayList<>(), "HIGH", "User added ingredient to avoid.");
        }

        avoidList.put(normalized, newIngredient);
        return newIngredient;
    }

    public void removeIngredient(String id) {
        avoidList.values().removeIf(i -> i.getId().equals(id));
    }

    public List<Warning> analyzeText(String text) {
        List<Warning> warnings = new ArrayList<>();
        String normalizedText = text.toLowerCase();

        for (Ingredient ingredient : avoidList.values()) {
            // Check main name
            if (normalizedText.contains(ingredient.getName().toLowerCase())) {
                warnings.add(new Warning(ingredient.getName(), ingredient.getName(), ingredient.getRiskLevel(), "Contains " + ingredient.getName() + ": " + ingredient.getDescription()));
            }

            // Check aliases
            if (ingredient.getAliases() != null) {
                for (String alias : ingredient.getAliases()) {
                    if (normalizedText.contains(alias.toLowerCase())) {
                        // Avoid duplicates if possible, but for now just add
                        warnings.add(new Warning(ingredient.getName(), alias, ingredient.getRiskLevel(), "Contains " + alias + " (alias for " + ingredient.getName() + "): " + ingredient.getDescription()));
                    }
                }
            }
        }
        return warnings;
    }
}
