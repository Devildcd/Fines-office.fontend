import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { TipoCobro } from 'src/app/nomencladores/interfaces/tipo-cobro.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-cobro-edit',
  templateUrl: './tipo-cobro-edit.component.html',
  styleUrls: ['./tipo-cobro-edit.component.css']
})
export class TipoCobroEditComponent {

  tipoCobro!: TipoCobro;
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
        switchMap(({ id }) => this.nomencladoresService.getTipoCobro( id ))
      )
      .subscribe((tipoCobro) => {
        this.tipoCobro = tipoCobro;
        this.loading = false;
        console.log( tipoCobro );

        this.formEditar.patchValue({ ...tipoCobro });
      });
  }

  formEditar: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    automatico: [false],
    activo: [true],
  });

  editarTipoCobro() {

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

    const tipoCobro = this.formEditar.value;
    this.nomencladoresService.putTipoCobro( this.tipoCobro.id!, tipoCobro ).subscribe(
      (tipoCobro) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Concepto de Tipo de Cobro actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/tipo-cobro']);
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
