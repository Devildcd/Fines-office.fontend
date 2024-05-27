import { Component } from '@angular/core';

@Component({
  selector: 'app-recepcion-menu',
  templateUrl: './recepcion-menu.component.html',
  styleUrls: ['./recepcion-menu.component.css']
})
export class RecepcionMenuComponent {

  disableLink(event: MouseEvent) {
    event.preventDefault(); // Esto deshabilita la acción predeterminada del enlace
  }
}
