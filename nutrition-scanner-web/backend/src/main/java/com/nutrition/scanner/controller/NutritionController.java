package com.nutrition.scanner.controller;

import com.nutrition.scanner.model.Ingredient;
import com.nutrition.scanner.model.Warning;
import com.nutrition.scanner.service.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Allow Angular frontend
public class NutritionController {

    @Autowired
    private AnalysisService analysisService;

    @GetMapping("/preferences")
    public List<Ingredient> getPreferences() {
        return analysisService.getAvoidList();
    }

    @PostMapping("/preferences")
    public Ingredient addPreference(@RequestBody Map<String, String> payload) {
        return analysisService.addIngredientToAvoid(payload.get("name"));
    }

    @DeleteMapping("/preferences/{id}")
    public void removePreference(@PathVariable String id) {
        analysisService.removeIngredient(id);
    }

    @PostMapping("/analyze")
    public List<Warning> analyze(@RequestBody Map<String, String> payload) {
        return analysisService.analyzeText(payload.get("text"));
    }
}
