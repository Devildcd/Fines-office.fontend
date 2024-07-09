import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConceptoCancelacion } from 'src/app/nomencladores/interfaces/concepto-cancelacion.interface';
import { ConceptoDevolucion } from 'src/app/nomencladores/interfaces/concepto-devolucion.interface';
import { DecretoLeyArticuloInciso } from 'src/app/nomencladores/interfaces/decreto-ley-articulo-inciso.interface';
import { Organismo } from 'src/app/nomencladores/interfaces/organismo.interface';
import { TipoMulta } from 'src/app/nomencladores/interfaces/tipo-multa.interface';
import { Devolucion } from 'src/app/operaciones/interfaces/devolucion.interface';
import { DevolucionService } from '../../services/devolucion.service';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { Matriz } from 'src/app/base/matriz/interfaces/matriz.interface';
import { MatrizService } from 'src/app/base/matriz/services/matriz.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [DatePipe]
})
export class EditComponent {
  devolucion!: Devolucion;
  matrices: Matriz[] = [];
  conceptoDevoluciones: ConceptoDevolucion[] = [];
  conceptoCancelaciones: ConceptoCancelacion[] = [];
  tipoMultas: TipoMulta[] = [];
  organismos: Organismo[] = [];
  decretoLeyes: DecretoLeyArticuloInciso[] = [];
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private matrizService: MatrizService,
    private devolucionService: DevolucionService,
    private nomencladoresService: NomencladoresService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.devolucionService.getDevolucion(id)))
      .subscribe((devolucion) => {
        this.devolucion = devolucion;
        this.loading = false;
        console.log(devolucion);

        this.formEditar.patchValue({ 
          id_matriz: devolucion.id_matriz,
          conceptoDevoluciones: devolucion.concepto_devolucion_id,
          importe: devolucion.importe,
          matriz_fecha: devolucion.matriz_fecha,
          conceptoCancelaciones: devolucion.ccancel_id,
          tipoMultas: devolucion.tipo_multa_id,
          organismos: devolucion.organismo,
          decretoLeyes: devolucion.decreto_ley,
          observaciones: devolucion.observaciones,
          estados: devolucion.state,
         });
      });
 
    this.matrizService.getMatrices().subscribe((matrices)=>{
      this.matrices = matrices;
    });

    this.nomencladoresService.getConceptosDevoluciones().subscribe( (conceptoDevoluciones)=>{
      this.conceptoDevoluciones = conceptoDevoluciones;
    });

    this.nomencladoresService.getConceptosCancelacion().subscribe( (conceptoCancelaciones)=>{
      this.conceptoCancelaciones = conceptoCancelaciones;
    });
    this.nomencladoresService.getTiposMultas().subscribe( (tipoMultas)=>{
      this.tipoMultas = tipoMultas;
    });
    this.nomencladoresService.getOrganismos().subscribe( (organismos)=>{
      this.organismos = organismos;
    });
    this.nomencladoresService.getDecLeyArticulosIncisos().subscribe( (decretoLeyes)=>{
      this.decretoLeyes = decretoLeyes;
    });
  }

  formEditar: FormGroup = this.fb.group({
    id_matriz: [null, Validators.required],
    concepto_devolucion_id: [null, Validators.required],
    importe: [null, Validators.required],
    matriz_fecha: [null, Validators.required],
    ccancel_id: [null, Validators.required],
    tipo_multa_id: [null, Validators.required],
    organismo: [null, Validators.required],
    decreto_ley: [null, Validators.required],
    observaciones: [null, Validators.required],
    state: [null, Validators.required],
  });

  editarDevolucion() {

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

    const devolucion = this.formatDates(this.formEditar.value);
    this.devolucionService.putDevolucion( this.devolucion.id!, devolucion ).subscribe(
      (devolucion) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Devolución actualizada',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/operaciones/devolucion']);
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

}
