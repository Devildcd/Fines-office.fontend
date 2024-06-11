import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Operador } from '../interfaces/operador.interface';

@Injectable({
  providedIn: 'root'
})
export class OperadorService {

  baseUrl: string = environment.baseUrlBase;

  constructor(private http: HttpClient) { }

  getOperadores(): Observable<Operador[]> {
    return this.http.get<Operador[]>(`${this.baseUrl}/lista/operador`);
  }

  getOperador(id: number): Observable<Operador> {

    return this.http.get<Operador>(`${this.baseUrl}/detalle/operador/${id}`);
  }

  postOperador(operador: Operador): Observable<Operador> {
    return this.http.post<Operador>(`${this.baseUrl}/crear/operador/`, operador);
  }

  putOperador(id: number, operador: Operador): Observable<Operador> {

    return this.http.put<Operador>(`${this.baseUrl}/editar/operador/${id}/`, operador);
  }

  deleteOperador(id: number): Observable<Operador> {

    return this.http.delete<Operador>(`${this.baseUrl}/eliminar/operador/${id}/`);
  }
}
