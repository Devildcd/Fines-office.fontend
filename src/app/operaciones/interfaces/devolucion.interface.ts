import { Matriz } from "src/app/base/matriz/interfaces/matriz.interface";
import { ConceptoCancelacion } from "src/app/nomencladores/interfaces/concepto-cancelacion.interface";
import { ConceptoDevolucion } from "src/app/nomencladores/interfaces/concepto-devolucion.interface";
import { DecretoLeyArticuloInciso } from "src/app/nomencladores/interfaces/decreto-ley-articulo-inciso.interface";
import { Organismo } from "src/app/nomencladores/interfaces/organismo.interface";
import { TipoMulta } from "src/app/nomencladores/interfaces/tipo-multa.interface";


export interface Devolucion {
    id?: number,
    id_matriz: Matriz,
    concepto_devolucion_id: ConceptoDevolucion,
    importe: number,
    matriz_fecha: Date,
    ccancel_id: ConceptoCancelacion,
    tipo_multa_id: TipoMulta,
    organismo: Organismo,
    decreto_ley: DecretoLeyArticuloInciso,
    observaciones: string,
    state: string,
}