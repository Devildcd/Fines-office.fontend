import { Component } from '@angular/core';

@Component({
  selector: 'app-nomencladores-menu',
  templateUrl: './nomencladores-menu.component.html',
  styleUrls: ['./nomencladores-menu.component.css']
})
export class NomencladoresMenuComponent {

  disableLink(event: MouseEvent) {
    event.preventDefault(); // Esto deshabilita la acción predeterminada del enlace
  }
}
