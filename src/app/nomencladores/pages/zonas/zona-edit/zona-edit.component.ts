import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Zona } from 'src/app/nomencladores/interfaces/zona.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-zona-edit',
  templateUrl: './zona-edit.component.html',
  styleUrls: ['./zona-edit.component.css']
})
export class ZonaEditComponent {

  zona!: Zona;
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
        switchMap(({ id }) => this.nomencladoresService.getZona( id ))
      )
      .subscribe((zona) => {
        this.zona = zona;
        this.loading = false;
        console.log( zona );

        this.formEditar.patchValue({ ...zona });
      });
  }

  formEditar: FormGroup = this.fb.group({
    id_zona: ['', Validators.required],
    nombre: ['', Validators.required],
    activo: [true],
  });

  editarZona() {

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

    const zona = this.formEditar.value;
    this.nomencladoresService.putZona( this.zona.id!, zona ).subscribe(
      (zona) => {
        console.log(this.zona.id);
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Zona actualizada',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/zonas']);
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
