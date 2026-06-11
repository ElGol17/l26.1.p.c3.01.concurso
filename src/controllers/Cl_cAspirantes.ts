import Cl_mAspirantes from "../models/Cl_mAspirantes.js";
import { I_vAspirantes } from "../interfaces/I_vAspirantes.js";
import Cl_sAspirantes from "../services/Cl_sAspirantes.js";

export default class Cl_cAspirantes{
    private modelo: Cl_mAspirantes;
    private vista: I_vAspirantes;
    private volverCallback: () => void;
    constructor({modelo, vista, volverCallback}: {modelo: Cl_mAspirantes, vista: I_vAspirantes, volverCallback: () => void}){
        this.modelo = modelo;
        this.vista = vista;
        this.volverCallback = volverCallback;
        this.vista.onChangeSoloAprobados(() => this.onChangeSoloAprobados());
        this.vista.onRecargar(() => this.btRecargarOnClick());
        this.vista.onVolver(() => this.onVolver());
        this.vista.mostrar();
        this.btRecargarOnClick();
    }
    onChangeSoloAprobados(): void{
        this.btRecargarOnClick();
    }
    onVolver(): void{
        this.vista.ocultar();
        this.volverCallback();
    }
    async btRecargarOnClick(){
        const resultado = await Cl_sAspirantes.getAspirantes();
        if (resultado.ok === false){
            alert("Error: No se ha podido establecer conexión con el servidor.");
            return;
        }
        this.modelo.setAspirantes(resultado.data);
        const listaAspirantes = this.modelo.getAspirantes(this.vista.soloAprobados)
        this.vista.mostrarAspirantes({aspirantes: listaAspirantes});
        const txtPorcentaje = document.getElementById("txtPorcentaje");
        if (txtPorcentaje) {
            const porcentaje = this.modelo.porcentajeCalificacionGeneral();
            txtPorcentaje.innerText = `${porcentaje.toFixed(2)}%`;
        }
    }
}