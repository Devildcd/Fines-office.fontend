import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Moneda } from 'src/app/nomencladores/interfaces/moneda.interface';
import { Apremiar } from 'src/app/operaciones/interfaces/apremiar.interface';
import { ApremiarService } from '../../services/apremiar.service';
import { Router } from '@angular/router';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [DatePipe] 
})
export class CreateComponent {

  apremiar!: Apremiar;
  matrices: any[] = [];
  monedas: Moneda[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private apremiarService: ApremiarService,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  ngOnInit() {

    // this.nomenclService.getOCCMS().subscribe(
    //   (occmPadre)=>{
    //     this.occmPadre = occmPadre;
    //   }
    // );
    this.nomencladoresService.getMonedas().subscribe(
      (monedas)=>{
        this.monedas = monedas;
      }
    );
  }

  formCrear: FormGroup = this.fb.group({
    id_matriz: [null, Validators.required],
    moneda: [null, Validators.required],
    fecha_imp: [null],
    fecha_gestion: [null, Validators.required],
    fecha_comunicada: [null, Validators.required],
    fecha_denunciada: [null],
    num_radicacion: [null],
    state: ['no_confirmado'],
  });

  crearApremio() {

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
    this.apremiarService.postApremiar(formattedData).subscribe(
      (apremioCreado) => {
        this.apremiar = apremioCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/operaciones/apremiar/detalles', this.apremiar.id]);
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
    formattedData.fecha_imp = this.datePipe.transform(formData.fecha_imp, 'yyyy-MM-dd');
    formattedData.fecha_gestion = this.datePipe.transform(formData.fecha_gestion, 'yyyy-MM-dd');
    formattedData.fecha_comunicada = this.datePipe.transform(formData.fecha_comunicada, 'yyyy-MM-dd');
    formattedData.fecha_denunciada = this.datePipe.transform(formData.fecha_denunciada, 'yyyy-MM-dd');
    return formattedData;
  }
}
