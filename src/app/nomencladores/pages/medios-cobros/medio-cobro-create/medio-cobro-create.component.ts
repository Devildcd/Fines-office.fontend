import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MedioCobro } from 'src/app/nomencladores/interfaces/medio-cobro.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medio-cobro-create',
  templateUrl: './medio-cobro-create.component.html',
  styleUrls: ['./medio-cobro-create.component.css']
})
export class MedioCobroCreateComponent {
  medioCobro!: MedioCobro;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  formCrear: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    activo: [true],
  });

  crearMedioCobro() {

    if (this.formCrear.invalid || this.formCrear.untouched) {
      // El formulario es inválido o no se ha tocado
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, completa los campos requeridos',
        showConfirmButton: true,
      });
      return;
    }

    this.medioCobro = {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postMedioCobro(this.medioCobro).subscribe(
      (medioCobroCreado) => {
        this.medioCobro =  medioCobroCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Medio de Cobro creado',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/medio-cobro/:id', this.medioCobro]);
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
