export default class Cl_sMockApiAdmin{
    protected static apiURL: string = "https://6a1e5886b79eec0d6cef0e05.mockapi.io/concurso";
    static async getTabla({ tabla }: { tabla: string }): Promise<{
    ok: boolean;
    tabla: any[];
    }> {
    try {
      const respuesta = await fetch(`${this.apiURL}?tabla=${tabla}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (respuesta.status === 404) {
        return { ok: true, tabla: [] };
      }

      if (!respuesta.ok) {
        return { ok: false, tabla: [] };
      }

      const data = await respuesta.json();
      return { ok: true, tabla: data };
    } catch (error: any) {
      return { ok: false, tabla: [] };
    }
  }
  static async post(registro: any): Promise<{ ok: boolean; mensaje: string; id?: string }> {
    try {
      const respuesta = await fetch(this.apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registro),
      });

      if (!respuesta.ok) {
        return { ok: false, mensaje: "Error al guardar el registro" };
      }
      const data = await respuesta.json();
      return { ok: true, mensaje: "Registro guardado con ID: " + data.id, id: data.id };
    } catch (error: any) {
      return {
        ok: false,
        mensaje: "Error al guardar el registro: " + error.message,
      };
    }
  }
  static async existeCedula({
    tabla,
    cedula,
  }: {
    tabla: string;
    cedula: number;
  }): Promise<{ ok: boolean; existe: boolean }> {
    try {
      const respuesta = await fetch(
        `${this.apiURL}?tabla=${tabla}&cedula=${cedula}`,
      );
      if (respuesta.status === 404) {
        return { ok: true, existe: false };
      }
      if (!respuesta.ok) {
        return { ok: false, existe: false };
      }
      const data = await respuesta.json();
      return { ok: true, existe: data.length > 0 };
    } catch (error: any) {
      return { ok: false, existe: false };
    }
  }
}