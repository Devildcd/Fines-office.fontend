import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ComunicacionEmbargo } from '../../interfaces/comunicacion-embargo.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionEmbargoService {

  // baseUrl: string = environment.apiUrlNomencladores;
baseUrl: string = environment.baseUrlOperaciones;

constructor(private http: HttpClient) {}

getComunicacionEmbargos(): Observable<ComunicacionEmbargo[]> {
  // const headers = new HttpHeaders({
  //   'Authorization': `Bearer ${localStorage.getItem('token')}`
  // });

  return this.http.get<ComunicacionEmbargo[]>(`${this.baseUrl}/lista/comunicacion_embargo`);
}

getComunicacionEmbargo(id: number): Observable<ComunicacionEmbargo> {
  return this.http.get<ComunicacionEmbargo>(`${this.baseUrl}/detalle/comunicacion_embargo/${id}`);
}

postComunicacionEmbargo(comunicacionEmbargo: ComunicacionEmbargo): Observable<ComunicacionEmbargo> {
  return this.http.post<ComunicacionEmbargo>(
    `${this.baseUrl}/crear/comunicacion_embargo/`,
    comunicacionEmbargo
  );
}

putComunicacionEmbargo(id: number, comunicacionEmbargo: ComunicacionEmbargo): Observable<ComunicacionEmbargo> {
  return this.http.put<ComunicacionEmbargo>(
    `${this.baseUrl}/editar/comunicacion_embargo/${id}/`,
    comunicacionEmbargo
  );
}

deleteComunicacionEmbargo(id: number): Observable<ComunicacionEmbargo> {
  return this.http.delete<ComunicacionEmbargo>(
    `${this.baseUrl}/eliminar/comunicacion_embargo/${id}/`
  );
}
}
