import { Matriz } from "src/app/base/matriz/interfaces/matriz.interface"
import { SubMovMulta } from "src/app/base/sub-mov-multa/interfaces/sub-mov-multa.interface"
import { EstadoMulta } from "src/app/nomencladores/interfaces/estado-multa.interface"

export interface Apremiar {
    id?: number,
    id_matriz: Matriz,
    mov_multa_id: SubMovMulta,
    estado: EstadoMulta,
    fecha_apremio: Date,
    fecha_comunicada: Date,
    fecha_denunciada: Date,
    num_radicacion: number
}