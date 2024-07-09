import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ajustar } from '../../interfaces/ajustar.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AjustarService {

  // baseUrl: string = environment.apiUrlNomencladores;
baseUrl: string = environment.baseUrlOperaciones;

constructor(private http: HttpClient) {}

getAjustes(): Observable<Ajustar[]> {
  // const headers = new HttpHeaders({
  //   'Authorization': `Bearer ${localStorage.getItem('token')}`
  // });

  return this.http.get<Ajustar[]>(`${this.baseUrl}/lista/ajustar`);
}

getAjustar(id: number): Observable<Ajustar> {
  return this.http.get<Ajustar>(`${this.baseUrl}/detalle/ajustar/${id}`);
}

postAjustar(ajustar: Ajustar): Observable<Ajustar> {
  return this.http.post<Ajustar>(
    `${this.baseUrl}/crear/ajustar/`,
    ajustar
  );
}

putAjustar(id: number, Ajustar: Ajustar): Observable<Ajustar> {
  return this.http.put<Ajustar>(
    `${this.baseUrl}/editar/ajustar/${id}/`,
    Ajustar
  );
}

deleteAjustar(id: number): Observable<Ajustar> {
  return this.http.delete<Ajustar>(
    `${this.baseUrl}/eliminar/ajustar/${id}/`
  );
}
}
