import { OCCM } from "src/app/nomencladores/interfaces/occm.interface";
import { Organismo } from "src/app/nomencladores/interfaces/organismo.interface";

export interface EntregaRecepcionImposicion {
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
    activo: boolean;
    occm_destino: OCCM;
    organismo: Organismo;
}