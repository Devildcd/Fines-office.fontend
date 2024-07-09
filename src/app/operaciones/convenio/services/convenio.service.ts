import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Convenio } from '../../interfaces/convenio.interface';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {

  // baseUrl: string = environment.apiUrlNomencladores;
baseUrl: string = environment.baseUrlOperaciones;

constructor(private http: HttpClient) {}

getConvenios(): Observable<Convenio[]> {
  // const headers = new HttpHeaders({
  //   'Authorization': `Bearer ${localStorage.getItem('token')}`
  // });

  return this.http.get<Convenio[]>(`${this.baseUrl}/lista/convenio`);
}

getConvenio(id: number): Observable<Convenio> {
  return this.http.get<Convenio>(`${this.baseUrl}/detalle/convenio/${id}`);
}

postConvenio(convenio: Convenio): Observable<Convenio> {
  return this.http.post<Convenio>(
    `${this.baseUrl}/crear/convenio/`,
    convenio
  );
}

putConvenio(id: number, convenio: Convenio): Observable<Convenio> {
  return this.http.put<Convenio>(
    `${this.baseUrl}/editar/convenio/${id}/`,
    convenio
  );
}

deleteConvenio(id: number): Observable<Convenio> {
  return this.http.delete<Convenio>(
    `${this.baseUrl}/eliminar/convenio/${id}/`
  );
}
}
