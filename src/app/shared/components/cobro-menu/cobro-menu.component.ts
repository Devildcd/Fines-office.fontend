import { Component } from '@angular/core';

@Component({
  selector: 'app-cobro-menu',
  templateUrl: './cobro-menu.component.html',
  styleUrls: ['./cobro-menu.component.css']
})
export class CobroMenuComponent {

  disableLink(event: MouseEvent) {
    event.preventDefault(); // Esto deshabilita la acción predeterminada del enlace
  }
}
