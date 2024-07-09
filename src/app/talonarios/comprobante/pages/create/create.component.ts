import { Component } from '@angular/core';
import { Comprobante } from '../../interfaces/comprobante.interface';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { EntregaRecepcionComprobante } from 'src/app/talonarios/entrega-recepcion-comprobante/interfaces/entrega-recepcion-comprobante.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComprobanteService } from '../../services/comprobante.service';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { EntregaRecepcionComprobanteService } from 'src/app/talonarios/entrega-recepcion-comprobante/services/entrega-recepcion-cmprobante.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  comprobante!: Comprobante;
  occms: OCCM[] = [];
  id_Entregas_Recepcions: EntregaRecepcionComprobante[] = []
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private comprobanteService: ComprobanteService,
    private nomencladoresService: NomencladoresService,
    private entregarecepcionService: EntregaRecepcionComprobanteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.nomencladoresService.getOCCMS().subscribe(
      (occms)=>{
        this.occms = occms;
      }
    );
    this.entregarecepcionService.getEntregas_Recepcion_Comprobante().subscribe(
      (id_Entregas_Recepcions)=>{
        this.id_Entregas_Recepcions = id_Entregas_Recepcions;
      }
    )
  }

  formCrear: FormGroup = this.fb.group({
    serie: [null, Validators.required],
    letra: [null, Validators.required],
    estado: ['Confirmado'],
    occm: [null, Validators.required],
    id_Entrega_Recepcion_Comprobante: [null, Validators.required],
    activo: [true],
    operador: [null, Validators.required],
  });

  crearComprobante() {
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

     this.comprobante = {
       ...this.formCrear.value,
     };
    this.comprobanteService.postComprobante(this.comprobante).subscribe(
      (ComprobanteCreado) => {
        this.comprobante = ComprobanteCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/talonarios/comprobante/detalles', this.comprobante.id]);
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
}
