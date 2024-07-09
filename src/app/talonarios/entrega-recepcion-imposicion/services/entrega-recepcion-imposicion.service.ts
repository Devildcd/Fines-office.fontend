import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EntregaRecepcionImposicion } from '../interfaces/entrega-recepcion-imposicion.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntregaRecepcionImposicionService {

  baseUrl: string = environment.baseUrlTalonario;

  constructor(private http: HttpClient) {}

  getEntregas_Recepcion_Imposicion(): Observable<EntregaRecepcionImposicion[]> {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    // });

    return this.http.get<EntregaRecepcionImposicion[]>(`${this.baseUrl}/lista/entrega_recepcion_imposicion`);
  }

  getEntrega_Recepcion_Imposicion(id: number): Observable<EntregaRecepcionImposicion> {
    return this.http.get<EntregaRecepcionImposicion>(`${this.baseUrl}/detalle/entrega_recepcion_imposicion/${id}`);
  }


  postEntrega_Recepcion_Imposicion(entrega_recepcion_imposicion: EntregaRecepcionImposicion): Observable<EntregaRecepcionImposicion> {
    return this.http.post<EntregaRecepcionImposicion>(
      `${this.baseUrl}/crear/entrega_recepcion_imposicion/`,
      entrega_recepcion_imposicion
    );
  }

  putEntrega_Recepcion_Imposicion(id: number, entrega_recepcion_imposicion: EntregaRecepcionImposicion): Observable<EntregaRecepcionImposicion> {
    return this.http.put<EntregaRecepcionImposicion>(
      `${this.baseUrl}/editar/entrega_recepcion_imposicion/${id}/`,
      entrega_recepcion_imposicion
    );
  }

  deleteEntrega_Recepcion_Imposicion(id: number): Observable<EntregaRecepcionImposicion> {
    return this.http.delete<EntregaRecepcionImposicion>(
      `${this.baseUrl}/eliminar/entrega_recepcion_imposicion/${id}/`
    );
  }
}
