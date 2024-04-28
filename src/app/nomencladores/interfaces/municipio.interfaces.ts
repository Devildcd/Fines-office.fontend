import { Provincia } from "./provincia.interface"

export interface Municipio {
    id?: number,
    id_municipio: string,
    nombre: string,
    activo: boolean
    provincia_id: Provincia
}