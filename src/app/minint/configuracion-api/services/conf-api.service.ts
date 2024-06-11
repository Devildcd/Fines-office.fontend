import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfiguracionApi } from '../interfaces/configuracion-api.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfApiService {

  baseUrl: string = environment.baseUrlMinint;

  constructor(private http: HttpClient) { }

  getConfiguracionesApi(): Observable<ConfiguracionApi[]> {
    return this.http.get<ConfiguracionApi[]>(`${this.baseUrl}/lista/configuracionapisuin`);
  }

  getConfiguracionApi(id: number): Observable<ConfiguracionApi> {

    return this.http.get<ConfiguracionApi>(`${this.baseUrl}/detalle/configuracionapisuin/${id}`);
  }

  postConfiguracionApi(confApi: ConfiguracionApi): Observable<ConfiguracionApi> {
    return this.http.post<ConfiguracionApi>(`${this.baseUrl}/crear/configuracionapisuin/`, confApi);
  }

  putConfiguracionApi(id: number, confApi: ConfiguracionApi): Observable<ConfiguracionApi> {

    return this.http.put<ConfiguracionApi>(`${this.baseUrl}/editar/configuracionapisuin/${id}/`, confApi);
  }

  deleteConfiguracionApi(id: number): Observable<ConfiguracionApi> {

    return this.http.delete<ConfiguracionApi>(`${this.baseUrl}/eliminar/configuracionapisuin/${id}/`);
  }
}
