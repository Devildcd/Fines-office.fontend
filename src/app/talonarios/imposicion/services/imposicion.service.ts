import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Imposicion } from '../interfaces/imposicion.interface';

@Injectable({
  providedIn: 'root'
})
export class ImposicionService {

  baseUrl: string = environment.baseUrlTalonario;

  constructor(private http: HttpClient) {}

  getImposicions(): Observable<Imposicion[]> {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    // });
    return this.http.get<Imposicion[]>(`${this.baseUrl}/lista/imposicion`);
  }

  getImposicion(id: number): Observable<Imposicion> {
    return this.http.get<Imposicion>(`${this.baseUrl}/detalle/imposicion/${id}`);
  }

  postImposicion(imposicion: Imposicion): Observable<Imposicion> {
    return this.http.post<Imposicion>(
      `${this.baseUrl}/crear/imposicion/`,
      imposicion
    );
  }

  putImposicion(id: number, imposicion: Imposicion): Observable<Imposicion> {
    return this.http.put<Imposicion>(
      `${this.baseUrl}/editar/imposicion/${id}/`,
      imposicion
    );
  }

  deleteImposicion(id: number): Observable<Imposicion> {
    return this.http.delete<Imposicion>(
      `${this.baseUrl}/eliminar/imposicion/${id}/`
    );
  }

}
