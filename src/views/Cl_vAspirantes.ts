import { I_vAspirantes } from "../interfaces/I_vAspirantes.js";
import Cl_mAspirante from "../models/Cl_mAspirante.js";
const html = String.raw;

export default class Cl_vAspirantes implements I_vAspirantes{
    ui: HTMLDivElement;
    btRecargar: HTMLButtonElement;
    btVolver: HTMLButtonElement;
    chkSoloAprobados: HTMLInputElement;
    chkSolo25CO5: HTMLInputElement;
    chkSoloNoEvaluadosAptitudes: HTMLInputElement;
    tblAspirantes: HTMLTableElement;
    cntReportes: HTMLDivElement;
    inBusqueda: HTMLInputElement;
    constructor(){
        this.ui = document.getElementById("aspirantes") as HTMLDivElement;
        this.btRecargar = document.getElementById("aspirantes_btRecargar") as HTMLButtonElement;
        this.btVolver = document.getElementById("aspirantes_btVolver") as HTMLButtonElement;
        this.chkSoloAprobados = document.getElementById("aspirantes_chkSoloAprobados") as HTMLInputElement;
        this.chkSolo25CO5 = document.getElementById("aspirantes_chkSolo25CO5") as HTMLInputElement;
        this.chkSoloNoEvaluadosAptitudes = document.getElementById("aspirantes_chkSoloNoEvaluadosAptitudes") as HTMLInputElement;
        this.tblAspirantes = document.getElementById("aspirantes_tblAspirantes") as HTMLTableElement;
        this.cntReportes = document.getElementById("aspirantes_cntReportes") as HTMLDivElement;
        this.chkSoloAprobados.onchange = () => this.onChangeSoloAprobados(() => {});
        this.inBusqueda = document.getElementById("aspirantes_inBusqueda") as HTMLInputElement;
    }
    get soloAprobados(): boolean{ 
        return this.chkSoloAprobados.checked; 
    }
    get solo25CO5(): boolean{
        return this.chkSolo25CO5.checked;
    }
    get soloNoEvaluadosAptitudes(): boolean{
        return this.chkSoloNoEvaluadosAptitudes.checked;
    }
    get textoBusqueda(): string {
        return this.inBusqueda.value.toLowerCase().trim();
    }
    onChangeSoloAprobados(callback: () => void): void{ 
        this.chkSoloAprobados.onchange = callback;
    }
    onChangeSolo25CO5(callback: () => void): void{
        this.chkSolo25CO5.onchange = callback;
    }
    onChangeSoloNoEvaluadosAptitudes(callback: () => void): void{
        this.chkSoloNoEvaluadosAptitudes.onchange = callback;
    }
    onChangeBusqueda(callback: () => void): void {
        this.inBusqueda.oninput = callback;
    }
    deshabilitarChkSoloAprobados(): void{
        this.chkSoloAprobados.disabled = true;
    }
    habilitarChkSoloAprobados(): void{
        this.chkSoloAprobados.disabled = false;
    }
    deshabilitarChkSolo25CO5(): void{
        this.chkSolo25CO5.disabled = true;
    }
    habilitarChkSolo25CO5(): void{
        this.chkSolo25CO5.disabled = false;
    }
    deshabilitarChkSoloNoEvaluadosAptitudes(): void{
        this.chkSoloNoEvaluadosAptitudes.disabled = true;
    }
    habilitarChkSoloNoEvaluadosAptitudes(): void{
        this.chkSoloNoEvaluadosAptitudes.disabled = false;
    }
    onRecargar(callback: () => void): void{ 
        this.btRecargar.onclick = callback; 
    }
    onVolver(callback: () => void): void{ 
        this.btVolver.onclick = callback; 
    }
    mostrarAspirantes({ aspirantes }: { aspirantes: Cl_mAspirante[] }): void {
        let tbody = this.tblAspirantes.querySelector("tbody");
        if (!tbody) {
            tbody = document.createElement("tbody");
            this.tblAspirantes.appendChild(tbody);
        }
        tbody.innerHTML = "";
        let htmlReportesDetallados = "";
            aspirantes.forEach(aspirante => {
            const fila = document.createElement("tr");
            const esAprobado = aspirante.veredicto() === 'Aprobado';
            fila.innerHTML = html`
                <td class="text-start">${aspirante.nombreCompleto()}</td>
                <td class="text-center">${aspirante.cedula}</td>
                <td class="text-center">${aspirante.notaPruebaCredenciales().toFixed(2)}</td>
                <td class="text-center">${aspirante.notaPruebaConocimientos().toFixed(2)}</td>
                <td class="text-center">${aspirante.notaPruebaAptitudes().toFixed(2)}</td>
                <td class="text-center fw-bold fs-5">${aspirante.notaDefinitiva().toFixed(2)}</td>
                <td class="text-end fw-bold ${esAprobado ? 'text-success' : 'text-danger'}">${aspirante.veredicto()}</td>
            `;
            tbody.appendChild(fila);
            htmlReportesDetallados += html`
                <div class="card shadow-sm border-dark mb-5">
                    <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center p-3">
                        <h4 class="mb-0 fw-bold">Perfil: ${aspirante.nombreCompleto()}</h4>
                        <span class="fs-5">C.I: ${aspirante.cedula}</span>
                    </div>
                    <div class="card-body p-4">
                        <h6 class="fw-bold text-primary border-bottom pb-2">Formato N° CO-6 — Resumen de Valoración de Credenciales</h6>
                        <table class="table table-bordered table-sm text-center align-middle mb-4">
                            <thead class="table-light">
                                <tr>
                                    <th>I. Postgrado</th>
                                    <th>II. Pregrado</th>
                                    <th>III. Prod. Científica</th>
                                    <th>IV. Méritos y Exp.</th>
                                    <th class="table-secondary">Total Obtenido</th>
                                    <th class="table-primary">Calificación Final(0-20)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>${aspirante.calificacionFormatoCO5().toFixed(2)}</td>
                                    <td>${aspirante.calificacionFormatoCO51().toFixed(2)}</td>
                                    <td>${aspirante.calificacionFormatoCO52().toFixed(2)}</td>
                                    <td>${aspirante.calificacionFormatoCO53().toFixed(2)}</td>
                                    <td class="fw-bold">${aspirante.totalObtenidoCO6()}</td>
                                    <td class="fw-bold">${aspirante.calificacionFinalCO6().toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="row">
                            <div class="col-md-6">
                                <h6 class="fw-bold text-primary border-bottom pb-2">Formato N° CO-8 — Conocimientos</h6>
                                <table class="table table-bordered table-sm text-center align-middle">
                                    <thead class="table-light">
                                        <tr>
                                            <th>Escrito (0-20)</th>
                                            <th>Práctico (0-20)</th>
                                            <th>Calificación Obtenida (Suma de Porcentajes)</th>
                                            <th class="table-primary">60% de Calificación Obtenida</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>${aspirante.notaExamenEscritoCO8}</td>
                                            <td>${aspirante.notaExamenPracticoCO8}</td>
                                            <td>${(aspirante.notaExamenEscritoCO8 + aspirante.notaExamenPracticoCO8)*0.5}</td>
                                            <td class="fw-bold">${aspirante.notaPruebaConocimientos().toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <h6 class="fw-bold text-primary border-bottom pb-2">Formato N° CO-9 — Aptitudes</h6>
                                <table class="table table-bordered table-sm text-center align-middle">
                                    <thead class="table-light">
                                        <tr>
                                            <th>Calificación Obtenida</th>
                                            <th class="table-primary">30% de la Calificación Obtenida (0-20)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>${aspirante.calificacionFinalCO9().toFixed(2)}</td>
                                            <td class="fw-bold">${aspirante.notaPruebaAptitudes().toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        let contenedorReportes = document.getElementById("detalles_aspirantes");
        if (!contenedorReportes) {
            contenedorReportes = document.createElement("div");
            contenedorReportes.id = "detalles_aspirantes";
            contenedorReportes.className = "mt-5 border-top pt-4";
            this.ui.appendChild(contenedorReportes);
        }
        contenedorReportes.innerHTML = `<h2 class="text fw-bold mb-4">Expedientes Detallados</h2>` + htmlReportesDetallados;
    }
    mostrarEstadisticasGenerales({porcentajeCalificacion, porcentajeAprobados, calificacionMayor, calificacionMenor} : {porcentajeCalificacion: number, porcentajeAprobados: number, calificacionMayor: number, calificacionMenor: number}): void {
        let contenedorEstadisticas = document.getElementById("aspirantes_prct");
        if (!contenedorEstadisticas) {
            contenedorEstadisticas = document.createElement("div");
            contenedorEstadisticas.id = "estadisticas_generales";
            contenedorEstadisticas.className = "alert alert-primary d-flex align-items-center mb-4 shadow-sm border-0";
            if (this.tblAspirantes && this.tblAspirantes.parentElement) {
                this.tblAspirantes.parentElement.before(contenedorEstadisticas);
            }
        }
        contenedorEstadisticas.innerHTML = `
            <div class="me-3 fs-2"></div>
            <div>
                <span class="fs-6 text-dark">Porcentaje de Calificación de todos los Aspirantes: <strong>${porcentajeCalificacion.toFixed(2)}%</strong></span>
                <span class="fs-6 text-dark">Porcentaje de Aprobados: <strong>${porcentajeAprobados.toFixed(2)}%</strong></span>
                <span class="fs-6 text-dark">Calificación Mayor: <strong>${calificacionMayor.toFixed(2)}%</strong></span>
                <span class="fs-6 text-dark">Calificación Menor: <strong>${calificacionMenor.toFixed(2)}%</strong></span>
            </div>
        `;
    }
    mostrar(): void { 
        this.ui.removeAttribute("hidden"); 
    }
    ocultar(): void { 
        this.ui.setAttribute("hidden", "true"); 
    }
}