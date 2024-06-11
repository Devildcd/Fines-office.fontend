import { Component } from '@angular/core';

@Component({
  selector: 'app-autenticacion-menu',
  templateUrl: './autenticacion-menu.component.html',
  styleUrls: ['./autenticacion-menu.component.css']
})
export class AutenticacionMenuComponent {

  disableLink(event: MouseEvent) {
    event.preventDefault(); // Esto deshabilita la acción predeterminada del enlace
  }
}
