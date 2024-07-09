import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { EditComponent } from './pages/edit/edit.component';
import { ShowComponent } from './pages/show/show.component';
import { CreateComponent } from './pages/create/create.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Oc6RoutingModule } from './oc6-routing.module';
import { DialogCrearMultaComponent } from './components/dialog-crear-multa/dialog-crear-multa.component';



@NgModule({
  declarations: [
    ListComponent,
    EditComponent,
    ShowComponent,
    CreateComponent,
    HomeComponent,
    DialogCrearMultaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    Oc6RoutingModule
  ]
})
export class Oc6Module { }
