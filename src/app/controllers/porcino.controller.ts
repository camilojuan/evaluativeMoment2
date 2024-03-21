import { Component } from "@angular/core";
import { PorcinoModel } from "../model/porcino";
import { ClienteModel } from "../model/client";
import { NutritionModel } from "../model/nutrition";

import { PorcinoDTO } from "../helpers/DTO/porcinoDTO";
import { ClientDTO } from "../helpers/DTO/clientDTO";
import { NutritionDTO } from "../helpers/DTO/nutritionDTO";


@Component({
  selector: 'app-porcino',
  templateUrl: '../view/porcino.html'
})
export class PorcinoController {

  constructor(
    private porcinoModel: PorcinoModel,
    private clienteModel: ClienteModel,
    private nutritionModel: NutritionModel
  ) {
    this.getPorcino();
    this.getClient();
    this.getNutrition();
  }
  selectedPorcino: PorcinoDTO | null = null;

  newPorcino: PorcinoDTO = new PorcinoDTO();
  porcinoArray: PorcinoDTO[] = [];

  clienteArray: ClientDTO[] = [];
  nutritionArray: NutritionDTO[] = [];

  selectedClientId: string = '';
  selectedClientUpdate: string = '';

  selectedNutrition: string = '';
  selectedNutritionUpdate: string = '';

  sendCliente = "";

  public addPorcino() {
    //le asigno el id a los slect
    this.newPorcino.alimentacion = this.selectedNutrition;
    this.newPorcino.cliente = this.selectedClientId;
    this.porcinoModel.create(this.newPorcino);
    this.getPorcino();
    this.newPorcino = new PorcinoDTO(); // Limpiar los campos después de agregar
    this.limpiarSelectedPorcino();
  }

  public getPorcino() {
    this.porcinoArray = this.porcinoModel.getPorcino();
  }
  /**
   * Crear una copia superficial del objeto seleccionado
   * Encontrar el índice del cliente asociado al porcino
   * Si se encuentra el cliente, crear una copia superficial del cliente seleccionado
   * Encontrar el índice del alimentacion asociado al porcino
   * Si se encuentra la alimentacion, crear una copia superficial del cliente seleccionado
   * @param {PorcinoDTO} porcino
   * @memberof PorcinoController
   */
  public loadData(porcino: PorcinoDTO) {
    this.selectedPorcino = Object.assign({}, porcino);

    const clienteIndex = this.clienteArray.findIndex(cliente => cliente.idClient === porcino.cliente); 
    if (clienteIndex !== -1) {
      this.selectedClientUpdate = this.clienteArray[clienteIndex].idClient!;
    }

    const nutritionIndex = this.nutritionArray.findIndex(nutrition => nutrition.nutritionId === porcino.alimentacion);
    if (nutritionIndex !== -1) {
      this.selectedNutritionUpdate = this.nutritionArray[nutritionIndex].nutritionId!;
    }
  }
  //this.selectedClientId = "";//limpiar el idCliente
  public editPorcino() {
    if (this.selectedPorcino) {
      this.selectedPorcino.cliente = this.selectedClientUpdate;
      this.selectedPorcino.alimentacion = this.selectedNutritionUpdate;
      this.porcinoModel.update(this.selectedPorcino.idPorcino!, this.selectedPorcino);
      this.getPorcino();
      this.limpiarSelectedPorcino(); // Limpiar el objeto seleccionado después de editar
    }
  }

  public modalDelete(porcino: PorcinoDTO) {
    this.loadData(porcino);
  }

  public deletePorcino() {
    // Eliminando con el modal
    if (this.selectedPorcino) {
      this.porcinoModel.delete(this.selectedPorcino.idPorcino!);
      this.getPorcino();
      this.limpiarSelectedPorcino(); // Limpiar el objeto seleccionado después de editar
    }
  }
  limpiarSelectedPorcino() {
    this.selectedPorcino = null; // Limpiar el objeto seleccionado después de editar
    this.selectedClientId = "";
    this.selectedClientUpdate = "";
    this.selectedNutrition = '';
    this.selectedNutritionUpdate = '';
  }
  //para los seelct de cliente 
  getClient() {
    this.clienteArray = this.clienteModel.getClientes();
    console.log("clientes en porcinos: ", this.clienteArray);

  }
  getClienteNombre(clienteId: string): string {
    const cliente = this.clienteArray.find(cliente => cliente.idClient === clienteId);
    return cliente ? `${cliente.nombres} ${cliente.apellidos}` : 'Cliente no encontrado';
  }
  //para el select 
  getNutrition() {
    this.nutritionArray = this.nutritionModel.getLocalStorageArray();
    //console.log("Nutrition en porcinos: ", this.nutritionArray);
  }
  getNutritionNombre(nutritionId: string): string {
    const nutrition = this.nutritionArray.find(nutrition => nutrition.nutritionId === nutritionId);
    return nutrition ? `${nutrition.Dose} ${nutrition.Description}` : 'Alimentacion no encontrada';
  }
  generateExcelporcinos() {
    this.porcinoModel.setClienteArray(this.clienteArray);
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