import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EntregaRecepcion } from '../interfaces/entrega-recepcion.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntregaRecepcionService {

  baseUrl: string = environment.baseUrlTalonario;

  constructor(private http: HttpClient) {}

  getEntregas_Recepcion_Imposicion(): Observable<EntregaRecepcion[]> {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    // });

    return this.http.get<EntregaRecepcion[]>(`${this.baseUrl}/lista/entrega_recepcion_imposicion`);
  }

  getEntrega_Recepcion_Imposicion(id: number): Observable<EntregaRecepcion> {
    return this.http.get<EntregaRecepcion>(`${this.baseUrl}/detalle/entrega_recepcion_imposicion/${id}`);
  }


  postEntrega_Recepcion_Imposicion(entrega_recepcion: EntregaRecepcion): Observable<EntregaRecepcion> {
    return this.http.post<EntregaRecepcion>(
      `${this.baseUrl}/crear/entrega_recepcion_imposicion/`,
      entrega_recepcion
    );
  }

  putEntrega_Recepcion_Imposicion(id: number, entrega_recepcion: EntregaRecepcion): Observable<EntregaRecepcion> {
    return this.http.put<EntregaRecepcion>(
      `${this.baseUrl}/editar/entrega_recepcion_imposicion/${id}/`,
      entrega_recepcion
    );
  }

  deleteEntrega_Recepcion_Imposicion(id: number): Observable<EntregaRecepcion> {
    return this.http.delete<EntregaRecepcion>(
      `${this.baseUrl}/eliminar/entrega_recepcion_imposicion/${id}/`
    );
  }
}
