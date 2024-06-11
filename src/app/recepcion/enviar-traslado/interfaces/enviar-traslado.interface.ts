import { OCCM } from "src/app/nomencladores/interfaces/occm.interface";

export interface EnviarTraslado {
    id?: number,
    occm: OCCM,
    cantidad_multas: number,
    importe_total: number,
    suma_serie: number,
    suma_dias: number,
    estado: string,
    multas_enviar: any,
    occm_destino: OCCM
}