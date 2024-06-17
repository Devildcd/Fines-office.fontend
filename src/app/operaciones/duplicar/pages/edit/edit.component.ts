import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Duplicar } from 'src/app/operaciones/interfaces/duplicar.interface';
import { DuplicarService } from '../../services/duplicar.service';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  duplicar!: Duplicar;
  id_matriz: any[] = [];
  mov_multa_id: any[] = [];
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private duplicarService: DuplicarService,
    private nomencladoresService: NomencladoresService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.duplicarService.getDuplicacion(id)))
      .subscribe((duplicar) => {
        this.duplicar = duplicar;
        this.loading = false;
        console.log(duplicar);

        this.formEditar.patchValue({ 
          id_matriz: duplicar.id_matriz,
          mov_multa_id: duplicar.mov_multa_id,
          fecha: duplicar.fecha,
         });
      });
 


    // this.nomencladoresService.getConceptosDevoluciones().subscribe( (conceptoDevoluciones)=>{
    //   this.conceptoDevoluciones = conceptoDevoluciones;
    // });
  }

  formEditar: FormGroup = this.fb.group({
    id_matriz: [null, Validators.required],
    mov_multa_id: [null, Validators.required],
    fecha: [null, Validators.required],
  });

  editarDuplicacion() {

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

    const duplicar = this.formatDates(this.formEditar.value);
    this.duplicarService.putDuplicacion( this.duplicar.id!, duplicar ).subscribe(
      (duplicar) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Duplicación actualizada',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/operaciones/duplicar']);
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
    formattedData.fecha = this.datePipe.transform(formData.fecha, 'yyyy-MM-dd');
    return formattedData;
  }

}
