import { Component } from '@angular/core';

@Component({
  selector: 'app-configuracion-menu',
  templateUrl: './configuracion-menu.component.html',
  styleUrls: ['./configuracion-menu.component.css']
})
export class ConfiguracionMenuComponent {

  disableLink(event: MouseEvent) {
    event.preventDefault(); // Esto deshabilita la acción predeterminada del enlace
  }
}
