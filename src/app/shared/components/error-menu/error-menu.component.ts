import { Component } from '@angular/core';

@Component({
  selector: 'app-error-menu',
  templateUrl: './error-menu.component.html',
  styleUrls: ['./error-menu.component.css']
})
export class ErrorMenuComponent {

  disableLink(event: MouseEvent) {
    event.preventDefault(); // Esto deshabilita la acción predeterminada del enlace
  }
}
