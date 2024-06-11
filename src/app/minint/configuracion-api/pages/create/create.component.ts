import { Component } from '@angular/core';
import { ConfiguracionApi } from '../../interfaces/configuracion-api.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfApiService } from '../../services/conf-api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  confApi!: ConfiguracionApi;
  submitted = false;
 
  constructor(
    private fb: FormBuilder,
    private confApiService: ConfApiService,
    private router: Router
  ) {}

  formCrear: FormGroup = this.fb.group({
    url: ['', Validators.required],
    llave: ['', Validators.required],
    token: ['', Validators.required],
  });

  crearConfApi() {

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

    this.confApi = {
      ...this.formCrear.value,
    };
    this.confApiService.postConfiguracionApi(this.confApi).subscribe(
      (confApiCreada) => {
        this.confApi = confApiCreada;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
       
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
