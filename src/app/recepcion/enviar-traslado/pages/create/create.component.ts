import { Component } from '@angular/core';
import { EnviarTraslado } from '../../interfaces/enviar-traslado.interface';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { EnviarTrasladoService } from '../../services/enviar-traslado.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  enviarTraslado!: EnviarTraslado;
  occms: OCCM[] = [];

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private enviarTrasladoService: EnviarTrasladoService,
    private router: Router
  ) {}

  ngOnInit(){
    this.nomencladoresService.getOCCMS().subscribe(
      (occms)=>{
        this.occms = occms;
      }
    );
  }

  formCrear: FormGroup = this.fb.group({
    occm: ['', Validators.required],
    cantidad_multas: [null, Validators.required],
    importe_total: [null, Validators.required],
    suma_serie: [null, Validators.required],
    suma_dias: [null, Validators.required],
    estado: ['', Validators.required],
    multas_enviar: [[]],
    occm_destino: ['', Validators.required]
  });

  crearEnviarTraslado() {

    if (this.formCrear.invalid || this.formCrear.untouched) {
      // El formulario es inválido o no se ha tocado
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, completa los campos con *',
        showConfirmButton: true,
      });
      return;
    }

    this.enviarTraslado = {
      ...this.formCrear.value,
    };
    this.enviarTrasladoService.postEnviarTraslado(this.enviarTraslado).subscribe(
      (enviarTrasladoCreada) => {
        this.enviarTraslado = enviarTrasladoCreada;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/recepción/modeloOC5/detalles/', this.enviarTraslado.id]);
        }, 1000);
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
