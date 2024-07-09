import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Matriz } from 'src/app/base/matriz/interfaces/matriz.interface';
import { Convenio } from 'src/app/operaciones/interfaces/convenio.interface';
import { ConvenioService } from '../../services/convenio.service';
import { MatrizService } from 'src/app/base/matriz/services/matriz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [DatePipe]
})
export class EditComponent {
  convenio!: Convenio;
  matrices: Matriz[] = [];
  consecutivos: any[] = [];
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private convenioService: ConvenioService,
    private matrizService: MatrizService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.convenioService.getConvenio(id)))
      .subscribe((convenio) => {
        this.convenio = convenio;
        this.loading = false;
        console.log(convenio);

        this.formEditar.patchValue({ 
          matriz_id: convenio.matriz_id,
          consecutivo_id: convenio.consecutivo_id,
          importe: convenio.importe,
          cant_plazos: convenio.cant_plazos,
          mes_inicio: convenio.mes_inicio,
          fecha_cancelacion: convenio.fecha_cancelacion,   
          estado: convenio.estado,   
          observaciones: convenio.observaciones,   
          carga_inicial: convenio.carga_inicial,   
          no_romper: convenio.no_romper,  
          plazos_convenio: convenio.plazos_convenio,  
         });
      });
 
    this.matrizService.getMatrices().subscribe( (matrices)=>{
      this.matrices = matrices;
    });

    // this.consecutivoService.getConsecutivos().subscribe(
    //   (consecutivos)=>{
    //     this.consecutivos = consecutivos;
    //   }
    // );

  }

  formEditar: FormGroup = this.fb.group({
    matriz_id: [null, Validators.required],
    consecutivo_id: ['draft', Validators.required],
    importe: [null, Validators.required],
    cant_plazos: [null, Validators.required],
    mes_inicio: [null, Validators.required],
    fecha_cancelacion: [null, Validators.required],
    estado: [null, Validators.required],
    observaciones: [null, Validators.required],
    carga_inicial: [null, Validators.required],
    no_romper: [null, Validators.required],
    plazos_convenio: [[{}], Validators.required],
  });

  editarConvenio() {

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

    const convenio = this.formatDates(this.formEditar.value);
    this.convenioService.putConvenio( this.convenio.id!, convenio ).subscribe(
      (convenio) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Concepto Convenio actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/operaciones/convenio']);
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
    const convenio = { ...formData };
    convenio.fecha_cancelacion = this.datePipe.transform(formData.fecha__comunicacion, 'yyyy-MM-dd');
    return convenio;
  }
}
