import Cl_mAspirante from "../models/Cl_mAspirante.js";

export interface I_vAspirantes{
    get soloAprobados(): boolean
    onChangeSoloAprobados(callback: () => void): void
    onRecargar(callback: () => void): void
    onVolver(callback: () => void): void
    mostrarAspirantes({ aspirantes }: { aspirantes: Cl_mAspirante[] }): void
    mostrar(): void
    ocultar(): void
}