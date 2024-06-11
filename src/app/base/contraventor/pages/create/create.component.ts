import { Component } from '@angular/core';
import { Contraventor } from '../../interfaces/contraventor.interface';
import { Provincia } from 'src/app/nomencladores/interfaces/provincia.interface';
import { Municipio } from 'src/app/nomencladores/interfaces/municipio.interfaces';
import { Distrito } from 'src/app/nomencladores/interfaces/distritos.interface';
import { ConsejoPopular } from 'src/app/nomencladores/interfaces/consejo-popular.interface';
import { Zona } from 'src/app/nomencladores/interfaces/zona.interface';
import { SituacionLaboral } from 'src/app/nomencladores/interfaces/situacion-laboral.interface';
import { CentroTrabajo } from 'src/app/base/centro-trabajo/interfaces/centroTrabajo.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { ContraventorService } from '../../services/contraventor.service';
import { Router } from '@angular/router';
import { CentroTrabajoService } from 'src/app/base/centro-trabajo/services/centro-trabajo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  contraventor!: Contraventor;
  provincias: Provincia[] = [];
  municipios: Municipio[] = [];
  distritos: Distrito[] = [];
  cpopulares: ConsejoPopular[] = [];
  zonas: Zona[]= [];
  sitLaborales: SituacionLaboral[]= [];
  centroTrabajos: CentroTrabajo[]= [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private contraventorService: ContraventorService,
    private centroTrabajoService: CentroTrabajoService,
    private router: Router
  ) {}

  ngOnInit() {

    this.nomencladoresService.getProvincias().subscribe(
      (provincias)=>{
        this.provincias = provincias;
      }
    );
    this.nomencladoresService.getMunicipios().subscribe(
      (municipios)=>{
        this.municipios = municipios;
      }
    );
    this.nomencladoresService.getDistritos().subscribe(
      ( distritos ) => {
        this.distritos = distritos;
      }
    );
    this.nomencladoresService.getConsejoPopulares().subscribe(
      (cpopulares)=>{
        this.cpopulares = cpopulares;
      }
    );
    this.nomencladoresService.getZonas().subscribe(
      (zonas)=>{
        this.zonas = zonas;
      }
    );
    this.nomencladoresService.getSituacionesLaborales().subscribe(
      (sitLaborales)=>{
        this.sitLaborales = sitLaborales;
      }
    );
    this.centroTrabajoService.getCentrosTrabajos().subscribe(
      (centros)=>{
        this.centroTrabajos = centros;
      }
    );
  }

  formCrear: FormGroup = this.fb.group({
    ci: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido1: [''],
    apellido2: ['', Validators.required],
    direccion: ['', Validators.required],
    direccion_garux: ['', Validators.required],
    provincia_id: ['', Validators.required],
    municipio_id: ['', Validators.required],
    distrito_id: ['', Validators.required],
    cpopular_id: ['', Validators.required],
    zona_id: ['', Validators.required],
    sitlaboral_id: ['', Validators.required],
    sit_lab_id: ['', Validators.required],
    nombre_ctrabajo: ['', Validators.required],
    direccion_ctrabajo: ['', Validators.required],
    menor_edad: [false],
    far: [false],
    pasaporte: [false],
    cant_multa: [null, Validators.required],
    cant_importe: [null, Validators.required],
    cant_mult_calc: [1, Validators.required],
    carga: [false],
    fecha_actualizacion_suin: ['', Validators.required],
  });

  crearContraventor() {

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

    this.contraventor = {
      ...this.formCrear.value,
    };
    this.contraventorService.postContraventor(this.contraventor).subscribe(
      (contraventorCreado) => {
        this.contraventor = contraventorCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/base/contraventor/detalles/', this.contraventor.id]);
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
