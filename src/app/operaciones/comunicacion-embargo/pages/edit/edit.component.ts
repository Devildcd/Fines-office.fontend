import { ComunicacionEmbargoService } from './../../services/comunicacion-embargo.service';
import { MatrizService } from 'src/app/base/matriz/services/matriz.service';
import { ComunicacionEmbargo } from 'src/app/operaciones/interfaces/comunicacion-embargo.interface';
import { Component } from '@angular/core';
import { Matriz } from 'src/app/base/matriz/interfaces/matriz.interface';
import { Municipio } from 'src/app/nomencladores/interfaces/municipio.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [DatePipe]
})
export class EditComponent {
  comunicacionEmbargo!: ComunicacionEmbargo;
  municipios: Municipio[] = [];
  matrices: Matriz[] = [];
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private comunicacionEmbargoService: ComunicacionEmbargoService,
    private nomencladoresService: NomencladoresService,
    private matrizService: MatrizService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.comunicacionEmbargoService.getComunicacionEmbargo(id)))
      .subscribe((comunicacionEmbargo) => {
        this.comunicacionEmbargo = comunicacionEmbargo;
        this.loading = false;
        console.log(comunicacionEmbargo);

        this.formEditar.patchValue({ 
          municipio_id: comunicacionEmbargo.municipio_id,
          id_matriz: comunicacionEmbargo.id_matriz,
          contraventor: comunicacionEmbargo.contraventor,
          importe_pen: comunicacionEmbargo.importe_pen,
          importe_liq: comunicacionEmbargo.importe_liq,
          confirmado: comunicacionEmbargo.confirmado,
          fecha_comunicacion: comunicacionEmbargo.fecha_comunicacion,   
          recibido_por: comunicacionEmbargo.recibido_por,   
          cargo: comunicacionEmbargo.cargo,   
          observaciones: comunicacionEmbargo.observaciones,  
          mes: comunicacionEmbargo.mes,   
          state: comunicacionEmbargo.state,  
         });
      });
 


    this.nomencladoresService.getMunicipios().subscribe( (municipios)=>{
      this.municipios = municipios;
    });

  }

  formEditar: FormGroup = this.fb.group({
    municipio_id: ['', Validators.required],
    id_matriz: ['', Validators.required],
    contraventor: ['', Validators.required],
    importe_pen: ['', Validators.required],
    importe_liq: ['', Validators.required],
    confirmado: ['', Validators.required],
    fecha_comunicacion: ['', Validators.required],
    recibido_por: ['', Validators.required],
    cargo: ['', Validators.required],
    observaciones: ['', Validators.required],
    mes: ['', Validators.required],
    state: ['', Validators.required],
  });

  editarApremiar() {

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

    const comunicacionEmbargo = this.formatDates(this.formEditar.value);
    this.comunicacionEmbargoService.putComunicacionEmbargo( this.comunicacionEmbargo.id!, comunicacionEmbargo ).subscribe(
      (comunicacionEmbargo) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Concepto Comunicacion Embargo actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/operaciones/comunicacion-embargo']);
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
    const comunicacionEmbargo = { ...formData };
    comunicacionEmbargo.fecha__comunicacion = this.datePipe.transform(formData.fecha__comunicacion, 'yyyy-MM-dd');
    return comunicacionEmbargo;
  }
}
