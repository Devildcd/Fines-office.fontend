import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { Provincia } from '../interfaces/provincia.interface';
import { Municipio } from '../interfaces/municipio.interfaces';
import { Zona } from '../interfaces/zona.interface';
import { Distrito } from '../interfaces/distritos.interface';
import { ConsejoPopular } from '../interfaces/consejo-popular.interface';
import { Calle } from '../interfaces/calles.interface';
import { Calendario } from '../interfaces/calendario.interface';
import { tipoOficina } from '../interfaces/tipo-oficina.interface';
import { OCCM } from '../interfaces/occm.interface';
import { DecretoLey } from '../interfaces/decreto-ley.interface';
import { TipoMulta } from '../interfaces/tipo-multa.interface';
import { TipoDocumento } from '../interfaces/tipo-documento.interface';
import { TipoOperacion } from '../interfaces/tipo-operacion.interface';
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment.prod';
import { Organismo } from '../interfaces/organismo.interface';
import { TipoAjuste } from '../interfaces/tipo-ajuste.inteface';
import { ConceptoAjuste } from '../interfaces/concepto-ajuste.interface';
import { ConceptoCancelacion } from '../interfaces/concepto-cancelacion.interface';
import { ConceptoAnulacion } from '../interfaces/concepto-anulacion.interface';
import { ConceptoTraslado } from '../interfaces/concepto-traslado.interface';
import { ConceptoDevolucion } from '../interfaces/concepto-devolucion.interface';
import { SituacionMulta } from '../interfaces/situacion-multa.interface';
import { Moneda } from '../interfaces/moneda.interface';
import { TipoCobro } from '../interfaces/tipo-cobro.interface';
import { CuentaBancaria } from '../interfaces/cuenta-bancaria.interface';
import { EstadoMulta } from '../interfaces/estado-multa.interface';
import { SituacionLaboral } from '../interfaces/situacion-laboral.interface';
import { Articulo } from '../interfaces/articulo.interface';
import { Inciso } from '../interfaces/inciso.interface';
import { MaxMinCantidad } from '../interfaces/max-min-cantidad.interface';
import { MaxMinimporte } from '../interfaces/max-min-importe.interface';
import { DecretoLeyArticuloInciso } from '../interfaces/decreto-ley-articulo-inciso.interface';
import { CategoriaPeligrosidad } from '../interfaces/categoria-peligrosidad.interface';
import { MedioCobro } from '../interfaces/medio-cobro.interface';


@Injectable({
  providedIn: 'root'
})
export class NomencladoresService {

  // baseUrl: string = environment.apiUrlNomencladores;
  baseUrl: string = environment.baseUrlNomencladores;

  constructor( private http: HttpClient ) { }


  // ******Funciones para Provincias********
  getProvincias(): Observable<Provincia[]> {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    // });

    return this.http.get<Provincia[]>(`${this.baseUrl}/lista/provincia`);
  }


  getProvincia(id: number): Observable<Provincia> {

    return this.http.get<Provincia>(`${this.baseUrl}/detalle/provincia/${id}`);
  }


  postProvincia(provincia: Provincia): Observable<Provincia> {

    return this.http.post<Provincia>(`${this.baseUrl}/crear/provincia/`, provincia);
  }


  putProvincia(id: number, provincia: Provincia): Observable<Provincia> {

    return this.http.put<Provincia>(`${this.baseUrl}/editar/provincia/${id}/`, provincia);
  }


  deleteProvincia(id: number): Observable<Provincia> {

    return this.http.delete<Provincia>(`${this.baseUrl}/eliminar/provincia/${id}/`);
  }


  // ******Funciones para Municipio********

