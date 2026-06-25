import {I_vAspirante} from "../interfaces/I_vAspirante.js";
import Cl_mAspirante from "../models/Cl_mAspirante.js";
import Cl_sAspirante from "../services/Cl_sAspirante.js";

export default class Cl_cAspirante{
    private vista: I_vAspirante;
    private callback!: (aspirante: Cl_mAspirante | null) => void;
    private editandoId: string | null = null;    
    private aspiranteOriginal: any = null;          
    constructor(vista: I_vAspirante){
        this.vista = vista;
        this.vista.onAceptar(() => this.btAceptarOnClick());
        this.vista.onCancelar(() => this.btCancelarOnClick());
        this.vista.onBuscar(() => this.btBuscarOnClick());
    }
    solicitarAspirante(callback: (aspirante: Cl_mAspirante | null) => void): void{
        this.callback = callback;
        this.editandoId = null;
        this.aspiranteOriginal = null;
        this.vista.mostrar();
    }
    private async btBuscarOnClick(): Promise<void> {
        const cedula = this.vista.cedulaBuscar;
        if (!cedula || cedula <= 0) {
            alert("Ingrese una cédula válida para buscar.");
            return;
        }
        const resultado = await Cl_sAspirante.obtenerPorCedula(cedula);
        if (!resultado.ok) {
            alert("Error al consultar el servidor.");
            return;
        }
        if (!resultado.data) {
            alert("No existe un aspirante con esa cédula.");
            return;
        }
        this.vista.cargarDatos(resultado.data);
        this.editandoId = resultado.data.id;
        this.aspiranteOriginal = resultado.data;
    }
    private async btAceptarOnClick(): Promise<void> {
        let aspirante = new Cl_mAspirante({
            nombre: this.vista.nombre,
            apellido: this.vista.apellido,
            cedula: this.vista.cedula,
            fechaRegistro: this.vista.fechaRegistro,
            notaExamenEscritoCO8: this.vista.notaExamenEscritoCO8,
            notaExamenPracticoCO8: this.vista.notaExamenPracticoCO8,
        });
        aspirante.ptsFormatoCO5 = this.vista.ptsFormatoCO5;
        aspirante.ptsFormatoCO51 = this.vista.ptsFormatoCO51;
        aspirante.ptsFormatoCO52 = this.vista.ptsFormatoCO52;
        aspirante.ptsFormatoCO53 = this.vista.ptsFormatoCO53;
        aspirante.ptsJuradoAFormatoCO10 = this.vista.ptsJuradoAFormatoCO10;
        aspirante.ptsJuradoBFormatoCO10 = this.vista.ptsJuradoBFormatoCO10;
        aspirante.ptsJuradoCFormatoCO10 = this.vista.ptsJuradoCFormatoCO10;
        if (this.editandoId) {
            const resultado = await Cl_sAspirante.actualizarAspirante(aspirante, this.editandoId);
            alert(resultado.mensaje);
            if (resultado.ok) {
                (aspirante as any).id = this.editandoId;
                this.callback(aspirante);
                this.vista.ocultar();
            }
        } else {
            const checkExiste = await Cl_sAspirante.existeAspirante(aspirante.cedula);
            if (checkExiste.ok === false) {
                alert("Error: No se pudo establecer conexión con el servidor. Intente nuevamente.");
                return;
            }
            if (checkExiste.existe === true) {
                alert("Error: Ya existe un aspirante registrado con la cédula ingresada.");
                return;
            }
            const resultado = await Cl_sAspirante.guardarAspirante(aspirante);
            alert(resultado.mensaje);
            this.callback(aspirante);
            this.vista.ocultar();
        }
        this.editandoId = null;
        this.aspiranteOriginal = null;
    }
    private btCancelarOnClick(): void{
        this.callback(null);
        this.vista.ocultar();
        this.editandoId = null;
        this.aspiranteOriginal = null;
    }
}