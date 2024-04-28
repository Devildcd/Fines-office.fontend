import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Distrito } from 'src/app/nomencladores/interfaces/distritos.interface';
import { Municipio } from 'src/app/nomencladores/interfaces/municipio.interfaces';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { Provincia } from 'src/app/nomencladores/interfaces/provincia.interface';
import { tipoOficina } from 'src/app/nomencladores/interfaces/tipo-oficina.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-occm-create',
  templateUrl: './occm-create.component.html',
  styleUrls: ['./occm-create.component.css']
})
export class OccmCreateComponent {

  occm!: OCCM;
  occmPadre: OCCM[] = [];
  provincias: Provincia[] = [];
  distritos: Distrito[] = [];
  municipios: Municipio[] = [];
  tiposOficinas: tipoOficina[]= [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  ngOnInit() {

    this.nomencladoresService.getOCCMS().subscribe(
      (occmPadre)=>{
        this.occmPadre = occmPadre;
      }
    );
    this.nomencladoresService.getProvincias().subscribe(
      (provincias)=>{
        this.provincias = provincias;
      }
    );
    this.nomencladoresService.getMunicipios().subscribe(
      ( municipios ) => {
        this.municipios = municipios;
      }
    );
    this.nomencladoresService.getDistritos().subscribe(
      (distritos)=>{
        this.distritos = distritos;
      }
    );
    this.nomencladoresService.getTipoOficinas().subscribe(
      (tiposOficinas)=>{
        this.tiposOficinas = tiposOficinas;
      }
    );
  }

  formCrear: FormGroup = this.fb.group({
    id_occm: ['', Validators.required],
    nit: ['', Validators.required],
    descripcion: [''],
    direccion: ['', Validators.required],
    telefono: ['', Validators.required],
    es_distrito: [false],
    ofic_con_distrito: [false],
    activo: [true],
    provincia_id: ['', Validators.required],
    municipio_id: ['', Validators.required],
    distrito_id: ['', Validators.required],
    tipo_oficina_id: ['', Validators.required],
    padre_id: ['', Validators.required],
  });

  crearOCCM() {

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

    this.occm = {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postOCCM(this.occm).subscribe(
      (occmCreado) => {
        this.occm = occmCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/occm', this.occm.id]);
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
