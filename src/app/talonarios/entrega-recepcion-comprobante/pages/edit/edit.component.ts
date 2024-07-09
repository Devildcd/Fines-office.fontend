import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { EntregaRecepcionComprobante } from '../../interfaces/entrega-recepcion-comprobante.interface';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { EntregaRecepcionComprobanteService } from '../../services/entrega-recepcion-cmprobante.service';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [DatePipe] 
})
export class EditComponent {

  entregas_recepcion_comprobante!: EntregaRecepcionComprobante;
  occms!: OCCM[]; 
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private entregarecepcioncomprobanteService: EntregaRecepcionComprobanteService,
    private nomencladoresService: NomencladoresService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.entregarecepcioncomprobanteService.getEntrega_Recepcion_Comprobante(id)))
      .subscribe((entregas_recepcion_comprobante) => {
        this.entregas_recepcion_comprobante = entregas_recepcion_comprobante;
        this.loading = false;
        console.log(this.entregas_recepcion_comprobante);

        this.formEditar.patchValue({
          fecha: entregas_recepcion_comprobante.fecha,
          movimiento: entregas_recepcion_comprobante.movimiento,
          codentrada: entregas_recepcion_comprobante.codentrada,
          entregadox: entregas_recepcion_comprobante.entregadox,
          recibidox: entregas_recepcion_comprobante.recibidox,
          referencia: entregas_recepcion_comprobante.referencia,
          serie: entregas_recepcion_comprobante.serie,
          numerd: entregas_recepcion_comprobante.numerd,
          numerh: entregas_recepcion_comprobante.numerh,
          carga_inicial: entregas_recepcion_comprobante.carga_inicial,
          estado: entregas_recepcion_comprobante.estado,
          tipo: entregas_recepcion_comprobante.tipo,
          activo: entregas_recepcion_comprobante.activo,
          occm_destino: entregas_recepcion_comprobante.occm_destino.id,
          operador: entregas_recepcion_comprobante.operador
        });
      });

    this.nomencladoresService.getOCCMS().subscribe(
      (occms) => {
        this.occms = occms;
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
    operador: ['', Validators.required],
  });

  editarEntregaRecepcionComprobante() {
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

    const entregas_recepcion_comprobante = this.formEditar.value;
    this.entregarecepcioncomprobanteService.putEntrega_Recepcion_Comprobante( this.entregas_recepcion_comprobante.id!, entregas_recepcion_comprobante).subscribe(
      (entregas_recepcion_comprobante) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/talonarios/entrega-recepcion-comprobante/listado']);
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
