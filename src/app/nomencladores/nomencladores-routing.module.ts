import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProvinciasComponent } from './pages/provincias/provincias.component';
import { ProvinciaCreateComponent } from './pages/provincias/provincia-create/provincia-create.component';
import { ProvinciaEditComponent } from './pages/provincias/provincia-edit/provincia-edit.component';
import { MunicipiosComponent } from './pages/municipios/municipios.component';
import { MunicipioCreateComponent } from './pages/municipios/municipio-create/municipio-create.component';
import { MunicipioEditComponent } from './pages/municipios/municipio-edit/municipio-edit.component';
import { DistritosComponent } from './pages/distritos/distritos.component';
import { ConsejosPopularesComponent } from './pages/consejos-populares/consejos-populares.component';
import { CallesComponent } from './pages/calles/calles.component';
import { CalleCreateComponent } from './pages/calles/calle-create/calle-create.component';
import { CalleEditComponent } from './pages/calles/calle-edit/calle-edit.component';
import { TiposOficinasComponent } from './pages/tipos-oficinas/tipos-oficinas.component';
import { TipoOficinaCreateComponent } from './pages/tipos-oficinas/tipo-oficina-create/tipo-oficina-create.component';
import { TipoOficinaEditComponent } from './pages/tipos-oficinas/tipo-oficina-edit/tipo-oficina-edit.component';
import { OccmComponent } from './pages/occm/occm.component';
import { OccmCreateComponent } from './pages/occm/occm-create/occm-create.component';
import { OccmEditComponent } from './pages/occm/occm-edit/occm-edit.component';
import { OrganismosComponent } from './pages/organismos/organismos.component';
import { OrganismoCreateComponent } from './pages/organismos/organismo-create/organismo-create.component';
import { OrganismoEditComponent } from './pages/organismos/organismo-edit/organismo-edit.component';
import { DistritoCreateComponent } from './pages/distritos/distrito-create/distrito-create.component';
import { DistritoEditComponent } from './pages/distritos/distrito-edit/distrito-edit.component';
import { ConsejoPopularCreateComponent } from './pages/consejos-populares/consejo-popular-create/consejo-popular-create.component';
import { ConsejoPopularEditComponent } from './pages/consejos-populares/consejo-popular-edit/consejo-popular-edit.component';
import { HomeComponent } from './pages/home/home.component';
import { ProvinciaShowComponent } from './pages/provincias/provincia-show/provincia-show.component';
import { DistritoShowComponent } from './pages/distritos/distrito-show/distrito-show.component';
import { ConsejoPopularShowComponent } from './pages/consejos-populares/consejo-popular-show/consejo-popular-show.component';
import { MunicipioShowComponent } from './pages/municipios/municipio-show/municipio-show.component';
import { CalleShowComponent } from './pages/calles/calle-show/calle-show.component';
import { TipoOficinaShowComponent } from './pages/tipos-oficinas/tipo-oficina-show/tipo-oficina-show.component';
import { OccmShowComponent } from './pages/occm/occm-show/occm-show.component';
import { OrganismoShowComponent } from './pages/organismos/organismo-show/organismo-show.component';

