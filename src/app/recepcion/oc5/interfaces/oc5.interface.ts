import { Oc37 } from "src/app/base/oc37/interfaces/oc37.interface";
import { OCCM } from "src/app/nomencladores/interfaces/occm.interface";
import { Organismo } from "src/app/nomencladores/interfaces/organismo.interface";

export interface OC5 {
    id?: number,
    occm: OCCM,
    cantidad_multas: number,
    importe_total: number,
    suma_serie: number,
    suma_dias: number,
    estado: string,
    multas_crear: any,
    oc_37?: Oc37[],
    organismo_origen: Organismo,
}