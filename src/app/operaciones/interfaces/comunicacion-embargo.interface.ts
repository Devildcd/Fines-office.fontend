import { Municipio } from "src/app/nomencladores/interfaces/municipio.interfaces";

export interface ComunicacionEmbargo {
    id?: number,
    municipio_id: Municipio,
    id_matriz: any,
    contraventor: string,
    importe_pen: number,
    importe_liq: number,
    confirmado: boolean,
    fecha_comunicacion: Date,
    recibido_por: string,
    cargo: string,
    observaciones: string,
    mes: string,
    state: string
}