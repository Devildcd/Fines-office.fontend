import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoAjuste } from 'src/app/nomencladores/interfaces/tipo-ajuste.inteface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-ajuste-create',
  templateUrl: './tipo-ajuste-create.component.html',
  styleUrls: ['./tipo-ajuste-create.component.css']
})
export class TipoAjusteCreateComponent {

  tipoAjuste!: TipoAjuste;
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

  crearTipoAjuste() {

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

    this.tipoAjuste = {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postTipoAjuste(this.tipoAjuste).subscribe(
      (tipoAjusteCreada) => {
        this.tipoAjuste = tipoAjusteCreada;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Tipo de Ajuste creado',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/tipo-ajuste', this.tipoAjuste.id]);
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
