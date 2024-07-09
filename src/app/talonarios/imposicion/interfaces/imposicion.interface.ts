import { OCCM } from "src/app/nomencladores/interfaces/occm.interface";
import { Organismo } from "src/app/nomencladores/interfaces/organismo.interface";
import { EntregaRecepcionImposicion } from "../../entrega-recepcion-imposicion/interfaces/entrega-recepcion-imposicion.interface";

export interface Imposicion {
    id?: number,
    serie: string,
    letra: string,
    estado: string,
    occm: OCCM;
    organismo: Organismo;
    id_Entrega_Recepcion_Imposicion: EntregaRecepcionImposicion
    activo: boolean,
    forestal: boolean;
}