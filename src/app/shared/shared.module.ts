import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

import { NavbarComponent } from './pages/navbar/navbar.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NomencladoresMenuComponent } from './components/nomencladores-menu/nomencladores-menu.component';
import { LayoutsComponent } from './pages/layouts/layouts.component';
import { RecepcionMenuComponent } from './components/recepcion-menu/recepcion-menu.component';
import { BaseMenuComponent } from './components/base-menu/base-menu.component';
import { OperacionesMenuComponent } from './components/operaciones-menu/operaciones-menu/operaciones-menu.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    NomencladoresMenuComponent,
    LayoutsComponent,
    RecepcionMenuComponent,
    BaseMenuComponent,
    OperacionesMenuComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    LayoutsComponent
  ] 
})
export class SharedModule { }
