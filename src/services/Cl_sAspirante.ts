import Cl_sMockApiAdmin from "./Cl_sMockApiAdmin.js";
import Cl_mAspirante from "../models/Cl_mAspirante.js";

export default class Cl_sAspirante extends Cl_sMockApiAdmin{
    static async guardarAspirante(nuevoAspirante: Cl_mAspirante): Promise<{ ok: boolean; mensaje: string }>{
        return await this.post(nuevoAspirante);
    }
    static async existeAspirante(cedula: number): Promise<{ ok: boolean; existe: boolean }>{
        let resultado = await this.existeCedula({ tabla: "aspirantes", cedula });
        return resultado;
    }
    static async obtenerPorCedula(cedula: number): Promise<{ ok: boolean; data: any | null }> {
        try {
            const response = await fetch(`${this.apiURL}?tabla=aspirante&cedula=${cedula}`);
            if (!response.ok) return { ok: false, data: null };
            const data = await response.json();
            if (data.length === 0) return { ok: true, data: null };
            return { ok: true, data: data[0] };
        } catch (error) {
            return { ok: false, data: null };
        }
    }
    static async actualizarAspirante(aspirante: Cl_mAspirante, idMockApi: string): Promise<{ ok: boolean; mensaje: string }> {
        try {
            const response = await fetch(`${this.apiURL}/${idMockApi}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(aspirante.toJSON()),
            });
            if (!response.ok) return { ok: false, mensaje: "Error al actualizar el aspirante" };
            return { ok: true, mensaje: "Aspirante actualizado correctamente" };
        } catch (error: any) {
            return { ok: false, mensaje: "Error de red: " + error.message };
        }
    }
}