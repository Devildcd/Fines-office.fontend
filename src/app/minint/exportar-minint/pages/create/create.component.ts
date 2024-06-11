import { Component } from '@angular/core';
import { ExportarMinint } from '../../interfaces/exportar-minint.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpMinintService } from '../../services/exp-minint.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  expMinint!: ExportarMinint;
  submitted = false;
 
  constructor(
    private fb: FormBuilder,
    private expMinintService: ExpMinintService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  formCrear: FormGroup = this.fb.group({
    sequence_id: ['', Validators.required],
    date_export_before: [null, Validators.required],
    nombre_zip: ['', Validators.required],
    archivo_select: ['', Validators.required],
    fecha_creacion: [null, Validators.required],
  });

  crearExpMinint() {

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

    const formattedData = this.formatDates(this.formCrear.value);
    console.log( formattedData );

    this.expMinintService.postExportarMinint(this.expMinint).subscribe(
      (expMinintCreada) => {
        this.expMinint = expMinintCreada;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
       
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

  formatDates(formData: any): any {
    const formattedData = { ...formData };
    formattedData.fecha_imp = this.datePipe.transform(formData.fecha_imp, 'yyyy-MM-dd');
    formattedData.fecha_gestion = this.datePipe.transform(formData.fecha_gestion, 'yyyy-MM-dd');
    formattedData.fecha_comunicada = this.datePipe.transform(formData.fecha_comunicada, 'yyyy-MM-dd');
    formattedData.fecha_denunciada = this.datePipe.transform(formData.fecha_denunciada, 'yyyy-MM-dd');
    return formattedData;
  }
}
