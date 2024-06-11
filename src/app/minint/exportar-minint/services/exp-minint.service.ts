import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExportarMinint } from '../interfaces/exportar-minint.interface';

@Injectable({
  providedIn: 'root'
})
export class ExpMinintService {

  baseUrl: string = environment.baseUrlMinint;

  constructor(private http: HttpClient) { }

  getExportacionesMinint(): Observable<ExportarMinint[]> {
    return this.http.get<ExportarMinint[]>(`${this.baseUrl}/lista/exportarcsvminint`);
  }

  getExportarMinint(id: number): Observable<ExportarMinint> {

    return this.http.get<ExportarMinint>(`${this.baseUrl}/detalle/exportarcsvminint/${id}`);
  }

  postExportarMinint(expMinint: ExportarMinint): Observable<ExportarMinint> {
    return this.http.post<ExportarMinint>(`${this.baseUrl}/crear/exportarcsvminint/`, expMinint);
  }

  putExportarMinint(id: number, expMinint: ExportarMinint): Observable<ExportarMinint> {

    return this.http.put<ExportarMinint>(`${this.baseUrl}/editar/exportarcsvminint/${id}/`, expMinint);
  }

  deleteExportarMinint(id: number): Observable<ExportarMinint> {

    return this.http.delete<ExportarMinint>(`${this.baseUrl}/eliminar/exportarcsvminint/${id}/`);
  }
}
