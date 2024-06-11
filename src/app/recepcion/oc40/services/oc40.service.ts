import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Oc40 } from '../interfaces/oc40.interface';

@Injectable({
  providedIn: 'root'
})
export class Oc40Service {

  // baseUrl: string = environment.apiUrlNomencladores;
  baseUrl: string = environment.baseUrlRecepcion;

  constructor(private http: HttpClient) {}

  getModelosOC40(): Observable<Oc40[]> {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    // });

    return this.http.get<Oc40[]>(`${this.baseUrl}/lista/oc40`);
  }

  getModeloOc40(id: number): Observable<Oc40> {
    return this.http.get<Oc40>(`${this.baseUrl}/detalle/oc40/${id}`);
  }

  postModeloOc40(modeloOc40: Oc40): Observable<Oc40> {
    return this.http.post<Oc40>(
      `${this.baseUrl}/crear/oc40/`,
      modeloOc40
    );
  }

  putModeloOc40(id: number, modeloOc40: Oc40): Observable<Oc40> {
    return this.http.put<Oc40>(
      `${this.baseUrl}/editar/oc40/${id}/`,
      modeloOc40
    );
  }

  deleteModeloOc40(id: number): Observable<Oc40> {
    return this.http.delete<Oc40>(
      `${this.baseUrl}/eliminar/oc40/${id}/`
    );
  }
}
