/////////////////////////////////////////////////////////////////version 14-03-24
/*
import { Injectable } from "@angular/core";
import { NutritionDTO } from "../helpers/DTO/nutritionDTO";


@Injectable({
    providedIn: 'root'
})
export class NutritionModel {
    private nutritions: NutritionDTO[] = [];

    constructor() {
        this.load();
    }

    load(): void {
        const storedNutritions = localStorage.getItem('nutritions');
        if (storedNutritions) {
            this.nutritions = JSON.parse(storedNutritions);
        } else {
            this.nutritions = [];
        }
    }
    generateGUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }      
    create(nutrition: NutritionDTO): void {
        nutrition.nutritionId = this.generateGUID();
        this.nutritions.push(nutrition);
        this.saveToLocalStorage();
    }

    update(nutritionId: string, updatedNutrition: NutritionDTO): void {
        this.load();
        this.updateToLocalStorage(updatedNutrition);
    }


    // delete(nutritionId: number): void {
    //     this.load();
    //     const index = this.nutritions.findIndex(
    //         (nutrition) => nutrition.nutritionId === nutritionId
    //     );

    //     if (index !== -1) {
    //         this.nutritions.splice(index, 1);
    //         this.saveToLocalStorage();
    //         console.log("Nutrition deleted:", nutritionId);
    //     } else {
    //         console.log("Nutrition not found");
    //     }
    // }

    private saveToLocalStorage(): void {
        localStorage.setItem('nutritions', JSON.stringify(this.nutritions));
    }
    private updateToLocalStorage(updatedNutrition: NutritionDTO): void {
        // Obtener el array del localStorage
        const nutritionArrayString = localStorage.getItem('nutritions');

        if (nutritionArrayString) {
            // Parsear el array del localStorage a un array de objetos NutritionDTO
            const nutritionArray: NutritionDTO[] = JSON.parse(nutritionArrayString);

            // Encontrar el índice del objeto que se desea actualizar
            const index = nutritionArray.findIndex(nutrition => nutrition.nutritionId === updatedNutrition.nutritionId);

            if (index !== -1) {
                // Reemplazar el objeto antiguo con el objeto actualizado
                nutritionArray[index] = updatedNutrition;

                // Volver a almacenar el array actualizado en el localStorage
                localStorage.setItem('nutritions', JSON.stringify(nutritionArray));

                console.log('El objeto se ha actualizado correctamente en el localStorage.');
            } else {
                console.log('No se encontró ningún objeto con el nutritionId especificado en el localStorage.');
            }
        } else {
            console.log('No se encontró ningún array en el localStorage.');
        }
    }

    getLocalStorageArray(): NutritionDTO[] {
        return this.nutritions;
    }

    // getById(nutritionId: number): NutritionDTO | undefined {
    //     return this.nutritions.find(
    //         (nutrition) => nutrition.nutritionId === nutritionId
    //     );
    // }
}






 */

