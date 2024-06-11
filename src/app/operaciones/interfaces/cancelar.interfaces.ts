import { ConceptoCancelacion } from '../../nomencladores/interfaces/concepto-cancelacion.interface';

export interface Cancelar {
    id?: number,
    id_matriz: any,
    mov_multa_id: any,
    fecha_cancelacion: Date,
    ccancel_id: ConceptoCancelacion,
    notas: string,
}