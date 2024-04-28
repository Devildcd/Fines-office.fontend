import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstadoMulta } from 'src/app/nomencladores/interfaces/estado-multa.interface';
import { SituacionMulta } from 'src/app/nomencladores/interfaces/situacion-multa.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estado-multa-create',
  templateUrl: './estado-multa-create.component.html',
  styleUrls: ['./estado-multa-create.component.css']
})
export class EstadoMultaCreateComponent {

  estadoMulta!: EstadoMulta;
  situacionMultas!: SituacionMulta[]


  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  ngOnInit(){
    this.nomencladoresService.getSituacionesMultas().subscribe(
      (situacionMultas)=>{
        this.situacionMultas = situacionMultas;
      }
    )
  }

  formCrear: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    situacion: ['', Validators.required],
    activo: [true],
  });

  crearEstadoMulta() {

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

    this.estadoMulta = {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postEstadoMulta(this.estadoMulta).subscribe(
      (estadoMultaCreado) => {
        console.log(estadoMultaCreado)
        this.estadoMulta = estadoMultaCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/estado-multa', this.estadoMulta.id]);
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
