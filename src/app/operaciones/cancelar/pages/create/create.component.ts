import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Cancelar } from '../../../interfaces/cancelar.interfaces';
import { ConceptoCancelacion } from '../../../../nomencladores/interfaces/concepto-cancelacion.interface';
import { DatePipe } from '@angular/common';
import { CancelarService } from '../../services/cancelar.service';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [DatePipe]
})
export class CreateComponent {

  cancelar!: Cancelar;
  matrices: any[] = [];
  mov_multa_id: any[] = [];
  conceptosCancelaciones: ConceptoCancelacion[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private cancelarService: CancelarService,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  ngOnInit() {

    // this.nomenclService.getOCCMS().subscribe(
    //   (occmPadre)=>{
    //     this.occmPadre = occmPadre;
    //   }
    // );
    this.nomencladoresService.getConceptosCancelacion().subscribe(
      (conceptosCancelaciones)=>{
        this.conceptosCancelaciones = conceptosCancelaciones;
      }
    );
  }

  formCrear: FormGroup = this.fb.group({
    id_matriz: [null, Validators.required],
    mov_multa_id: [null, Validators.required],
    fecha_cancelacion: [null, Validators.required],
    ccancel_id: [null, Validators.required],
    notas: [null, Validators.required],
  });

  crearCancelar() {

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
    console.log( formattedData )
    // this.apremiar = {
    //   ...this.formCrear.value,
    // };
    this.cancelarService.postCancelar(formattedData).subscribe(
      (cancelarCreado) => {
        this.cancelar = cancelarCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/operaciones/cancelar/detalles', this.cancelar.id]);
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

   formatDates(formData: any): any {
    const formattedData = { ...formData };
    formattedData.matriz_fecha = this.datePipe.transform(formData.matriz_fecha, 'yyyy-MM-dd');
    return formattedData;
  }
}
