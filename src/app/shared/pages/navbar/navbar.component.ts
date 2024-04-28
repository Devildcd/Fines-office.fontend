import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    public sharedService: SharedService
  ) {}

  disableLink(event: MouseEvent) {
    event.preventDefault(); // Esto deshabilita la acción predeterminada del enlace
  }

  toggleSidebar() {
    const currentValue = this.sharedService.showSidebarSubject.value;
    console.log('Valor actual de showSidebar:', currentValue);
    this.sharedService.setShowSidebar(!currentValue);
    console.log('Nuevo valor de showSidebar:', !currentValue);
  }
}
