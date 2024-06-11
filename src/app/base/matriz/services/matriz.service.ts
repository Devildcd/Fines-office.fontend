import { Injectable } from '@angular/core';
import { Matriz } from '../interfaces/matriz.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatrizService {

  baseUrl: string = environment.baseUrlBase;

  constructor(private http: HttpClient) { }

  getMatrices(): Observable<Matriz[]> {
    return this.http.get<Matriz[]>(`${this.baseUrl}/lista/matriz`);
  }

  getMatriz(id: number): Observable<Matriz> {

    return this.http.get<Matriz>(`${this.baseUrl}/detalle/matriz/${id}`);
  }

  postMatriz(matriz: Matriz): Observable<Matriz> {
    return this.http.post<Matriz>(`${this.baseUrl}/crear/matriz/`, matriz);
  }

  putMatriz(id: number, matriz: Matriz): Observable<Matriz> {

    return this.http.put<Matriz>(`${this.baseUrl}/editar/matriz/${id}/`, matriz);
  }

  deleteMatriz(id: number): Observable<Matriz> {

    return this.http.delete<Matriz>(`${this.baseUrl}/eliminar/matriz/${id}/`);
  }
}
