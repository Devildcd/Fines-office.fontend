import { Component } from '@angular/core';
import { EnviarTraslado } from '../../interfaces/enviar-traslado.interface';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { EnviarTrasladoService } from '../../services/enviar-traslado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  enviarTraslado!: EnviarTraslado;
  occms: OCCM[] = [];
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private enviarTrasladoService: EnviarTrasladoService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(){
    this.activeRoute.params
    .pipe(
      switchMap(({ id }) => this.enviarTrasladoService.getEnviarTraslado( id ))
    )
    .subscribe((enviarTraslado) => {
      this.enviarTraslado = enviarTraslado;
      this.loading = false;
      console.log(  this.enviarTraslado );

      this.formEditar.patchValue({ 
        occm: enviarTraslado.occm,
        occm_destino: enviarTraslado.occm_destino,
        cantidad_multas: enviarTraslado.cantidad_multas,
        importe_total: enviarTraslado.importe_total,
        suma_serie: enviarTraslado.suma_serie,
        suma_dias: enviarTraslado.suma_dias,
        estado: enviarTraslado.estado,
        // multas: modeloOc5.multas
       });
    });
    this.nomencladoresService.getOCCMS().subscribe(
      (occms)=>{
        this.occms = occms;
      }
    );
  }

  formEditar: FormGroup = this.fb.group({
    occm: ['', Validators.required],
    cantidad_multas: [null, Validators.required],
    importe_total: [null, Validators.required],
    suma_serie: [null, Validators.required],
    suma_dias: [null, Validators.required],
    estado: ['', Validators.required],
    multas_enviar: [[]],
    occm_destino: ['', Validators.required]
  });

  editarEnviarTraslado() {

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

    const enviarTraslado = this.formEditar.value;
    this.enviarTrasladoService.putEnviarTraslado( this.enviarTraslado.id!, enviarTraslado ).subscribe(
      (enviarTraslado) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/recepción/enviar-traslado/listado']);
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
