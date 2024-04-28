import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Calendario } from 'src/app/nomencladores/interfaces/calendario.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendarios-create',
  templateUrl: './calendarios-create.component.html',
  styleUrls: ['./calendarios-create.component.css']
})
export class CalendariosCreateComponent {

  calendario!: Calendario;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router,
  ) {}

  formCrear: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    activo: [true],
  });

  crearCalendario() {
    if (this.formCrear.invalid || this.formCrear.untouched) {
      // El formulario es inválido o no se ha tocado
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, completa los campos con *',
        showConfirmButton: true,
      });
      return;
    }

    this.calendario= {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postCalendario(this.calendario).subscribe(
      (CalendarioCreado) => {
        this.calendario = CalendarioCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Calendario creado',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/calendario', this.calendario.id]);
        }, 1000);
      }
      // error => {
      //   console.log('Error:', error);
      //   if (error.error.message === 'Unauthenticated.') {
      //     Swal.fire({
      //       icon: 'error',
      //       title: '¡Tu sesión ha expirado!',
      //       text: 'Por favor, vuelve a iniciar sesión',
      //       showConfirmButton: false,
      //       timer: 1000 // Duración en milisegundos (1 segundo)
      //     }).then(() => {
      //       this.router.navigateByUrl('/auth/login');
      //     });
      //   }
      // }
    );
  }

}
