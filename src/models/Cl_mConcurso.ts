import Cl_mAspirante from "./Cl_mAspirante.js";

export default class Cl_mConcurso{
    public aspirantes: Cl_mAspirante[] = [];
    constructor(aspirantes: Cl_mAspirante[]){
        this.aspirantes = aspirantes;
    }
    agregarAspirante(aspirante: Cl_mAspirante): void{
        this.aspirantes.push(aspirante);
    }
    cantidadAspirantes(): number{
        return this.aspirantes.length;
    }
}