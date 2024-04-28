import { SituacionMulta } from "./situacion-multa.interface";

export interface EstadoMulta {
    id?: number,
    descripcion: string,
    situacion: SituacionMulta,
    activo: boolean
}