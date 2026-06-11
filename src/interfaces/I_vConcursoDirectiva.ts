export interface I_vConcursoDirectiva{
    onBtMostrarAspirantes(callback: () => void): void
    deshabilitarBoton(): void
    habilitarBoton(): void
}