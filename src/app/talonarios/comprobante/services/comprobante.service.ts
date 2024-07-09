import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comprobante } from '../interfaces/comprobante.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {

  baseUrl: string = environment.baseUrlTalonario;

  constructor(private http: HttpClient) {}

  getComprobantes(): Observable<Comprobante[]> {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    // });
    return this.http.get<Comprobante[]>(`${this.baseUrl}/lista/comprobante`);
  }

  getComprobante(id: number): Observable<Comprobante> {
    return this.http.get<Comprobante>(`${this.baseUrl}/detalle/comprobante/${id}`);
  }

  postComprobante(comprobante: Comprobante): Observable<Comprobante> {
    return this.http.post<Comprobante>(
      `${this.baseUrl}/crear/comprobante/`,
      comprobante
    );
  }

  putComprobante(id: number, comprobante: Comprobante): Observable<Comprobante> {
    return this.http.put<Comprobante>(
      `${this.baseUrl}/editar/comprobante/${id}/`,
      comprobante
    );
  }

  deleteComprobante(id: number): Observable<Comprobante> {
    return this.http.delete<Comprobante>(
      `${this.baseUrl}/eliminar/comprobante/${id}/`
    );
  }

}
