import { OCCM } from "src/app/nomencladores/interfaces/occm.interface";
import { EntregaRecepcionComprobante } from "../../entrega-recepcion-comprobante/interfaces/entrega-recepcion-comprobante.interface";

export interface Comprobante {
    id?: number,
    serie: string,
    letra: string,
    estado: string,
    occm: OCCM;
    id_Entrega_Recepcion_Comprobante: EntregaRecepcionComprobante
    activo: boolean,
    operador: string;
}