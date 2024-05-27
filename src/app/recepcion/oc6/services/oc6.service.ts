import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Oc6 } from '../interfaces/oc6.interface';

@Injectable({
  providedIn: 'root'
})
export class Oc6Service {

  // baseUrl: string = environment.apiUrlNomencladores;
  baseUrl: string = environment.baseUrlRecepcion;

  constructor(private http: HttpClient) {}

  getModelosOC6(): Observable<Oc6[]> {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    // });

    return this.http.get<Oc6[]>(`${this.baseUrl}/lista/oc6`);
  }

  getModeloOc6(id: number): Observable<Oc6> {
    return this.http.get<Oc6>(`${this.baseUrl}/detalle/oc6/${id}`);
  }

  postModeloOc6(modelosOc6: Oc6): Observable<Oc6> {
    return this.http.post<Oc6>(
      `${this.baseUrl}/crear/oc6/`,
      modelosOc6
    );
  }

  putModeloOc6(id: number, modelosOc6: Oc6): Observable<Oc6> {
    return this.http.put<Oc6>(
      `${this.baseUrl}/editar/oc6/${id}/`,
      modelosOc6
    );
  }

  deleteModeloOc6(id: number): Observable<Oc6> {
    return this.http.delete<Oc6>(
      `${this.baseUrl}/eliminar/oc6/${id}/`
    );
  }
}
