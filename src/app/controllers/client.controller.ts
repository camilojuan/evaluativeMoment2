import { Component,  } from "@angular/core";
import { ClienteModel } from "../model/client";
import { ClientDTO } from "../helpers/DTO/clientDTO";

declare var bootstrap: any; // Declara la variable bootstrap para acceder a la funcionalidad de Bootstrap

@Component({
  selector: 'app-cliente',
  templateUrl: '../view/client.html',
  styles: [` 
    
  `]
})
export class ClienteController {
  constructor(private clienteModel: ClienteModel) {
    this.getClientes();
  }
  
  selectedCliente: ClientDTO | null = null;
  newCliente: ClientDTO = new ClientDTO();
  clienteArray: ClientDTO[] = [];

  public addCliente() {
    this.clienteModel.create(this.newCliente);
    this.getClientes();
    this.newCliente = new ClientDTO(); // Limpiar los campos después de agregar
  }

  public getClientes() {
    this.clienteArray = this.clienteModel.getClientes();
  }

  public loadData(cliente: ClientDTO) {
    // Crear una copia superficial del objeto seleccionado
    this.selectedCliente = Object.assign({}, cliente);
  }

  public editCliente() {
    if (this.selectedCliente) {
      this.clienteModel.update(this.selectedCliente.idClient!, this.selectedCliente);
      this.getClientes();
      this.limpiarSelectedCliente(); // Limpiar el objeto seleccionado después de editar
    }
  }

  public modalDelete(cliente: ClientDTO){
    this.loadData(cliente);
  }

  public deleteCliente() {
    // Eliminando con el modal
    if (this.selectedCliente) {
      this.clienteModel.delete(this.selectedCliente.idClient!);
      this.getClientes();
      this.limpiarSelectedCliente(); // Limpiar el objeto seleccionado después de editar
    }
  }

  limpiarSelectedCliente(){
    this.selectedCliente = null; // Limpiar el objeto seleccionado después de editar
  }
}
