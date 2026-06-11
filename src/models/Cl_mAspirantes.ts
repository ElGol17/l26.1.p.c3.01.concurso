import Cl_mAspirante from "./Cl_mAspirante.js";

export default class Cl_mAspirantes{
    private aspirantes: Cl_mAspirante[] = []
    setAspirantes(array: any[]){
        this.aspirantes = [];
        array.forEach((aspirante) =>{
            let nuevoAspirante = new Cl_mAspirante({
                nombre: aspirante.nombre,
                apellido: aspirante.apellido,
                cedula: aspirante.cedula,
                notaExamenEscritoCO8: aspirante.notaExamenEscritoCO8,
                notaExamenPracticoCO8: aspirante.notaExamenPracticoCO8,
            })
            nuevoAspirante.ptsFormatoCO5 = aspirante.ptsFormatoCO5;
            nuevoAspirante.ptsFormatoCO51 = aspirante.ptsFormatoCO51;
            nuevoAspirante.ptsFormatoCO52 = aspirante.ptsFormatoCO52;
            nuevoAspirante.ptsFormatoCO53 = aspirante.ptsFormatoCO53;
            nuevoAspirante.ptsJuradoAFormatoCO10 = aspirante.ptsJuradoAFormatoCO10;
            nuevoAspirante.ptsJuradoBFormatoCO10 = aspirante.ptsJuradoBFormatoCO10;
            nuevoAspirante.ptsJuradoCFormatoCO10 = aspirante.ptsJuradoCFormatoCO10;
            this.aspirantes.push(nuevoAspirante);
        });
    }
    getAspirantes(soloAprobados: boolean = false): Cl_mAspirante[] {
        let aspirantesFiltrados: Cl_mAspirante[] = [];
            if (soloAprobados === true){
                this.aspirantes.forEach((aspirante) => {
                    if (aspirante.veredicto() === "Aprobado") {
                        aspirantesFiltrados.push(aspirante);
                    }
                });
            } 
        else{
            aspirantesFiltrados = this.aspirantes;
        }
    return aspirantesFiltrados;
    }
    porcentajeCalificacionGeneral(): number {
        let cantidadAspirantes = this.aspirantes.length;
        if (cantidadAspirantes === 0) return 0;
        let sumaNotas = 0;
        this.aspirantes.forEach(aspirante => {
            sumaNotas += aspirante.notaDefinitiva();
        });
        return (sumaNotas / (cantidadAspirantes * 20)) * 100;
    }
}