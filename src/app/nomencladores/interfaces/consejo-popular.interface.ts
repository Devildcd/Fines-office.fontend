import { Distrito } from "./distritos.interface";
import { Municipio } from "./municipio.interfaces";
import { OCCM } from "./occm.interface";

export interface ConsejoPopular {
    id?: number,
    id_cpopular: string,
    nombre: string,
    activo: boolean,
    occm: OCCM,
    municipio_id: Municipio,
    distrito_id: Distrito
}