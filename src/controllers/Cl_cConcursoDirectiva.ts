import { I_vConcursoDirectiva } from "../interfaces/I_vConcursoDirectiva.js";
import Cl_mAspirantes from "../models/Cl_mAspirantes.js";
import Cl_vAspirantes from "../views/Cl_vAspirantes.js";
import Cl_cAspirantes from "./Cl_cAspirantes.js";

export default class Cl_cConcurso {
    private vista: I_vConcursoDirectiva;
    constructor({vista}: {vista: I_vConcursoDirectiva}){
        this.vista = vista;
        this.vista.onBtMostrarAspirantes(() => this.onBtMostrarAspirantes());
    }
    onBtMostrarAspirantes(): void {
        this.vista.deshabilitarBoton();
        const vAspirantes = new Cl_vAspirantes();
        const mAspirantes = new Cl_mAspirantes();
        new Cl_cAspirantes({
            modelo: mAspirantes,
            vista: vAspirantes,
            volverCallback: () => {
                this.vista.habilitarBoton();
            },
        });
    }
}