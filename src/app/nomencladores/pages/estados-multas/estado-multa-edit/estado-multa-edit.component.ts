import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { EstadoMulta } from 'src/app/nomencladores/interfaces/estado-multa.interface';
import { SituacionMulta } from 'src/app/nomencladores/interfaces/situacion-multa.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estado-multa-edit',
  templateUrl: './estado-multa-edit.component.html',
  styleUrls: ['./estado-multa-edit.component.css']
})
export class EstadoMultaEditComponent {

  estadoMulta!: EstadoMulta;
  situacionMultas!: SituacionMulta[]
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
        switchMap(({ id }) => this.nomencladoresService.getEstadoMulta( id ))
      )
      .subscribe((estadoMulta) => {
        this.estadoMulta = estadoMulta;
        this.loading = false;
        console.log(  this.estadoMulta );

        this.formEditar.patchValue({ 
          descripcion: estadoMulta.descripcion,
          situacion: estadoMulta.situacion.descripcion,
          activo: estadoMulta,
         });
      });
      this.nomencladoresService.getSituacionesMultas().subscribe(
        (situacionMultas)=>{
          this.situacionMultas = situacionMultas;
        }
      )
  }

  formEditar: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    situacion: ['', Validators.required],
    activo: [true],
  });

  editarEstadoMulta() {

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

    const estadoMulta = this.formEditar.value;
    this.nomencladoresService.putEstadoMulta( this.estadoMulta.id!, estadoMulta ).subscribe(
      (estadoMulta) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/estados-multas']);
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
