import { Component } from '@angular/core';
import { EntregaRecepcionImposicion } from '../../interfaces/entrega-recepcion-imposicion.interface';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { Organismo } from 'src/app/nomencladores/interfaces/organismo.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { EntregaRecepcionImposicionService } from '../../services/entrega-recepcion-imposicion.service';
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

  entregas_recepcion_imposicion!: EntregaRecepcionImposicion;
  occms!: OCCM[]; 
  organismos!: Organismo[]
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private entregarecepcionimposicionService: EntregaRecepcionImposicionService,
    private nomencladoresService: NomencladoresService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.entregarecepcionimposicionService.getEntrega_Recepcion_Imposicion(id)))
      .subscribe((entregas_recepcion_imposicion) => {
        this.entregas_recepcion_imposicion = entregas_recepcion_imposicion;
        this.loading = false;
        console.log(this.entregas_recepcion_imposicion);

        this.formEditar.patchValue({
          fecha: entregas_recepcion_imposicion.fecha,
          movimiento: entregas_recepcion_imposicion.movimiento,
          codentrada: entregas_recepcion_imposicion.codentrada,
          entregadox: entregas_recepcion_imposicion.entregadox,
          recibidox: entregas_recepcion_imposicion.recibidox,
          referencia: entregas_recepcion_imposicion.referencia,
          serie: entregas_recepcion_imposicion.serie,
          numerd: entregas_recepcion_imposicion.numerd,
          numerh: entregas_recepcion_imposicion.numerh,
          carga_inicial: entregas_recepcion_imposicion.carga_inicial,
          estado: entregas_recepcion_imposicion.estado,
          tipo: entregas_recepcion_imposicion.tipo,
          activo: entregas_recepcion_imposicion.activo,
          occm_destino: entregas_recepcion_imposicion.occm_destino.id,
          organismo: entregas_recepcion_imposicion.organismo.id
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

  editarEntregaRecepcionImposicion() {
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

    const entregas_recepcion_imposicion = this.formEditar.value;
    this.entregarecepcionimposicionService.putEntrega_Recepcion_Imposicion( this.entregas_recepcion_imposicion.id!, entregas_recepcion_imposicion).subscribe(
      (entregas_recepcion_imposicion) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/talonarios/entrega-recepcion-imposicion/listado']);
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
