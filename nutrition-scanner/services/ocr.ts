import { ScanResult } from '../types';

// Mock OCR Service
// In a real app, this would call Google Cloud Vision or use ML Kit
export const OCRService = {
    async processImage(uri: string): Promise<string> {
        console.log('Processing image:', uri);

        // Simulate network/processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Return mock text for demonstration purposes
        // We can randomize this or return a fixed string based on the "demo" mode
        return `
      INGREDIENTS: WATER, HIGH FRUCTOSE CORN SYRUP, CITRIC ACID, 
      SODIUM BENZOATE (PRESERVATIVE), RED 40, NATURAL FLAVORS, 
      SUCROSE, MODIFIED FOOD STARCH.
    `;
    },
};
