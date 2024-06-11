import { Component } from '@angular/core';
import { Oc37 } from '../../interfaces/oc37.interface';
import { OC5 } from 'src/app/recepcion/oc5/interfaces/oc5.interface';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Oc37Service } from '../../services/oc37.service';
import { Oc5Service } from 'src/app/recepcion/oc5/services/oc5.service';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  modeloOc37!: Oc37;
  modelosOc5: OC5[] = [];
  occms: OCCM[] = [];

  constructor(
    private fb: FormBuilder,
    private oc37Service: Oc37Service,
    private oc5Service: Oc5Service,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  ngOnInit(){
    this.nomencladoresService.getOCCMS().subscribe(
      (occms)=>{
        this.occms = occms;
      }
    )

    this.oc5Service.getModelosOC5().subscribe(
      (modelosOc5)=>{
        this.modelosOc5 = modelosOc5;
      }
    )
  }

  formCrear: FormGroup = this.fb.group({
    oc5: [[], Validators.required],
    occm: [''],
    fecha_creado: [''],
  });

  crearModeloOc37() {

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

    this.modeloOc37 = {
      ...this.formCrear.value,
    };
    this.oc37Service.postModeloOc37(this.modeloOc37).subscribe(
      (modeloOc37Creada) => {
        this.modeloOc37 = modeloOc37Creada;
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
