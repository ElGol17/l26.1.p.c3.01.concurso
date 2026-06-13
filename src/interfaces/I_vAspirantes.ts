import Cl_mAspirante from "../models/Cl_mAspirante.js";

export interface I_vAspirantes{
    get soloAprobados(): boolean
    get solo25CO5(): boolean
    get soloNoEvaluadosAptitudes(): boolean
    onChangeSoloAprobados(callback: () => void): void
    onChangeSolo25CO5(callback: () => void): void
    onChangeSoloNoEvaluadosAptitudes(callback: () => void): void
    deshabilitarChkSoloAprobados(): void
    habilitarChkSoloAprobados(): void
    deshabilitarChkSolo25CO5(): void
    habilitarChkSolo25CO5(): void
    deshabilitarChkSoloNoEvaluadosAptitudes(): void
    habilitarChkSoloNoEvaluadosAptitudes(): void
    onRecargar(callback: () => void): void
    onVolver(callback: () => void): void
    mostrarAspirantes({ aspirantes }: { aspirantes: Cl_mAspirante[] }): void
    mostrar(): void
    ocultar(): void
}