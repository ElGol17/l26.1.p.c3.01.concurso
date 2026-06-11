import { I_vConcursoDirectiva } from "../interfaces/I_vConcursoDirectiva.js";

export default class Cl_vConcursoDirectiva implements I_vConcursoDirectiva{
    btMostrarAspirantes: HTMLButtonElement;
    tbAspirantes: HTMLTableElement;
    constructor(){
        this.btMostrarAspirantes = document.getElementById("concurso_btMostrarAspirantes") as HTMLButtonElement;
        this.tbAspirantes = document.getElementById("concurso_tbAspirantes") as HTMLTableElement;
    }
    onBtMostrarAspirantes(callback: () => void): void {
        this.btMostrarAspirantes.onclick = callback;
    }
    deshabilitarBoton(): void{
        this.btMostrarAspirantes.disabled = true;
    }
    habilitarBoton(): void{
        this.btMostrarAspirantes.disabled = false;
    }
}