import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { ShowComponent } from './pages/show/show.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'listado', component: ListComponent
      },
      {
        path: 'crear', component: CreateComponent
      },
      {
        path: 'editar', component: EditComponent
      },
      {
        path: 'detalles', component: ShowComponent
      },
      {
        path: '**', redirectTo: 'listado', pathMatch: 'full'
      },
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class ApremiarRoutingModule { }
