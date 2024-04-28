import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Calendario } from 'src/app/nomencladores/interfaces/calendario.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendarios-edit',
  templateUrl: './calendarios-edit.component.html',
  styleUrls: ['./calendarios-edit.component.css']
})
export class CalendariosEditComponent {

  calendario!: Calendario;
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
        switchMap(({ id }) => this.nomencladoresService.getCalendario( id ))
      )
      .subscribe((calendario) => {
        this.calendario = calendario;
        this.loading = false;
        console.log( calendario );

        this.formEditar.patchValue({ ...calendario });
      });
  }

  formEditar: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    activo: [true],
  });

  editarCalendario() {

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

    const calendario = this.formEditar.value;
    this.nomencladoresService.putCalendario( this.calendario.id!, calendario ).subscribe(
      (calendario) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Calendario actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/calendarios']);
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