import { ZonaCreateComponent } from './pages/zonas/zona-create/zona-create.component';
import { ZonaEditComponent } from './pages/zonas/zona-edit/zona-edit.component';
import { ZonaShowComponent } from './pages/zonas/zona-show/zona-show.component';
import { ZonasComponent } from './pages/zonas/zonas.component';
import { CalendariosComponent } from './pages/calendarios/calendarios.component';
import { CalendariosCreateComponent } from './pages/calendarios/calendarios-create/calendarios-create.component';
import { CalendariosShowComponent } from './pages/calendarios/calendarios-show/calendarios-show.component';
import { CalendariosEditComponent } from './pages/calendarios/calendarios-edit/calendarios-edit.component';
import { TiposMultasComponent } from './pages/tipos-multas/tipos-multas.component';
import { TipoMultaCreateComponent } from './pages/tipos-multas/tipo-multa-create/tipo-multa-create.component';
import { TipoMultaEditComponent } from './pages/tipos-multas/tipo-multa-edit/tipo-multa-edit.component';
import { TipoMultaShowComponent } from './pages/tipos-multas/tipo-multa-show/tipo-multa-show.component';
import { DecretoLeyComponent } from './pages/decreto-ley/decreto-ley.component';
import { DecretoLeyCreateComponent } from './pages/decreto-ley/decreto-ley-create/decreto-ley-create.component';
import { DecretoLeyEditComponent } from './pages/decreto-ley/decreto-ley-edit/decreto-ley-edit.component';
import { DecretoLeyShowComponent } from './pages/decreto-ley/decreto-ley-show/decreto-ley-show.component';
import { TiposDocumentosComponent } from './pages/tipos-documentos/tipos-documentos.component';
import { TipoDocumentoCreateComponent } from './pages/tipos-documentos/tipo-documento-create/tipo-documento-create.component';
import { TipoDocumentoEditComponent } from './pages/tipos-documentos/tipo-documento-edit/tipo-documento-edit.component';
import { TipoDocumentoShowComponent } from './pages/tipos-documentos/tipo-documento-show/tipo-documento-show.component';
import { TiposOperacionesComponent } from './pages/tipos-operaciones/tipos-operaciones.component';
import { TipoOperacionCreateComponent } from './pages/tipos-operaciones/tipo-operacion-create/tipo-operacion-create.component';
import { TipoOperacionEditComponent } from './pages/tipos-operaciones/tipo-operacion-edit/tipo-operacion-edit.component';
import { TipoOperacionShowComponent } from './pages/tipos-operaciones/tipo-operacion-show/tipo-operacion-show.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TiposAjustesComponent } from './pages/tipos-ajustes/tipos-ajustes.component';
import { TipoAjusteCreateComponent } from './pages/tipos-ajustes/tipo-ajuste-create/tipo-ajuste-create.component';
import { TipoAjusteEditComponent } from './pages/tipos-ajustes/tipo-ajuste-edit/tipo-ajuste-edit.component';
import { TipoAjusteShowComponent } from './pages/tipos-ajustes/tipo-ajuste-show/tipo-ajuste-show.component';
import { ConceptosAjustesComponent } from './pages/conceptos-ajustes/conceptos-ajustes.component';
import { ConceptoAjusteCreateComponent } from './pages/conceptos-ajustes/concepto-ajuste-create/concepto-ajuste-create.component';
import { ConceptoAjusteEditComponent } from './pages/conceptos-ajustes/concepto-ajuste-edit/concepto-ajuste-edit.component';
import { ConceptoAjusteShowComponent } from './pages/conceptos-ajustes/concepto-ajuste-show/concepto-ajuste-show.component';
import { ConceptosCancelacionComponent } from './pages/conceptos-cancelacion/conceptos-cancelacion.component';
import { ConceptoCancelacionCreateComponent } from './pages/conceptos-cancelacion/concepto-cancelacion-create/concepto-cancelacion-create.component';
import { ConceptoCancelacionEditComponent } from './pages/conceptos-cancelacion/concepto-cancelacion-edit/concepto-cancelacion-edit.component';
import { ConceptoCancelacionShowComponent } from './pages/conceptos-cancelacion/concepto-cancelacion-show/concepto-cancelacion-show.component';
import { ConceptosAnulacionComponent } from './pages/conceptos-anulacion/conceptos-anulacion.component';
import { ConceptoAnulacionCreateComponent } from './pages/conceptos-anulacion/concepto-anulacion-create/concepto-anulacion-create.component';
import { ConceptoAnulacionEditComponent } from './pages/conceptos-anulacion/concepto-anulacion-edit/concepto-anulacion-edit.component';
import { ConceptoAnulacionShowComponent } from './pages/conceptos-anulacion/concepto-anulacion-show/concepto-anulacion-show.component';
import { ConceptosTrasladoComponent } from './pages/conceptos-traslado/conceptos-traslado.component';
import { ConceptoTrasladoCreateComponent } from './pages/conceptos-traslado/concepto-traslado-create/concepto-traslado-create.component';
import { ConceptoTrasladoEditComponent } from './pages/conceptos-traslado/concepto-traslado-edit/concepto-traslado-edit.component';
import { ConceptoTrasladoShowComponent } from './pages/conceptos-traslado/concepto-traslado-show/concepto-traslado-show.component';
import { ConceptosDevolucionesComponent } from './pages/conceptos-devoluciones/conceptos-devoluciones.component';
import { ConceptoDevolucionCreateComponent } from './pages/conceptos-devoluciones/concepto-devolucion-create/concepto-devolucion-create.component';
import { ConceptoDevolucionEditComponent } from './pages/conceptos-devoluciones/concepto-devolucion-edit/concepto-devolucion-edit.component';
import { ConceptoDevolucionShowComponent } from './pages/conceptos-devoluciones/concepto-devolucion-show/concepto-devolucion-show.component';
import { SituacionMultasComponent } from './pages/situacion-multas/situacion-multas.component';
import { SituacionMultaCreateComponent } from './pages/situacion-multas/situacion-multa-create/situacion-multa-create.component';
import { SituacionMultaEditComponent } from './pages/situacion-multas/situacion-multa-edit/situacion-multa-edit.component';
import { SituacionMultaShowComponent } from './pages/situacion-multas/situacion-multa-show/situacion-multa-show.component';
import { EstadosMultasComponent } from './pages/estados-multas/estados-multas.component';
import { EstadoMultaCreateComponent } from './pages/estados-multas/estado-multa-create/estado-multa-create.component';
import { EstadoMultaEditComponent } from './pages/estados-multas/estado-multa-edit/estado-multa-edit.component';
import { EstadoMultaShowComponent } from './pages/estados-multas/estado-multa-show/estado-multa-show.component';
import { MonedasComponent } from './pages/moneda/monedas.component';
import { MonedaCreateComponent } from './pages/moneda/moneda-create/moneda-create/moneda-create.component';
import { MonedaEditComponent } from './pages/moneda/moneda-edit/moneda-edit/moneda-edit.component';
import { MonedaShowComponent } from './pages/moneda/moneda-show/moneda-show/moneda-show.component';
import { TipoCobrosComponent } from './pages/tipo-cobros/tipo-cobros.component';
import { TipoCobroCreateComponent } from './pages/tipo-cobros/tipo-cobro-create/tipo-cobro-create.component';
import { TipoCobroEditComponent } from './pages/tipo-cobros/tipo-cobro-edit/tipo-cobro-edit.component';
import { TipoCobroShowComponent } from './pages/tipo-cobros/tipo-cobro-show/tipo-cobro-show.component';
import { CuentasBancariasComponent } from './pages/cuentas-bancarias/cuentas-bancarias.component';
import { CuentaBancariaCreateComponent } from './pages/cuentas-bancarias/cuenta-bancaria-create/cuenta-bancaria-create.component';
import { CuentaBancariaEditComponent } from './pages/cuentas-bancarias/cuenta-bancaria-edit/cuenta-bancaria-edit.component';
import { CuentaBancariaShowComponent } from './pages/cuentas-bancarias/cuenta-bancaria-show/cuenta-bancaria-show.component';
import { SituacionesLaboralesComponent } from './pages/situaciones-laborales/situaciones-laborales.component';
import { SituacionLaboralCreateComponent } from './pages/situaciones-laborales/situacion-laboral-create/situacion-laboral-create.component';
import { SituacionLaboralEditComponent } from './pages/situaciones-laborales/situacion-laboral-edit/situacion-laboral-edit.component';
import { SituacionLaboralShowComponent } from './pages/situaciones-laborales/situacion-laboral-show/situacion-laboral-show.component';
import { ArticulosComponent } from './pages/articulos/articulos.component';
import { ArticuloCreateComponent } from './pages/articulos/articulo-create/articulo-create.component';
import { ArticuloEditComponent } from './pages/articulos/articulo-edit/articulo-edit.component';
import { ArticuloShowComponent } from './pages/articulos/articulo-show/articulo-show.component';
import { IncisosComponent } from './pages/incisos/incisos.component';
import { IncisoCreateComponent } from './pages/incisos/inciso-create/inciso-create.component';
import { IncisoEditComponent } from './pages/incisos/inciso-edit/inciso-edit.component';
import { IncisoShowComponent } from './pages/incisos/inciso-show/inciso-show.component';
import { MaxMinCantidadComponent } from './pages/max-min-cantidad/max-min-cantidad.component';
import { MaxMinCantidadCreateComponent } from './pages/max-min-cantidad/max-min-cantidad-create/max-min-cantidad-create.component';
import { MaxMinCantidadEditComponent } from './pages/max-min-cantidad/max-min-cantidad-edit/max-min-cantidad-edit.component';
import { MaxMinCantidadShowComponent } from './pages/max-min-cantidad/max-min-cantidad-show/max-min-cantidad-show.component';
import { MaxMinImportesComponent } from './pages/max-min-importes/max-min-importes.component';
import { MaxMinImportesCreateComponent } from './pages/max-min-importes/max-min-importes-create/max-min-importes-create.component';
import { MaxMinImporteEditComponent } from './pages/max-min-importes/max-min-importe-edit/max-min-importe-edit.component';
import { MaxMinImporteShowComponent } from './pages/max-min-importes/max-min-importe-show/max-min-importe-show.component';
import { DecretoLeyArticuloIncisoComponent } from './pages/decreto-ley-articulo-inciso/decreto-ley-articulo-inciso.component';
import { DecretoLeyArticuloIncisoShowComponent } from './pages/decreto-ley-articulo-inciso/decreto-ley-articulo-inciso-show/decreto-ley-articulo-inciso-show.component';
import { DecretoLeyArticuloIncisoEditComponent } from './pages/decreto-ley-articulo-inciso/decreto-ley-articulo-inciso-edit/decreto-ley-articulo-inciso-edit.component';
import { DecretoLeyArticuloIncisoCreateComponent } from './pages/decreto-ley-articulo-inciso/decreto-ley-articulo-inciso-create/decreto-ley-articulo-inciso-create.component';
import { CategoriasPeligrosidadesComponent } from './pages/categorias-peligrosidades/categorias-peligrosidades.component';
import { CategoriaPeligrosidadCreateComponent } from './pages/categorias-peligrosidades/categoria-peligrosidad-create/categoria-peligrosidad-create.component';
import { CategoriaPeligrosidadEditComponent } from './pages/categorias-peligrosidades/categoria-peligrosidad-edit/categoria-peligrosidad-edit.component';
import { CategoriaPeligrosidadShowComponent } from './pages/categorias-peligrosidades/categoria-peligrosidad-show/categoria-peligrosidad-show.component';
import { MediosCobrosComponent } from './pages/medios-cobros/medios-cobros.component';
import { MedioCobroCreateComponent } from './pages/medios-cobros/medio-cobro-create/medio-cobro-create.component';
import { MedioCobroEditComponent } from './pages/medios-cobros/medio-cobro-edit/medio-cobro-edit.component';
import { MedioCobroShowComponent } from './pages/medios-cobros/medio-cobro-show/medio-cobro-show.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      //****** Nomencladores******//
      // provincias
	  {
		 path: 'inicio',
        component: DashboardComponent,
	  },
      {
        path: 'divisiones/provincias',
        component: ProvinciasComponent,
      },
      {
        path: 'divisiones/crear/provincia',
        component: ProvinciaCreateComponent,
      },
      {
        path: 'divisiones/editar/provincia/:id',
        component: ProvinciaEditComponent,
      },
      {
        path: 'divisiones/detalles/provincia/:id',
        component: ProvinciaShowComponent,
      },

      // municipios
      {
        path: 'divisiones/municipios',
        component: MunicipiosComponent,
      },
      {
        path: 'divisiones/crear/municipio',
        component: MunicipioCreateComponent,
      },
      {
        path: 'divisiones/editar/municipio/:id',
        component: MunicipioEditComponent,
      },
      {
        path: 'divisiones/detalles/municipio/:id',
        component: MunicipioShowComponent,
      },

      // distritos
      {
        path: 'divisiones/distritos',
        component: DistritosComponent,
      },
      {
        path: 'divisiones/crear/distrito',
        component: DistritoCreateComponent,
      },
      {
        path: 'divisiones/editar/distrito/:id',
        component: DistritoEditComponent,
      },
      {
        path: 'divisiones/detalles/distrito/:id',
        component: DistritoShowComponent,
      },

      // consejos-populares
      {
        path: 'divisiones/consejos-populares',
        component: ConsejosPopularesComponent,
      },
      {
        path: 'divisiones/crear/consejo-popular',
        component: ConsejoPopularCreateComponent,
      },
      {
        path: 'divisiones/editar/consejo-popular/:id',
        component: ConsejoPopularEditComponent,
      },
      {
        path: 'divisiones/detalles/consejo-popular/:id',
        component: ConsejoPopularShowComponent,
      },

      // calles
      {
        path: 'divisiones/calles',
        component: CallesComponent,
      },
      {
        path: 'divisiones/crear/calle',
        component: CalleCreateComponent,
      },
      {
        path: 'divisiones/editar/calle/:id',
        component: CalleEditComponent,
      },
      {
        path: 'divisiones/detalles/calle/:id',
        component: CalleShowComponent,
      },

      // tipos-oficinas
      {
        path: 'divisiones/tipos-oficinas',
        component: TiposOficinasComponent,
      },
      {
        path: 'divisiones/crear/tipo-oficina',
        component: TipoOficinaCreateComponent,
      },
      {
        path: 'divisiones/editar/tipo-oficina/:id',
        component: TipoOficinaEditComponent,
      },
      {
        path: 'divisiones/detalles/tipo-oficina/:id',
        component: TipoOficinaShowComponent,
      },

      // occm
      {
        path: 'divisiones/occm',
        component: OccmComponent,
      },
      {
        path: 'divisiones/crear/occm',
        component: OccmCreateComponent,
      },
      {
        path: 'divisiones/editar/occm/:id',
        component: OccmEditComponent,
      },
      {
        path: 'divisiones/detalles/occm/:id',
        component: OccmShowComponent,
      },

      // organismos
      {
        path: 'divisiones/organismos',
        component: OrganismosComponent,
      },
      {
        path: 'divisiones/crear/organismo',
        component: OrganismoCreateComponent,
      },
      {
        path: 'divisiones/editar/organismo/:id',
        component: OrganismoEditComponent,
      },
      {
        path: 'divisiones/detalles/organismo/:id',
        component: OrganismoShowComponent,
      },

      // Zonas
      {
        path: 'divisiones/zonas',
        component: ZonasComponent,
      },
      {
        path: 'divisiones/crear/zona',
        component: ZonaCreateComponent,
      },
      {
        path: 'divisiones/editar/zona/:id',
        component: ZonaEditComponent,
      },
      {
        path: 'divisiones/detalles/zona/:id',
        component: ZonaShowComponent,
      },

      //Calendarios
      {
        path: 'divisiones/calendarios',
        component: CalendariosComponent,
      },
      {
        path: 'divisiones/crear/calendario',
        component: CalendariosCreateComponent,
      },
      {
        path: 'divisiones/editar/calendario/:id',
        component: CalendariosEditComponent,
      },
      {
        path: 'divisiones/detalles/calendario/:id',
        component: CalendariosShowComponent,
      },

      // tipos-multas
      {
        path: 'divisiones/tipos-multas',
        component: TiposMultasComponent,
      },
      {
        path: 'divisiones/crear/tipo-multa',
        component: TipoMultaCreateComponent,
      },
      {
        path: 'divisiones/editar/tipo-multa/:id',
        component: TipoMultaEditComponent,
      },
      {
        path: 'divisiones/detalles/tipo-multa/:id',
        component: TipoMultaShowComponent,
      },

      // decreto-ley
      {
        path: 'divisiones/decretos-ley',
        component: DecretoLeyComponent,
      },
      {
        path: 'divisiones/crear/decreto-ley',
        component: DecretoLeyCreateComponent,
      },
      {
        path: 'divisiones/editar/decreto-ley/:id',
        component: DecretoLeyEditComponent,
      },
      {
        path: 'divisiones/detalles/decreto-ley/:id',
        component: DecretoLeyShowComponent,
      },

      //tipos-documentos
      {
        path: 'divisiones/tipos-documentos',
        component: TiposDocumentosComponent,
      },
      {
        path: 'divisiones/crear/tipo-documento',
        component: TipoDocumentoCreateComponent,
      },
      {
        path: 'divisiones/editar/tipo-documento/:id',
        component: TipoDocumentoEditComponent,
      },
      {
        path: 'divisiones/detalles/tipo-documento/:id',
        component: TipoDocumentoShowComponent,
      },

      //tipos-operaciones
      {
        path: 'divisiones/tipos-operaciones',
        component: TiposOperacionesComponent,
      },
      {
        path: 'divisiones/crear/tipo-operacion',
        component: TipoOperacionCreateComponent,
      },
      {
        path: 'divisiones/editar/tipo-operacion/:id',
        component: TipoOperacionEditComponent,
      },
      {
        path: 'divisiones/detalles/tipo-operacion/:id',
        component: TipoOperacionShowComponent,
      },


      //tipos-ajustes
      {
        path: 'divisiones/tipos-ajustes',
        component: TiposAjustesComponent,
      },
      {
        path: 'divisiones/crear/tipo-ajuste',
        component: TipoAjusteCreateComponent,
      },
      {
        path: 'divisiones/editar/tipo-ajuste/:id',
        component: TipoAjusteEditComponent,
      },
      {
        path: 'divisiones/detalles/tipo-ajuste/:id',
        component: TipoAjusteShowComponent,
      },



      //conceptos-ajustes
      {
        path: 'divisiones/conceptos-ajustes',
        component: ConceptosAjustesComponent,
      },
      {
        path: 'divisiones/crear/concepto-ajuste',
        component: ConceptoAjusteCreateComponent,
      },
      {
        path: 'divisiones/editar/concepto-ajuste/:id',
        component: ConceptoAjusteEditComponent,
      },
      {
        path: 'divisiones/detalles/concepto-ajuste/:id',
        component: ConceptoAjusteShowComponent,
      },


      //conceptos-cancelacion
      {
        path: 'divisiones/conceptos-cancelacion',
        component: ConceptosCancelacionComponent,
      },
      {
        path: 'divisiones/crear/concepto-cancelacion',
        component: ConceptoCancelacionCreateComponent,
      },
      {
        path: 'divisiones/editar/concepto-cancelacion/:id',
        component: ConceptoCancelacionEditComponent,
      },
      {
        path: 'divisiones/detalles/concepto-cancelacion/:id',
        component: ConceptoCancelacionShowComponent,
      },



      //conceptos-anulacion
      {
        path: 'divisiones/conceptos-anulacion',
        component: ConceptosAnulacionComponent,
      },
      {
        path: 'divisiones/crear/concepto-anulacion',
        component: ConceptoAnulacionCreateComponent,
      },
      {
        path: 'divisiones/editar/concepto-anulacion/:id',
        component: ConceptoAnulacionEditComponent,
      },
      {
        path: 'divisiones/detalles/concepto-anulacion/:id',
        component: ConceptoAnulacionShowComponent,
      },


      //conceptos-traslado
      {
        path: 'divisiones/conceptos-traslado',
        component: ConceptosTrasladoComponent,
      },
      {
        path: 'divisiones/crear/concepto-traslado',
        component: ConceptoTrasladoCreateComponent,
      },
      {
        path: 'divisiones/editar/concepto-traslado/:id',
        component: ConceptoTrasladoEditComponent,
      },
      {
        path: 'divisiones/detalles/concepto-traslado/:id',
        component: ConceptoTrasladoShowComponent,
      },


      //conceptos-devoluciones
      {
        path: 'divisiones/conceptos-devoluciones',
        component: ConceptosDevolucionesComponent,
      },
      {
        path: 'divisiones/crear/concepto-devolucion',
        component: ConceptoDevolucionCreateComponent,
      },
      {
        path: 'divisiones/editar/concepto-devolucion/:id',
        component: ConceptoDevolucionEditComponent,
      },
      {
        path: 'divisiones/detalles/concepto-devolucion/:id',
        component: ConceptoDevolucionShowComponent,
      },


      //situaciones-multas
      {
        path: 'divisiones/situaciones-multas',
        component: SituacionMultasComponent,
      },
      {
        path: 'divisiones/crear/situacion-multa',
        component: SituacionMultaCreateComponent,
      },
      {
        path: 'divisiones/editar/situacion-multa/:id',
        component: SituacionMultaEditComponent,
      },
      {
        path: 'divisiones/detalles/situacion-multa/:id',
        component: SituacionMultaShowComponent,
      },


      //estado-multas
      {
        path: 'divisiones/estados-multas',
        component: EstadosMultasComponent
      },
      {
        path: 'divisiones/crear/estado-multa',
        component: EstadoMultaCreateComponent,
      },
      {
        path: 'divisiones/editar/estado-multa/:id',
        component: EstadoMultaEditComponent,
      },
      {
        path: 'divisiones/detalles/estado-multa/:id',
        component: EstadoMultaShowComponent,
      },


       //moneda
       {
        path: 'divisiones/monedas',
        component: MonedasComponent,
      },
      {
        path: 'divisiones/crear/moneda',
        component: MonedaCreateComponent,
      },
      {
        path: 'divisiones/editar/moneda/:id',
        component: MonedaEditComponent,
      },
      {
        path: 'divisiones/detalles/moneda/:id',
        component: MonedaShowComponent,
      },
      

      //Tipo-cobro
      {
        path: 'divisiones/tipo-cobros',
        component: TipoCobrosComponent,
      },
      {
        path: 'divisiones/crear/tipo-cobro',
        component: TipoCobroCreateComponent,
      },
      {
        path: 'divisiones/editar/tipo-cobro/:id',
        component: TipoCobroEditComponent,
      },
      {
        path: 'divisiones/detalles/tipo-cobro/:id',
        component: TipoCobroShowComponent,
      },

      //cuentas-bancarias
      {
        path: 'divisiones/cuentas-bancarias',
        component: CuentasBancariasComponent,
      },
      {
        path: 'divisiones/crear/cuenta-bancaria',
        component: CuentaBancariaCreateComponent,
      },
      {
        path: 'divisiones/editar/cuenta-bancaria/:id',
        component: CuentaBancariaEditComponent,
      },
      {
        path: 'divisiones/detalles/cuenta-bancaria/:id',
        component: CuentaBancariaShowComponent,
      },



      //situaciones-laborales
      {
        path: 'divisiones/situaciones-laborales',
        component: SituacionesLaboralesComponent,
      },
      {
        path: 'divisiones/crear/situacion-laboral',
        component: SituacionLaboralCreateComponent,
      },
      {
        path: 'divisiones/editar/situacion-laboral/:id',
        component: SituacionLaboralEditComponent,
      },
      {
        path: 'divisiones/detalles/situacion-laboral/:id',
        component: SituacionLaboralShowComponent,
      },

      //articulos
      {
        path: 'divisiones/articulos',
        component: ArticulosComponent,
      },
      {
        path: 'divisiones/crear/articulo',
        component: ArticuloCreateComponent,
      },
      {
        path: 'divisiones/editar/articulo/:id',
        component: ArticuloEditComponent,
      },
      {
        path: 'divisiones/detalles/articulo/:id',
        component: ArticuloShowComponent,
      },

      //incisos
      {
        path: 'divisiones/incisos',
        component: IncisosComponent,
      },
      {
        path: 'divisiones/crear/inciso',
        component: IncisoCreateComponent,
      },
      {
        path: 'divisiones/editar/inciso/:id',
        component: IncisoEditComponent,
      },
      {
        path: 'divisiones/detalles/inciso/:id',
        component: IncisoShowComponent,
      },


      //rangos-cantidad
      {
        path: 'divisiones/rangos-de-cantidades',
        component: MaxMinCantidadComponent,
      },
      {
        path: 'divisiones/crear/rango-de-cantidad',
        component: MaxMinCantidadCreateComponent,
      },
      {
        path: 'divisiones/editar/rango-de-cantidad/:id',
        component: MaxMinCantidadEditComponent,
      },
      {
        path: 'divisiones/detalles/rango-de-cantidad/:id',
        component: MaxMinCantidadShowComponent,
      },


      //rangos-importe
      {
        path: 'divisiones/rangos-de-importes',
        component: MaxMinImportesComponent,
      },
      {
        path: 'divisiones/crear/rango-de-importe',
        component: MaxMinImportesCreateComponent,
      },
      {
        path: 'divisiones/editar/rango-de-importe/:id',
        component: MaxMinImporteEditComponent,
      },
      {
        path: 'divisiones/detalles/rango-de-importe/:id',
        component: MaxMinImporteShowComponent,
      },


      //decreto-ley articulos-inciso
      {
        path: 'divisiones/decretos-ley-articulos-incisos',
        component: DecretoLeyArticuloIncisoComponent,
      },
      {
        path: 'divisiones/crear/decreto-ley-articulo-inciso',
        component: DecretoLeyArticuloIncisoCreateComponent,
      },
      {
        path: 'divisiones/editar/decreto-ley-articulo-inciso/:id',
        component: DecretoLeyArticuloIncisoEditComponent,
      },
      {
        path: 'divisiones/detalles/decreto-ley-articulo-inciso/:id',
        component: DecretoLeyArticuloIncisoShowComponent,
      },


       //categorias-peligrosidades
       {
        path: 'divisiones/categorias-peligrosidades',
        component:  CategoriasPeligrosidadesComponent,
      },
      {
        path: 'divisiones/crear/categoria-peligrosidad',
        component: CategoriaPeligrosidadCreateComponent,
      },
      {
        path: 'divisiones/editar/categoria-peligrosidad/:id',
        component:  CategoriaPeligrosidadEditComponent,
      },
      {
        path: 'divisiones/detalles/categoria-peligrosidad/:id',
        component: CategoriaPeligrosidadShowComponent,
      },

      //medios-cobros
      {
        path: 'divisiones/medios-cobros',
        component:  MediosCobrosComponent,
      },
      {
        path: 'divisiones/crear/medio-cobro',
        component: MedioCobroCreateComponent,
      },
      {
        path: 'divisiones/editar/medio-cobro/:id',
        component:  MedioCobroEditComponent,
      },
      {
        path: 'divisiones/detalles/medio-cobro/:id',
        component: MedioCobroShowComponent,
      },

      
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'inicio',
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NomencladoresRoutingModule {}
