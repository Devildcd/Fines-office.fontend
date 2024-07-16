import { Component, TemplateRef, ViewChild } from '@angular/core';
import { OC5 } from '../../interfaces/oc5.interface';
import { Organismo } from 'src/app/nomencladores/interfaces/organismo.interface';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { Oc5Service } from '../../services/oc5.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [DatePipe]
})
export class EditComponent {

  modeloOc5!: OC5;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    'fecha',
    'importe',
    'talon',
    'dley_art_inc',
    'tipo_multa',
    'moneda',
    'contraventor',
    'devolver',
    'nivel',
    'actions'];
  organismos: Organismo[] = [];
  occms: OCCM[] = [];
  multas: any[] = [];
  submitted = false;
  loading = true;
  success = false;

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild('dialogTemplate1') dialogTemplate1!: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private oc5Service: Oc5Service,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public dialog: MatDialog,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.oc5Service.getModeloOc5( id ))
      )
      .subscribe((modeloOc5) => {
        this.modeloOc5 = modeloOc5;
        this.dataSource = modeloOc5.multas_crear;
        this.loading = false;
        console.log(  this.modeloOc5 );

        this.formEditar.patchValue({ 
          occm: modeloOc5.occm.id,
          organismo_origen: modeloOc5.organismo_origen.id,
          cantidad_multas: modeloOc5.cantidad_multas,
          importe_total: modeloOc5.importe_total,
          suma_serie: modeloOc5.suma_serie,
          suma_dias: modeloOc5.suma_dias,
          estado: modeloOc5.estado,
          multas_crear: modeloOc5.multas_crear

          // multas: modeloOc5.multas
         });
      });
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

  formEditar: FormGroup = this.fb.group({
    occm: ['', Validators.required],
    cantidad_multas: [null, Validators.required],
    importe_total: [null, Validators.required],
    suma_serie: [null, Validators.required],
    suma_dias: [null, Validators.required],
    oc_37: [[]],
    estado: ['', Validators.required],
    multas_crear: [[]],
    organismo_origen: ['', Validators.required]
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

  openDialog1(): void {
    const dialogRef = this.dialog.open(this.dialogTemplate1, {
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
      this.success = true;
      setTimeout(() => {
        this.success = false;
        this.formCrearMulta.reset({
          temporal: false,
          devolver: false,
          recibida_traslado: false,
          carga: false,
          nivel: false
        }); 
      }, 1000);
    }
  }

  eliminarMulta(index: number): void {
    this.modeloOc5.multas_crear.splice(index, 1);
    this.dataSource.data = [...this.modeloOc5.multas_crear]; // Esto actualiza la tabla
    this.editarModeloOc5();
  }

  editarModeloOc5() {

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
    
  const multasActuales = this.formEditar.get('multas_crear')?.value || [];
  const multasActualizadas = [...multasActuales, ...this.multas];
  this.formEditar.patchValue({
    multas_crear: multasActualizadas
  });
    const modeloOc5 = this.formEditar.value;
    this.oc5Service.putModeloOc5( this.modeloOc5.id!, modeloOc5 ).subscribe(
      (modeloOc5) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/recepción/modeloOC5/listado']);
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