/////////////////////////////////////version mia que me daba///////////////////////////////////////////////////////////
/*import { Injectable } from "@angular/core";
import { NutritionDTO } from "../helpers/DTO/nutritionDTO";


@Injectable({
    providedIn: 'root'
})

export class NutritionModel {

    private nutritions: NutritionDTO[] = [];
    private randomNumber: number = 0;

    constructor() {

    }


    load(): void {
        const storedNutritions = localStorage.getItem('nutritions')!;
        if (storedNutritions !== null) {
            this.nutritions = JSON.parse(storedNutritions);
        } else {
            this.nutritions = [];
        }
    }

    generateId() {
        //return this.randomNumber = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
        let id: number = 0;
        let isUnique: boolean = false;

        while (!isUnique) {
            id = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
            isUnique = !this.nutritions.some(nutrition => nutrition.nutritionId === id);
        }

        return id;
    }
    create(nutrition: NutritionDTO): void {
        this.load();
        nutrition.nutritionId = this.generateId();

        console.log("id model ", nutrition.nutritionId);

        this.nutritions.push(nutrition);
        localStorage.setItem('nutritions', JSON.stringify(this.nutritions));
    }
   
    update(nutritionId: number, updatedNutrition: NutritionDTO): void {
        // Cargar datos del localStorage
        this.load();
    
        // Buscar el índice del elemento a actualizar
        const index = this.nutritions.findIndex(
            (nutrition) => nutrition.nutritionId === nutritionId
        );
        
        // Actualizar el elemento si se encuentra
        if (index !== -1) {
            this.nutritions[index] = updatedNutrition;
            localStorage.setItem('nutritions', JSON.stringify(this.nutritions)); // Guardar los cambios en el localStorage
            console.log("Nutrition updated:", updatedNutrition);
        } else {
            console.log("Nutrition not found");
        }
    }
    delete(nutritionId: number): void {
        // Cargar datos del localStorage
        this.load();
    
        // Buscar el índice del elemento a eliminar
        const index = this.nutritions.findIndex(
            (nutrition) => nutrition.nutritionId === nutritionId
        );
    
        // Eliminar el elemento si se encuentra
        if (index !== -1) {
            const deletedNutrition = this.nutritions.splice(index, 1)[0];
            localStorage.setItem('nutritions', JSON.stringify(this.nutritions)); // Guardar los cambios en el localStorage
            console.log("Nutrition deleted:", deletedNutrition);
        } else {
            console.log("Nutrition not found");
        }

    }
    getLocalStorageArray(): NutritionDTO[] {
        const storedNutritions = localStorage.getItem('nutritions');
        if (storedNutritions) {
            return JSON.parse(storedNutritions) as NutritionDTO[];
        } else {
            return [];
        }
    }
    getById(nutritionId: number): NutritionDTO | undefined {
        return this.nutritions.find(
            (nutrition) => nutrition.nutritionId === nutritionId
        );
    }
     
}
*/
/*update(nutritionId: number, updatedNutrition: NutritionDTO): void {
        const index = this.nutritions.findIndex(
            (nutrition) => nutrition.nutritionId === nutritionId
        );
        
        if (index !== -1) {
            this.nutritions[index] = updatedNutrition;
            console.log("Nutrition updated:", updatedNutrition);
        } else {
            console.log("Nutrition not found");
        }
    }*/
/////////////////////////////////////////////////////////////////////////////////////////////////7

    
    /*
        import { Injectable } from "@angular/core";
import { NutritionDTO } from "../helpers/DTO/nutritionDTO";
@Injectable({
    providedIn: 'root'
})
export class NutritionModel {
    private nutritions: NutritionDTO[] = [];

    constructor() {
        this.load();
    }

    load(): void {
        const storedNutritions = localStorage.getItem('nutritions');
        if (storedNutritions) {
            this.nutritions = JSON.parse(storedNutritions);
        } else {
            this.nutritions = [];
        }
    }

    create(nutrition: NutritionDTO): void {
        this.nutritions.push(nutrition);
        this.saveToLocalStorage();
    }
   
    update(nutritionId: number, updatedNutrition: NutritionDTO): void {
        const index = this.nutritions.findIndex(
            (nutrition) => nutrition.nutritionId === nutritionId
        );
        
        if (index !== -1) {
            this.nutritions[index] = updatedNutrition;
            this.saveToLocalStorage();
            console.log("Nutrition updated:", updatedNutrition);
        } else {
            console.log("Nutrition not found");
        }
    }

    delete(nutritionId: number): void {
        const index = this.nutritions.findIndex(
            (nutrition) => nutrition.nutritionId === nutritionId
        );
    
        if (index !== -1) {
            this.nutritions.splice(index, 1);
            this.saveToLocalStorage();
            console.log("Nutrition deleted:", nutritionId);
        } else {
            console.log("Nutrition not found");
        }
    }

    private saveToLocalStorage(): void {
        localStorage.setItem('nutritions', JSON.stringify(this.nutritions));
    }

    getLocalStorageArray(): NutritionDTO[] {
        return this.nutritions;
    }

    getById(nutritionId: number): NutritionDTO | undefined {
        return this.nutritions.find(
            (nutrition) => nutrition.nutritionId === nutritionId
        );
    }
}
    */