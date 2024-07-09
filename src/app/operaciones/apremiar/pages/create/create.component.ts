import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoMulta } from 'src/app/nomencladores/interfaces/estado-multa.interface';
import { Apremiar } from 'src/app/operaciones/interfaces/apremiar.interface';
import { ApremiarService } from '../../services/apremiar.service';
import { Router } from '@angular/router';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Matriz } from 'src/app/base/matriz/interfaces/matriz.interface';
import { SubMovMulta } from 'src/app/base/sub-mov-multa/interfaces/sub-mov-multa.interface';
import { MatrizService } from 'src/app/base/matriz/services/matriz.service';
import { SubMovMultaService } from 'src/app/base/sub-mov-multa/services/sub-mov-multa.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [DatePipe] 
})
export class CreateComponent {

  apremiar!: Apremiar;
  matrices: Matriz[] = [];
  movimientoMultas: SubMovMulta[] = [];
  estados: EstadoMulta[]= [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private apremiarService: ApremiarService,
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
    this.movimientoMultaService.getSubMovMultas().subscribe(
      (movimientoMultas)=>{
        this.movimientoMultas = movimientoMultas;
      }
    );
    this.nomencladoresService.getEstadosMultas().subscribe(
      (estados)=>{
        this.estados = estados;
      }
    );
    
  }

  formCrear: FormGroup = this.fb.group({
    id_matriz: [null, Validators.required],
    mov_multa_id: ['', Validators.required],
    estado: ['', Validators.required],
    fecha_apremio: ['', Validators.required],
    fecha_comunicada: ['', Validators.required],
    fecha_denunciada:['', Validators.required],
    num_radicacion: ['', Validators.required],
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
    formattedData.fecha_apremio = this.datePipe.transform(formData.fecha_apremio, 'yyyy-MM-dd');
    formattedData.fecha_comunicada = this.datePipe.transform(formData.fecha_comunicada, 'yyyy-MM-dd');
    formattedData.fecha_denunciada = this.datePipe.transform(formData.fecha_denunciada, 'yyyy-MM-dd');
    return formattedData;
  }
}
