import { Convenio } from "./convenio.interface";

export interface ConvenioPlazo {
    id?: number,
    mes: string,
    plazo: string,
    importe_plazo: number,
    convenio_pago_id:Convenio
}