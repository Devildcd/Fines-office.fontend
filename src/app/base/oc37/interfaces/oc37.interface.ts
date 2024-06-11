import { OCCM } from "src/app/nomencladores/interfaces/occm.interface";
import { OC5 } from "src/app/recepcion/oc5/interfaces/oc5.interface";

export interface Oc37 {
    id?: number,
    oc5: OC5,
    occm: OCCM,
    fecha_creado: Date
}