import { Component } from '@angular/core';
import { Matriz } from '../../interfaces/matriz.interface';
import { OC5 } from 'src/app/recepcion/oc5/interfaces/oc5.interface';
import { Organismo } from 'src/app/nomencladores/interfaces/organismo.interface';
import { DecretoLey } from 'src/app/nomencladores/interfaces/decreto-ley.interface';
import { TipoMulta } from 'src/app/nomencladores/interfaces/tipo-multa.interface';
import { EstadoMulta } from 'src/app/nomencladores/interfaces/estado-multa.interface';
import { Moneda } from 'src/app/nomencladores/interfaces/moneda.interface';
import { ConceptoTraslado } from 'src/app/nomencladores/interfaces/concepto-traslado.interface';
import { Contraventor } from 'src/app/base/contraventor/interfaces/contraventor.interface';
import { Oc6 } from 'src/app/recepcion/oc6/interfaces/oc6.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatrizService } from '../../services/matriz.service';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { ContraventorService } from 'src/app/base/contraventor/services/contraventor.service';
import { Oc5Service } from 'src/app/recepcion/oc5/services/oc5.service';
import { Oc6Service } from 'src/app/recepcion/oc6/services/oc6.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { DecretoLeyArticuloInciso } from 'src/app/nomencladores/interfaces/decreto-ley-articulo-inciso.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  matriz!: Matriz;
  modelosOc5: OC5[] = [];
  organismos: Organismo[] = [];
  // talon: Talon[] = [];
  decretosLey: DecretoLeyArticuloInciso[] = [];
  tiposMultas: TipoMulta[]= [];
  estadoMultas: EstadoMulta[]= [];
  monedas: Moneda[]= [];
  conceptosTraslados: ConceptoTraslado[]= [];
  contraventores: Contraventor[]= [];
  modelosOc6: Oc6[]= [];
  submitted = false;
  loading = true;


  constructor(
    private fb: FormBuilder,
    private matrizService: MatrizService,
    // private talonariosService: TalonariosService,
    private nomencladoresService: NomencladoresService,
    private contraventorService: ContraventorService,
    private oc5Service: Oc5Service,
    private oc6Service: Oc6Service,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.matrizService.getMatriz( id ))
      )
      .subscribe((matriz) => {
        this.matriz = matriz;
        this.loading = false;
        console.log(  this.matriz );

        this.formEditar.patchValue({ 
          temporal: matriz.temporal,
          oc5: matriz.oc5,
          impositor: matriz.impositor,
          talon: matriz.talon,
          c1: matriz.c1,
          c2: matriz.c2,
          fecha: matriz.fecha,
          importe: matriz.importe,
          dley_art_inc: matriz.dley_art_inc,
          tipo_multa: matriz.tipo_multa,
          estado_multa_id: matriz.estado_multa_id,
          oc6: matriz.oc6,
          devolver: matriz.devolver,
          recibida_traslado: matriz.recibida_traslado,
          carga: matriz.carga,
          moneda: matriz.moneda,
          conceptraslado: matriz.conceptraslado,
          contraventor: matriz.contraventor,
          nivel: matriz.nivel,
          fecha_creacion: matriz.fecha_creacion,
          fecha_edicion: matriz.fecha_edicion,
         });
      });

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

  formEditar: FormGroup = this.fb.group({
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

  editarMatriz() {

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

    const contraventor = this.formEditar.value;
    this.matrizService.putMatriz( this.matriz.id!, contraventor ).subscribe(
      (matriz) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000
        });
        this.router.navigate(['/base/matriz/listado']);
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
