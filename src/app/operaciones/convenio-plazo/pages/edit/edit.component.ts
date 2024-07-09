import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConvenioPlazo } from 'src/app/operaciones/interfaces/convenio-plazo.interface';
import { ConvenioPlazoService } from '../../service/convenio-plazo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { ConvenioService } from 'src/app/operaciones/convenio/services/convenio.service';
import { Convenio } from 'src/app/operaciones/interfaces/convenio.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [DatePipe]
})
export class EditComponent {
  convenioPlazo!: ConvenioPlazo;
  convenioPagos: Convenio[] = [];
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private convenioPlazoService: ConvenioPlazoService,
    private convenioService: ConvenioService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.convenioPlazoService.getConvenioPlazo(id)))
      .subscribe((convenioPlazo) => {
        this.convenioPlazo = convenioPlazo;
        this.loading = false;
        console.log(convenioPlazo);

        this.formEditar.patchValue({ 
          mes: convenioPlazo.mes,
          plazo: convenioPlazo.plazo,
          importe_plazo: convenioPlazo.importe_plazo,
          convenio_pago_id: convenioPlazo.convenio_pago_id, 
         });
      });

      this.convenioService.getConvenios().subscribe(
        (convenioPagos)=>{
          this.convenioPagos = convenioPagos;
        }
       );
  }

  formEditar: FormGroup = this.fb.group({
    mes: [null, Validators.required],
    plazo: [null, Validators.required],
    importe_plazo: [null, Validators.required],
    convenio_pago_id: [null, Validators.required]
  });

  editarConvenioPlazo() {

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

    // const convenioPlazo = this.formatDates(this.formEditar.value);
    this.convenioPlazo = {
      ...this.formEditar.value,
     };
    this.convenioPlazoService.putConvenioPlazo( this.convenioPlazo.id!, this.convenioPlazo ).subscribe(
      (convenioPlazo) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Concepto Plazo Convenio actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/operaciones/convenio-plazo']);
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
  //   const convenioPlazo = { ...formData };
  //   convenioPlazo.mes = this.datePipe.transform(formData.mes, 'yyyy-MM-dd');
  //   return convenioPlazo;
  // }
}
