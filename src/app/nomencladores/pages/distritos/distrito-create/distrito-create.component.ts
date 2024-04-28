import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Distrito } from 'src/app/nomencladores/interfaces/distritos.interface';
import { Municipio } from 'src/app/nomencladores/interfaces/municipio.interfaces';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-distrito-create',
  templateUrl: './distrito-create.component.html',
  styleUrls: ['./distrito-create.component.css']
})
export class DistritoCreateComponent {

  distrito!: Distrito;
  occms!: OCCM[];
  municipios: Municipio[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  ngOnInit() {

    this.nomencladoresService.getOCCMS().subscribe(
      (occms)=>{
        this.occms = occms
      }
    )
    this.nomencladoresService.getMunicipios().subscribe(
      ( municipios ) => {
        this.municipios = municipios;
      }
    )
  }

  formCrear: FormGroup = this.fb.group({
    id_distrito: ['', Validators.required],
    nombre: ['', Validators.required],
    occm: [''],
    municipio_id: [0, Validators.required],
    activo: [true]
  });

  crearDistrito() {

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

    this.distrito = {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postDistrito(this.distrito).subscribe(
      (distritoCreado) => {
        this.distrito = distritoCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Distrito creado',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/distrito', this.distrito.id]);
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
