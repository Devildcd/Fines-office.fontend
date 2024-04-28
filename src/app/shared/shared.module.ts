import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

import { NavbarComponent } from './pages/navbar/navbar.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NomencladoresMenuComponent } from './components/nomencladores-menu/nomencladores-menu.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    NomencladoresMenuComponent
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
    DashboardComponent
  ] 
})
export class SharedModule { }
