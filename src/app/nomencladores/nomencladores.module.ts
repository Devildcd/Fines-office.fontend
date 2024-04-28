import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { NomencladoresRoutingModule } from './nomencladores-routing.module';
import { RouterModule } from '@angular/router';

import { ProvinciasComponent } from './pages/provincias/provincias.component';
import { ProvinciaCreateComponent } from './pages/provincias/provincia-create/provincia-create.component';
import { ProvinciaEditComponent } from './pages/provincias/provincia-edit/provincia-edit.component';
import { ProvinciaShowComponent } from './pages/provincias/provincia-show/provincia-show.component';
import { MunicipiosComponent } from './pages/municipios/municipios.component';
import { MunicipioCreateComponent } from './pages/municipios/municipio-create/municipio-create.component';
import { MunicipioEditComponent } from './pages/municipios/municipio-edit/municipio-edit.component';
import { MunicipioShowComponent } from './pages/municipios/municipio-show/municipio-show.component';
import { DistritosComponent } from './pages/distritos/distritos.component';
import { DistritoCreateComponent } from './pages/distritos/distrito-create/distrito-create.component';
import { DistritoEditComponent } from './pages/distritos/distrito-edit/distrito-edit.component';
import { DistritoShowComponent } from './pages/distritos/distrito-show/distrito-show.component';
import { ConsejosPopularesComponent } from './pages/consejos-populares/consejos-populares.component';
import { ConsejoPopularCreateComponent } from './pages/consejos-populares/consejo-popular-create/consejo-popular-create.component';
import { ConsejoPopularEditComponent } from './pages/consejos-populares/consejo-popular-edit/consejo-popular-edit.component';
import { ConsejoPopularShowComponent } from './pages/consejos-populares/consejo-popular-show/consejo-popular-show.component';
import { CallesComponent } from './pages/calles/calles.component';
import { CalleCreateComponent } from './pages/calles/calle-create/calle-create.component';
import { CalleEditComponent } from './pages/calles/calle-edit/calle-edit.component';
import { CalleShowComponent } from './pages/calles/calle-show/calle-show.component';
import { TiposOficinasComponent } from './pages/tipos-oficinas/tipos-oficinas.component';
import { TipoOficinaCreateComponent } from './pages/tipos-oficinas/tipo-oficina-create/tipo-oficina-create.component';
import { TipoOficinaEditComponent } from './pages/tipos-oficinas/tipo-oficina-edit/tipo-oficina-edit.component';
import { TipoOficinaShowComponent } from './pages/tipos-oficinas/tipo-oficina-show/tipo-oficina-show.component';
import { OccmComponent } from './pages/occm/occm.component';
import { OccmCreateComponent } from './pages/occm/occm-create/occm-create.component';
import { OccmEditComponent } from './pages/occm/occm-edit/occm-edit.component';
import { OccmShowComponent } from './pages/occm/occm-show/occm-show.component';
import { OrganismosComponent } from './pages/organismos/organismos.component';
import { OrganismoCreateComponent } from './pages/organismos/organismo-create/organismo-create.component';
import { OrganismoEditComponent } from './pages/organismos/organismo-edit/organismo-edit.component';
import { OrganismoShowComponent } from './pages/organismos/organismo-show/organismo-show.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZonasComponent } from './pages/zonas/zonas.component';
import { ZonaShowComponent } from './pages/zonas/zona-show/zona-show.component';
import { ZonaEditComponent } from './pages/zonas/zona-edit/zona-edit.component';
import { ZonaCreateComponent } from './pages/zonas/zona-create/zona-create.component';
import { CalendariosComponent } from './pages/calendarios/calendarios.component';
import { CalendariosCreateComponent } from './pages/calendarios/calendarios-create/calendarios-create.component';
import { CalendariosEditComponent } from './pages/calendarios/calendarios-edit/calendarios-edit.component';
import { CalendariosShowComponent } from './pages/calendarios/calendarios-show/calendarios-show.component';
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
import { DecretosLeyDialogComponent } from './components/decretos-ley-dialog/decretos-ley-dialog.component';
import { TiposAjustesComponent } from './pages/tipos-ajustes/tipos-ajustes.component';
import { TipoAjusteCreateComponent } from './pages/tipos-ajustes/tipo-ajuste-create/tipo-ajuste-create.component';
import { TipoAjusteEditComponent } from './pages/tipos-ajustes/tipo-ajuste-edit/tipo-ajuste-edit.component';
import { TipoAjusteShowComponent } from './pages/tipos-ajustes/tipo-ajuste-show/tipo-ajuste-show.component';
import { ConceptosAjustesComponent } from './pages/conceptos-ajustes/conceptos-ajustes.component';
import { ConceptoAjusteCreateComponent } from './pages/conceptos-ajustes/concepto-ajuste-create/concepto-ajuste-create.component';
import { ConceptoAjusteEditComponent } from './pages/conceptos-ajustes/concepto-ajuste-edit/concepto-ajuste-edit.component';
import { ConceptoAjusteShowComponent } from './pages/conceptos-ajustes/concepto-ajuste-show/concepto-ajuste-show.component';
import { ConceptosAnulacionComponent } from './pages/conceptos-anulacion/conceptos-anulacion.component';
import { ConceptoAnulacionCreateComponent } from './pages/conceptos-anulacion/concepto-anulacion-create/concepto-anulacion-create.component';
import { ConceptoAnulacionEditComponent } from './pages/conceptos-anulacion/concepto-anulacion-edit/concepto-anulacion-edit.component';
import { ConceptoAnulacionShowComponent } from './pages/conceptos-anulacion/concepto-anulacion-show/concepto-anulacion-show.component';
import { ConceptosCancelacionComponent } from './pages/conceptos-cancelacion/conceptos-cancelacion.component';
import { ConceptoCancelacionCreateComponent } from './pages/conceptos-cancelacion/concepto-cancelacion-create/concepto-cancelacion-create.component';
import { ConceptoCancelacionEditComponent } from './pages/conceptos-cancelacion/concepto-cancelacion-edit/concepto-cancelacion-edit.component';
import { ConceptoCancelacionShowComponent } from './pages/conceptos-cancelacion/concepto-cancelacion-show/concepto-cancelacion-show.component';
import { ConceptosTrasladoComponent } from './pages/conceptos-traslado/conceptos-traslado.component';
import { ConceptoTrasladoCreateComponent } from './pages/conceptos-traslado/concepto-traslado-create/concepto-traslado-create.component';
import { ConceptoTrasladoEditComponent } from './pages/conceptos-traslado/concepto-traslado-edit/concepto-traslado-edit.component';
import { ConceptoTrasladoShowComponent } from './pages/conceptos-traslado/concepto-traslado-show/concepto-traslado-show.component';
import { ConceptosDevolucionesComponent } from './pages/conceptos-devoluciones/conceptos-devoluciones.component';
import { ConceptoDevolucionCreateComponent } from './pages/conceptos-devoluciones/concepto-devolucion-create/concepto-devolucion-create.component';
import { ConceptoDevolucionEditComponent } from './pages/conceptos-devoluciones/concepto-devolucion-edit/concepto-devolucion-edit.component';
import { ConceptoDevolucionShowComponent } from './pages/conceptos-devoluciones/concepto-devolucion-show/concepto-devolucion-show.component';
import { CuentasBancariasComponent } from './pages/cuentas-bancarias/cuentas-bancarias.component';
import { SituacionMultasComponent } from './pages/situacion-multas/situacion-multas.component';
import { SituacionMultaCreateComponent } from './pages/situacion-multas/situacion-multa-create/situacion-multa-create.component';
import { SituacionMultaEditComponent } from './pages/situacion-multas/situacion-multa-edit/situacion-multa-edit.component';
import { SituacionMultaShowComponent } from './pages/situacion-multas/situacion-multa-show/situacion-multa-show.component';
import { EstadosMultasComponent } from './pages/estados-multas/estados-multas.component';
import { EstadoMultaCreateComponent } from './pages/estados-multas/estado-multa-create/estado-multa-create.component';
import { EstadoMultaEditComponent } from './pages/estados-multas/estado-multa-edit/estado-multa-edit.component';
import { EstadoMultaShowComponent } from './pages/estados-multas/estado-multa-show/estado-multa-show.component';
import { MonedasComponent } from './pages/moneda/monedas.component';
import { MonedaShowComponent } from './pages/moneda/moneda-show/moneda-show/moneda-show.component';
import { MonedaCreateComponent } from './pages/moneda/moneda-create/moneda-create/moneda-create.component';
import { MonedaEditComponent } from './pages/moneda/moneda-edit/moneda-edit/moneda-edit.component';
import { TipoCobrosComponent } from './pages/tipo-cobros/tipo-cobros.component';
import { TipoCobroCreateComponent } from './pages/tipo-cobros/tipo-cobro-create/tipo-cobro-create.component';
import { TipoCobroEditComponent } from './pages/tipo-cobros/tipo-cobro-edit/tipo-cobro-edit.component';
import { TipoCobroShowComponent } from './pages/tipo-cobros/tipo-cobro-show/tipo-cobro-show.component';
import { CuentaBancariaCreateComponent } from './pages/cuentas-bancarias/cuenta-bancaria-create/cuenta-bancaria-create.component';
import { CuentaBancariaEditComponent } from './pages/cuentas-bancarias/cuenta-bancaria-edit/cuenta-bancaria-edit.component';
import { CuentaBancariaShowComponent } from './pages/cuentas-bancarias/cuenta-bancaria-show/cuenta-bancaria-show.component';
import { DecretoLeyArticuloIncisoComponent } from './pages/decreto-ley-articulo-inciso/decreto-ley-articulo-inciso.component';
import { SituacionesLaboralesComponent } from './pages/situaciones-laborales/situaciones-laborales.component';
import { SituacionLaboralCreateComponent } from './pages/situaciones-laborales/situacion-laboral-create/situacion-laboral-create.component';
import { SituacionLaboralEditComponent } from './pages/situaciones-laborales/situacion-laboral-edit/situacion-laboral-edit.component';
import { SituacionLaboralShowComponent } from './pages/situaciones-laborales/situacion-laboral-show/situacion-laboral-show.component';
import { ArticulosComponent } from './pages/articulos/articulos.component';
import { ArticuloCreateComponent } from './pages/articulos/articulo-create/articulo-create.component';
import { ArticuloShowComponent } from './pages/articulos/articulo-show/articulo-show.component';
import { ArticuloEditComponent } from './pages/articulos/articulo-edit/articulo-edit.component';
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
import { DecretoLeyArticuloIncisoCreateComponent } from './pages/decreto-ley-articulo-inciso/decreto-ley-articulo-inciso-create/decreto-ley-articulo-inciso-create.component';
import { DecretoLeyArticuloIncisoEditComponent } from './pages/decreto-ley-articulo-inciso/decreto-ley-articulo-inciso-edit/decreto-ley-articulo-inciso-edit.component';
import { DecretoLeyArticuloIncisoShowComponent } from './pages/decreto-ley-articulo-inciso/decreto-ley-articulo-inciso-show/decreto-ley-articulo-inciso-show.component';
import { CategoriasPeligrosidadesComponent } from './pages/categorias-peligrosidades/categorias-peligrosidades.component';
import { CategoriaPeligrosidadCreateComponent } from './pages/categorias-peligrosidades/categoria-peligrosidad-create/categoria-peligrosidad-create.component';
import { CategoriaPeligrosidadEditComponent } from './pages/categorias-peligrosidades/categoria-peligrosidad-edit/categoria-peligrosidad-edit.component';
import { CategoriaPeligrosidadShowComponent } from './pages/categorias-peligrosidades/categoria-peligrosidad-show/categoria-peligrosidad-show.component';
import { MediosCobrosComponent } from './pages/medios-cobros/medios-cobros.component';
import { MedioCobroCreateComponent } from './pages/medios-cobros/medio-cobro-create/medio-cobro-create.component';
import { MedioCobroEditComponent } from './pages/medios-cobros/medio-cobro-edit/medio-cobro-edit.component';
import { MedioCobroShowComponent } from './pages/medios-cobros/medio-cobro-show/medio-cobro-show.component';



