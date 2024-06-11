import { EstadoMulta } from "src/app/nomencladores/interfaces/estado-multa.interface"

export interface Apremiar {
    id?: number,
    id_matriz: any,
    mov_multa_id: any,
    estado: EstadoMulta,
    fecha_apremio: Date,
    fecha_comunicada: Date,
    fecha_denunciada: Date,
    num_radicacion: number
}