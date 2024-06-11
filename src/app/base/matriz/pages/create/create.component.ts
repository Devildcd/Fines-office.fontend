import { Component } from '@angular/core';
import { Matriz } from '../../interfaces/matriz.interface';
import { OC5 } from 'src/app/recepcion/oc5/interfaces/oc5.interface';
import { Organismo } from 'src/app/nomencladores/interfaces/organismo.interface';
import { DecretoLey } from 'src/app/nomencladores/interfaces/decreto-ley.interface';
import { TipoMulta } from 'src/app/nomencladores/interfaces/tipo-multa.interface';
import { EstadoMulta } from 'src/app/nomencladores/interfaces/estado-multa.interface';
import { Oc6 } from 'src/app/recepcion/oc6/interfaces/oc6.interface';
import { Moneda } from 'src/app/nomencladores/interfaces/moneda.interface';
import { ConceptoTraslado } from 'src/app/nomencladores/interfaces/concepto-traslado.interface';
import { Contraventor } from 'src/app/base/contraventor/interfaces/contraventor.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { ContraventorService } from 'src/app/base/contraventor/services/contraventor.service';
import { Router } from '@angular/router';
import { Oc5Service } from 'src/app/recepcion/oc5/services/oc5.service';
import { Oc6Service } from 'src/app/recepcion/oc6/services/oc6.service';
import Swal from 'sweetalert2';
import { MatrizService } from '../../services/matriz.service';
import { DatePipe } from '@angular/common';
import { DecretoLeyArticuloInciso } from 'src/app/nomencladores/interfaces/decreto-ley-articulo-inciso.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  matriz!: Matriz;
  modelosOc5: OC5[] = [];
  organismos: Organismo[] = [];
  // talones: Talon[] = [];
  decretosLey: DecretoLeyArticuloInciso[] = [];
  tiposMultas: TipoMulta[]= [];
  estadoMultas: EstadoMulta[]= [];
  monedas: Moneda[]= [];
  conceptosTraslados: ConceptoTraslado[]= [];
  contraventores: Contraventor[]= [];
  modelosOc6: Oc6[]= [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private matrizService: MatrizService,
    // private talonariosService: TalonariosService,
    private nomencladoresService: NomencladoresService,
    private contraventorService: ContraventorService,
    private oc5Service: Oc5Service,
    private oc6Service: Oc6Service,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit() {

    this.oc5Service.getModelosOC5().subscribe(
      (modelosOC5)=>{
        this.modelosOc5 = modelosOC5;
      }
    );
    // this.talonarioService.getTalonarios().subscribe(
    //   (talonarios)=>{
    //     this.talonarios = talonarios;
    //   }
    // );
    this.nomencladoresService.getOrganismos().subscribe(
      (organismos)=>{
        this.organismos = organismos;
      }
    );
    this.nomencladoresService.getDecLeyArticulosIncisos().subscribe(
      ( decretosLey ) => {
        this.decretosLey = decretosLey;
      }
    );
    this.nomencladoresService.getTiposMultas().subscribe(
      (tiposMultas)=>{
        this.tiposMultas = tiposMultas;
      }
    );
    this.nomencladoresService.getEstadosMultas().subscribe(
      (estadoMultas)=>{
        this.estadoMultas = estadoMultas;
      }
    );
    this.nomencladoresService.getMonedas().subscribe(
      (monedas)=>{
        this.monedas = monedas;
      }
    );
    this.nomencladoresService.getConceptosTraslado().subscribe(
      (conceptosTraslados)=>{
        this.conceptosTraslados = conceptosTraslados;
      }
    );
    this.contraventorService.getContraventores().subscribe(
      (contraventores)=>{
        this.contraventores = contraventores;
      }
    );
    this.oc6Service.getModelosOC6().subscribe(
      (modelosOc6)=>{
        this.modelosOc6 = modelosOc6;
      }
    );
  }

  formCrear: FormGroup = this.fb.group({
    temporal: [false],
    oc5: [null],
    impositor: [null],
    talon: [null],
    c1: ['', Validators.required],
    c2: ['', Validators.required],
    fecha: [null, Validators.required],
    importe: [null, Validators.required],
    dley_art_inc: [null],
    tipo_multa: [null],
    estado_multa_id: [null, Validators.required],
    oc6: [null],
    devolver: [true],
    recibida_traslado: [false],
    carga: [false],
    moneda: [false],
    conceptraslado: [null],
    contraventor: [null],
    nivel: [true],
    fecha_creacion: [null, Validators.required],
    fecha_edicion: [null, Validators.required],
  });

  crearMatriz() {

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
    console.log( formattedData );

    this.matrizService.postMatriz(this.matriz).subscribe(
      (matrizCreado) => {
        this.matriz = matrizCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/base/matriz/detalles/', this.matriz.id]);
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
    formattedData.fecha_imp = this.datePipe.transform(formData.fecha_imp, 'yyyy-MM-dd');
    formattedData.fecha_gestion = this.datePipe.transform(formData.fecha_gestion, 'yyyy-MM-dd');
    formattedData.fecha_comunicada = this.datePipe.transform(formData.fecha_comunicada, 'yyyy-MM-dd');
    formattedData.fecha_denunciada = this.datePipe.transform(formData.fecha_denunciada, 'yyyy-MM-dd');
    return formattedData;
  }
}
