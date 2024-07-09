import { Matriz } from "src/app/base/matriz/interfaces/matriz.interface";
import { SubMovMulta } from "src/app/base/sub-mov-multa/interfaces/sub-mov-multa.interface";

export interface Duplicar {
    id?: number,
    id_matriz: Matriz,
    mov_multa_id: SubMovMulta,
    fecha: Date,
}