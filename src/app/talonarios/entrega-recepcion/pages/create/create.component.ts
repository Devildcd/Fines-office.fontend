import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { EntregaRecepcion } from '../../interfaces/entrega-recepcion.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntregaRecepcionService } from '../../services/entrega-recepcion.service';
import { Router } from '@angular/router';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { Organismo } from 'src/app/nomencladores/interfaces/organismo.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  standalone: false,
  //imports: [],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [DatePipe] 
})
export class CreateComponent {

  entregas_recepcion!: EntregaRecepcion;
  occms: OCCM[] = [];
  organismos: Organismo[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private entregarecepcionService: EntregaRecepcionService,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  ngOnInit() {
    this.nomencladoresService.getOCCMS().subscribe(
      (occms)=>{
        this.occms = occms;
      }
    );
    this.nomencladoresService.getOrganismos().subscribe(
      (organismos)=>{
        this.organismos = organismos;
      }
    );
  }

  formCrear: FormGroup = this.fb.group({
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
    occm_destino: [null, Validators.required],
    organismo: [null, Validators.required],
  });

  crearEntregaRecepcion() {

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
    this.entregarecepcionService.postEntrega_Recepcion_Imposicion(formattedData).subscribe(
      (entregarecepcionCreado) => {
        this.entregas_recepcion = entregarecepcionCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/talonarios/entrega-recepcion/detalles', this.entregas_recepcion.id]);
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
    formattedData.fecha = this.datePipe.transform(formData.fecha, 'yyyy-MM-dd');
    return formattedData;
  }

}
