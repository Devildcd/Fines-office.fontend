import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contraventor } from '../interfaces/contraventor.interface';

@Injectable({
  providedIn: 'root'
})
export class ContraventorService {

  baseUrl: string = environment.baseUrlBase;

  constructor(private http: HttpClient) { }

  getContraventores(): Observable<Contraventor[]> {
    return this.http.get<Contraventor[]>(`${this.baseUrl}/lista/contraventor`);
  }

  getContraventor(id: number): Observable<Contraventor> {

    return this.http.get<Contraventor>(`${this.baseUrl}/detalle/contraventor/${id}`);
  }

  postContraventor(contraventor: Contraventor): Observable<Contraventor> {
    return this.http.post<Contraventor>(`${this.baseUrl}/crear/contraventor/`, contraventor);
  }

  putContraventor(id: number, contraventor: Contraventor): Observable<Contraventor> {

    return this.http.put<Contraventor>(`${this.baseUrl}/editar/contraventor/${id}/`, contraventor);
  }

  deleteContraventor(id: number): Observable<Contraventor> {

    return this.http.delete<Contraventor>(`${this.baseUrl}/eliminar/contraventor/${id}/`);
  }
}
