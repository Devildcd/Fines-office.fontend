import { Component } from '@angular/core';
import { CentroTrabajo } from '../../interfaces/centroTrabajo.interface';
import { Organismo } from 'src/app/nomencladores/interfaces/organismo.interface';
import { Municipio } from 'src/app/nomencladores/interfaces/municipio.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CentroTrabajoService } from '../../services/centro-trabajo.service';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  centroTrabajo!: CentroTrabajo;
  organismos: Organismo[] = [];
  municipios: Municipio[] = [];
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private centroTrabajoService: CentroTrabajoService,
    private nomencladoresService: NomencladoresService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.centroTrabajoService.getCentroTrabajo( id ))
      )
      .subscribe((centroTrabajo) => {
        this.centroTrabajo = centroTrabajo;
        this.loading = false;
        console.log(  this.centroTrabajo );

        this.formEditar.patchValue({ 
          nombre: centroTrabajo.nombre,
          direccion: centroTrabajo.direccion,
          organismo_trabajo: centroTrabajo.organismo_trabajo,
          organismo_trabajo_id: centroTrabajo.organismo_trabajo_id,
          municipio: centroTrabajo.municipio,
          carga: centroTrabajo.carga,
         });
      });
      this.nomencladoresService.getMunicipios().subscribe(
        (municipios)=>{
          this.municipios = municipios;
        }
      );

      this.nomencladoresService.getOrganismos().subscribe(
        (organismos)=>{
          this.organismos = organismos;
        }
      );
  }

  formEditar: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    direccion: ['', Validators.required],
    organismo_trabajo: ['', Validators.required],
    organismo_trabajo_id: ['', Validators.required],
    municipio: ['', Validators.required],
    carga: [false],
  });


  editarCentroTrabajo() {

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

    const centroTrabajo = this.formEditar.value;
    this.centroTrabajoService.putCentroTrabajo( this.centroTrabajo.id!, centroTrabajo ).subscribe(
      (centroTrabajo) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/base/centros-de-trabajos/listado']);
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
