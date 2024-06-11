import { Component } from '@angular/core';

@Component({
  selector: 'app-operaciones-menu',
  templateUrl: './operaciones-menu.component.html',
  styleUrls: ['./operaciones-menu.component.css']
})
export class OperacionesMenuComponent {
  disableLink(event: MouseEvent) {
    event.preventDefault(); // Esto deshabilita la acción predeterminada del enlace
  }
}
