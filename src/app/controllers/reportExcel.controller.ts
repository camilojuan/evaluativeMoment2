import { Component, OnInit } from "@angular/core";
//clientes
import { ClienteModel } from "../model/client";
import { ClientDTO } from "../helpers/DTO/clientDTO";

//porcino
import { PorcinoModel } from "../model/porcino";
import { PorcinoDTO } from "../helpers/DTO/porcinoDTO";

// nutrition
import { NutritionModel } from "../model/nutrition";
import { NutritionDTO } from "../helpers/DTO/nutritionDTO";


@Component({
  selector: 'app-reportExcel',
  templateUrl: '../view/reportExcel.html',
  styles: [` 
      
    `]
})
export class ReportExcelController {
  constructor(
    private clienteModel: ClienteModel,
    private porcinoModel: PorcinoModel,
    private nutritionModel: NutritionModel
  ) {
    this.getClientes();
    this.getPorcinos();
    this.getNutrition();
  }
  clienteAray: ClientDTO[] = [];
  porcinoArray: PorcinoDTO[] = [];
  nutritionArray: NutritionDTO[] = [];

  getClientes() {
    this.clienteAray = this.clienteModel.getClientes();
    console.log("cliente array: ", this.clienteAray);

  }
  getPorcinos() {
    this.porcinoArray = this.porcinoModel.getPorcino();
    //console.log("cliente array: ", this.clienteAray);
  }
  generateExcelClient() {
    this.clienteModel.generateExcel()
      .then((data: ArrayBuffer) => {
        this.clienteModel.saveExcelData(data);
      })
      .catch(error => {
        console.error('Error al generar el archivo Excel:', error);
      });
  }
  getNutrition() {
    this.nutritionArray = this.nutritionModel.getLocalStorageArray();
    //console.log("Nutrition en porcinos: ", this.nutritionArray);
  }
  generateExcelporcinos() {
    this.porcinoModel.setClienteArray(this.clienteAray);
    this.porcinoModel.setNutritionArray(this.nutritionArray);
    this.porcinoModel.generatePorcinoExcel()
      .then((data: ArrayBuffer) => {
        this.porcinoModel.saveExcelData(data);
      })
      .catch(error => {
        console.error('Error al generar el archivo Excel:', error);
      });
  }
}