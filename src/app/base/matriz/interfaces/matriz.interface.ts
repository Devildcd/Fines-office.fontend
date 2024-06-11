import { ConceptoTraslado } from "src/app/nomencladores/interfaces/concepto-traslado.interface";
import { EstadoMulta } from "src/app/nomencladores/interfaces/estado-multa.interface";
import { Moneda } from "src/app/nomencladores/interfaces/moneda.interface";
import { Organismo } from "src/app/nomencladores/interfaces/organismo.interface";
import { TipoMulta } from "src/app/nomencladores/interfaces/tipo-multa.interface";
import { OC5 } from "src/app/recepcion/oc5/interfaces/oc5.interface";
import { Oc6 } from "src/app/recepcion/oc6/interfaces/oc6.interface";
import { Contraventor } from "../../contraventor/interfaces/contraventor.interface";
import { DecretoLeyArticuloInciso } from "src/app/nomencladores/interfaces/decreto-ley-articulo-inciso.interface";

export interface Matriz {
    id?: number,
    temporal: boolean;
    oc5?: OC5;
    impositor?: Organismo;
    talon?: any;
    c1: string;
    c2: string;
    fecha: Date;
    importe: number;
    dley_art_inc?: DecretoLeyArticuloInciso;
    tipo_multa?: TipoMulta;
    estado_multa_id: EstadoMulta;
    oc6?: Oc6;
    devolver: boolean;
    recibida_traslado: boolean;
    carga: boolean;
    moneda?: Moneda;
    conceptraslado?: ConceptoTraslado;
    contraventor?: Contraventor;
    nivel: boolean;
    fecha_creacion: Date,
    fecha_edicion: Date
  }