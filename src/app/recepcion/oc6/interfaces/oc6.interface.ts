import { OCCM } from "src/app/nomencladores/interfaces/occm.interface";

export interface Oc6 {
    id?: number,
    occm: OCCM,
    occm_origen: OCCM,
    cantidad_multas: number,
    importe_total: number,
    suma_serie: number,
    suma_dias: number,
    estado: string,
    multas: any
}