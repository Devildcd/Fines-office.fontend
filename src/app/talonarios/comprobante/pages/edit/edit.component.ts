import { Component } from '@angular/core';
import { Comprobante } from '../../interfaces/comprobante.interface';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { EntregaRecepcionComprobante } from 'src/app/talonarios/entrega-recepcion-comprobante/interfaces/entrega-recepcion-comprobante.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComprobanteService } from '../../services/comprobante.service';
import { EntregaRecepcionComprobanteService } from 'src/app/talonarios/entrega-recepcion-comprobante/services/entrega-recepcion-cmprobante.service';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  comprobantes!: Comprobante;
  occms!: OCCM[];
  id_Entregas_Recepcions_Comprobantes!: EntregaRecepcionComprobante[];
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private comprobanteService: ComprobanteService,
    private entregarecepcioncomprobanteService: EntregaRecepcionComprobanteService,
    private nomencladoresService: NomencladoresService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.comprobanteService.getComprobante(id)))
      .subscribe((comprobantes) => {
        this.comprobantes = comprobantes;
        this.loading = false;
        //console.log(this.imposicions);

        this.formEditar.patchValue({
          serie: comprobantes.serie,
          letra: comprobantes.letra,
          estado: comprobantes.estado,
          occm: comprobantes.occm.id,
          id_Entregas_Recepcions_Comprobantes: comprobantes.id_Entrega_Recepcion_Comprobante.id,
          activo: comprobantes.activo,
          operador: comprobantes.operador
        });
      });

    this.nomencladoresService.getOCCMS().subscribe(
      (occms) => {
        this.occms = occms;
      }
    );
    this.entregarecepcioncomprobanteService.getEntregas_Recepcion_Comprobante().subscribe(
      (id_Entregas_Recepcions_Comprobantes) => {
        this.id_Entregas_Recepcions_Comprobantes = this.id_Entregas_Recepcions_Comprobantes;
      }
    );
  }

  formEditar: FormGroup = this.fb.group({
    serie: [null, Validators.required],
    letra: [null, Validators.required],
    estado: [null, Validators.required],
    occm: [null, Validators.required],
    id_Entrega_Recepcion_Imposicion: [null, Validators.required],
    operador: [null, Validators.required],
    activo: [true],
  });

  editarComprobante() {
    if (this.formEditar.untouched) {
      // El formulario es inválido o no se ha tocadocls
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, modifique algún campo',
        showConfirmButton: true,
      });
      return;
    }

    const comprobantes = this.formEditar.value;
    this.comprobanteService.putComprobante(this.comprobantes.id!, comprobantes).subscribe(
      (comprobantes) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/talonarios/comprobante/listado']);
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
