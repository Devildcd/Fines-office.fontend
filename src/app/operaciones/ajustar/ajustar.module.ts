import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { EditComponent } from './pages/edit/edit.component';
import { CreateComponent } from './pages/create/create.component';
import { ShowComponent } from './pages/show/show.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AjustarRoutingModule } from './ajustar-routing.module';



@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    EditComponent,
    CreateComponent,
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
    AjustarRoutingModule
  ],
  providers: [
    DateFormatPipe
  ]
})
export class AjustarModule { }
