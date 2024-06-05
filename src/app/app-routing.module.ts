import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './auth/guards/validar-token.guard';

const routes: Routes = [
  // Lazy load
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
    path: 'recepción/modeloOC40',
    loadChildren: () =>
      import('./recepcion/oc40/oc40.module').then((m) => m.Oc40Module),
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
