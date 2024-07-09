import { CommonModule } from "@angular/common";
import { CreateComponent } from "./pages/create/create.component";
import { EditComponent } from "./pages/edit/edit.component";
import { HomeComponent } from "./pages/home/home.component";
import { ListComponent } from "./pages/list/list.component";
import { ShowComponent } from "./pages/show/show.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MaterialModule } from "src/app/material/material.module";
import { EntregaRecepcionImposicionRoutingModule } from "./entrega-recepcion-imposicion-routing.module";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DateFormatPipe } from './pipes/date-format.pipe';

@NgModule({
    declarations: [
      HomeComponent,
      ListComponent,
      CreateComponent,
      EditComponent,
      ShowComponent,
      DateFormatPipe,
    ],
    imports: [
      CommonModule,
      SharedModule,
      MaterialModule,
      SharedModule,
      FormsModule,
      ReactiveFormsModule,
      EntregaRecepcionImposicionRoutingModule
    ]
  })
  export class EntregaRecepcionImposicionModule { }
