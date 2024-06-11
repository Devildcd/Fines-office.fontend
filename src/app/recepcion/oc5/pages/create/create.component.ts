import { Component } from '@angular/core';
import { OC5 } from '../../interfaces/oc5.interface';
import { Organismo } from 'src/app/nomencladores/interfaces/organismo.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Oc5Service } from '../../services/oc5.service';
import { Router } from '@angular/router';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { Oc37 } from 'src/app/base/oc37/interfaces/oc37.interface';
import { Oc37Service } from 'src/app/base/oc37/services/oc37.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  modeloOc5!: OC5;
  organismos: Organismo[] = [];
  occms: OCCM[] = [];
  modelosOc37: Oc37[] = [];

  constructor(
    private fb: FormBuilder,
    private oc5Service: Oc5Service,
    private nomencladoresService: NomencladoresService,
    private oc37Service: Oc37Service,
    private router: Router
  ) {}

  ngOnInit(){
    this.nomencladoresService.getOCCMS().subscribe(
      (occms)=>{
        this.occms = occms;
      }
    );
    this.nomencladoresService.getOrganismos().subscribe(
      (organismos)=>{
        this.organismos = organismos;
      }
    );
    this.oc37Service.getModelosOc37().subscribe(
      (modelosOc37)=>{
        this.modelosOc37 = modelosOc37;
      }
    )
  }

  formCrear: FormGroup = this.fb.group({
    occm: ['', Validators.required],
    cantidad_multas: [null, Validators.required],
    importe_total: [null, Validators.required],
    suma_serie: [null, Validators.required],
    suma_dias: [null, Validators.required],
    oc_37: [[]],
    estado: ['', Validators.required],
    multas_crear: [[]],
    organismo_origen: ['', Validators.required]
  });

  crearModeloOc5() {

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

    this.modeloOc5 = {
      ...this.formCrear.value,
    };
    this.oc5Service.postModeloOc5(this.modeloOc5).subscribe(
      (modeloOc5Creada) => {
        this.modeloOc5 = modeloOc5Creada;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/recepción/modeloOC5/detalles/', this.modeloOc5.id]);
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
