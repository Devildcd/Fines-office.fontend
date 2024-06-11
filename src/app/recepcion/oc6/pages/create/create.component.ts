import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';
import { Oc6 } from '../../interfaces/oc6.interface';
import { Oc6Service } from '../../services/oc6.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  modeloOc6!: Oc6;
  occms: OCCM[] = [];

  constructor(
    private fb: FormBuilder,
    private oc6Service: Oc6Service,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  ngOnInit(){
    this.nomencladoresService.getOCCMS().subscribe(
      (occms)=>{
        this.occms = occms;
      }
    );
  }

  formCrear: FormGroup = this.fb.group({
    occm: ['', Validators.required],
    cantidad_multas: ['', Validators.required],
    importe_total: ['', Validators.required],
    suma_serie: ['', Validators.required],
    suma_dias: ['', Validators.required],
    estado: ['', Validators.required],
    multas_crear: [[]],
    multas_recibidas: [[]],
    occm_origen: ['', Validators.required],
  });

  crearModeloOc6() {

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

    this.modeloOc6 = {
      ...this.formCrear.value,
    };
    this.oc6Service.postModeloOc6(this.modeloOc6).subscribe(
      (modeloOc6Creada) => {
        this.modeloOc6 = modeloOc6Creada;
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
