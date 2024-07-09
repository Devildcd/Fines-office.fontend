import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConvenioPlazo } from '../../interfaces/convenio-plazo.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvenioPlazoService {
// baseUrl: string = environment.apiUrlNomencladores;
baseUrl: string = environment.baseUrlOperaciones;

constructor(private http: HttpClient) {}

getConvenioPlazos(): Observable<ConvenioPlazo[]> {
  // const headers = new HttpHeaders({
  //   'Authorization': `Bearer ${localStorage.getItem('token')}`
  // });

  return this.http.get<ConvenioPlazo[]>(`${this.baseUrl}/lista/convenioplazo`);
}

getConvenioPlazo(id: number): Observable<ConvenioPlazo> {
  return this.http.get<ConvenioPlazo>(`${this.baseUrl}/detalle/convenioplazo/${id}`);
}

postConvenioPlazo(convenioPlazo: ConvenioPlazo): Observable<ConvenioPlazo> {
  return this.http.post<ConvenioPlazo>(
    `${this.baseUrl}/crear/convenioplazo/`,
    convenioPlazo
  );
}

putConvenioPlazo(id: number, convenioPlazo: ConvenioPlazo): Observable<ConvenioPlazo> {
  return this.http.put<ConvenioPlazo>(
    `${this.baseUrl}/editar/convenioplazo/${id}/`,
    convenioPlazo
  );
}

deleteConvenioPlazo(id: number): Observable<ConvenioPlazo> {
  return this.http.delete<ConvenioPlazo>(
    `${this.baseUrl}/eliminar/convenioplazo/${id}/`
  );
}
}
