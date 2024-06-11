import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EnviarTraslado } from '../interfaces/enviar-traslado.interface';

@Injectable({
  providedIn: 'root'
})
export class EnviarTrasladoService {

  // baseUrl: string = environment.apiUrlNomencladores;
  baseUrl: string = environment.baseUrlRecepcion;

  constructor(private http: HttpClient) { }

  getEnviarTraslados(): Observable<EnviarTraslado[]> {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    // });

    return this.http.get<EnviarTraslado[]>(`${this.baseUrl}/lista/enviar_traslado`);
  }

  getEnviarTraslado(id: number): Observable<EnviarTraslado> {
    return this.http.get<EnviarTraslado>(`${this.baseUrl}/detalle/enviar_traslado/${id}`);
  }

  postEnviarTraslado(enviar_traslado: EnviarTraslado): Observable<EnviarTraslado> {
    return this.http.post<EnviarTraslado>(`${this.baseUrl}/crear/enviar_traslado/`,enviar_traslado);
  }

  putEnviarTraslado(id: number, enviar_traslado: EnviarTraslado): Observable<EnviarTraslado> {
    return this.http.put<EnviarTraslado>(`${this.baseUrl}/editar/enviar_traslado/${id}/`,enviar_traslado);
  }

  deleteEnviarTraslado(id: number): Observable<EnviarTraslado> {
    return this.http.delete<EnviarTraslado>(`${this.baseUrl}/eliminar/enviar_traslado/${id}/`);
  }
}
