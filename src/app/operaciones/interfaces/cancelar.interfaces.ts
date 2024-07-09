import { Matriz } from 'src/app/base/matriz/interfaces/matriz.interface';
import { ConceptoCancelacion } from '../../nomencladores/interfaces/concepto-cancelacion.interface';
import { SubMovMulta } from 'src/app/base/sub-mov-multa/interfaces/sub-mov-multa.interface';

export interface Cancelar {
    id?: number,
    id_matriz: Matriz,
    mov_multa_id: SubMovMulta,
    fecha_cancelacion: Date,
    ccancel_id: ConceptoCancelacion,
    notas: string,
}