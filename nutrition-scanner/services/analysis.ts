import { Ingredient, Warning, ScanResult } from '../types';

export const AnalysisService = {
    analyzeText(text: string, avoidList: Ingredient[]): Warning[] {
        const warnings: Warning[] = [];
        const normalizedText = text.toLowerCase();

        avoidList.forEach(ingredient => {
            // Check for main name
            if (normalizedText.includes(ingredient.name.toLowerCase())) {
                warnings.push({
                    ingredient: ingredient.name,
                    matchedAlias: ingredient.name,
                    riskLevel: ingredient.riskLevel,
                    message: `Contains ${ingredient.name}: ${ingredient.description}`,
                });
            }

            // Check for aliases
            ingredient.aliases.forEach(alias => {
                if (normalizedText.includes(alias.toLowerCase())) {
                    // Avoid duplicate warnings for the same ingredient if possible, 
                    // or just list all matches. Let's list unique ingredients.
                    const existing = warnings.find(w => w.ingredient === ingredient.name);
                    if (!existing) {
                        warnings.push({
                            ingredient: ingredient.name,
                            matchedAlias: alias,
                            riskLevel: ingredient.riskLevel,
                            message: `Contains ${alias} (alias for ${ingredient.name}): ${ingredient.description}`,
                        });
                    }
                }
            });
        });

        return warnings;
    },
};
