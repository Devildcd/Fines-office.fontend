import { Component } from '@angular/core';
import { SubMovMulta } from '../../interfaces/sub-mov-multa.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubMovMultaService } from '../../services/sub-mov-multa.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Matriz } from 'src/app/base/matriz/interfaces/matriz.interface';
import { MatrizService } from 'src/app/base/matriz/services/matriz.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  subMovMulta!: SubMovMulta;
  matrices: Matriz[] = [];
  submitted = false;
 
  constructor(
    private fb: FormBuilder,
    private subMovMultaService: SubMovMultaService,
    private matrizService: MatrizService,
    private router: Router
  ) {}

  ngOnInit() {
    this.matrizService.getMatrices().subscribe( (matrices) => {
      this.matrices = matrices;
    } );
  }

  formCrear: FormGroup = this.fb.group({
    matriz: ['', Validators.required],
    campos_json: [[{}], Validators.required],
    operacion: ['', Validators.required],
    operacion_id: [null, Validators.required],
  });

  crearSubMovMulta() {

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

    this.subMovMulta = {
      ...this.formCrear.value,
    };
    this.subMovMultaService.postSubMovMulta(this.subMovMulta).subscribe(
      (subMovMultaCreada) => {
        this.subMovMulta = subMovMultaCreada;
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
