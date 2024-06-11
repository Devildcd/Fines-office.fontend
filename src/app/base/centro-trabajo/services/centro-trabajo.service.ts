import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CentroTrabajo } from '../interfaces/centroTrabajo.interface';

@Injectable({
  providedIn: 'root'
})
export class CentroTrabajoService {

  baseUrl: string = environment.baseUrlBase;

  constructor(private http: HttpClient) { }

  getCentrosTrabajos(): Observable<CentroTrabajo[]> {
    return this.http.get<CentroTrabajo[]>(`${this.baseUrl}/lista/centrotrabajo`);
  }

  getCentroTrabajo(id: number): Observable<CentroTrabajo> {

    return this.http.get<CentroTrabajo>(`${this.baseUrl}/detalle/centrotrabajo/${id}`);
  }

  postCentroTrabajo(centrotrabajo: CentroTrabajo): Observable<CentroTrabajo> {
    return this.http.post<CentroTrabajo>(`${this.baseUrl}/crear/centrotrabajo/`, centrotrabajo);
  }

  putCentroTrabajo(id: number, centrotrabajo: CentroTrabajo): Observable<CentroTrabajo> {

    return this.http.put<CentroTrabajo>(`${this.baseUrl}/editar/centrotrabajo/${id}/`, centrotrabajo);
  }

  deleteCentroTrabajo(id: number): Observable<CentroTrabajo> {

    return this.http.delete<CentroTrabajo>(`${this.baseUrl}/eliminar/centrotrabajo/${id}/`);
  }
}
