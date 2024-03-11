import { Component } from "@angular/core";
import { NutritionModel } from "../model/nutrition";
import { NutritionDTO } from "../helpers/DTO/nutritionDTO";

@Component({
    selector: 'app-nutrition',
    templateUrl:'../view/nutrition.html',
    styles: [` table {
        width: 100%;
        border-collapse: collapse;
      }
      
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
      }
      
      tr:nth-child(even) {
        background-color: #f2f2f2;
      }
      
      th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #4CAF50;
        color: white;
      }`]
  })
  
  export class NutritionController {


    constructor(private nutritionModel:NutritionModel){
        this.getNutritions();
    }

    newNutrition : NutritionDTO = new NutritionDTO();
    nutritionArray : NutritionDTO[] = [];

    public addNutrition(){
       this.nutritionModel.create(this.newNutrition);
       this.getNutritions();
    }

    public getNutritions() {
       this.nutritionArray = this.nutritionModel.getLocalStorageArray();
    }

  
  }