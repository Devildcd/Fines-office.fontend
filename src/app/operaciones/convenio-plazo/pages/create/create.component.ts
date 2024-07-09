import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConvenioPlazo } from 'src/app/operaciones/interfaces/convenio-plazo.interface';
import { ConvenioPlazoService } from '../../service/convenio-plazo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Convenio } from 'src/app/operaciones/interfaces/convenio.interface';
import { ConvenioService } from 'src/app/operaciones/convenio/services/convenio.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [DatePipe]
})
export class CreateComponent {
  convenioPlazo!: ConvenioPlazo;
  convenioPagos: Convenio[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private convenioPlazoService: ConvenioPlazoService,
    private convenioService: ConvenioService,
    private router: Router
  ) {}

  ngOnInit() {

    // this.nomenclService.getOCCMS().subscribe(
    //   (occmPadre)=>{
    //     this.occmPadre = occmPadre;
    //   }
    // );
    this.convenioService.getConvenios().subscribe(
     (convenioPagos)=>{
       this.convenioPagos = convenioPagos;
     }
    );
    
  }

  formCrear: FormGroup = this.fb.group({
    mes: [null, Validators.required],
    plazo: [null, Validators.required],
    importe_plazo: [null, Validators.required],
    convenio_pago_id: [null, Validators.required]
  });

  crearConvenioPlazo() {

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
     this.convenioPlazo = {
      ...this.formCrear.value,
     };
    this.convenioPlazoService.postConvenioPlazo(this.convenioPlazo).subscribe(
      (convenioPlazoCreado) => {
        this.convenioPlazo = convenioPlazoCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/operaciones/convenio-plazo/detalles', this.convenioPlazo.id]);
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
  //   formattedData.mes = this.datePipe.transform(formData.mes, 'yyyy-MM-dd');
  //   return formattedData;
  // }

}
