import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './pages/edit/edit.component';
import { ShowComponent } from './pages/show/show.component';
import { CreateComponent } from './pages/create/create.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatrizRoutingModule } from './matriz-routing.module';



@NgModule({
  declarations: [
    EditComponent,
    ShowComponent,
    CreateComponent,
    HomeComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatrizRoutingModule
  ]
})
export class MatrizModule { }
