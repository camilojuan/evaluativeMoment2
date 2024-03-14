import { Component } from "@angular/core";
import { NutritionModel } from "../model/nutrition";
import { NutritionDTO } from "../helpers/DTO/nutritionDTO";

@Component({
  selector: 'app-nutrition',
  templateUrl: '../view/nutrition.html',
  styles: [` 
    
  `]
})
export class NutritionController {
  constructor(private nutritionModel: NutritionModel) {
    this.getNutritions();
  }
  selectedNutrition: NutritionDTO | null = null;
  newNutrition: NutritionDTO = new NutritionDTO();
  nutritionArray: NutritionDTO[] = [];

  public addNutrition() {
    this.nutritionModel.create(this.newNutrition);
    this.getNutritions();
    this.newNutrition = new NutritionDTO(); // Limpiar los campos después de agregar
  }

  public getNutritions() {
    this.nutritionArray = this.nutritionModel.getLocalStorageArray();
  }

  public loadDataUpdate(Nutrition: NutritionDTO) {
    // Crear una copia superficial del objeto seleccionado
    this.selectedNutrition = Object.assign({}, Nutrition);
  }

  public editNutrition() {
    if (this.selectedNutrition) {
      this.nutritionModel.update(this.selectedNutrition.nutritionId!, this.selectedNutrition);
      this.getNutritions();
      this.selectedNutrition = null; // Limpiar el objeto seleccionado después de editar
    }
  }

  public deleteNutrition(Nutrition: NutritionDTO) {
    this.nutritionModel.delete(Nutrition.nutritionId!);
    this.getNutritions();
  }
}
 