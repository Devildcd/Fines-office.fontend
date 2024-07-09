import { Matriz } from "src/app/base/matriz/interfaces/matriz.interface"
import { SubMovMulta } from "src/app/base/sub-mov-multa/interfaces/sub-mov-multa.interface"
import { ConceptoAjuste } from "src/app/nomencladores/interfaces/concepto-ajuste.interface"

export interface Ajustar {
    id?: number,
    matriz_id: Matriz,
    concepto_ajuste_id: ConceptoAjuste,
    importe_ajustado: number,
    no_res: string,
    observaciones: string,
    mov_multa_id: SubMovMulta,
}

