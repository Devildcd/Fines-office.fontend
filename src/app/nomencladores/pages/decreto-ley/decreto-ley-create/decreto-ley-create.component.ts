import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DecretoLey } from 'src/app/nomencladores/interfaces/decreto-ley.interface';
import { TipoMulta } from 'src/app/nomencladores/interfaces/tipo-multa.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-decreto-ley-create',
  templateUrl: './decreto-ley-create.component.html',
  styleUrls: ['./decreto-ley-create.component.css']
})
export class DecretoLeyCreateComponent {

  decreto!: DecretoLey;
  tiposMultas: TipoMulta[] = [];
  
  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  ngOnInit(){
    this.nomencladoresService.getTiposMultas().subscribe((tiposMultas) => {
      this.tiposMultas = tiposMultas;
    });
  }

  formCrear: FormGroup = this.fb.group({
    id_decreto_ley: ['', Validators.required],
    descripcion: ['', Validators.required],
    activo: [true],
    tipo_multa: ['', Validators.required],
  });

  crearDecreto() {

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

    this.decreto = {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postDecreto(this.decreto).subscribe(
      (decretoDecreado) => {
        this.decreto = decretoDecreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Decreto Ley creado',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/decreto-ley', this.decreto.id]);
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
