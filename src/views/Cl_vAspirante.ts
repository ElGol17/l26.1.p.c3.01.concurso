import { I_vAspirante } from "../interfaces/I_vAspirante.js";
import Cl_mAspirante from "../models/Cl_mAspirante.js";

export default class Cl_vAspirante implements I_vAspirante{
    private vista: HTMLElement;
    private inNombre: HTMLInputElement;
    private inApellido: HTMLInputElement;
    private inCedula: HTMLInputElement;
    private inCedulaBuscar: HTMLInputElement;
    private inFormatoCO5: NodeListOf<HTMLInputElement>;
    private inFormatoCO51: NodeListOf<HTMLInputElement>;
    private inFormatoCO52: NodeListOf<HTMLInputElement>;
    private inFormatoCO53: NodeListOf<HTMLInputElement>;
    private inNotaExamenEscritoCO8: HTMLInputElement;
    private inNotaExamenPracticoCO8: HTMLInputElement;
    private inJuradoAFormatoCO10: NodeListOf<HTMLInputElement>;
    private inJuradoBFormatoCO10: NodeListOf<HTMLInputElement>;
    private inJuradoCFormatoCO10: NodeListOf<HTMLInputElement>;
    private btBuscar: HTMLButtonElement;
    private btAceptar: HTMLButtonElement;
    private btCancelar: HTMLButtonElement;
    constructor(){
        this.vista = document.getElementById("aspirante") as HTMLElement;

        this.inNombre = document.getElementById("aspirante_inNombre") as HTMLInputElement;
        this.inApellido = document.getElementById("aspirante_inApellido") as HTMLInputElement;
        this.inCedula = document.getElementById("aspirante_inCedula") as HTMLInputElement;
        this.inCedulaBuscar = document.getElementById("aspirante_inCedulaBuscar") as HTMLInputElement;
        this.inNotaExamenEscritoCO8 = document.getElementById("aspirante_inNotaExamenEscritoCO8") as HTMLInputElement;
        this.inNotaExamenPracticoCO8 = document.getElementById("aspirante_inNotaExamenPracticoCO8") as HTMLInputElement;

        this.btBuscar = document.getElementById("aspirante_btBuscar") as HTMLButtonElement;
        this.btAceptar = document.getElementById("aspirante_btAceptar") as HTMLButtonElement;
        this.btCancelar = document.getElementById("aspirante_btCancelar") as HTMLButtonElement;

        this.inFormatoCO5 = document.querySelectorAll(".aspirante_inFormatoCO5") as NodeListOf<HTMLInputElement>;
        this.inFormatoCO51 = document.querySelectorAll(".aspirante_inFormatoCO51") as NodeListOf<HTMLInputElement>;
        this.inFormatoCO52 = document.querySelectorAll(".aspirante_inFormatoCO52") as NodeListOf<HTMLInputElement>;
        this.inFormatoCO53 = document.querySelectorAll(".aspirante_inFormatoCO53") as NodeListOf<HTMLInputElement>;
        this.inJuradoAFormatoCO10 = document.querySelectorAll(".aspirante_inJuradoAFormatoCO10") as NodeListOf<HTMLInputElement>;
        this.inJuradoBFormatoCO10 = document.querySelectorAll(".aspirante_inJuradoBFormatoCO10") as NodeListOf<HTMLInputElement>;
        this.inJuradoCFormatoCO10 = document.querySelectorAll(".aspirante_inJuradoCFormatoCO10") as NodeListOf<HTMLInputElement>;
    }
    extraerValoresArreglo(nodo: NodeListOf<HTMLInputElement>): number[]{
        return Array.from(nodo).map(input => (+input.value || 0));
    }
    get nombre(): string{
        return this.inNombre.value;
    }
    get apellido(): string{
        return this.inApellido.value;
    }
    get cedula(): number{
        return +this.inCedula.value;
    }
    get notaExamenEscritoCO8(): number{
        return +this.inNotaExamenEscritoCO8.value;
    }
    get notaExamenPracticoCO8(): number{
        return +this.inNotaExamenPracticoCO8.value;
    }
    get ptsFormatoCO5(): number[]{
        return this.extraerValoresArreglo(this.inFormatoCO5);
    }
    get ptsFormatoCO51(): number[]{
        return this.extraerValoresArreglo(this.inFormatoCO51);
    }
    get ptsFormatoCO52(): number[]{
        return this.extraerValoresArreglo(this.inFormatoCO52);
    }
    get ptsFormatoCO53(): number[]{
        return this.extraerValoresArreglo(this.inFormatoCO53);
    }
    get ptsJuradoAFormatoCO10(): number[]{
        return this.extraerValoresArreglo(this.inJuradoAFormatoCO10);
    }
    get ptsJuradoBFormatoCO10(): number[]{
        return this.extraerValoresArreglo(this.inJuradoBFormatoCO10);
    }
    get ptsJuradoCFormatoCO10(): number[]{
        return this.extraerValoresArreglo(this.inJuradoCFormatoCO10);
    }
    get cedulaBuscar(): number{
        return +this.inCedulaBuscar.value;
    }
    onBuscar(callback: () => void): void {
        this.btBuscar.onclick = callback;
    }
    onAceptar(callback: () => void): void { 
        this.btAceptar.onclick = callback; 
    }
    onCancelar(callback: () => void): void {
        this.btCancelar.onclick = callback;
    }
    cargarDatos(aspirante: Cl_mAspirante): void {
        this.inNombre.value = aspirante.nombre || "";
        this.inApellido.value = aspirante.apellido || "";
        this.inCedula.value = aspirante.cedula.toString() || "0";
        this.inNotaExamenEscritoCO8.value = aspirante.notaExamenEscritoCO8?.toString() || "0";
        this.inNotaExamenPracticoCO8.value = aspirante.notaExamenPracticoCO8?.toString() || "0";

        if (aspirante.ptsFormatoCO5) {
            this.inFormatoCO5.forEach((input, idx) => {
                input.value = aspirante.ptsFormatoCO5[idx]?.toString() || "0";
            });
        }
        if (aspirante.ptsFormatoCO51) {
            this.inFormatoCO51.forEach((input, idx) => {
                input.value = aspirante.ptsFormatoCO51[idx]?.toString() || "0";
            });
        }
        if (aspirante.ptsFormatoCO52) {
            this.inFormatoCO52.forEach((input, idx) => {
                input.value = aspirante.ptsFormatoCO52[idx]?.toString() || "0";
            });
        }
        if (aspirante.ptsFormatoCO53) {
            this.inFormatoCO53.forEach((input, idx) => {
                input.value = aspirante.ptsFormatoCO53[idx]?.toString() || "0";
            });
        }
        if (aspirante.ptsJuradoAFormatoCO10) {
            this.inJuradoAFormatoCO10.forEach((input, idx) => {
                input.value = aspirante.ptsJuradoAFormatoCO10[idx]?.toString() || "1";
            });
        }
        if (aspirante.ptsJuradoBFormatoCO10) {
            this.inJuradoBFormatoCO10.forEach((input, idx) => {
                input.value = aspirante.ptsJuradoBFormatoCO10[idx]?.toString() || "1";
            });
        }
        if (aspirante.ptsJuradoCFormatoCO10) {
            this.inJuradoCFormatoCO10.forEach((input, idx) => {
                input.value = aspirante.ptsJuradoCFormatoCO10[idx]?.toString() || "1";
            });
        }
    }
    mostrar(): void{
        this.inNombre.value = "";
        this.inApellido.value = "";
        this.inCedula.value = "0";
        this.inNotaExamenEscritoCO8.value = "0";
        this.inNotaExamenPracticoCO8.value = "0";

        this.inFormatoCO5.forEach(input => input.value = "0");
        this.inFormatoCO51.forEach(input => input.value = "0");
        this.inFormatoCO52.forEach(input => input.value = "0");
        this.inFormatoCO53.forEach(input => input.value = "0");

        this.inJuradoAFormatoCO10.forEach(input => input.value = "1");
        this.inJuradoBFormatoCO10.forEach(input => input.value = "1");
        this.inJuradoCFormatoCO10.forEach(input => input.value = "1");        
        this.vista.hidden = false;
    }
    ocultar(): void{
        this.vista.hidden = true;
    }
}