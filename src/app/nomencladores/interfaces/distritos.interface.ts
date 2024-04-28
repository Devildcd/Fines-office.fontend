import { Municipio } from "./municipio.interfaces";
import { OCCM } from "./occm.interface";

export interface Distrito {
    id?: number,
    id_distrito: string,
    nombre: string,
    activo: boolean,
    occm?: OCCM,
    municipio_id: Municipio
}