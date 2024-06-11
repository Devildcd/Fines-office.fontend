import { Component } from '@angular/core';
import { Cancelar } from 'src/app/operaciones/interfaces/cancelar.interfaces';
import { ConceptoCancelacion } from '../../../../nomencladores/interfaces/concepto-cancelacion.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CancelarService } from '../../services/cancelar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [DatePipe] 
})
export class EditComponent {
  cancelar!: Cancelar;
  matrices: any[] = [];
  mov_multa_id: any[] = [];
  conceptosCancelaciones: ConceptoCancelacion[] = [];
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private cancelarService: CancelarService,
    private nomencladoresService: NomencladoresService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.cancelarService.getCancelar(id)))
      .subscribe((cancelar) => {
        this.cancelar = cancelar;
        this.loading = false;
        console.log(cancelar);

        this.formEditar.patchValue({ 
          id_matriz: cancelar.id_matriz,
          mov_multa_id: cancelar.mov_multa_id,
          ccancel_id: cancelar.ccancel_id,
          notas: cancelar.notas,
         });
      });
 


    this.nomencladoresService.getConceptosCancelacion().subscribe( (conceptosCancelaciones)=>{
      this.conceptosCancelaciones = conceptosCancelaciones;
    });
  }

  formEditar: FormGroup = this.fb.group({
    id_matriz: [null, Validators.required],
    mov_multa_id: [null, Validators.required],
    fecha_cancelacion: [null, Validators.required],
    ccancel_id: [null, Validators.required],
    notas: [null, Validators.required],
  });

  editarCancelar() {

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

    const cancelar = this.formatDates(this.formEditar.value);
    this.cancelarService.putCancelar( this.cancelar.id!, cancelar ).subscribe(
      (cancelar) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Cancelación actualizada',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/operaciones/cancelar']);
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
    const cancelar = { ...formData };
    cancelar.fecha_cancelacion = this.datePipe.transform(formData.fecha_cancelacion, 'yyyy-MM-dd');
    return cancelar;
  }
}
