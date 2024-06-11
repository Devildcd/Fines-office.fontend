import { Component } from '@angular/core';
import { EntregaRecepcion } from '../../interfaces/entrega-recepcion.interface';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { Organismo } from 'src/app/nomencladores/interfaces/organismo.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { EntregaRecepcionService } from '../../services/entrega-recepcion.service';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  standalone: false,
  //imports: [],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [DatePipe] 
})
export class EditComponent {

  entregas_recepcion!: EntregaRecepcion;
  occms!: OCCM[]; 
  organismos!: Organismo[]
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private entregarecepcionService: EntregaRecepcionService,
    private nomencladoresService: NomencladoresService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.entregarecepcionService.getEntrega_Recepcion_Imposicion(id)))
      .subscribe((entregas_recepcion) => {
        this.entregas_recepcion = entregas_recepcion;
        this.loading = false;
        console.log(this.entregas_recepcion);

        this.formEditar.patchValue({
          fecha: entregas_recepcion.fecha,
          movimiento: entregas_recepcion.movimiento,
          codentrada: entregas_recepcion.codentrada,
          entregadox: entregas_recepcion.entregadox,
          recibidox: entregas_recepcion.recibidox,
          referencia: entregas_recepcion.referencia,
          serie: entregas_recepcion.serie,
          numerd: entregas_recepcion.numerd,
          numerh: entregas_recepcion.numerh,
          carga_inicial: entregas_recepcion.carga_inicial,
          estado: entregas_recepcion.estado,
          tipo: entregas_recepcion.tipo,
          activo: entregas_recepcion.activo,
          occm_destino: entregas_recepcion.occm_destino.id,
          organismo: entregas_recepcion.organismo.id
        });
      });

    this.nomencladoresService.getOCCMS().subscribe(
      (occms) => {
        this.occms = occms;
      }
    );
    this.nomencladoresService.getOrganismos().subscribe(
      (organismos) => {
        this.organismos = organismos;
      }
    );
  }

  formEditar: FormGroup = this.fb.group({
    fecha: [null, Validators.required],
    movimiento: ['Entrada'],
    codentrada: [null, Validators.required],
    entregadox: [null, Validators.required],
    recibidox: [null, Validators.required],
    referencia: [null, Validators.required],
    serie: [null, Validators.required],
    numerd: [null, Validators.required],
    numerh: [null, Validators.required],
    carga_inicial: [false],
    estado: ['No confirmado'],
    tipo: ['Entrega'],
    activo: [false],
    occm_destino: ['', Validators.required],
    organismo: ['', Validators.required],
  });

  editarEntregaRecepcion() {
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

    const entregas_recepcion = this.formEditar.value;
    this.entregarecepcionService.putEntrega_Recepcion_Imposicion( this.entregas_recepcion.id!, entregas_recepcion ).subscribe(
      (entregas_recepcion) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/talonarios/entrega-recepcion/listado']);
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
  
}
