import { TipoMulta } from "./tipo-multa.interface";

export interface DecretoLey {
    id?: number,
    id_decreto_ley: string,
    descripcion: string,
    activo: boolean,
    tipo_multa: TipoMulta
}