@NgModule({
  declarations: [
    ProvinciasComponent,
    ProvinciaCreateComponent,
    ProvinciaEditComponent,
    ProvinciaShowComponent,
    MunicipiosComponent,
    MunicipioCreateComponent,
    MunicipioEditComponent,
    MunicipioShowComponent,
    DistritosComponent,
    DistritoCreateComponent,
    DistritoEditComponent,
    DistritoShowComponent,
    ConsejosPopularesComponent,
    ConsejoPopularCreateComponent,
    ConsejoPopularEditComponent,
    ConsejoPopularShowComponent,
    CallesComponent,
    CalleCreateComponent,
    CalleEditComponent,
    CalleShowComponent,
    TiposOficinasComponent,
    TipoOficinaCreateComponent,
    TipoOficinaEditComponent,
    TipoOficinaShowComponent,
    OccmComponent,
    OccmCreateComponent,
    OccmEditComponent,
    OccmShowComponent,
    OrganismosComponent,
    OrganismoCreateComponent,
    OrganismoEditComponent,
    OrganismoShowComponent,
    HomeComponent,
    ZonasComponent,
    ZonaShowComponent,
    ZonaEditComponent,
    ZonaCreateComponent,
    CalendariosComponent,
    CalendariosCreateComponent,
    CalendariosEditComponent,
    CalendariosShowComponent,
	TiposMultasComponent,
    TipoMultaCreateComponent,
    TipoMultaEditComponent,
    TipoMultaShowComponent,
    DecretoLeyComponent,
    DecretoLeyCreateComponent,
    DecretoLeyEditComponent,
    DecretoLeyShowComponent,
    TiposDocumentosComponent,
    TipoDocumentoCreateComponent,
    TipoDocumentoEditComponent,
    TipoDocumentoShowComponent,
    TiposOperacionesComponent,
    TipoOperacionCreateComponent,
    TipoOperacionEditComponent,
    TipoOperacionShowComponent,
    DecretosLeyDialogComponent,
    TiposAjustesComponent,
    TipoAjusteCreateComponent,
    TipoAjusteEditComponent,
    TipoAjusteShowComponent,
    ConceptosAjustesComponent,
    ConceptoAjusteCreateComponent,
    ConceptoAjusteEditComponent,
    ConceptoAjusteShowComponent,
    ConceptosAnulacionComponent,
    ConceptoAnulacionCreateComponent,
    ConceptoAnulacionEditComponent,
    ConceptoAnulacionShowComponent,
    ConceptosCancelacionComponent,
    ConceptoCancelacionCreateComponent,
    ConceptoCancelacionEditComponent,
    ConceptoCancelacionShowComponent,
    ConceptosTrasladoComponent,
    ConceptoTrasladoCreateComponent,
    ConceptoTrasladoEditComponent,
    ConceptoTrasladoShowComponent,
    ConceptosDevolucionesComponent,
    ConceptoDevolucionCreateComponent,
    ConceptoDevolucionEditComponent,
    ConceptoDevolucionShowComponent,
    CuentasBancariasComponent,
    SituacionMultasComponent,
    SituacionMultaCreateComponent,
    SituacionMultaEditComponent,
    SituacionMultaShowComponent,
    EstadosMultasComponent,
    EstadoMultaCreateComponent,
    EstadoMultaEditComponent,
    EstadoMultaShowComponent,
    MonedasComponent,
    MonedaCreateComponent,
    MonedaEditComponent,
    MonedaShowComponent,
    TipoCobrosComponent,
    TipoCobroCreateComponent,
    TipoCobroEditComponent,
    TipoCobroShowComponent,
    CuentaBancariaCreateComponent,
    CuentaBancariaEditComponent,
    CuentaBancariaShowComponent,
    DecretoLeyArticuloIncisoComponent,
    SituacionesLaboralesComponent,
    SituacionLaboralCreateComponent,
    SituacionLaboralEditComponent,
    SituacionLaboralShowComponent,
    ArticulosComponent,
    ArticuloCreateComponent,
    ArticuloShowComponent,
    ArticuloEditComponent,
    IncisosComponent,
    IncisoCreateComponent,
    IncisoEditComponent,
    IncisoShowComponent,
    MaxMinCantidadComponent,
    MaxMinCantidadCreateComponent,
    MaxMinCantidadEditComponent,
    MaxMinCantidadShowComponent,
    MaxMinImportesComponent,
    MaxMinImportesCreateComponent,
    MaxMinImporteEditComponent,
    MaxMinImporteShowComponent,
    DecretoLeyArticuloIncisoCreateComponent,
    DecretoLeyArticuloIncisoEditComponent,
    DecretoLeyArticuloIncisoShowComponent,
    CategoriasPeligrosidadesComponent,
    CategoriaPeligrosidadCreateComponent,
    CategoriaPeligrosidadEditComponent,
    CategoriaPeligrosidadShowComponent,
    MediosCobrosComponent,
    MedioCobroCreateComponent,
    MedioCobroEditComponent,
    MedioCobroShowComponent,
  ],
  imports: [
    CommonModule,
    NomencladoresRoutingModule,
    MaterialModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
	  FormsModule
  ]
})
export class NomencladoresModule { }
