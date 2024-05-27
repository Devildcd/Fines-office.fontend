import { Component } from '@angular/core';
import { OC5 } from '../../interfaces/oc5.interface';
import { Organismo } from 'src/app/nomencladores/interfaces/organismo.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Oc5Service } from '../../services/oc5.service';
import { Router } from '@angular/router';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  modeloOc5!: OC5;
  organismos: Organismo[] = [];
  occms: OCCM[] = [];

  constructor(
    private fb: FormBuilder,
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

    this.nomencladoresService.getOrganismos().subscribe(
      (organismos)=>{
        this.organismos = organismos;
      }
    )
  }

  formCrear: FormGroup = this.fb.group({
    occm: ['', Validators.required],
    organismo_origen: ['', Validators.required],
    cantidad_multas: ['', Validators.required],
    importe_total: ['', Validators.required],
    suma_serie: ['', Validators.required],
    suma_dias: ['', Validators.required],
    estado: ['', Validators.required],
    multas: [{}, Validators.required],
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
