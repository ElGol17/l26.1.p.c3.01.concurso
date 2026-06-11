import Cl_mAspirante from "../models/Cl_mAspirante.js";
import Cl_sProyecto from "./Cl_sProyecto.js";

export default class Cl_sAspirantes extends Cl_sProyecto {
    static async existe(cedula: number): Promise<{ ok: boolean; existe: boolean }> {
    return super.existeId({
      tabla: "concurso",
      tablaId: cedula,
      tablaIdName: "cedula",
    });
  }
  static async agregar(
    nuevoAspirante: Cl_mAspirante
  ): Promise<{ ok: boolean; mensaje: string }> {
    if (!nuevoAspirante.nombre || nuevoAspirante.nombre.trim() === "") {
      return { ok: false, mensaje: "El nombre es obligatorio." };
    }
    if (!nuevoAspirante.apellido || nuevoAspirante.apellido.trim() === "") {
      return { ok: false, mensaje: "El apellido es obligatorio." };
    }
    if (nuevoAspirante.cedula <= 0) {
      return { ok: false, mensaje: "La cédula del aspirante es inválida." };
    }
    const checkExiste = await super.existeId({
      tabla: "concurso",
      tablaId: nuevoAspirante.cedula,
      tablaIdName: "cedula",
    });
    if (!checkExiste.ok) {
      return {
        ok: false,
        mensaje: "Error: No se pudo establecer conexión con el servidor",
      };
    }
    if (checkExiste.existe) {
      return {
        ok: false,
        mensaje: "Ya existe un aspirante registrado con esa cédula",
      };
    }
    return super.agregar(nuevoAspirante.toJSON());
  }
  static async eliminar(cedula: number): Promise<{ ok: boolean; mensaje: string }> {
    if (cedula <= 0) {
      return { ok: false, mensaje: "Cédula inválida" };
    }
    return super.eliminar(cedula, "concurso", "cedula");
  }

  static async getAspirantes(): Promise<{ ok: boolean; data: any[] }> {
    const respuesta = await super.getTabla({ tabla: "concurso" });
    return { ok: respuesta.ok, data: respuesta.tabla };
  }
}