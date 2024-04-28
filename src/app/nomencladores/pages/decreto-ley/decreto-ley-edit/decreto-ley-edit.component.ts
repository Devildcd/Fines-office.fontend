import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { DecretoLey } from 'src/app/nomencladores/interfaces/decreto-ley.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-decreto-ley-edit',
  templateUrl: './decreto-ley-edit.component.html',
  styleUrls: ['./decreto-ley-edit.component.css']
})
export class DecretoLeyEditComponent {

  decreto!: DecretoLey;
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
        switchMap(({ id }) => this.nomencladoresService.getDecreto( id ))
      )
      .subscribe((decreto) => {
        this.decreto = decreto;
        this.loading = false;
        console.log(  this.decreto );

        this.formEditar.patchValue({ 
          id_decreto_ley: decreto.id_decreto_ley,
          descripcion: decreto.descripcion,
          activo: decreto.activo,
         });
      });
  }

  formEditar: FormGroup = this.fb.group({
    id_decreto_ley: ['', Validators.required],
    descripcion: ['', Validators.required],
    activo: [true],
  });

  editarDecreto() {

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
    this.nomencladoresService.putDecreto( this.decreto.id!, municipio ).subscribe(
      (decreto) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Decreto Ley actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/decretos-ley']);
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
