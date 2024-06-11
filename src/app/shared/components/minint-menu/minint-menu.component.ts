import { Component } from '@angular/core';

@Component({
  selector: 'app-minint-menu',
  templateUrl: './minint-menu.component.html',
  styleUrls: ['./minint-menu.component.css']
})
export class MinintMenuComponent {

  disableLink(event: MouseEvent) {
    event.preventDefault(); // Esto deshabilita la acción predeterminada del enlace
  }
}
