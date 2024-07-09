import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Matriz } from 'src/app/base/matriz/interfaces/matriz.interface';
import { Convenio } from 'src/app/operaciones/interfaces/convenio.interface';
import { ConvenioService } from '../../services/convenio.service';
import { MatrizService } from 'src/app/base/matriz/services/matriz.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [DatePipe]
})
export class CreateComponent {
  convenio!: Convenio;
  matrices: Matriz[] = [];
  consecutivos: any[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private convenioService: ConvenioService,
    private matrizService: MatrizService,
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
    
    // this.consecutivoService.getConsecutivos().subscribe(
    //   (consecutivos)=>{
    //     this.consecutivos = consecutivos;
    //   }
    // );
  }

  formCrear: FormGroup = this.fb.group({
    matriz_id: [null, Validators.required],
    consecutivo_id: [null, Validators.required],
    importe: [null, Validators.required],
    cant_plazos: [null, Validators.required],
    mes_inicio: [null, Validators.required],
    fecha_cancelacion: [null, Validators.required],
    estado: ["borrador", Validators.required],
    observaciones: [null, Validators.required],
    carga_inicial: [null, Validators.required],
    no_romper: [null, Validators.required],
    plazos_convenio: [[{}], Validators.required]
  });

  crearComunicacionEmbargo() {

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
    this.convenioService.postConvenio(formattedData).subscribe(
      (convenioCreado) => {
        this.convenio = convenioCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/operaciones/convenio/detalles', this.convenio.id]);
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
    formattedData.fecha_comunicacion = this.datePipe.transform(formData.fecha_comunicacion, 'yyyy-MM-dd');
    return formattedData;
  }
}
