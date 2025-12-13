export interface Ingredient {
    id: string;
    name: string;
    aliases: string[];
    riskLevel: 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';
    description?: string;
}

export interface ScanResult {
    rawText: string;
    detectedIngredients: string[];
    warnings: Warning[];
}

export interface Warning {
    ingredient: string;
    matchedAlias: string;
    riskLevel: 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';
    message: string;
}

export interface UserPreferences {
    avoidList: Ingredient[];
}
