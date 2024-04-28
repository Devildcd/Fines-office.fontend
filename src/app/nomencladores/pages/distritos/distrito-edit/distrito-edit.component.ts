import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Distrito } from 'src/app/nomencladores/interfaces/distritos.interface';
import { Municipio } from 'src/app/nomencladores/interfaces/municipio.interfaces';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-distrito-edit',
  templateUrl: './distrito-edit.component.html',
  styleUrls: ['./distrito-edit.component.css']
})
export class DistritoEditComponent {

  distrito!: Distrito;
  occms: OCCM[] = [];
  municipios: Municipio[] = [];
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getDistrito( id ))
      )
      .subscribe((distrito) => {
        this.distrito = distrito;
        this.loading = false;
        console.log( distrito );

        this.formEditar.patchValue({ 
          id_distrito: distrito.id_distrito,
          nombre: distrito.nombre,
          occm: distrito.occm?.id,
          municipio_id: distrito.municipio_id.id,
          activo: distrito.activo,
          
         });
      });
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

  formEditar: FormGroup = this.fb.group({
    id_distrito: ['', Validators.required],
    nombre: ['', Validators.required],
    occm: [],
    municipio_id: ['', Validators.required],
    activo: [true],
 
  });

  editarDistrito() {

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

    const distrito = this.formEditar.value;
    this.nomencladoresService.putDistrito( this.distrito.id!, distrito ).subscribe(
      (distrito) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Distrito actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/distritos']);
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
