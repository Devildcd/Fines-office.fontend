import { Distrito } from "./distritos.interface"
import { Municipio } from "./municipio.interfaces"
import { Provincia } from "./provincia.interface"
import { tipoOficina } from "./tipo-oficina.interface"

export interface OCCM {
    id?: number,
    id_occm: string,
    nit: string,
    descripcion?: string,
    direccion?: string,
    telefono?: string,
    provincia_id?: Provincia,
    municipio_id?: Municipio,
    distrito_id?: Distrito,
    tipo_oficina_id: tipoOficina,
    padre_id?: OCCM,
    es_distrito: boolean,
    ofic_con_distrito: boolean,
    activo: boolean

}