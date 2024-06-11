import { Component } from '@angular/core';
import { Oc40 } from '../../interfaces/oc40.interface';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { Oc40Service } from '../../services/oc40.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  modeloOc40!: Oc40;
  occms: OCCM[] = [];
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private oc40Service: Oc40Service,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.oc40Service.getModeloOc40( id ))
      )
      .subscribe((modeloOc40) => {
        this.modeloOc40 = modeloOc40;
        this.loading = false;
        console.log(  this.modeloOc40 );

        this.formEditar.patchValue({ 
          occm: modeloOc40.occm,
          occm_destino: modeloOc40.occm_destino,
          cantidad_multas: modeloOc40.cantidad_multas,
          importe_total: modeloOc40.importe_total,
          suma_serie: modeloOc40.suma_serie,
          suma_dias: modeloOc40.suma_dias,
          estado: modeloOc40.estado,
          multas: modeloOc40.multas
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
    occm_destino: ['', Validators.required],
    cantidad_multas: ['', Validators.required],
    importe_total: ['', Validators.required],
    suma_serie: ['', Validators.required],
    suma_dias: ['', Validators.required],
    estado: ['', Validators.required],
    multas: [[]],
  });

  editarModeloOc40() {

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

    const modeloOc40 = this.formEditar.value;
    this.oc40Service.putModeloOc40( this.modeloOc40.id!, modeloOc40 ).subscribe(
      (modeloOc40) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/recepción/modeloOC40/listado']);
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
