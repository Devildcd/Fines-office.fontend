import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Matriz } from 'src/app/base/matriz/interfaces/matriz.interface';
import { SubMovMulta } from 'src/app/base/sub-mov-multa/interfaces/sub-mov-multa.interface';
import { ConceptoAjuste } from 'src/app/nomencladores/interfaces/concepto-ajuste.interface';
import { Ajustar } from 'src/app/operaciones/interfaces/ajustar.interface';
import { AjustarService } from '../../services/ajustar.service';
import { MatrizService } from 'src/app/base/matriz/services/matriz.service';
import { SubMovMultaService } from 'src/app/base/sub-mov-multa/services/sub-mov-multa.service';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [DatePipe]
})
export class EditComponent {
  ajustar!: Ajustar;
  matrices: Matriz[] = [];
  conceptoAjustes: ConceptoAjuste[] = [];
  movimientoMultas: SubMovMulta[] = [];
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private ajustarService: AjustarService,
    private matrizService: MatrizService,
    private movimientoMultaService: SubMovMultaService,
    private nomencladoresService: NomencladoresService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.ajustarService.getAjustar(id)))
      .subscribe((ajustar) => {
        this.ajustar = ajustar;
        this.loading = false;
        console.log(ajustar);

        this.formEditar.patchValue({ 
          matriz_id: ajustar.matriz_id,
          concepto_ajuste_id: ajustar.concepto_ajuste_id,
          importe_ajustado: ajustar.importe_ajustado,
          no_res: ajustar.no_res,
          observaciones: ajustar.observaciones,
          mov_multa_id: ajustar.mov_multa_id,
         });
      });
 
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

  formEditar: FormGroup = this.fb.group({
    matriz_id: [null, Validators.required],
    concepto_ajuste_id: [null, Validators.required],
    importe_ajustado: [null, Validators.required],
    no_res: [null, Validators.required],
    observaciones: [null, Validators.required],
    mov_multa_id: [null, Validators.required]
  });

  editarAjustar() {

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

    // const ajustar = this.formatDates(this.formEditar.value);
    this.ajustar = {
       ...this.formEditar.value,
     };


    this.ajustarService.putAjustar( this.ajustar.id!, this.ajustar ).subscribe(
      (ajustar) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Ajuste actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/operaciones/ajustar']);
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

  // formatDates(formData: any): any {
  //   const ajustar = { ...formData };
  //   ajustar.fecha_cancelacion = this.datePipe.transform(formData.fecha_cancelacion, 'yyyy-MM-dd');
  //   return ajustar;
  // }
}
