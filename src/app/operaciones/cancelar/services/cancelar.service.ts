import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cancelar } from '../../interfaces/cancelar.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CancelarService {

   // baseUrl: string = environment.apiUrlNomencladores;
   baseUrl: string = environment.baseUrlOperaciones;

   constructor(private http: HttpClient) {}
 
   getCancelaciones(): Observable<Cancelar[]> {
     // const headers = new HttpHeaders({
     //   'Authorization': `Bearer ${localStorage.getItem('token')}`
     // });
 
     return this.http.get<Cancelar[]>(`${this.baseUrl}/lista/cancelar/`);
   }
 
   getCancelar(id: number): Observable<Cancelar> {
     return this.http.get<Cancelar>(`${this.baseUrl}/detalle/cancelar/${id}`);
   }
 
   postCancelar(cancelar: Cancelar): Observable<Cancelar> {
     return this.http.post<Cancelar>(
       `${this.baseUrl}/crear/cancelar/`,
       cancelar
     );
   }
 
   putCancelar(id: number, cancelar: Cancelar): Observable<Cancelar> {
     return this.http.put<Cancelar>(
       `${this.baseUrl}/editar/cancelar/${id}/`,
       cancelar
     );
   }
 
   deleteCancelar(id: number): Observable<Cancelar> {
     return this.http.delete<Cancelar>(
       `${this.baseUrl}/eliminar/cancelar/${id}/`
     );
   }
}
