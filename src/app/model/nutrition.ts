import { Injectable } from "@angular/core";
import { NutritionDTO } from "../helpers/DTO/nutritionDTO";


@Injectable({
    providedIn: 'root'
  })

export class NutritionModel {

    private nutritions!: NutritionDTO[];


    constructor() {

    }


    load(): void {
        const storedNutritions = localStorage.getItem('nutritions');
        if (storedNutritions) {
            this.nutritions = JSON.parse(storedNutritions);
        } else {
            this.nutritions = [];
        }
    }

    create(nutrition: NutritionDTO): void {
        this.load();
        this.nutritions.push(nutrition);
        localStorage.setItem('nutritions', JSON.stringify(this.nutritions));
    }

    update(nutritionId: number, updatedNutrition: NutritionDTO): void {
        const index = this.nutritions.findIndex(
            (nutrition) => nutrition.nutritionId === nutritionId
        );
        if (index !== -1) {
            this.nutritions[index] = updatedNutrition;
            console.log("Nutrition updated:", updatedNutrition);
        } else {
            console.log("Nutrition not found");
        }
    }

    delete(nutritionId: number): void {
        const index = this.nutritions.findIndex(
            (nutrition) => nutrition.nutritionId === nutritionId
        );
        if (index !== -1) {
            const deletedNutrition = this.nutritions.splice(index, 1)[0];
            console.log("Nutrition deleted:", deletedNutrition);
        } else {
            console.log("Nutrition not found");
        }
    }


    getLocalStorageArray(): NutritionDTO[] {
        const storedNutritions = localStorage.getItem('nutritions');
        if (storedNutritions) {
            return JSON.parse(storedNutritions) as NutritionDTO[];
        } else {
            return [];
        }
    }

    getById(nutritionId: number): NutritionDTO | undefined {
        return this.nutritions.find(
            (nutrition) => nutrition.nutritionId === nutritionId
        );
    }
}

