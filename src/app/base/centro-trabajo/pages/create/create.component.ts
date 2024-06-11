import { Component } from '@angular/core';
import { CentroTrabajo } from '../../interfaces/centroTrabajo.interface';
import { Organismo } from 'src/app/nomencladores/interfaces/organismo.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CentroTrabajoService } from '../../services/centro-trabajo.service';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Municipio } from 'src/app/nomencladores/interfaces/municipio.interfaces';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  centroTrabajo!: CentroTrabajo;
  organismos: Organismo[] = [];
  municipios: Municipio[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private centroTrabajoService: CentroTrabajoService,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  ngOnInit(){
    this.nomencladoresService.getOrganismos().subscribe(
      (organismos)=>{
        this.organismos = organismos;
      }
    );

    this.nomencladoresService.getMunicipios().subscribe(
      (municipios)=>{
        this.municipios = municipios;
      }
    );
  }

  formCrear: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    direccion: ['', Validators.required],
    organismo_trabajo: ['', Validators.required],
    organismo_trabajo_id: ['', Validators.required],
    municipio: ['', Validators.required],
    carga: [false],
  });

  crearCentroTrabajo() {

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

    this.centroTrabajo = {
      ...this.formCrear.value,
    };
    this.centroTrabajoService.postCentroTrabajo(this.centroTrabajo).subscribe(
      (centroTrabajoCreada) => {
        this.centroTrabajo = centroTrabajoCreada;
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
