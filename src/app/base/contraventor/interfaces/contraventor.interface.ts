import { ConsejoPopular } from "src/app/nomencladores/interfaces/consejo-popular.interface"
import { Distrito } from "src/app/nomencladores/interfaces/distritos.interface"
import { Municipio } from "src/app/nomencladores/interfaces/municipio.interfaces"
import { Provincia } from "src/app/nomencladores/interfaces/provincia.interface"
import { SituacionLaboral } from "src/app/nomencladores/interfaces/situacion-laboral.interface"
import { Zona } from "src/app/nomencladores/interfaces/zona.interface"
import { CentroTrabajo } from "../../centro-trabajo/interfaces/centroTrabajo.interface"

export interface Contraventor {
    id?: number,
    ci: string,
    nombre: string,
    apellido1: string,
    apellido2: string,
    direccion: string,
    direccion_garux: string,
    provincia_id: Provincia,
    municipio_id: Municipio,
    distrito_id: Distrito,
    cpopular_id: ConsejoPopular,
    zona_id: Zona,
    sitlaboral_id: SituacionLaboral,
    sit_lab_id: CentroTrabajo,
    nombre_ctrabajo: string,
    direccion_ctrabajo: string,
    menor_edad: boolean,
    far: boolean,
    pasaporte: boolean,
    cant_multa: number,
    cant_importe: number,
    cant_mult_calc: number,
    carga: boolean,
    fecha_actualizacion_suin: string
}