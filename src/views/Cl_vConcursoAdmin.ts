import { I_vConcursoAdmin } from "../interfaces/I_vConcursoAdmin.js";
import Cl_mAspirante from "../models/Cl_mAspirante.js";

const html = String.raw;
export default class Cl_vConcursoAdmin implements I_vConcursoAdmin{
    private vista: HTMLElement;
    private btNuevoAspirante: HTMLButtonElement;
    private tbAspirantes: HTMLTableElement;
    constructor(){
        this.vista = document.getElementById("main") as HTMLElement;
        this.btNuevoAspirante = document.getElementById("main_btNuevoAspirante") as HTMLButtonElement;
        this.tbAspirantes = document.getElementById("main_tbAspirantes") as HTMLTableElement;
    }
    onNuevoAspirante(callback: () => void): void{
        this.btNuevoAspirante.onclick = callback;
    }
    mostrarAspirantes({aspirantes}: {aspirantes: Cl_mAspirante[]}): void{
        this.tbAspirantes.innerHTML = "";
        aspirantes.forEach(aspirante =>{
            const fila = document.createElement("tr");
                fila.innerHTML = html`
                    <td class="text-start">${aspirante.fechaRegistro.toLocaleDateString()}</td>
                    <td class="text-center">${aspirante.nombreCompleto()}</td>
                    <td class="text-center">${aspirante.cedula}</td>
                    <td class="text-center">${aspirante.notaPruebaCredenciales().toFixed(2)}</td>
                    <td class="text-center">${aspirante.notaPruebaConocimientos().toFixed(2)}</td>
                    <td class="text-center">${aspirante.notaPruebaAptitudes().toFixed(2)}</td>
                    <td class="text-center">${aspirante.notaDefinitiva().toFixed(2)}</td>
                    <td class="text-end fw-bold">${aspirante.veredicto()}</td>
                `;
            this.tbAspirantes.appendChild(fila);
        });
    }
    mostrar(): void{
        this.vista.hidden = false;
    }
    ocultar(): void{
        this.vista.hidden = true;
    }
}