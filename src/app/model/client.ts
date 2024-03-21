import { Injectable } from "@angular/core";
import { ClientDTO } from "../helpers/DTO/clientDTO";
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Injectable({
    providedIn: 'root'
})
export class ClienteModel {
    // Define un arreglo para almacenar los clientes
    private clientes: ClientDTO[] = [];

    constructor() {
        this.load();
    }

    // Carga los clientes desde el almacenamiento local
    load(): void {
        const storedClientes = localStorage.getItem('clientes');
        if (storedClientes) {
            this.clientes = JSON.parse(storedClientes);
        } else {
            this.clientes = [];
        }
    }

    // Guarda los clientes en el almacenamiento local
    private saveToLocalStorage(): void {
        localStorage.setItem('clientes', JSON.stringify(this.clientes));
    }

    // Genera un identificador único para los clientes
    generateGUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Crea un nuevo cliente
    create(cliente: ClientDTO): void {
        // Genera una cédula para el cliente
        cliente.idClient = this.generateGUID();
        // Agrega el cliente al arreglo
        this.clientes.push(cliente);
        // Guarda los cambios en el almacenamiento local
        this.saveToLocalStorage();
    }

    // Actualiza un cliente existente
    update(idClient: string, updatedCliente: ClientDTO): void {
        // Busca el índice del cliente en el arreglo
        const index = this.clientes.findIndex(cliente => cliente.idClient === idClient);
        if (index !== -1) {
            // Actualiza el cliente con la nueva información
            this.clientes[index] = updatedCliente;
            // Guarda los cambios en el almacenamiento local
            this.saveToLocalStorage();
            console.log('Cliente actualizado:', updatedCliente);
        } else {
            console.log('Cliente no encontrado');
        }
    }

    // Elimina un cliente
    delete(idClient: string): void {
        // Busca el índice del cliente en el arreglo
        const index = this.clientes.findIndex(cliente => cliente.idClient === idClient);
        if (index !== -1) {
            // Elimina el cliente del arreglo
            this.clientes.splice(index, 1);
            // Guarda los cambios en el almacenamiento local
            this.saveToLocalStorage();
            console.log('Cliente eliminado:', idClient);
        } else {
            console.log('Cliente no encontrado');
        }
    }

    // Obtiene todos los clientes almacenados
    getClientes(): ClientDTO[] {
        return this.clientes;
    }

    // Obtiene un cliente por su cédula
    getByIdClient(idClient: string): ClientDTO | undefined {
        return this.clientes.find(cliente => cliente.idClient === idClient);
    }

    generateExcel(): Promise<ArrayBuffer> {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Clientes');
    
        // Establecer estilos para los encabezado
        const headerRow = worksheet.addRow(['Cédula', 'Nombres', 'Apellidos', 'Dirección', 'Teléfono']);
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
                cell.border = { top: { style: 'thick' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }; // Borde delgado
            });
        });
    
        // Agregar datos de los clientes
        this.clientes.forEach(cliente => {
            worksheet.addRow([cliente.cedula, cliente.nombres, cliente.apellidos, cliente.direccion, cliente.telefono]);
        });
    
        // Escribir el contenido en un búfer y devolverlo como una promesa
        return workbook.xlsx.writeBuffer();
    }
    saveExcelData(data: ArrayBuffer): void {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'clientes.xlsx');
    }
}
