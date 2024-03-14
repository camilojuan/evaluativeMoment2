import { Injectable } from "@angular/core";
import { NutritionDTO } from "../helpers/DTO/nutritionDTO";

@Injectable({
    providedIn: 'root'
})
export class NutritionModel {
    private nutritions: NutritionDTO[] = [];

    constructor() {
        this.load();
    }

    load(): void {
        const storedNutritions = localStorage.getItem('nutritions');
        if (storedNutritions) {
            this.nutritions = JSON.parse(storedNutritions);
        } else {
            this.nutritions = [];
        }
    }
    
    generateGUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }   

    create(nutrition: NutritionDTO): void {
        nutrition.nutritionId = this.generateGUID();
        this.nutritions.push(nutrition);
        this.saveToLocalStorage();
    }

    update(nutritionId: string, updatedNutrition: NutritionDTO): void {
        const index = this.nutritions.findIndex(nutrition => nutrition.nutritionId === nutritionId);
        if (index !== -1) {
            this.nutritions[index] = updatedNutrition;
            this.saveToLocalStorage();
            console.log('Nutrition updated:', updatedNutrition);
        } else {
            console.log('Nutrition not found');
        }
    }

    delete(nutritionId: string): void {
        const index = this.nutritions.findIndex(nutrition => nutrition.nutritionId === nutritionId);
        if (index !== -1) {
            this.nutritions.splice(index, 1);
            this.saveToLocalStorage();
            console.log('Nutrition deleted:', nutritionId);
        } else {
            console.log('Nutrition not found');
        }
    }

    private saveToLocalStorage(): void {
        localStorage.setItem('nutritions', JSON.stringify(this.nutritions));
    }

    getLocalStorageArray(): NutritionDTO[] {
        return this.nutritions;
    }

    getById(nutritionId: string): NutritionDTO | undefined {
        return this.nutritions.find(nutrition => nutrition.nutritionId === nutritionId);
    }
}
