import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Apremiar } from '../../interfaces/apremiar.interface';

@Injectable({
  providedIn: 'root',
})
export class ApremiarService {
  // baseUrl: string = environment.apiUrlNomencladores;
  baseUrl: string = environment.baseUrlOperaciones;

  constructor(private http: HttpClient) {}

  getApremios(): Observable<Apremiar[]> {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    // });

    return this.http.get<Apremiar[]>(`${this.baseUrl}/lista/apremiar`);
  }

  getApremiar(id: number): Observable<Apremiar> {
    return this.http.get<Apremiar>(`${this.baseUrl}/detalle/apremiar/${id}`);
  }

  postApremiar(apremiar: Apremiar): Observable<Apremiar> {
    return this.http.post<Apremiar>(
      `${this.baseUrl}/crear/apremiar/`,
      apremiar
    );
  }

  putApremiar(id: number, apremiar: Apremiar): Observable<Apremiar> {
    return this.http.put<Apremiar>(
      `${this.baseUrl}/editar/apremiar/${id}/`,
      apremiar
    );
  }

  deleteApremiar(id: number): Observable<Apremiar> {
    return this.http.delete<Apremiar>(
      `${this.baseUrl}/eliminar/apremiar/${id}/`
    );
  }
}
