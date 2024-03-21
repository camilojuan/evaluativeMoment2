import { Injectable } from "@angular/core";
import { PorcinoDTO } from "../helpers/DTO/porcinoDTO";
import { ClientDTO } from "../helpers/DTO/clientDTO";
import { NutritionDTO } from "../helpers/DTO/nutritionDTO";
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Injectable({
    providedIn: 'root'
})
export class PorcinoModel {
    // Define un arreglo para almacenar los porcinos
    private porcino: PorcinoDTO[] = [];
    private nutritionArray: NutritionDTO[] = [];
    private clienteArray: ClientDTO[] = [];

    constructor() {
        this.load();
    }

    // Carga los porcinos desde el almacenamiento local
    load(): void {
        const storedPorcionos = localStorage.getItem('porcinos');
        if (storedPorcionos) {
            this.porcino = JSON.parse(storedPorcionos);
        } else {
            this.porcino = [];
        }
    }

    // Guarda los porcinos en el almacenamiento local
    private saveToLocalStorage(): void {
        localStorage.setItem('porcinos', JSON.stringify(this.porcino));
    }

    // Genera un identificador único para los porcinos
    generateGUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Crea un nuevo porcino
    create(porcino: PorcinoDTO): void {
        // Genera una identificacion para el porcino
        porcino.idPorcino = this.generateGUID();
        // Agrega el porcino al arreglo
        this.porcino.push(porcino);
        // Guarda los cambios en el almacenamiento local
        this.saveToLocalStorage();
    }

    // Actualiza un porcino existente
    update(idPorcino: string, updatedPorcino: PorcinoDTO): void {
        // Busca el índice del porcino en el arreglo
        const index = this.porcino.findIndex(porcino => porcino.idPorcino === idPorcino);
        if (index !== -1) {
            // Actualiza el porcino con la nueva información
            this.porcino[index] = updatedPorcino;
            // Guarda los cambios en el almacenamiento local
            this.saveToLocalStorage();
            console.log('porcino actualizado:', updatedPorcino);
        } else {
            console.log('porcino no encontrado');
        }
    }

    // Elimina un porcino
    delete(idPorcino: string): void {
        // Busca el índice del porcino en el arreglo
        const index = this.porcino.findIndex(porcino => porcino.idPorcino === idPorcino);;
        if (index !== -1) {
            // Elimina el porcino del arreglo
            this.porcino.splice(index, 1);
            // Guarda los cambios en el almacenamiento local
            this.saveToLocalStorage();
            console.log('Porcino eliminado:', idPorcino);
        } else {
            console.log('Porcino no encontrado');
        }
    }

    // Obtiene todos los porcinos almacenados
    getPorcino(): PorcinoDTO[] {
        return this.porcino;
    }

    // Obtiene un porcino por su id
    getByIdClient(idPorcino: string): PorcinoDTO | undefined {
        return this.porcino.find(porcino => porcino.idPorcino === idPorcino);
    }

    generatePorcinoExcel(): Promise<ArrayBuffer> {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Porcinos');

        // Establecer estilos para los encabezados
        const headerRow = worksheet.addRow(['Identificación', 'Raza', 'Edad Meses', 'Peso libras', 'Alimentación', 'Cliente']);
        headerRow.eachCell(cell => {
            cell.font = { bold: true, size: 16 }; // Negrita y tamaño
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFC0CB' } }; // Color de fondo (rosa claro)
            cell.alignment = { horizontal: 'center' }; // Centrar texto
            cell.border = { top: { style: 'thick' }, left: { style: 'thick' }, bottom: { style: 'thick' }, right: { style: 'thick' } }; // Borde grueso
        });

        // Establecer estilos para el contenido
        worksheet.eachRow(row => {
            row.eachCell(cell => {
                cell.font = { size: 12 }; // Tamaño de letra 12 puntos para todo el contenido
                cell.alignment = { horizontal: 'center' }; // Centrar texto
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }; // Borde delgado
            });
        });

        // Agregar datos de los porcinos
        this.porcino.forEach(porcino => {
            worksheet.addRow([porcino.identificacion, porcino.raza, porcino.edad, porcino.peso,this.getNutritionNombre(porcino.alimentacion!),this.getClienteNombre(porcino.cliente!) ]);
        });

        // Escribir el contenido en un búfer y devolverlo como una promesa
        return workbook.xlsx.writeBuffer();
    }
    saveExcelData(data: ArrayBuffer): void {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'porcinos.xlsx');
    }
    setNutritionArray(nutritionData: NutritionDTO[]): void {
        this.nutritionArray = nutritionData;
    }
    setClienteArray(clienteData: ClientDTO[]): void {
        this.clienteArray = clienteData;
    }
    //para busacr el nombre y ponerlo en el reporte
    getClienteNombre(clienteId: string): string {
        const cliente = this.clienteArray.find(cliente => cliente.idClient === clienteId);
        return cliente ? `${cliente.nombres} ${cliente.apellidos}` : 'Cliente no encontrado';
    }
    getNutritionNombre(nutritionId: string): string {
        const nutrition = this.nutritionArray.find(nutrition => nutrition.nutritionId === nutritionId);
        return nutrition ? `${nutrition.Dose} ${nutrition.Description}` : 'Alimentacion no encontrada';
    }
}
