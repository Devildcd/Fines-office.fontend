import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './auth/guards/validar-token.guard';

const routes: Routes = [
  // Lazy load
  // auth
  {
    path: 'auth',
    loadChildren: () => import( './auth/auth.module'). then( m => m.AuthModule )
  },

  // nomencladores
  {
    path: 'nomencladores',
    loadChildren: () =>
      import('./nomencladores/nomencladores.module').then((m) => m.NomencladoresModule),
    // canActivate: [ValidarTokenGuard],
  },

  // operaciones
  {
    path: 'operaciones/apremiar',
    loadChildren: () =>
      import('./operaciones/apremiar/apremiar.module').then((m) => m.ApremiarModule),
    // canActivate: [ValidarTokenGuard],
  },

  {
    path: 'operaciones/cancelar',
    loadChildren: () =>
       import('./operaciones/cancelar/cancelar.module').then((m) => m.CancelarModule),
    // canActivate: [ValidarTokenGuard],
   },
  {
    path: 'operaciones/devolucion',
    loadChildren: () =>
       import('./operaciones/devolucion/devolucion.module').then((m) => m.DevolucionModule),
    // canActivate: [ValidarTokenGuard],
   },
  {
    path: 'operaciones/duplicar',
    loadChildren: () =>
       import('./operaciones/duplicar/duplicar.module').then((m) => m.DuplicarModule),
    // canActivate: [ValidarTokenGuard],
   },
  {
    path: 'operaciones/comunicacion-embargo',
    loadChildren: () =>
       import('./operaciones/comunicacion-embargo/comunicacion-embargo.module').then((m) => m.ComunicacionEmbargoModule),
    // canActivate: [ValidarTokenGuard],
   },
  {
    path: 'operaciones/convenio-plazo',
    loadChildren: () =>
       import('./operaciones/convenio-plazo/convenio-plazo.module').then((m) => m.ConvenioPlazoModule),
    // canActivate: [ValidarTokenGuard],
   },
   
   {
     path: 'operaciones/convenio',
     loadChildren: () =>
        import('./operaciones/convenio/convenio.module').then((m) => m.ConvenioModule),
     // canActivate: [ValidarTokenGuard],
    },
    
   {
     path: 'operaciones/ajustar',
     loadChildren: () =>
        import('./operaciones/ajustar/ajustar.module').then((m) => m.AjustarModule),
     // canActivate: [ValidarTokenGuard],
    },

  {
    path: 'operaciones/cancelar',
    loadChildren: () =>
       import('./operaciones/cancelar/cancelar.module').then((m) => m.CancelarModule),
    // canActivate: [ValidarTokenGuard],
   },

  // recepcion
  {
    path: 'recepción/modeloOC5',
    loadChildren: () =>
      import('./recepcion/oc5/oc5.module').then((m) => m.Oc5Module),
    // canActivate: [ValidarTokenGuard],
  },
  {
    path: 'recepción/modeloOC6',
    loadChildren: () =>
      import('./recepcion/oc6/oc6.module').then((m) => m.Oc6Module),
    // canActivate: [ValidarTokenGuard],
  },
  {
    path: 'recepción/enviar-traslado',
    loadChildren: () =>
      import('./recepcion/enviar-traslado/enviar-traslado.module').then((m) => m.EnviarTrasladoModule),
    // canActivate: [ValidarTokenGuard],
  },

  // base
  {
    path: 'base/matriz',
    loadChildren: () =>
      import('./base/matriz/matriz.module').then((m) => m.MatrizModule),
    // canActivate: [ValidarTokenGuard],
  },
  {
    path: 'base/centros-de-trabajos',
    loadChildren: () =>
      import('./base/centro-trabajo/centro-trabajo.module').then((m) => m.CentroTrabajoModule),
    // canActivate: [ValidarTokenGuard],
  },
  {
    path: 'base/contraventor',
    loadChildren: () =>
      import('./base/contraventor/contraventor.module').then((m) => m.ContraventorModule),
    // canActivate: [ValidarTokenGuard],
  },
  {
    path: 'base/sub-movimiento-multa',
    loadChildren: () =>
      import('./base/sub-mov-multa/sub-mov-multa.module').then((m) => m.SubMovMultaModule),
    // canActivate: [ValidarTokenGuard],
  },
  {
    path: 'base/operador',
    loadChildren: () =>
      import('./base/operador/operador.module').then((m) => m.OperadorModule),
    // canActivate: [ValidarTokenGuard],
  },
  
  // minint
  {
    path: 'minint/configuracion-api',
    loadChildren: () =>
      import('./minint/configuracion-api/configuracion-api.module').then((m) => m.ConfiguracionApiModule),
    // canActivate: [ValidarTokenGuard],
  },
  {
    path: 'minint/exportar-minint',
    loadChildren: () =>
      import('./minint/exportar-minint/exportar-minint.module').then((m) => m.ExportarMinintModule),
    // canActivate: [ValidarTokenGuard],
  },
  // talonarios
  {
    path: 'talonarios/entrega-recepcion-imposicion',
    loadChildren: () =>
      import('./talonarios/entrega-recepcion-imposicion/entrega-recepcion-imposicion.module').then((m) => m.EntregaRecepcionImposicionModule),
    // canActivate: [ValidarTokenGuard],
  },
  {
    path: 'talonarios/entrega-recepcion-comprobante',
    loadChildren: () =>
      import('./talonarios/entrega-recepcion-comprobante/entrega-recepcion-comprobante.module').then((m) => m.EntregaRecepcionComprobanteModule),
    // canActivate: [ValidarTokenGuard],
  },
  {
    path: 'talonarios/imposicion',
    loadChildren: () =>
      import('./talonarios/imposicion/imposicion.module').then((m) => m.ImposicionModule),
    // canActivate: [ValidarTokenGuard],
  },
  {
    path: 'talonarios/comprobante',
    loadChildren: () =>
      import('./talonarios/comprobante/comprobante.module').then((m) => m.ComprobanteModule),
    // canActivate: [ValidarTokenGuard],
  },
  {
    path: '**', redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
