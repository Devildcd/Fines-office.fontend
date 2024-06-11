import { Component } from '@angular/core';
import { ConfiguracionApi } from '../../interfaces/configuracion-api.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfApiService } from '../../services/conf-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  confApi!: ConfiguracionApi;
  submitted = false;
  loading = true;
 
  constructor(
    private fb: FormBuilder,
    private confApiService: ConfApiService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
    .pipe(
      switchMap(({ id }) => this.confApiService.getConfiguracionApi( id ))
    )
    .subscribe((confApi) => {
      this.confApi = confApi;
      this.loading = false;
      console.log(  this.confApi );

      this.formEditar.patchValue({ 
        llave: confApi.llave,
        token: confApi.token,
        url: confApi.url,
       });
    });
  }

  formEditar: FormGroup = this.fb.group({
    url: ['', Validators.required],
    llave: ['', Validators.required],
    token: ['', Validators.required],
  });

  editarConfApi() {

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

    const confApi = this.formEditar.value;
    this.confApiService.putConfiguracionApi( this.confApi.id!, confApi ).subscribe(
      (confApi) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/base/configuracion-api/listado']);
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
