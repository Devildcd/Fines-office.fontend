import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/shared/shared.module";
import { MaterialModule } from "src/app/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComprobanteRoutingModule } from "./comprobante.routing.module";
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { ShowComponent } from "./pages/show/show.component";


@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    HomeComponent,
    ListComponent,
    ShowComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule, 
    ComprobanteRoutingModule
  ]
})
export class ComprobanteModule { }
