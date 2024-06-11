import { Municipio } from "src/app/nomencladores/interfaces/municipio.interfaces";
import { Organismo } from "src/app/nomencladores/interfaces/organismo.interface";

export interface CentroTrabajo {
    id?: number,
    nombre: string;
    direccion: string;
    organismo_trabajo: string;
    organismo_trabajo_id: Organismo; 
    municipio: Municipio; 
    carga: boolean;
}