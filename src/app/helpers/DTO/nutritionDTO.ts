export  class NutritionDTO {

    nutritionId?: string;
    Description?: string;
    Dose?: number;
}
export interface updatedNutritionDTO extends Omit<NutritionDTO, "nutritionId"> {

}