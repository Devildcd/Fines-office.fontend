import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EntregaRecepcionComprobante } from '../interfaces/entrega-recepcion-comprobante.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntregaRecepcionComprobanteService {

  baseUrl: string = environment.baseUrlTalonario;

  constructor(private http: HttpClient) {}

  getEntregas_Recepcion_Comprobante(): Observable<EntregaRecepcionComprobante[]> {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    // });

    return this.http.get<EntregaRecepcionComprobante[]>(`${this.baseUrl}/lista/entrega_recepcion_comprobante`);
  }

  getEntrega_Recepcion_Comprobante(id: number): Observable<EntregaRecepcionComprobante> {
    return this.http.get<EntregaRecepcionComprobante>(`${this.baseUrl}/detalle/entrega_recepcion_comprobante/${id}`);
  }

  postEntrega_Recepcion_Comprobante(entrega_recepcion_comprobante: EntregaRecepcionComprobante): Observable<EntregaRecepcionComprobante> {
    return this.http.post<EntregaRecepcionComprobante>(
      `${this.baseUrl}/crear/entrega_recepcion_comprobante/`,
      entrega_recepcion_comprobante
    );
  }

  putEntrega_Recepcion_Comprobante(id: number, entrega_recepcion_comprobante: EntregaRecepcionComprobante): Observable<EntregaRecepcionComprobante> {
    return this.http.put<EntregaRecepcionComprobante>(
      `${this.baseUrl}/editar/entrega_recepcion_comprobante/${id}/`,
      entrega_recepcion_comprobante
    );
  }

  deleteEntrega_Recepcion_Comprobante(id: number): Observable<EntregaRecepcionComprobante> {
    return this.http.delete<EntregaRecepcionComprobante>(
      `${this.baseUrl}/eliminar/entrega_recepcion_comprobante/${id}/`
    );
  }
}
