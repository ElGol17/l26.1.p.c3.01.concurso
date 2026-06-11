import Cl_mAspirante from "../models/Cl_mAspirante.js";

export interface I_vConcursoAdmin{
    onNuevoAspirante(callback: () => void): void;
    mostrarAspirantes({aspirantes}: {aspirantes: Cl_mAspirante[]}): void;
    mostrar(): void;
    ocultar(): void;
}