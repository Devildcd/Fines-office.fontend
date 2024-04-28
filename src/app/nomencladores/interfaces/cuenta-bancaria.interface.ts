import { Moneda } from "./moneda.interface";

export interface CuentaBancaria {
    id?: number,
    id_cuenta: string,
    nombre: string,
    moneda: Moneda,
    activo: boolean
}