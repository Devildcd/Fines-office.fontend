import { TipoAjuste } from "./tipo-ajuste.inteface";

export interface ConceptoAjuste {
    id?: number,
    descripcion: string,
    tipo_ajuste: TipoAjuste,
    automatico: boolean,
    activo: boolean
}