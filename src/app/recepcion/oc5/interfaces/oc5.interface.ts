import { OCCM } from "src/app/nomencladores/interfaces/occm.interface";
import { Organismo } from "src/app/nomencladores/interfaces/organismo.interface";

export interface OC5 {
    id?: number,
    occm: OCCM,
    organismo_origen: Organismo,
    cantidad_multas: number,
    importe_total: number,
    suma_serie: number,
    suma_dias: number,
    estado: string,
    multas: any
}