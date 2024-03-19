import { Component, OnInit  } from "@angular/core";
//clientes
import { ClienteModel } from "../model/client";
import { ClientDTO } from "../helpers/DTO/clientDTO";

//porcino
import { PorcinoModel } from "../model/porcino";
import { PorcinoDTO } from "../helpers/DTO/porcinoDTO";
@Component({
    selector: 'app-reportExcel',
    templateUrl: '../view/reportExcel.html',
    styles: [` 
      
    `]
  })
  export class ReportExcelController implements OnInit{
    constructor (
        private clienteModel: ClienteModel
    ){
        this.getClientes();
    }
    ngOnInit(): void {
      this.getClientes();
      console.log("al iniciar: ", this.getClientes());
      
    }
    //clienteAray : ClientDTO[] = [];
    clienteAray : ClientDTO[] = [];
    porcinoArray : PorcinoDTO[] = [];
    getClientes(){
        this.clienteAray = this.clienteModel.getClientes();
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
  }