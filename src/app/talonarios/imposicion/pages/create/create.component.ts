import { Component } from '@angular/core';
import { Imposicion } from '../../interfaces/imposicion.interface';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { Organismo } from 'src/app/nomencladores/interfaces/organismo.interface';
import { EntregaRecepcionImposicion } from 'src/app/talonarios/entrega-recepcion-imposicion/interfaces/entrega-recepcion-imposicion.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImposicionService } from '../../services/imposicion.service';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { Router } from '@angular/router';
import { EntregaRecepcionImposicionService } from 'src/app/talonarios/entrega-recepcion-imposicion/services/entrega-recepcion-imposicion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  imposicion!: Imposicion;
  occms: OCCM[] = [];
  organismos: Organismo[] = [];
  id_Entregas_Recepcions: EntregaRecepcionImposicion[] = []
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private imposicionService: ImposicionService,
    private nomencladoresService: NomencladoresService,
    private entregarecepcionService: EntregaRecepcionImposicionService,
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
    this.entregarecepcionService.getEntregas_Recepcion_Imposicion().subscribe(
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
    organismo: [null, Validators.required],
    id_Entrega_Recepcion_Imposicion: [null, Validators.required],
    activo: [true],
    forestal: [true],
  });

  crearImposicion() {
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

     this.imposicion = {
       ...this.formCrear.value,
     };
    this.imposicionService.postImposicion(this.imposicion).subscribe(
      (ImposicionCreado) => {
        this.imposicion = ImposicionCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/talonarios/imposicion/detalles', this.imposicion.id]);
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
