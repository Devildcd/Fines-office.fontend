import { Component } from '@angular/core';
import { ExportarMinint } from '../../interfaces/exportar-minint.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpMinintService } from '../../services/exp-minint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  expMinint!: ExportarMinint;
  submitted = false;
  loading = true;
 
  constructor(
    private fb: FormBuilder,
    private expMinintService: ExpMinintService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
    .pipe(
      switchMap(({ id }) => this.expMinintService.getExportarMinint( id ))
    )
    .subscribe((expMinint) => {
      this.expMinint = expMinint;
      this.loading = false;
      console.log(  this.expMinint );

      this.formEditar.patchValue({ 
        sequence_id: expMinint.sequence_id,
        date_export_before: expMinint.date_export_before,
        nombre_zip: expMinint.nombre_zip,
        archivo_select: expMinint.archivo_select,
        fecha_creacion: expMinint.fecha_creacion,
       });
    });
  }

  formEditar: FormGroup = this.fb.group({
    sequence_id: ['', Validators.required],
    date_export_before: [null, Validators.required],
    nombre_zip: ['', Validators.required],
    archivo_select: ['', Validators.required],
    fecha_creacion: [null, Validators.required],
  });

  editarExpMinint() {

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

    const expMinint = this.formEditar.value;
    this.expMinintService.putExportarMinint( this.expMinint.id!, expMinint ).subscribe(
      (expMinint) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/base/exportar-minint/listado']);
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
