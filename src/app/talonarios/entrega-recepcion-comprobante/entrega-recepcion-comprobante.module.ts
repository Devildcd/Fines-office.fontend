import { CommonModule } from "@angular/common";
import { CreateComponent } from "./pages/create/create.component";
import { EditComponent } from "./pages/edit/edit.component";
import { HomeComponent } from "./pages/home/home.component";
import { ListComponent } from "./pages/list/list.component";
import { ShowComponent } from "./pages/show/show.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MaterialModule } from "src/app/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EntregaRecepcionComprobanteRoutingModule } from "./entrega-recepcion-comprobante-routing.module";
import { DateFormatPipe } from "./pipes/date-format.pipe";
import { NgModule } from "@angular/core";

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
      EntregaRecepcionComprobanteRoutingModule
    ]
  })
  export class EntregaRecepcionComprobanteModule { }