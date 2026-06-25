import Cl_mAspirante from "../models/Cl_mAspirante.js";
export interface I_vAspirante {
    extraerValoresArreglo(arreglo: NodeListOf<HTMLInputElement>): number[]
    get nombre(): string;
    get apellido(): string;
    get cedula(): number;
    get fechaRegistro(): Date;
    get ptsFormatoCO5(): number[];
    get ptsFormatoCO51(): number[];
    get ptsFormatoCO52(): number[];
    get ptsFormatoCO53(): number[];
    get notaExamenEscritoCO8(): number;
    get notaExamenPracticoCO8(): number;
    get ptsJuradoAFormatoCO10(): number[];
    get ptsJuradoBFormatoCO10(): number[];
    get ptsJuradoCFormatoCO10(): number[];
    get cedulaBuscar(): number;
    cargarDatos(aspirante: Cl_mAspirante): void
    onBuscar(callback: () => void): void
    onAceptar(callback: () => void): void
    onCancelar(callback: () => void): void
    mostrar(): void
    ocultar(): void
}