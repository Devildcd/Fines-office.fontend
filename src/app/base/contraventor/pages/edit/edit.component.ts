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
import { CentroTrabajoService } from 'src/app/base/centro-trabajo/services/centro-trabajo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  contraventor!: Contraventor;
  provincias: Provincia[] = [];
  municipios: Municipio[] = [];
  distritos: Distrito[] = [];
  cpopulares: ConsejoPopular[] = [];
  zonas: Zona[]= [];
  sitLaborales: SituacionLaboral[]= [];
  centroTrabajos: CentroTrabajo[]= [];
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private contraventorService: ContraventorService,
    private centroTrabajoService: CentroTrabajoService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.contraventorService.getContraventor( id ))
      )
      .subscribe((contraventor) => {
        this.contraventor = contraventor;
        this.loading = false;
        console.log(  this.contraventor );

        this.formEditar.patchValue({ 
          ci: contraventor.ci,
          nombre: contraventor.nombre,
          apellido1: contraventor.apellido1,
          apellido2: contraventor.apellido2,
          direccion: contraventor.direccion,
          direccion_garux: contraventor.direccion_garux,
          provincia_id: contraventor.provincia_id,
          municipio_id: contraventor.municipio_id,
          distrito_id: contraventor.distrito_id,
          cpopular_id: contraventor.cpopular_id,
          zona_id: contraventor.zona_id,
          sitlaboral_id: contraventor.sitlaboral_id,
          sit_lab_id: contraventor.sit_lab_id,
          nombre_ctrabajo: contraventor.nombre_ctrabajo,
          direccion_ctrabajo: contraventor.direccion_ctrabajo,
          menor_edad: contraventor.menor_edad,
          far: contraventor.far,
          pasaporte: contraventor.pasaporte,
          cant_multa: contraventor.cant_multa,
          cant_importe: contraventor.cant_importe,
          cant_mult_calc: contraventor.cant_mult_calc,
          carga: contraventor.carga,
          fecha_actualizacion_suin: contraventor.fecha_actualizacion_suin
         });
      });

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

  formEditar: FormGroup = this.fb.group({
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

  editarContraventor() {

    if ( this.formEditar.untouched ) {
      // El formulario es inválido o no se ha tocado
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, modifique algún campo',
        showConfirmButton: true,
      });
      return;
    }

    const contraventor = this.formEditar.value;
    this.contraventorService.putContraventor( this.contraventor.id!, contraventor ).subscribe(
      (contraventor) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000
        });
        this.router.navigate(['/base/contraventor/listado']);
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
