import Cl_mAspirante from "./Cl_mAspirante.js";

export default class Cl_mAspirantes{
    private aspirantes: Cl_mAspirante[] = []
    private notaMayor: number = Number.NEGATIVE_INFINITY
    private notaMenor: number = Number.POSITIVE_INFINITY
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
            if(nuevoAspirante.notaDefinitiva() > this.notaMayor){
                this.notaMayor = nuevoAspirante.notaDefinitiva();
            }
            if(nuevoAspirante.notaDefinitiva() < this.notaMenor){
                this.notaMenor = nuevoAspirante.notaDefinitiva();
            }
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
    getAspirantesFiltrados(soloAprobados: boolean = false, solo25CO5: boolean = false, soloNoEvaluadosAptitudes: boolean = false, textoBusqueda: string = ""): Cl_mAspirante[]{
        let aspirantesFiltrados: Cl_mAspirante[] = [];
        switch (true){
            case soloAprobados:
                this.aspirantes.forEach((aspirante) => {
                    if (aspirante.veredicto() === "Aprobado") {
                        aspirantesFiltrados.push(aspirante);
                    }
                });
                break;
            case solo25CO5:
                this.aspirantes.forEach((aspirante) => {
                    if (aspirante.calificacionFormatoCO5() >= 25) {
                        aspirantesFiltrados.push(aspirante);
                    }
                });
                break;
            case soloNoEvaluadosAptitudes:
                this.aspirantes.forEach((aspirante) => {
                    if (aspirante.notaPruebaAptitudes() === 0) {
                        aspirantesFiltrados.push(aspirante);
                    }
                });
                break;
            case (!soloAprobados && !solo25CO5 && !soloNoEvaluadosAptitudes):
                aspirantesFiltrados = this.aspirantes;
        }
        if (textoBusqueda !== "") {
            aspirantesFiltrados = aspirantesFiltrados.filter(aspirante =>
                aspirante.nombreCompleto().toLowerCase().includes(textoBusqueda) ||
                aspirante.cedula.toString().includes(textoBusqueda)
            );
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
    porcentajeAprobados(): number{
        let cantidadAspirantes = this.aspirantes.length;
        if (cantidadAspirantes === 0){
            return 0;
        }
        else{
            let cantidadAprobados = this.aspirantes.filter(aspirante => aspirante.veredicto() === "Aprobado").length;
            return (cantidadAprobados / cantidadAspirantes) * 100;
        }
    }
    calificacionMayor(): number{
        return this.notaMayor;
    }
    calificacionMenor(): number{
        return this.notaMenor;
    }
}