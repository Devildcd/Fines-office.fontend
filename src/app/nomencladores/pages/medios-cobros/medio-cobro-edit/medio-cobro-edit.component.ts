import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MedioCobro } from 'src/app/nomencladores/interfaces/medio-cobro.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medio-cobro-edit',
  templateUrl: './medio-cobro-edit.component.html',
  styleUrls: ['./medio-cobro-edit.component.css']
})
export class MedioCobroEditComponent {
  medioCobro!: MedioCobro;
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
        switchMap(({ id }) => this.nomencladoresService.getMedioCobro( id ))
      )
      .subscribe((medioCobro) => {
        this.medioCobro = medioCobro;
        this.loading = false;
        console.log( medioCobro );

        this.formEditar.patchValue({ ...medioCobro });
      });
  }

  formEditar: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    activo: [true],
  });

  editarMedioCobro() {

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


    const medioCobro = this.formEditar.value;
    this.nomencladoresService.putMedioCobro( this.medioCobro.id!, medioCobro ).subscribe(
      (medioCobro) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Medio de cobro actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/medio-cobro']);
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
