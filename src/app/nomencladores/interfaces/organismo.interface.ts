import { DecretoLey } from "./decreto-ley.interface";
import { TipoMulta } from "./tipo-multa.interface";

export interface Organismo {
  id?: number,
  id_organismo: string,
  nombre: string,
  decreto_ley_id: DecretoLey[], 
  asociado: boolean, 
  asociado_id?: Organismo, 
  tipo_multa_id: TipoMulta, 
  activo: boolean, 
}