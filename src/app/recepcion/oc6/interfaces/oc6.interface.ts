import { OCCM } from "src/app/nomencladores/interfaces/occm.interface";

export interface Oc6 {
    id?: number,
    occm: OCCM,
    cantidad_multas: number,
    importe_total: number,
    suma_serie: number,
    suma_dias: number,
    estado: string,
    multas_crear: MultasCrear[],
    multas_recibidas: any,
    occm_origen: OCCM,
}

export interface MultasCrear {
    id: number,
    temporal: boolean,
    fecha: string,
    importe: string,
    devolver: boolean,
    recibida_traslado: boolean,
    carga: boolean,
    nivel: boolean,
    impositor: number,
    talon: number,
    dley_art_inc: number,
    tipo_multa: number,
    estado_multa_id: number,
    moneda: number,
    conceptraslado: number,
    contraventor: number
}