import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  listaVisible: boolean = false;
  isSidebarVisible: boolean = true;
  mostrarMenu = true;
  showSidebar: boolean = false;

  constructor( public sharedService: SharedService, 
               private renderer: Renderer2 ) { }

  ngOnInit(): void {
    this.sharedService.showSidebar$.subscribe((show: boolean) => {
      this.showSidebar = show;
      console.log('Valor actual de showSidebar en SidebarComponent:', this.showSidebar);
    });
    this.checkScreenWidth();
  }

  disableLink(event: MouseEvent) {
    event.preventDefault(); // Esto deshabilita la acción predeterminada del enlace
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    this.mostrarMenu = window.innerWidth > 768;
    this.sharedService.showSidebar = this.mostrarMenu;
    console.log(this.sharedService.showSidebar)
  }

  // Programacion del boton toogle del sidebar usando render2
  toggleSidebar() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('sidebar-toggled');
    const sidebar = document.getElementsByClassName('sidebar')[0];
    sidebar.classList.toggle('toggled');
    const sidebarCollapses = document.querySelectorAll('.sidebar .collapse');
    sidebarCollapses.forEach(collapse => {
      if (sidebar.classList.contains('toggled')) {
        collapse.classList.remove('show');
      }
    });
  }

}
