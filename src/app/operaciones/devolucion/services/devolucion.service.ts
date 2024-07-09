import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Devolucion } from '../../interfaces/devolucion.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevolucionService {
  
 // baseUrl: string = environment.apiUrlNomencladores;
 baseUrl: string = environment.baseUrlOperaciones;

 constructor(private http: HttpClient) {}

 getDevoluciones(): Observable<Devolucion[]> {
   // const headers = new HttpHeaders({
   //   'Authorization': `Bearer ${localStorage.getItem('token')}`
   // });

   return this.http.get<Devolucion[]>(`${this.baseUrl}/lista/devolucion`);
 }

 getDevolucion(id: number): Observable<Devolucion> {
   return this.http.get<Devolucion>(`${this.baseUrl}/detalle/devolucion/${id}`);
 }

 postDevolucion(devolucion: Devolucion): Observable<Devolucion> {
   return this.http.post<Devolucion>(
     `${this.baseUrl}/crear/devolucion/`,
     devolucion
   );
 }

 putDevolucion(id: number, devolucion: Devolucion): Observable<Devolucion> {
   return this.http.put<Devolucion>(
     `${this.baseUrl}/editar/devolucion/${id}/`,
     devolucion
   );
 }

 deleteDevolucion(id: number): Observable<Devolucion> {
   return this.http.delete<Devolucion>(
     `${this.baseUrl}/eliminar/devolucion/${id}/`
   );
 }
}
