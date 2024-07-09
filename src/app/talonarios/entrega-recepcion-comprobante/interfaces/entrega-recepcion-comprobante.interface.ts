import { OCCM } from "src/app/nomencladores/interfaces/occm.interface";

export interface EntregaRecepcionComprobante {
    id?: number,
    fecha: Date;
    movimiento: string;
    codentrada: string;
    entregadox: string;
    recibidox: string;
    referencia: string;
    serie: string;
    numerd: string;
    numerh: string;
    carga_inicial: boolean;
    estado: string;
    tipo: string;
    operador: string;
    activo: boolean;
    occm_destino: OCCM;
    
}