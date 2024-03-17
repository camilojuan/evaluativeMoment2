import { Component, ViewChild, ElementRef } from "@angular/core";
import { NutritionModel } from "../model/nutrition";
import { NutritionDTO } from "../helpers/DTO/nutritionDTO";

declare var bootstrap: any; // Declara la variable bootstrap para acceder a la funcionalidad de Bootstrap


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
  nutritionArray: NutritionDTO[] =[];

  public addNutrition() {
    this.nutritionModel.create(this.newNutrition);
    this.getNutritions();
    this.newNutrition = new NutritionDTO(); // Limpiar los campos después de agregar
  }

  public getNutritions() {
    this.nutritionArray = this.nutritionModel.getLocalStorageArray();
  }

  public loadData(Nutrition: NutritionDTO) {
    // Crear una copia superficial del objeto seleccionado
    this.selectedNutrition = Object.assign({}, Nutrition);
  }

  public editNutrition() {
    if (this.selectedNutrition) {
      this.nutritionModel.update(this.selectedNutrition.nutritionId!, this.selectedNutrition);
      this.getNutritions();
      this.limpiarSelectedNutrition(); // Limpiar el objeto seleccionado después de editar
    }
  }

  public modalDelete(Nutrition: NutritionDTO){
    this.loadData(Nutrition);
  }
  public deleteNutrition() {
    // eliminando con el modal
    if (this.selectedNutrition) {
      this.nutritionModel.delete(this.selectedNutrition.nutritionId!);
      this.getNutritions();
      this.limpiarSelectedNutrition(); // Limpiar el objeto seleccionado después de editar
    }
  }
  limpiarSelectedNutrition(){
    this.selectedNutrition = null; // Limpiar el objeto seleccionado después de editar
  }
}
 