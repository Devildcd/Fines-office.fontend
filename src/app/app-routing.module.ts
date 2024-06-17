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
    path: 'talonarios/entrega-recepcion',
    loadChildren: () =>
      import('./talonarios/entrega-recepcion/entrega-recepcion.module').then((m) => m.EntregaRecepcionModule),
    // canActivate: [ValidarTokenGuard],
  },
  {
    path: 'talonarios/imposicion',
    loadChildren: () =>
      import('./talonarios/imposicion/imposicion.module').then((m) => m.ImposicionModule),
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
