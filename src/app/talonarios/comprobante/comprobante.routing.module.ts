import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ListComponent } from "./pages/list/list.component";
import { CreateComponent } from "./pages/create/create.component";
import { EditComponent } from "./pages/edit/edit.component";
import { ShowComponent } from "./pages/show/show.component";
import { CommonModule } from "@angular/common";

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
          path: 'editar/:id', component: EditComponent
        },
        {
          path: 'detalles/:id', component: ShowComponent
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
  export class ComprobanteRoutingModule { }