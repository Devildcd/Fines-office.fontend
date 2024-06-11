import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubMovMulta } from '../interfaces/sub-mov-multa.interface';

@Injectable({
  providedIn: 'root'
})
export class SubMovMultaService {

  baseUrl: string = environment.baseUrlBase;

  constructor(private http: HttpClient) { }

  getSubMovMultas(): Observable<SubMovMulta[]> {
    return this.http.get<SubMovMulta[]>(`${this.baseUrl}/lista/submovmulta`);
  }

  getSubMovMulta(id: number): Observable<SubMovMulta> {

    return this.http.get<SubMovMulta>(`${this.baseUrl}/detalle/submovmulta/${id}`);
  }

  postSubMovMulta(submovmulta: SubMovMulta): Observable<SubMovMulta> {
    return this.http.post<SubMovMulta>(`${this.baseUrl}/crear/submovmulta/`, submovmulta);
  }

  putSubMovMulta(id: number, submovmulta: SubMovMulta): Observable<SubMovMulta> {

    return this.http.put<SubMovMulta>(`${this.baseUrl}/editar/submovmulta/${id}/`, submovmulta);
  }

  deleteSubMovMulta(id: number): Observable<SubMovMulta> {

    return this.http.delete<SubMovMulta>(`${this.baseUrl}/eliminar/submovmulta/${id}/`);
  }
}
