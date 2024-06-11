import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Oc37 } from '../interfaces/oc37.interface';

@Injectable({
  providedIn: 'root'
})
export class Oc37Service {

  // baseUrl: string = environment.apiUrlNomencladores;
  baseUrl: string = environment.baseUrlBase;

  constructor(private http: HttpClient) {}

  getModelosOc37(): Observable<Oc37[]> {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    // });

    return this.http.get<Oc37[]>(`${this.baseUrl}/lista/oc37`);
  }

  getModeloOc37(id: number): Observable<Oc37> {
    return this.http.get<Oc37>(`${this.baseUrl}/detalle/oc37/${id}`);
  }

  postModeloOc37(modelosOc37: Oc37): Observable<Oc37> {
    return this.http.post<Oc37>(
      `${this.baseUrl}/crear/oc37/`,
      modelosOc37
    );
  }

  putModeloOc37(id: number, modelosOc5: Oc37): Observable<Oc37> {
    return this.http.put<Oc37>(
      `${this.baseUrl}/editar/oc37/${id}/`,
      modelosOc5
    );
  }

  deleteModeloOc37(id: number): Observable<Oc37> {
    return this.http.delete<Oc37>(
      `${this.baseUrl}/eliminar/oc37/${id}/`
    );
  }
}
