import { OCCM } from "src/app/nomencladores/interfaces/occm.interface";

export interface Oc6 {
    id?: number,
    occm: OCCM,
    cantidad_multas: number,
    importe_total: number,
    suma_serie: number,
    suma_dias: number,
    estado: string,
    multas_crear: any,
    multas_recibidas: any,
    occm_origen: OCCM,
}