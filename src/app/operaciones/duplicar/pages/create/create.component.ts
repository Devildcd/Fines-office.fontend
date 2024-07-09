import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Duplicar } from 'src/app/operaciones/interfaces/duplicar.interface';
import { DuplicarService } from '../../services/duplicar.service';
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
  duplicar!: Duplicar;
  id_matriz: any[] = [];
  mov_multa_id: any[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private duplicarService: DuplicarService,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  ngOnInit() {

    // this.nomenclService.getOCCMS().subscribe(
    //   (occmPadre)=>{
    //     this.occmPadre = occmPadre;
    //   }
    // );
 
  }

  formCrear: FormGroup = this.fb.group({
    id_matriz: [null, Validators.required],
    mov_multa_id: [null, Validators.required],
    fecha: [null, Validators.required],
  });

  crearDuplicacion() {

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
    this.duplicarService.postDuplicacion(formattedData).subscribe(
      (duplicarCreado) => {
        this.duplicar = duplicarCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/operaciones/duplicar/detalles', this.duplicar.id]);
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
    formattedData.fecha = this.datePipe.transform(formData.fecha, 'yyyy-MM-dd');
    return formattedData;
  }
  
}
