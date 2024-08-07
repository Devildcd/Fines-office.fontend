import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { ShowComponent } from './pages/show/show.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComunicacionEmbargoRoutingModule } from './comunicacion-embargo-routing.module';



@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    ShowComponent,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ComunicacionEmbargoRoutingModule
  ],
  providers: [
    DateFormatPipe
  ]
})
export class ComunicacionEmbargoModule { }
