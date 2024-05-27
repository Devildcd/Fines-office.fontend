import { Moneda } from "src/app/nomencladores/interfaces/moneda.interface";

export interface Apremiar {
    id?: number,
    id_matriz: any,
    moneda: Moneda,
    fecha_imp: Date,
    fecha_gestion: Date,
    fecha_comunicada: Date
    fecha_denunciada: Date,
    num_radicacion: number,
    state: string
}