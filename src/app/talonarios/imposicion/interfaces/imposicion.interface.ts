import { OCCM } from "src/app/nomencladores/interfaces/occm.interface";
import { Organismo } from "src/app/nomencladores/interfaces/organismo.interface";
import { EntregaRecepcion } from "../../entrega-recepcion/interfaces/entrega-recepcion.interface";

export interface Imposicion {
    id?: number,
    serie: string,
    letra: string,
    estado: string,
    occm: OCCM;
    organismo: Organismo;
    id_Entrega_Recepcion_Imposicion: EntregaRecepcion
    activo: boolean,
    forestal: boolean;
}