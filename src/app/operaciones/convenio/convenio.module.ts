import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { ShowComponent } from './pages/show/show.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConvenioRoutingModule } from './convenio-routing.module';



@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    HomeComponent,
    ListComponent,
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
    ConvenioRoutingModule
  ],
  providers: [
    DateFormatPipe
  ]

})
export class ConvenioModule { }
