import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';
import { MultasCrear, Oc6 } from '../../interfaces/oc6.interface';
import { Oc6Service } from '../../services/oc6.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCrearMultaComponent } from '../../components/dialog-crear-multa/dialog-crear-multa.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [DatePipe] 
})
export class CreateComponent {

  modeloOc6: Oc6 = {
      occm: {} as OCCM, 
      cantidad_multas: 0,
      importe_total: 0,
      suma_serie: 0,
      suma_dias: 0,
      estado: '',
      multas_crear: [], 
      multas_recibidas: {},
      occm_origen: {} as OCCM
  };
  occms: OCCM[] = [];
  multas: any[] = [];

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private oc6Service: Oc6Service,
    private nomencladoresService: NomencladoresService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit(){
    // const storedIdCounter = localStorage.getItem('idCounter');
    // this.idCounter = storedIdCounter ? parseInt(storedIdCounter, 10) : 1;
    this.nomencladoresService.getOCCMS().subscribe(
      (occms)=>{
        this.occms = occms;
      }
    );
  }

  formCrear: FormGroup = this.fb.group({
    occm: ['', Validators.required],
    cantidad_multas: ['', Validators.required],
    importe_total: ['', Validators.required],
    suma_serie: ['', Validators.required],
    suma_dias: ['', Validators.required],
    estado: ['', Validators.required],
    multas_crear: [[]],
    multas_recibidas: [[]],
    occm_origen: ['', Validators.required],
  });

  formCrearMulta: FormGroup = this.fb.group({
    temporal: [false],
    fecha: ['', Validators.required],
    importe: ['', Validators.required],
    devolver: [false],
    recibida_traslado: [false],
    carga: [false],
    nivel: [false],
    impositor: [null, Validators.required],
    talon: [null, Validators.required],
    dley_art_inc: [null, Validators.required],
    tipo_multa: [null, Validators.required],
    estado_multa_id: [null, Validators.required],
    moneda: [null, Validators.required],
    conceptraslado: [null],
    contraventor: [null]  
  })

  openDialog(): void {
    const dialogRef = this.dialog.open(this.dialogTemplate, {
      disableClose: true,
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
      console.log('Resultado:', result);
    });
  }

  agregarMulta(): void {
    if (this.formCrearMulta.valid) {
      const multa = this.formCrearMulta.value;
      multa.fecha = this.datePipe.transform(multa.fecha, 'yyyy-MM-dd');

      this.multas.push(multa);
      console.log(this.multas);

      this.formCrearMulta.reset({
        temporal: false,
        devolver: false,
        recibida_traslado: false,
        carga: false,
        nivel: false
      }); 

      // Guardar en una variable la cantidad de elementos en multas_crear
      let cantidadDeMultas = this.multas.length;
      console.log('Cantidad de multas:', cantidadDeMultas);
    }
  }

  // agregarMulta(): void {
  //   if (this.formCrearMulta.valid) {
  //     const nuevaMulta = this.formCrearMulta.value;
      // nuevaMulta.id = this.idCounter++; // Asignar un ID único y autoincremental

      // Guardar el nuevo valor del contador en localStorage
    //   localStorage.setItem('idCounter', this.idCounter.toString());

    //   this.multas.push(nuevaMulta);
    //   this.formCrearMulta.reset({ temporal: false, devolver: false, recibida_traslado: false, carga: false, nivel: false }); // Resetear el formulario y mantener valores booleanos
    // }

  // Método para limpiar el valor del contador en localStorage
  // limpiarContador(): void {
    // this.idCounter = 0; // Restablecer el valor del contador
    // localStorage.setItem('idCounter', this.idCounter.toString()); // Actualizar localStorage
  // }

  crearModeloOc6() {

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

    this.modeloOc6 = {
      ...this.formCrear.value,
      multas_crear: this.multas,
    };
    this.oc6Service.postModeloOc6(this.modeloOc6).subscribe(
      (modeloOc6Creada) => {
        this.modeloOc6 = modeloOc6Creada;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
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
