import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Matriz } from 'src/app/base/matriz/interfaces/matriz.interface';
import { MatrizService } from 'src/app/base/matriz/services/matriz.service';
import { SubMovMulta } from 'src/app/base/sub-mov-multa/interfaces/sub-mov-multa.interface';
import { ConceptoAjuste } from 'src/app/nomencladores/interfaces/concepto-ajuste.interface';
import { Ajustar } from 'src/app/operaciones/interfaces/ajustar.interface';
import { AjustarService } from '../../services/ajustar.service';
import { SubMovMultaService } from 'src/app/base/sub-mov-multa/services/sub-mov-multa.service';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [DatePipe]
})
export class CreateComponent {
  ajustar!: Ajustar;
  matrices: Matriz[] = [];
  conceptoAjustes: ConceptoAjuste[] = [];
  movimientoMultas: SubMovMulta[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private ajustarService: AjustarService,
    private matrizService: MatrizService,
    private movimientoMultaService: SubMovMultaService,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  ngOnInit() {

    // this.nomenclService.getOCCMS().subscribe(
    //   (occmPadre)=>{
    //     this.occmPadre = occmPadre;
    //   }
    // );
    this.matrizService.getMatrices().subscribe(
      (matrices)=>{
        this.matrices = matrices;
      }
    );

    this.nomencladoresService.getConceptosAjustes().subscribe(
      (conceptoAjustes)=>{
        this.conceptoAjustes = conceptoAjustes;
      }
    );

    this.movimientoMultaService.getSubMovMultas().subscribe(
      (movimientoMultas)=>{
        this.movimientoMultas = movimientoMultas;
      }
    );
  }

  formCrear: FormGroup = this.fb.group({
    matriz_id: [null, Validators.required],
    concepto_ajuste_id: [null, Validators.required],
    importe_ajustado: [null, Validators.required],
    no_res: [null, Validators.required],
    observaciones: [null, Validators.required],
    mov_multa_id: [null, Validators.required]
  });

  crearAjustar() {

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

    // const formattedData = this.formatDates(this.formCrear.value);
    // console.log( formattedData )
    this.ajustar = {
       ...this.formCrear.value,
     };

    this.ajustarService.postAjustar(this.ajustar).subscribe(
      (ajustarCreado) => {
        this.ajustar = ajustarCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/operaciones/ajustar/detalles', this.ajustar.id]);
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

  //  formatDates(formData: any): any {
  //   const formattedData = { ...formData };
  //   formattedData.fecha_cancelacion = this.datePipe.transform(formData.fecha_cancelacion, 'yyyy-MM-dd');
  //   return formattedData;
  // }
}
