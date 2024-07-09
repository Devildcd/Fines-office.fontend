import { Matriz } from "src/app/base/matriz/interfaces/matriz.interface";

export interface Convenio {
    id?: number,
    matriz_id: Matriz,
    consecutivo_id: any,
    importe: number,
    cant_plazos: number,
    mes_inicio: string,
    fecha_cancelacion: Date,
    estado: string,
    observaciones: string,
    carga_inicial: boolean,
    no_romper: boolean,
    plazos_convenio: string,
}