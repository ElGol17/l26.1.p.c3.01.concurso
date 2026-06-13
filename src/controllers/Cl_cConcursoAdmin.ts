import {I_vConcursoAdmin} from "../interfaces/I_vConcursoAdmin.js";
import Cl_cAspirante from "./Cl_cAspirante.js";
import Cl_mConcurso from "../models/Cl_mConcurso.js";

export default class Cl_cConcurso{
    private mConcurso: Cl_mConcurso;
    private vConcurso: I_vConcursoAdmin;
    private cAspirante: Cl_cAspirante;
    constructor(vistaConcurso: I_vConcursoAdmin, cAspirante: Cl_cAspirante){
        this.mConcurso = new Cl_mConcurso([]);
        this.vConcurso = vistaConcurso;
        this.cAspirante = cAspirante;
        this.vConcurso.onNuevoAspirante(() => this.procesarNuevoAspirante());
    }
    procesarNuevoAspirante(): void{
        this.cAspirante.solicitarAspirante((aspirante) =>{
            if(aspirante !== null){
                const indexExistente = this.mConcurso.aspirantes.findIndex(aspiranteExistente => aspiranteExistente.cedula === aspirante.cedula);
                if (indexExistente !== -1) {
                    this.mConcurso.aspirantes[indexExistente] = aspirante;
                }
                else{
                    this.mConcurso.agregarAspirante(aspirante);
                }
                this.vConcurso.mostrarAspirantes({aspirantes: this.mConcurso.aspirantes});
            }
        })
    }
}