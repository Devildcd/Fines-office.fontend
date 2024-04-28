import { Articulo } from "./articulo.interface";
import { DecretoLey } from "./decreto-ley.interface";
import { Inciso } from "./inciso.interface";

export interface DecretoLeyArticuloInciso {
    id?: number,
    descripcion: string;
    decreto_ley: DecretoLey; 
    articulo: Articulo; 
    inciso: Inciso; 
    duplica: boolean;
    dias_duplicar?: number;
    tipo_dias_dup: string;
    apremia: boolean;
    dias_apremiar?: number;
    tipo_dias_ap: string;
    cancela: boolean;
    dias_cancelar?: number;
    tipo_dias_canc: string;
    traslada: boolean;
    bonifica: boolean;
    bonifica_dias?: number;
    bonifica_porc?: number;
    activo: boolean;
}