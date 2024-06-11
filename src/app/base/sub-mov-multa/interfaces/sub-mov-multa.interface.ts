import { Matriz } from "../../matriz/interfaces/matriz.interface";

export interface SubMovMulta {
    id?: number,
    matriz: Matriz,
    campos_json: any,
    operacion: string,
    operacion_id: number
}