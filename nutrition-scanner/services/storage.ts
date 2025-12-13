import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ingredient, UserPreferences } from '../types';

const STORAGE_KEY = 'user_preferences_v1';

const DEFAULT_PREFERENCES: UserPreferences = {
    avoidList: [],
};

// Mock database of ingredients and their aliases
const INGREDIENT_DATABASE: Record<string, Partial<Ingredient>> = {
    'sugar': {
        aliases: ['sucrose', 'high fructose corn syrup', 'cane sugar', 'dextrose', 'maltose'],
        riskLevel: 'MEDIUM',
        description: 'Excessive sugar intake is linked to obesity and diabetes.',
    },
    'milk': {
        aliases: ['lactose', 'whey', 'casein', 'milk solids', 'cream'],
        riskLevel: 'HIGH', // Context dependent, but high for someone avoiding it
        description: 'Dairy product, common allergen.',
    },
    'peanuts': {
        aliases: ['peanut butter', 'peanut oil', 'arachis oil'],
        riskLevel: 'HIGH',
        description: 'Common severe allergen.',
    },
    'gluten': {
        aliases: ['wheat', 'barley', 'rye', 'malt', 'brewer\'s yeast'],
        riskLevel: 'HIGH',
        description: 'Avoid if you have Celiac disease or gluten sensitivity.',
    },
    'palm oil': {
        aliases: ['palmitate', 'palm kernel oil'],
        riskLevel: 'LOW',
        description: 'Environmental concern and high saturated fat.',
    },
};

export const StorageService = {
    async getPreferences(): Promise<UserPreferences> {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            return jsonValue != null ? JSON.parse(jsonValue) : DEFAULT_PREFERENCES;
        } catch (e) {
            console.error('Failed to load preferences', e);
            return DEFAULT_PREFERENCES;
        }
    },

    async savePreferences(prefs: UserPreferences): Promise<void> {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
        } catch (e) {
            console.error('Failed to save preferences', e);
        }
    },

    async addIngredientToAvoid(name: string): Promise<UserPreferences> {
        const current = await this.getPreferences();
        const normalizedName = name.toLowerCase().trim();

        // Check if already exists
        if (current.avoidList.some(i => i.name === normalizedName)) {
            return current;
        }

        // Lookup details or create generic
        const dbEntry = INGREDIENT_DATABASE[normalizedName] || {};

        const newIngredient: Ingredient = {
            id: Date.now().toString(),
            name: normalizedName,
            aliases: dbEntry.aliases || [],
            riskLevel: dbEntry.riskLevel || 'HIGH', // Default to high if user explicitly avoids it
            description: dbEntry.description || 'User added ingredient to avoid.',
        };

        const updated = {
            ...current,
            avoidList: [...current.avoidList, newIngredient],
        };

        await this.savePreferences(updated);
        return updated;
    },

    async removeIngredient(id: string): Promise<UserPreferences> {
        const current = await this.getPreferences();
        const updated = {
            ...current,
            avoidList: current.avoidList.filter(i => i.id !== id),
        };
        await this.savePreferences(updated);
        return updated;
    }
};
