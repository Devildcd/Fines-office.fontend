import { Component } from '@angular/core';

@Component({
  selector: 'app-talonarios-menu',
  templateUrl: './talonarios-menu.component.html',
  styleUrls: ['./talonarios-menu.component.css']
})
export class TalonariosMenuComponent {
  disableLink(event: MouseEvent) {
    event.preventDefault(); // Esto deshabilita la acción predeterminada del enlace
  }
}
