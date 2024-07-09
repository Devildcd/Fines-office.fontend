import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Duplicar } from '../../interfaces/duplicar.interface';

@Injectable({
  providedIn: 'root'
})
export class DuplicarService {

   // baseUrl: string = environment.apiUrlNomencladores;
 baseUrl: string = environment.baseUrlOperaciones;

 constructor(private http: HttpClient) {}

 getDuplicaciones(): Observable<Duplicar[]> {
   // const headers = new HttpHeaders({
   //   'Authorization': `Bearer ${localStorage.getItem('token')}`
   // });

   return this.http.get<Duplicar[]>(`${this.baseUrl}/lista/duplicar`);
 }

 getDuplicacion(id: number): Observable<Duplicar> {
   return this.http.get<Duplicar>(`${this.baseUrl}/detalle/duplicar/${id}`);
 }

 postDuplicacion(duplicacion: Duplicar): Observable<Duplicar> {
   return this.http.post<Duplicar>(
     `${this.baseUrl}/crear/duplicar/`,
     duplicacion
   );
 }

 putDuplicacion(id: number, duplicacion: Duplicar): Observable<Duplicar> {
   return this.http.put<Duplicar>(
     `${this.baseUrl}/editar/duplicar/${id}/`,
     duplicacion
   );
 }

 deleteDuplicacion(id: number): Observable<Duplicar> {
   return this.http.delete<Duplicar>(
     `${this.baseUrl}/eliminar/duplicar/${id}/`
   );
 }
}
