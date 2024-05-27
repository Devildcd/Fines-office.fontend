import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OC5 } from '../interfaces/oc5.interface';

@Injectable({
  providedIn: 'root'
})
export class Oc5Service {

  // baseUrl: string = environment.apiUrlNomencladores;
  baseUrl: string = environment.baseUrlRecepcion;

  constructor(private http: HttpClient) {}

  getModelosOC5(): Observable<OC5[]> {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    // });

    return this.http.get<OC5[]>(`${this.baseUrl}/lista/oc5`);
  }

  getModeloOc5(id: number): Observable<OC5> {
    return this.http.get<OC5>(`${this.baseUrl}/detalle/oc5/${id}`);
  }

  postModeloOc5(modelosOc5: OC5): Observable<OC5> {
    return this.http.post<OC5>(
      `${this.baseUrl}/crear/oc5/`,
      modelosOc5
    );
  }

  putModeloOc5(id: number, modelosOc5: OC5): Observable<OC5> {
    return this.http.put<OC5>(
      `${this.baseUrl}/editar/oc5/${id}/`,
      modelosOc5
    );
  }

  deleteModeloOc5(id: number): Observable<OC5> {
    return this.http.delete<OC5>(
      `${this.baseUrl}/eliminar/oc5/${id}/`
    );
  }
}
