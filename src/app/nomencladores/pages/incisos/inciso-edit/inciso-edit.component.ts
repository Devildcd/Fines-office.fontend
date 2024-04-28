import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Inciso } from 'src/app/nomencladores/interfaces/inciso.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inciso-edit',
  templateUrl: './inciso-edit.component.html',
  styleUrls: ['./inciso-edit.component.css']
})
export class IncisoEditComponent {
  inciso!: Inciso;
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
        switchMap(({ id }) => this.nomencladoresService.getInciso( id ))
      )
      .subscribe((inciso) => {
        this.inciso = inciso;
        this.loading = false;
        console.log( inciso );

        this.formEditar.patchValue({ ...inciso });
      });
  }

  formEditar: FormGroup = this.fb.group({
    id_inciso: ['', Validators.required],
    activo: [true],
  });

  editarInciso() {

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


    const inciso = this.formEditar.value;
    this.nomencladoresService.putInciso( this.inciso.id!, inciso ).subscribe(
      (inciso) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Inciso actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/inciso']);
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
