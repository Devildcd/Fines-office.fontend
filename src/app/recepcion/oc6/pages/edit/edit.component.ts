import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';
import { Oc6 } from '../../interfaces/oc6.interface';
import { Oc6Service } from '../../services/oc6.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  modeloOc6!: Oc6;
  occms: OCCM[] = [];
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private oc6Service: Oc6Service,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.oc6Service.getModeloOc6( id ))
      )
      .subscribe((modeloOc6) => {
        this.modeloOc6 = modeloOc6;
        this.loading = false;
        console.log(  this.modeloOc6 );

        this.formEditar.patchValue({ 
          occm: modeloOc6.occm,
          cantidad_multas: modeloOc6.cantidad_multas,
          importe_total: modeloOc6.importe_total,
          suma_serie: modeloOc6.suma_serie,
          suma_dias: modeloOc6.suma_dias,
          estado: modeloOc6.estado,
          multas_crear: modeloOc6.multas_crear,
          multas_recibidas: modeloOc6.multas_recibidas,
          occm_origen: modeloOc6.occm_origen,
         });
      });
      this.nomencladoresService.getOCCMS().subscribe(
        (occms)=>{
          this.occms = occms;
        }
      );
  }

  formEditar: FormGroup = this.fb.group({
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

  editarModeloOc6() {

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

    const modeloOc6 = this.formEditar.value;
    this.oc6Service.putModeloOc6( this.modeloOc6.id!, modeloOc6 ).subscribe(
      (modeloOc6) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/recepción/modeloOC6/listado']);
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
