import { Component } from '@angular/core';
import { Operador } from '../../interfaces/operador.interface';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperadorService } from '../../services/operador.service';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  operador!: Operador;
  occms: OCCM[] = [];
  submitted = false;
 
  constructor(
    private fb: FormBuilder,
    private operadorService: OperadorService,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  ngOnInit() {
    this.nomencladoresService.getOCCMS().subscribe( (occms) => {
      this.occms = occms;
    } );
  }

  formCrear: FormGroup = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    is_active: [false],
    occm: [null, Validators.required],
    cobro: [null, Validators.required],
    id_operador: ['', Validators.required],
    cargo: ['', Validators.required],
  });

  crearOperador() {

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

    this.operador = {
      ...this.formCrear.value,
    };
    this.operadorService.postOperador(this.operador).subscribe(
      (operadorCreada) => {
        this.operador = operadorCreada;
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
