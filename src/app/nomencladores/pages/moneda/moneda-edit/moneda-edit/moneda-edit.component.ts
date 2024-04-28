import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Moneda } from 'src/app/nomencladores/interfaces/moneda.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-moneda-edit',
  templateUrl: './moneda-edit.component.html',
  styleUrls: ['./moneda-edit.component.css']
})
export class MonedaEditComponent {
  monedas!: Moneda;
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
        switchMap(({ id }) => this.nomencladoresService.getMoneda( id ))
      )
      .subscribe((monedas) => {
        this.monedas = monedas;
        this.loading = false;
        console.log( monedas );

        this.formEditar.patchValue({ ...monedas });
      });
  }

  formEditar: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    automatico: [false],
    activo: [true],
  });

  editarMoneda()  {

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

    const monedas = this.formEditar.value;
    this.nomencladoresService.putMoneda( this.monedas.id!, monedas ).subscribe(
      (monedas) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Concepto de Moneda actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/moneda']);
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
