import { ComunicacionEmbargo } from './../../../interfaces/comunicacion-embargo.interface';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Municipio } from 'src/app/nomencladores/interfaces/municipio.interfaces';
import { ComunicacionEmbargoService } from '../../services/comunicacion-embargo.service';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [DatePipe]
})
export class CreateComponent {
  comunicacionEmbargo!: ComunicacionEmbargo;
  municipios: Municipio[] = [];
  id_matriz: any[] = [];
  selectedConfirmado = 'proceso';
  selectedEstado = 'proceso';
  meses: {id: number, nombre: string}[] = [
    {id: 1, nombre: 'Enero'},
    {id: 2, nombre: 'Febrero'},
    {id: 3, nombre: 'Marzo'},
    {id: 4, nombre: 'Abril'},
    {id: 5, nombre: 'Mayo'},
    {id: 6, nombre: 'Junio'},
    {id: 7, nombre: 'Julio'},
    {id: 8, nombre: 'Agosto'},
    {id: 9, nombre: 'Septiembre'},
    {id: 10, nombre: 'Octubre'},
    {id: 11, nombre: 'Noviembre'},
    {id: 12, nombre: 'Diciembre'},
  ];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private comunicacionEmbargoService: ComunicacionEmbargoService,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  ngOnInit() {

    // this.nomenclService.getOCCMS().subscribe(
    //   (occmPadre)=>{
    //     this.occmPadre = occmPadre;
    //   }
    // );
    this.nomencladoresService.getMunicipios().subscribe(
      (municipios)=>{
        this.municipios = municipios;
      }
    );
    
  }

  formCrear: FormGroup = this.fb.group({
    id_matriz: [null, Validators.required],
    contraventor: [null, Validators.required],
    importe_pen: [null, Validators.required],
    importe_liq: [null, Validators.required],
    confirmado: [null, Validators.required],
    fecha_comunicacion: [null, Validators.required],
    recibido_por: [null, Validators.required],
    cargo: [null, Validators.required],
    observaciones: [null, Validators.required],
    mes: [null, Validators.required],
    state: [null, Validators.required],
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
    this.comunicacionEmbargoService.postComunicacionEmbargo(formattedData).subscribe(
      (comunicacionEmbargoCreado) => {
        this.comunicacionEmbargo = comunicacionEmbargoCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/operaciones/comunicacion-embargo/detalles', this.comunicacionEmbargo.id]);
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
