export default class Cl_mAspirante{
    private _tabla: string = "aspirante";
    private _nombre: string;
    private _apellido: string;
    private _cedula: number;
    private _ptsFormatoCO5: number[] = [];
    private _ptsFormatoCO51: number[] = [];
    private _ptsFormatoCO52: number[] = [];
    private _ptsFormatoCO53: number[] = [];
    private _notaExamenEscritoCO8: number;
    private _notaExamenPracticoCO8: number;
    private _ptsJuradoAFormatoCO10: number[] = [];
    private _ptsJuradoBFormatoCO10: number[] = [];
    private _ptsJuradoCFormatoCO10: number[] = [];
    constructor({nombre, apellido, cedula, notaExamenEscritoCO8, notaExamenPracticoCO8}: {nombre: string, apellido: string, cedula: number, notaExamenEscritoCO8: number, notaExamenPracticoCO8: number}){
        this._nombre = nombre;
        this._apellido = apellido;
        this._cedula = cedula;
        this._notaExamenEscritoCO8 = notaExamenEscritoCO8;
        this._notaExamenPracticoCO8 = notaExamenPracticoCO8;
    }
    //#region setters y getters
    set nombre(nombre: string){
        this._nombre = nombre;
    }
    get nombre(): string{
        return this._nombre;
    }
    set apellido(apellido: string){
        this._apellido = apellido;
    }
    get apellido(): string{
        return this._apellido;
    }
    set cedula(cedula: number){
        this._cedula = cedula;
    }
    get cedula(): number{
        return this._cedula;
    }
    set ptsFormatoCO5(ptsFormatoCO5: number[]){
        this._ptsFormatoCO5 = ptsFormatoCO5;
    }
    get ptsFormatoCO5(): number[]{
        return this._ptsFormatoCO5;
    }
    set ptsFormatoCO51(ptsFormatoCO51: number[]){
        this._ptsFormatoCO51 = ptsFormatoCO51;
    }
    get ptsFormatoCO51(): number[]{
        return this._ptsFormatoCO51;
    }
    set ptsFormatoCO52(ptsFormatoCO52: number[]){
        this._ptsFormatoCO52 = ptsFormatoCO52;
    }
    get ptsFormatoCO52(): number[]{
        return this._ptsFormatoCO52;
    }
    set ptsFormatoCO53(ptsFormatoCO53: number[]){
        this._ptsFormatoCO53 = ptsFormatoCO53;
    }
    get ptsFormatoCO53(): number[]{
        return this._ptsFormatoCO53;
    }
    set notaExamenEscritoCO8(notaExamenEscritoCO8: number){
        this._notaExamenEscritoCO8 = notaExamenEscritoCO8;
    }
    get notaExamenEscritoCO8(): number{
        return this._notaExamenEscritoCO8;
    }
    set notaExamenPracticoCO8(notaExamenPracticoCO8: number){
        this._notaExamenPracticoCO8 = notaExamenPracticoCO8;
    }
    get notaExamenPracticoCO8(): number{
        return this._notaExamenPracticoCO8;
    }
    set ptsJuradoAFormatoCO10(ptsJuradoAFormatoCO10: number[]){
        this._ptsJuradoAFormatoCO10 = ptsJuradoAFormatoCO10;
    }
    get ptsJuradoAFormatoCO10(): number[]{
        return this._ptsJuradoAFormatoCO10;
    }
    set ptsJuradoBFormatoCO10(ptsJuradoBFormatoCO10: number[]){
        this._ptsJuradoBFormatoCO10 = ptsJuradoBFormatoCO10;
    }
    get ptsJuradoBFormatoCO10(): number[]{
        return this._ptsJuradoBFormatoCO10;
    }
    set ptsJuradoCFormatoCO10(ptsJuradoCFormatoCO10: number[]){
        this._ptsJuradoCFormatoCO10 = ptsJuradoCFormatoCO10;
    }
    get ptsJuradoCFormatoCO10(): number[]{
        return this._ptsJuradoCFormatoCO10;
    }
    //#endregion
    nombreCompleto(): string{
        return this._nombre + " " + this._apellido;
    }
    calcularCalificacion(arreglo: number[], tope: number): number{
        let sumatoria = arreglo.reduce((acumulador, actual) => acumulador + actual, 0);
        if(sumatoria > tope){
            sumatoria = tope;
        }
        return sumatoria;
    }
    calificacionFormatoCO5(): number{
        return this.calcularCalificacion(this._ptsFormatoCO5, 35);
    }
    calificacionFormatoCO51(): number{
        return this.calcularCalificacion(this._ptsFormatoCO51, 30);
    }
    calificacionFormatoCO52(): number{
        return this.calcularCalificacion(this._ptsFormatoCO52, 15);
    }
    calificacionFormatoCO53(): number{
        return this.calcularCalificacion(this._ptsFormatoCO53, 20);
    }
    totalObtenidoCO6(): number{
        return this.calificacionFormatoCO5() + this.calificacionFormatoCO51() + this.calificacionFormatoCO52() + this.calificacionFormatoCO53();
    }
    calificacionFinalCO6(): number{
        return this.totalObtenidoCO6() / 5;
    }
    calcularCalificacionJurado(arreglo: number[]){
        let sumatoria = arreglo.reduce((acumulador, actual) => acumulador + actual, 0);
        return sumatoria
    }
    calificacionJuradoA(): number{
        return this.calcularCalificacionJurado(this._ptsJuradoAFormatoCO10);
    }
    calificacionJuradoB(): number{
        return this.calcularCalificacionJurado(this._ptsJuradoBFormatoCO10);
    }
    calificacionJuradoC(): number{
        return this.calcularCalificacionJurado(this._ptsJuradoCFormatoCO10);
    }
    calificacionFinalCO9(): number{
        return (this.calificacionJuradoA() + this.calificacionJuradoB() + this.calificacionJuradoC()) / 9;
    }
    notaPruebaCredenciales(): number{
        return this.calificacionFinalCO6() * 0.1;
    }
    notaPruebaConocimientos(): number{
        return this._notaExamenEscritoCO8*0.3 + this._notaExamenPracticoCO8*0.3;
    }
    notaPruebaAptitudes(): number{
        return this.calificacionFinalCO9() * 0.3;
    }
    notaDefinitiva(): number{
        return this.notaPruebaCredenciales() + this.notaPruebaConocimientos() + this.notaPruebaAptitudes();
    }
    veredicto(): string{
        if(this.notaDefinitiva() >= 16){
            return "Aprobado";
        }else{
            return "Reprobado";
        }
    }
    toJSON(){
        return {
            tabla: this._tabla,
            nombre: this._nombre,
            apellido: this._apellido,
            cedula: this._cedula,
            ptsFormatoCO5: this._ptsFormatoCO5,
            ptsFormatoCO51: this._ptsFormatoCO51,
            ptsFormatoCO52: this._ptsFormatoCO52,
            ptsFormatoCO53: this._ptsFormatoCO53,
            notaExamenEscritoCO8: this._notaExamenEscritoCO8,
            notaExamenPracticoCO8: this._notaExamenPracticoCO8,
            ptsJuradoAFormatoCO10: this._ptsJuradoAFormatoCO10,
            ptsJuradoBFormatoCO10: this._ptsJuradoBFormatoCO10,
            ptsJuradoCFormatoCO10: this._ptsJuradoCFormatoCO10
        }
    }
}