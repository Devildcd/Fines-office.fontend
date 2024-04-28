import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Municipio } from 'src/app/nomencladores/interfaces/municipio.interfaces';
import { Provincia } from 'src/app/nomencladores/interfaces/provincia.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-municipio-edit',
  templateUrl: './municipio-edit.component.html',
  styleUrls: ['./municipio-edit.component.css']
})
export class MunicipioEditComponent {

  municipio!: Municipio;
  provincias!:Provincia[]
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
        switchMap(({ id }) => this.nomencladoresService.getMunicipio( id ))
      )
      .subscribe((municipio) => {
        this.municipio = municipio;
        this.loading = false;
        console.log(  this.municipio );

        this.formEditar.patchValue({ 
          id_municipio: municipio.id_municipio,
          nombre: municipio.nombre,
          activo: municipio.activo,
          provincia_id: municipio.provincia_id.id
         });
      });
      this.nomencladoresService.getProvincias().subscribe(
        (provincias)=>{
          this.provincias = provincias
        }
      )
  }

  formEditar: FormGroup = this.fb.group({
    id_municipio: ['', Validators.required],
    nombre: ['', Validators.required],
    provincia_id: ['', Validators.required],
    activo: [true],
  });

  editarMunicipio() {

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

    const municipio = this.formEditar.value;
    this.nomencladoresService.putMunicipio( this.municipio.id!, municipio ).subscribe(
      (municipio) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Municipio actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/municipios']);
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
