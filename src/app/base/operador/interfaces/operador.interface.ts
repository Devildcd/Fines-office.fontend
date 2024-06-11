import { OCCM } from "src/app/nomencladores/interfaces/occm.interface";

export interface Operador {
    id?: number,
    first_name: string,
    last_name: string,
    is_active: boolean,
    occm: OCCM,
    cobro: number,
    id_operador: string,
    cargo: string
}