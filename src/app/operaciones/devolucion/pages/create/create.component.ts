import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConceptoDevolucion } from "src/app/nomencladores/interfaces/concepto-devolucion.interface";
import { DecretoLeyArticuloInciso } from "src/app/nomencladores/interfaces/decreto-ley-articulo-inciso.interface";
import { Organismo } from "src/app/nomencladores/interfaces/organismo.interface";
import { TipoMulta } from "src/app/nomencladores/interfaces/tipo-multa.interface";
import { DatePipe } from '@angular/common';
import { DevolucionService } from '../../services/devolucion.service';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';
import { Devolucion } from 'src/app/operaciones/interfaces/devolucion.interface';
import { ConceptoCancelacion } from 'src/app/nomencladores/interfaces/concepto-cancelacion.interface';
import { ThemePalette } from '@angular/material/core';
import { Matriz } from 'src/app/base/matriz/interfaces/matriz.interface';
import { MatrizService } from 'src/app/base/matriz/services/matriz.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [DatePipe]
})
export class CreateComponent {
  
  devolucion!: Devolucion;
  matrices: Matriz[] = [];
  conceptosDevolucion: ConceptoDevolucion[] = [];
  conceptosCancelacion: ConceptoCancelacion[] = [];
  tiposMulta: TipoMulta[] = [];
  organismos: Organismo[] = [];
  decretosLey: DecretoLeyArticuloInciso[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private matrizService: MatrizService,
    private devolucionService: DevolucionService,
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
    this.nomencladoresService.getConceptosDevoluciones().subscribe(
      (conceptosDevolucion)=>{
        this.conceptosDevolucion = conceptosDevolucion;
      }
    );
    this.nomencladoresService.getConceptosCancelacion().subscribe(
      (conceptosCancelacion)=>{
        this.conceptosCancelacion = conceptosCancelacion;
      }
    );
    this.nomencladoresService.getTiposMultas().subscribe(
      (tiposMulta)=>{
        this.tiposMulta = tiposMulta;
      }
    );
    this.nomencladoresService.getOrganismos().subscribe(
      (organismos)=>{
        this.organismos = organismos;
      }
    );
    this.nomencladoresService.getDecLeyArticulosIncisos().subscribe(
      (decretosLey)=>{
        this.decretosLey = decretosLey;
      }
    );
  }

  formCrear: FormGroup = this.fb.group({
    id_matriz: [null, Validators.required],
    concepto_devolucion_id: [null, Validators.required],
    importe: [null, Validators.required],
    matriz_fecha: [null, Validators.required],
    ccancel_id: [null, Validators.required],
    tipo_multa_id: [null, Validators.required],
    organismo: [null, Validators.required],
    decreto_ley: [null, Validators.required],
    observaciones: [null, Validators.required],
    state: [null],
  });

  crearDevolucion() {

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
    this.devolucionService.postDevolucion(formattedData).subscribe(
      (devolucionCreado) => {
        this.devolucion = devolucionCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/operaciones/devolucion/detalles', this.devolucion.id]);
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
    formattedData.matriz_fecha = this.datePipe.transform(formData.matriz_fecha, 'yyyy-MM-dd');
    return formattedData;
  }
  stateControl = new FormControl('no_confirmado' as ThemePalette);



}