  // Realiza la solicitud para obtener la lista de municipios
  getMunicipios(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.baseUrl}/lista/municipio`);
  }

  getMunicipio(id: number): Observable<Municipio> {

    return this.http.get<Municipio>(`${this.baseUrl}/detalle/municipio/${id}`);
  }

  // Crear Municipio
  postMunicipio(municipio: Municipio): Observable<Municipio> {
    return this.http.post<Municipio>(`${this.baseUrl}/crear/municipio/`, municipio);
  }

  // Editar Municipio
  putMunicipio(id: number, municipio: Municipio): Observable<Municipio> {

    return this.http.put<Municipio>(`${this.baseUrl}/editar/municipio/${id}/`, municipio);
  }

  //Eliminar Municipio
  deleteMunicipio(id: number): Observable<Municipio> {

    return this.http.delete<Municipio>(`${this.baseUrl}/eliminar/municipio/${id}/`);
  }





  // ******Funciones para Zonas********
  getZonas(): Observable<Zona[]> {
    return this.http.get<Zona[]>(`${this.baseUrl}/lista/zona`);
  }

  getZona(id: number): Observable<Zona> {

    return this.http.get<Zona>(`${this.baseUrl}/detalle/zona/${id}`);
  }

  postZona(zona: Zona): Observable<Zona> {
    return this.http.post<Zona>(`${this.baseUrl}/crear/zona/`, zona);
  }

  putZona(id: number, zona: Zona): Observable<Zona> {

    return this.http.put<Zona>(`${this.baseUrl}/editar/zona/${id}/`, zona);
  }

  deleteZona(id: number): Observable<Zona> {

    return this.http.delete<Zona>(`${this.baseUrl}/eliminar/zona/${id}/`);
  }




  // ******Funciones para Distritos********
  getDistritos(): Observable<Distrito[]> {

    return this.http.get<Distrito[]>(`${this.baseUrl}/lista/distrito/`);
  }


  getDistrito(id: number): Observable<Distrito> {

    return this.http.get<Distrito>(`${this.baseUrl}/detalle/distrito/${id}/`);
  }


  postDistrito(distrito: Distrito): Observable<Distrito> {

    return this.http.post<Distrito>(`${this.baseUrl}/crear/distrito/`, distrito);
  }


  putDistrito(id: number, distrito: Distrito): Observable<Distrito> {

    return this.http.put<Distrito>(`${this.baseUrl}/editar/distrito/${id}/`, distrito);
  }


  deleteDistrito(id: number): Observable<Distrito> {

    return this.http.delete<Distrito>(`${this.baseUrl}/eliminar/distrito/${id}/`);
  }




  // ******Funciones para Consejos Populares********
  getConsejoPopulares(): Observable<ConsejoPopular[]> {

    return this.http.get<ConsejoPopular[]>(`${this.baseUrl}/lista/cpopular/`);
  }


  getConsejoPopular(id: number): Observable<ConsejoPopular> {

    return this.http.get<ConsejoPopular>(`${this.baseUrl}/detalle/cpopular/${id}/`);
  }


  postConsejoPopular(cpopular: ConsejoPopular): Observable<ConsejoPopular> {

    return this.http.post<ConsejoPopular>(`${this.baseUrl}/crear/cpopular/`, cpopular);
  }


  putConsejoPopular(id: number, cpopular: ConsejoPopular): Observable<ConsejoPopular> {

    return this.http.put<ConsejoPopular>(`${this.baseUrl}/editar/cpopular/${id}/`, cpopular);
  }


  deleteConsejoPopular(id: number): Observable<ConsejoPopular> {

    return this.http.delete<ConsejoPopular>(`${this.baseUrl}/eliminar/cpopular/${id}/`);
  }




  // ******Funciones para Calles********
  getCalles(): Observable<Calle[]> {

    return this.http.get<Calle[]>(`${this.baseUrl}/lista/calle/`);
  }


  getCalle(id: number): Observable<Calle> {

    return this.http.get<Calle>(`${this.baseUrl}/detalle/calle/${id}/`);
  }


  postCalle(calle: Calle): Observable<Calle> {

    return this.http.post<Calle>(`${this.baseUrl}/crear/calle/`, calle);
  }


  putCalle(id: number, calle: ConsejoPopular): Observable<Calle> {

    return this.http.put<Calle>(`${this.baseUrl}/editar/calle/${id}/`, calle);
  }


  deleteCalle(id: number): Observable<Calle> {

    return this.http.delete<Calle>(`${this.baseUrl}/eliminar/calle/${id}/`);
  }




  // ******Funciones para Calendarios********
  getCalendarios(): Observable<Calendario[]> {

    return this.http.get<Calendario[]>(`${this.baseUrl}/lista/tipoCalendario/`);
  }


  getCalendario(id: number): Observable<Calendario> {

    return this.http.get<Calendario>(`${this.baseUrl}/detalle/tipoCalendario/${id}/`);
  }


  postCalendario(calendario: Calendario): Observable<Calendario> {

    return this.http.post<Calendario>(`${this.baseUrl}/crear/tipoCalendario/`, calendario);
  }


  putCalendario(id: number, calendario: Calendario): Observable<Calendario> {

    return this.http.put<Calendario>(`${this.baseUrl}/editar/tipoCalendario/${id}/`, calendario);
  }


  deleteCalendario(id: number): Observable<Calendario> {

    return this.http.delete<Calendario>(`${this.baseUrl}/eliminar/tipoCalendario/${id}/`);
  }




  // ******Funciones para Tipo de Oficinas********
  getTipoOficinas(): Observable<tipoOficina[]> {

    return this.http.get<tipoOficina[]>(`${this.baseUrl}/lista/tipoOficina/`);
  }


  getTipoOficina(id: number): Observable<tipoOficina> {

    return this.http.get<tipoOficina>(`${this.baseUrl}/detalle/tipoOficina/${id}/`);
  }


  postTipoOficina(oficina: tipoOficina): Observable<tipoOficina> {

    return this.http.post<tipoOficina>(`${this.baseUrl}/crear/tipoOficina/`, oficina);
  }


  putTipoOficina(id: number, oficina: tipoOficina): Observable<Calendario> {

    return this.http.put<tipoOficina>(`${this.baseUrl}/editar/tipoOficina/${id}/`, oficina);
  }


  deleteTipoOficina(id: number): Observable<tipoOficina> {

    return this.http.delete<tipoOficina>(`${this.baseUrl}/eliminar/tipoOficina/${id}/`);
  }




  // ******Funciones para OCCM********
  getOCCMS(): Observable<OCCM[]> {

    return this.http.get<OCCM[]>(`${this.baseUrl}/lista/occm/`);
  }


  getOCCM(id: number): Observable<OCCM> {

    return this.http.get<OCCM>(`${this.baseUrl}/detalle/occm/${id}/`);
  }


  postOCCM(occm: OCCM): Observable<OCCM> {

    return this.http.post<OCCM>(`${this.baseUrl}/crear/occm/`, occm);
  }


  putOCCM(id: number, occm: OCCM): Observable<Calendario> {

    return this.http.put<OCCM>(`${this.baseUrl}/editar/occm/${id}/`, occm);
  }


  deleteOCCM(id: number): Observable<OCCM> {

    return this.http.delete<OCCM>(`${this.baseUrl}/eliminar/occm/${id}/`);
  }
  



  // ******Funciones para Decreto-ley********
  getDecretos(): Observable<DecretoLey[]> {

    return this.http.get<DecretoLey[]>( `${this.baseUrl}/lista/DecretoLey/` );
  }


  getDecreto( id:number ): Observable<DecretoLey> {

    return this.http.get<DecretoLey>( `${this.baseUrl}/detalle/DecretoLey/${id}/`  );
  }


  postDecreto( calle: DecretoLey ): Observable<DecretoLey> {

    return this.http.post<DecretoLey>( `${this.baseUrl}/crear/DecretoLey/`, calle );
  }


  putDecreto( id: number, calle: DecretoLey ): Observable<DecretoLey> {

    return this.http.put<DecretoLey>( `${this.baseUrl}/editar/DecretoLey/${id}/`, calle );
  }
  

  deleteDecreto( id:number ): Observable<DecretoLey> {

    return this.http.delete<DecretoLey>( `${this.baseUrl}/eliminar/DecretoLey/${id}/` );
  }





  // ******Funciones para tipo-multa********
  getTiposMultas(): Observable<TipoMulta[]> {

    return this.http.get<TipoMulta[]>( `${this.baseUrl}/lista/tipoMulta/` );
  }


  getTipoMulta( id:number ): Observable<TipoMulta> {

    return this.http.get<TipoMulta>( `${this.baseUrl}/detalle/tipoMulta/${id}/`  );
  }


  postTipoMulta( tipoMulta: TipoMulta ): Observable<TipoMulta> {

    return this.http.post<TipoMulta>( `${this.baseUrl}/crear/tipoMulta/`, tipoMulta );
  }


  putTipoMulta( id: number, tipoMulta: TipoMulta ): Observable<TipoMulta> {

    return this.http.put<TipoMulta>( `${this.baseUrl}/editar/tipoMulta/${id}/`, tipoMulta );
  }
  

  deleteTipoMulta( id:number ): Observable<TipoMulta> {

    return this.http.delete<TipoMulta>( `${this.baseUrl}/eliminar/tipoMulta/${id}/` );
  }





  // ******Funciones para tipos-documentos********
  getTiposDocumentos(): Observable<TipoDocumento[]> {

    return this.http.get<TipoDocumento[]>( `${this.baseUrl}/lista/tipoDocumento/` );
  }


  getTipoDocumento( id:number ): Observable<TipoDocumento> {

    return this.http.get<TipoDocumento>( `${this.baseUrl}/detalle/tipoDocumento/${id}/`  );
  }


  postTipoDocumento( tipoDocumento: TipoDocumento ): Observable<TipoDocumento> {

    return this.http.post<TipoDocumento>( `${this.baseUrl}/crear/tipoDocumento/`, tipoDocumento );
  }


  putTipoDocumento( id: number, tipoDocumento: TipoDocumento ): Observable<TipoDocumento> {

    return this.http.put<TipoDocumento>( `${this.baseUrl}/editar/tipoDocumento/${id}/`, tipoDocumento );
  }
  

  deleteTipoDocumento( id:number ): Observable<TipoDocumento> {

    return this.http.delete<TipoDocumento>( `${this.baseUrl}/eliminar/tipoDocumento/${id}/` );
  }



  

  // ******Funciones para tipos-operaciones********
  getTiposOperaciones(): Observable<TipoOperacion[]> {

    return this.http.get<TipoOperacion[]>( `${this.baseUrl}/lista/tipoOperaciones/` );
  }


  getTipoOperacion( id:number ): Observable<TipoOperacion> {

    return this.http.get<TipoOperacion>( `${this.baseUrl}/detalle/tipoOperaciones/${id}/`  );
  }


  postTipoOperacion( tipoOperacion: TipoOperacion ): Observable<TipoOperacion> {

    return this.http.post<TipoOperacion>( `${this.baseUrl}/crear/tipoOperaciones/`, tipoOperacion );
  }


  putTipoOperacion( id: number, tipoOperacion: TipoOperacion ): Observable<TipoOperacion> {

    return this.http.put<TipoOperacion>( `${this.baseUrl}/editar/tipoOperaciones/${id}/`, tipoOperacion );
  }
  

  deleteTipoOperacion( id:number ): Observable<TipoOperacion> {

    return this.http.delete<TipoOperacion>( `${this.baseUrl}/eliminar/tipoOperaciones/${id}/` );
  }



  // ******Funciones para organismos********
  getOrganismos(): Observable<Organismo[]> {

    return this.http.get<Organismo[]>( `${this.baseUrl}/lista/organismo/` );
  }


  getOrganismo( id:number ): Observable<Organismo> {

    return this.http.get<Organismo>( `${this.baseUrl}/detalle/organismo/${id}/`  );
  }


  postOrganismo( organismo: Organismo ): Observable<Organismo> {

    return this.http.post<Organismo>( `${this.baseUrl}/crear/organismo/`, organismo );
  }


  putOrganismo( id: number, organismo: Organismo ): Observable<Organismo> {

    return this.http.put<Organismo>( `${this.baseUrl}/editar/organismo/${id}/`, organismo );
  }
  

  deleteOrganismo( id: number ): Observable<Organismo> {

    return this.http.delete<Organismo>( `${this.baseUrl}/eliminar/organismo/${id}/` );
  }
  


  // ******Funciones para tipos-ajustes********
  getTiposAjustes(): Observable<TipoAjuste[]> {

    return this.http.get<TipoAjuste[]>( `${this.baseUrl}/lista/tipoAjuste/` );
  }


  getTipoAjuste( id:number ): Observable<TipoAjuste> {

    return this.http.get<TipoAjuste>( `${this.baseUrl}/detalle/tipoAjuste/${id}/`  );
  }


  postTipoAjuste( tipoAjuste: TipoAjuste ): Observable<TipoAjuste> {

    return this.http.post<TipoAjuste>( `${this.baseUrl}/crear/tipoAjuste/`, tipoAjuste );
  }


  putTipoAjuste( id: number, tipoAjuste: TipoAjuste ): Observable<TipoAjuste> {

    return this.http.put<TipoAjuste>( `${this.baseUrl}/editar/tipoAjuste/${id}/`, tipoAjuste );
  }
  

  deleteTipoAjuste( id: number ): Observable<TipoAjuste> {

    return this.http.delete<TipoAjuste>( `${this.baseUrl}/eliminar/tipoAjuste/${id}/` );
  }




  // ******Funciones para conceptos-ajustes********
  getConceptosAjustes(): Observable<ConceptoAjuste[]> {

    return this.http.get<ConceptoAjuste[]>( `${this.baseUrl}/lista/conceptoAjuste/` );
  }


  getConceptoAjuste( id:number ): Observable<ConceptoAjuste> {

    return this.http.get<ConceptoAjuste>( `${this.baseUrl}/detalle/conceptoAjuste/${id}/`  );
  }


  postConceptoAjuste( conceptoAjuste: ConceptoAjuste ): Observable<ConceptoAjuste> {

    return this.http.post<ConceptoAjuste>( `${this.baseUrl}/crear/conceptoAjuste/`, conceptoAjuste );
  }


  putConceptoAjuste( id: number, conceptoAjuste: ConceptoAjuste ): Observable<ConceptoAjuste> {

    return this.http.put<ConceptoAjuste>( `${this.baseUrl}/editar/conceptoAjuste/${id}/`, conceptoAjuste );
  }
  

  deleteConceptoAjuste( id: number ): Observable<ConceptoAjuste> {

    return this.http.delete<ConceptoAjuste>( `${this.baseUrl}/eliminar/conceptoAjuste/${id}/` );
  }



  // ******Funciones para conceptos-cancelacion********
  getConceptosCancelacion(): Observable<ConceptoCancelacion[]> {

    return this.http.get<ConceptoCancelacion[]>( `${this.baseUrl}/lista/conceptoCancelacion/` );
  }


  getConceptoCancelacion( id:number ): Observable<ConceptoCancelacion> {

    return this.http.get<ConceptoCancelacion>( `${this.baseUrl}/detalle/conceptoCancelacion/${id}/`  );
  }


  postConceptoCancelacion( conceptoCancelacion: ConceptoCancelacion ): Observable<ConceptoCancelacion> {

    return this.http.post<ConceptoCancelacion>( `${this.baseUrl}/crear/conceptoCancelacion/`, conceptoCancelacion );
  }


  putConceptoCancelacion( id: number, conceptoCancelacion: ConceptoCancelacion ): Observable<ConceptoCancelacion> {

    return this.http.put<ConceptoCancelacion>( `${this.baseUrl}/editar/conceptoCancelacion/${id}/`, conceptoCancelacion );
  }
  

  deleteConceptoCancelacion( id: number ): Observable<ConceptoCancelacion> {

    return this.http.delete<ConceptoCancelacion>( `${this.baseUrl}/eliminar/conceptoCancelacion/${id}/` );
  }



  // ******Funciones para conceptos-anulacion********
  getConceptosAnulacion(): Observable<ConceptoAnulacion[]> {

    return this.http.get<ConceptoAnulacion[]>( `${this.baseUrl}/lista/conceptoAnulacion/` );
  }


  getConceptoAnulacion( id:number ): Observable<ConceptoAnulacion> {

    return this.http.get<ConceptoAnulacion>( `${this.baseUrl}/detalle/conceptoAnulacion/${id}/`  );
  }


  postConceptoAnulacion( conceptoAnulacion: ConceptoAnulacion ): Observable<ConceptoAnulacion> {

    return this.http.post<ConceptoAnulacion>( `${this.baseUrl}/crear/conceptoAnulacion/`, conceptoAnulacion );
  }


  putConceptoAnulacion( id: number, conceptoAnulacion: ConceptoAnulacion ): Observable<ConceptoAnulacion> {

    return this.http.put<ConceptoAnulacion>( `${this.baseUrl}/editar/conceptoAnulacion/${id}/`, conceptoAnulacion );
  }
  

  deleteConceptoAnulacion( id: number ): Observable<ConceptoAnulacion> {

    return this.http.delete<ConceptoAnulacion>( `${this.baseUrl}/eliminar/conceptoAnulacion/${id}/` );
  }




  // ******Funciones para conceptos-traslado********
  getConceptosTraslado(): Observable<ConceptoTraslado[]> {

    return this.http.get<ConceptoTraslado[]>( `${this.baseUrl}/lista/conceptoTraslado/` );
  }


  getConceptoTraslado( id:number ): Observable<ConceptoTraslado> {

    return this.http.get<ConceptoTraslado>( `${this.baseUrl}/detalle/conceptoTraslado/${id}/`  );
  }


  postConceptoTraslado( conceptoTraslado: ConceptoTraslado ): Observable<ConceptoTraslado> {

    return this.http.post<ConceptoTraslado>( `${this.baseUrl}/crear/conceptoTraslado/`, conceptoTraslado );
  }


  putConceptoTraslado( id: number, conceptoTraslado: ConceptoTraslado ): Observable<ConceptoTraslado> {

    return this.http.put<ConceptoTraslado>( `${this.baseUrl}/editar/conceptoTraslado/${id}/`, conceptoTraslado );
  }
  

  deleteConceptoTraslado( id: number ): Observable<ConceptoTraslado> {

    return this.http.delete<ConceptoTraslado>( `${this.baseUrl}/eliminar/conceptoTraslado/${id}/` );
  }



  // ******Funciones para conceptos-devoluciones********
  getConceptosDevoluciones(): Observable<ConceptoDevolucion[]> {

    return this.http.get<ConceptoDevolucion[]>( `${this.baseUrl}/lista/conceptoDevolucion/` );
  }


  getConceptoDevolucion( id:number ): Observable<ConceptoDevolucion> {

    return this.http.get<ConceptoDevolucion>( `${this.baseUrl}/detalle/conceptoDevolucion/${id}/`  );
  }


  postConceptoDevolucion( conceptoDevolucion: ConceptoDevolucion ): Observable<ConceptoDevolucion> {

    return this.http.post<ConceptoDevolucion>( `${this.baseUrl}/crear/conceptoDevolucion/`, conceptoDevolucion );
  }


  putConceptoDevolucion( id: number, conceptoDevolucion: ConceptoDevolucion ): Observable<ConceptoDevolucion> {

    return this.http.put<ConceptoDevolucion>( `${this.baseUrl}/editar/conceptoDevolucion/${id}/`, conceptoDevolucion );
  }
  

  deleteConceptoDevolucion( id: number ): Observable<ConceptoDevolucion> {

    return this.http.delete<ConceptoDevolucion>( `${this.baseUrl}/eliminar/conceptoDevolucion/${id}/` );
  }



  // ******Funciones para situaciones-multas********
  getSituacionesMultas(): Observable<SituacionMulta[]> {

    return this.http.get<SituacionMulta[]>( `${this.baseUrl}/lista/SituacionMulta/` );
  }


  getSituacionMulta( id:number ): Observable<SituacionMulta> {

    return this.http.get<SituacionMulta>( `${this.baseUrl}/detalle/SituacionMulta/${id}/`  );
  }


  postSituacionMulta( situacionMulta: SituacionMulta ): Observable<SituacionMulta> {

    return this.http.post<SituacionMulta>( `${this.baseUrl}/crear/SituacionMulta/`, situacionMulta );
  }


  putSituacionMulta( id: number, situacionMulta: SituacionMulta ): Observable<SituacionMulta> {

    return this.http.put<SituacionMulta>( `${this.baseUrl}/editar/SituacionMulta/${id}/`, situacionMulta );
  }
  

  deleteSituacionMulta( id: number ): Observable<SituacionMulta> {

    return this.http.delete<SituacionMulta>( `${this.baseUrl}/eliminar/SituacionMulta/${id}/` );
  }



  // ******Funciones para estado-multas********
  getEstadosMultas(): Observable<EstadoMulta[]> {

    return this.http.get<EstadoMulta[]>( `${this.baseUrl}/lista/EstadoMulta/` );
  }


  getEstadoMulta( id:number ): Observable<EstadoMulta> {

    return this.http.get<EstadoMulta>( `${this.baseUrl}/detalle/EstadoMulta/${id}/`  );
  }


  postEstadoMulta( estadoMulta: EstadoMulta ): Observable<EstadoMulta> {

    return this.http.post<EstadoMulta>( `${this.baseUrl}/crear/EstadoMulta`, estadoMulta );
  }


  putEstadoMulta( id: number, estadoMulta: EstadoMulta ): Observable<EstadoMulta> {

    return this.http.put<EstadoMulta>( `${this.baseUrl}/editar/EstadoMulta/${id}/`, estadoMulta );
  }
  

  deleteEstadoMulta( id: number ): Observable<EstadoMulta> {

    return this.http.delete<EstadoMulta>( `${this.baseUrl}/eliminar/EstadoMulta/${id}/` );
  }



  // ******Funciones para monedas ********

getMonedas(): Observable<Moneda[]> {

  return this.http.get<Moneda[]>( `${this.baseUrl}/lista/moneda/` );
}

getMoneda( id:number ): Observable<Moneda> {

  return this.http.get<Moneda>( `${this.baseUrl}/detalle/moneda/${id}/`  );
}


postMoneda( moneda: Moneda ): Observable<Moneda> {

  return this.http.post<Moneda>( `${this.baseUrl}/crear/moneda/`, moneda );
}


putMoneda( id: number, moneda: Moneda ): Observable<Moneda> {

  return this.http.put<Moneda>( `${this.baseUrl}/editar/moneda/${id}/`, moneda );
}


deleteMoneda( id: number ): Observable<Moneda> {

  return this.http.delete<Moneda>( `${this.baseUrl}/eliminar/moneda/${id}/` );
}



 //******Funciones para tipo de Cobro********

 getTipoCobros(): Observable<TipoCobro[]> {

  return this.http.get<TipoCobro[]>( `${this.baseUrl}/lista/tipoCobro/` );
 }

 getTipoCobro( id:number ): Observable<TipoCobro> {

   return this.http.get<TipoCobro>( `${this.baseUrl}/detalle/tipoCobro/${id}/`  );
 }


 postTipoCobro( tipoCobro: TipoCobro ): Observable<TipoCobro> {

   return this.http.post<TipoCobro>( `${this.baseUrl}/crear/tipoCobro/`, tipoCobro );
 }


 putTipoCobro( id: number, tipoCobro: TipoCobro ): Observable<TipoCobro> {

   return this.http.put<TipoCobro>( `${this.baseUrl}/editar/tipoCobro/${id}/`, tipoCobro );
 }


 deleteTipoCobro( id: number ): Observable<TipoCobro> {

   return this.http.delete<TipoCobro>( `${this.baseUrl}/eliminar/tipoCobro/${id}/` );
 }



 //******Funciones para cuentas-bancarias********

 getCuentasBancarias(): Observable<CuentaBancaria[]> {

  return this.http.get<CuentaBancaria[]>( `${this.baseUrl}/lista/CuentasBancarias/` );
 }

 getCuentaBancaria( id:number ): Observable<CuentaBancaria> {

   return this.http.get<CuentaBancaria>( `${this.baseUrl}/detalle/CuentasBancarias/${id}/`  );
 }


 postCuentaBancaria( cuenta: CuentaBancaria ): Observable<CuentaBancaria> {

   return this.http.post<CuentaBancaria>( `${this.baseUrl}/crear/CuentasBancarias/`, cuenta );
 }


 putCuentaBancaria( id: number, cuenta: CuentaBancaria ): Observable<CuentaBancaria> {

   return this.http.put<CuentaBancaria>( `${this.baseUrl}/editar/CuentasBancarias/${id}/`, cuenta );
 }


 deleteCuentaBancaria( id: number ): Observable<CuentaBancaria> {

   return this.http.delete<CuentaBancaria>( `${this.baseUrl}/eliminar/CuentasBancarias/${id}/` );
 }


 //******Funciones para situaciones-laborales********

getSituacionesLaborales(): Observable<SituacionLaboral[]> {

  return this.http.get<SituacionLaboral[]>( `${this.baseUrl}/lista/SituacionLaboral/`);
 }

 getSituacionLaboral( id:number ): Observable<SituacionLaboral> {

   return this.http.get<SituacionLaboral>( `${this.baseUrl}/detalle/SituacionLaboral/${id}/`  );
 }


 postSituacionLaboral( situacionLaboral: SituacionLaboral ): Observable<SituacionLaboral> {

   return this.http.post<SituacionLaboral>( `${this.baseUrl}/crear/SituacionLaboral/`, situacionLaboral );
 }


 putSituacionLaboral( id: number, situacionLaboral: SituacionLaboral ): Observable<SituacionLaboral> {

   return this.http.put<SituacionLaboral>( `${this.baseUrl}/editar/SituacionLaboral/${id}/`, situacionLaboral );
 }


 deleteSituacionLaboral( id: number ): Observable<SituacionLaboral> {

   return this.http.delete<SituacionLaboral>( `${this.baseUrl}/eliminar/SituacionLaboral/${id}/` );
 }

//******Funciones para articulos********

getArticulos(): Observable<Articulo[]> {

  return this.http.get<Articulo[]>( `${this.baseUrl}/lista/articulo/`);
 }

 getArticulo( id:number ): Observable<Articulo> {

   return this.http.get<Articulo>( `${this.baseUrl}/detalle/articulo/${id}/`  );
 }


 postArticulo( articulo: Articulo ): Observable<Articulo> {

   return this.http.post<Articulo>( `${this.baseUrl}/crear/articulo/`, articulo );
 }


 putArticulo( id: number, articulo: Articulo ): Observable<Articulo> {

   return this.http.put<Articulo>( `${this.baseUrl}/editar/articulo/${id}/`, articulo );
 }


 deleteArticulo( id: number ): Observable<Articulo> {

   return this.http.delete<Articulo>( `${this.baseUrl}/eliminar/articulo/${id}/` );
 }

//******Funciones para incisos********

getIncisos(): Observable<Inciso[]> {

  return this.http.get<Inciso[]>( `${this.baseUrl}/lista/inciso/`);
 }

 getInciso( id:number ): Observable<Inciso> {

   return this.http.get<Inciso>( `${this.baseUrl}/detalle/inciso/${id}/`  );
 }


 postInciso( inciso: Inciso ): Observable<Inciso> {

   return this.http.post<Inciso>( `${this.baseUrl}/crear/inciso/`, inciso );
 }


 putInciso( id: number, inciso: Inciso ): Observable<Inciso> {

   return this.http.put<Inciso>( `${this.baseUrl}/editar/inciso/${id}/`, inciso );
 }


 deleteInciso( id: number ): Observable<Inciso> {

   return this.http.delete<Inciso>( `${this.baseUrl}/eliminar/inciso/${id}/` );
 }



 //******Funciones para rangos de cantidad********

getRangosCantidades(): Observable<MaxMinCantidad[]> {

  return this.http.get<MaxMinCantidad[]>( `${this.baseUrl}/lista/maxmincantidad/`);
 }

 getRangoCantidad( id:number ): Observable<MaxMinCantidad> {

   return this.http.get<MaxMinCantidad>( `${this.baseUrl}/detalle/maxmincantidad/${id}/`  );
 }


 postRangoCantidad( rangoCantidad: MaxMinCantidad ): Observable<MaxMinCantidad> {

   return this.http.post<MaxMinCantidad>( `${this.baseUrl}/crear/maxmincantidad/`, rangoCantidad );
 }


 putRangoCantidad( id: number, rangoCantidad: MaxMinCantidad ): Observable<MaxMinCantidad> {

   return this.http.put<MaxMinCantidad>( `${this.baseUrl}/editar/maxmincantidad/${id}/`, rangoCantidad );
 }


 deleteRangoCantidad( id: number ): Observable<MaxMinCantidad> {

   return this.http.delete<MaxMinCantidad>( `${this.baseUrl}/eliminar/maxmincantidad/${id}/` );
 }



 //******Funciones para rango de importe********

 getRangosImportes(): Observable<MaxMinimporte[]> {

  return this.http.get<MaxMinimporte[]>( `${this.baseUrl}/lista/maxminimporte/`);
 }

 getRangoImporte( id:number ): Observable<MaxMinimporte> {

   return this.http.get<MaxMinimporte>( `${this.baseUrl}/detalle/maxminimporte/${id}/`  );
 }


 postRangoImporte( rangoImporte: MaxMinimporte ): Observable<MaxMinimporte> {

   return this.http.post<MaxMinimporte>( `${this.baseUrl}/crear/maxminimporte/`, rangoImporte );
 }


 putRangoImporte( id: number, rangoImporte: MaxMinimporte ): Observable<MaxMinimporte> {

   return this.http.put<MaxMinimporte>( `${this.baseUrl}/editar/maxminimporte/${id}/`, rangoImporte );
 }


 deleteRangoImporte( id: number ): Observable<MaxMinimporte> {

   return this.http.delete<MaxMinimporte>( `${this.baseUrl}/eliminar/maxminimporte/${id}/` );
 }



 //******Funciones para decreto-ley-articulo-inciso********

 getDecLeyArticulosIncisos(): Observable<DecretoLeyArticuloInciso[]> {

  return this.http.get<DecretoLeyArticuloInciso[]>( `${this.baseUrl}/lista/DLeyArtInc/`);
 }

 getDecLeyArticuloInciso( id:number ): Observable<DecretoLeyArticuloInciso> {

   return this.http.get<DecretoLeyArticuloInciso>( `${this.baseUrl}/detalle/DLeyArtInc/${id}/`  );
 }


 postDecLeyArticuloInciso( decretoLeyArtInciso: DecretoLeyArticuloInciso ): Observable<DecretoLeyArticuloInciso> {

   return this.http.post<DecretoLeyArticuloInciso>( `${this.baseUrl}/crear/DLeyArtInc/`, decretoLeyArtInciso );
 }


 putDecLeyArticuloInciso( id: number, decretoLeyArtInciso: DecretoLeyArticuloInciso ): Observable<DecretoLeyArticuloInciso> {

   return this.http.put<DecretoLeyArticuloInciso>( `${this.baseUrl}/editar/DLeyArtInc/${id}/`, decretoLeyArtInciso );
 }


 deleteDecLeyArticuloInciso( id: number ): Observable<DecretoLeyArticuloInciso> {

   return this.http.delete<DecretoLeyArticuloInciso>( `${this.baseUrl}/eliminar/DLeyArtInc/${id}/` );
 }


 //******Funciones para categorias peligrosidades********

getCategoriasPeligrosidades(): Observable<CategoriaPeligrosidad[]> {

  return this.http.get<CategoriaPeligrosidad[]>( `${this.baseUrl}/lista/CategPeligro/`);
 }

 getCategoriaPeligrosidad( id:number ): Observable<CategoriaPeligrosidad> {

   return this.http.get<CategoriaPeligrosidad>( `${this.baseUrl}/detalle/CategPeligro/${id}/`);
 }


 postCategoriaPeligrosidad( categoriaPeligrosidad: CategoriaPeligrosidad ): Observable<CategoriaPeligrosidad> {

   return this.http.post<CategoriaPeligrosidad>( `${this.baseUrl}/crear/CategPeligro/`,categoriaPeligrosidad);
 }


 putCategoriaPeligrosidad( id: number,  categoriaPeligrosidad: CategoriaPeligrosidad): Observable<CategoriaPeligrosidad> {

   return this.http.put<CategoriaPeligrosidad>( `${this.baseUrl}/editar/CategPeligro/${id}/`,categoriaPeligrosidad);
 }


 deleteCategoriaPeligrosidad( id: number ): Observable<CategoriaPeligrosidad> {

   return this.http.delete<CategoriaPeligrosidad>( `${this.baseUrl}/eliminar/CategPeligro/${id}/`);
 }


 
//******Funciones para medios cobros  medioCobro********

getMediosCobros(): Observable< MedioCobro[]> {

  return this.http.get<MedioCobro[]>( `${this.baseUrl}/lista/MediosCobro/`);
 }

 getMedioCobro( id:number ): Observable< MedioCobro> {

   return this.http.get< MedioCobro>( `${this.baseUrl}/detalle/MediosCobro/${id}/`);
 }


 postMedioCobro( medioCobro: MedioCobro ): Observable<MedioCobro> {

   return this.http.post<MedioCobro>( `${this.baseUrl}/crear/MediosCobro/`,medioCobro);
 }


 putMedioCobro( id: number,  medioCobro: MedioCobro): Observable<MedioCobro> {

   return this.http.put<MedioCobro>( `${this.baseUrl}/editar/MediosCobro/${id}/`,medioCobro);
 }


 deleteMedioCobro( id: number ): Observable<MedioCobro> {

   return this.http.delete<MedioCobro>( `${this.baseUrl}/eliminar/MediosCobro/${id}/`);
 }


}
