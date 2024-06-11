import { Component } from '@angular/core';
import { Oc37 } from '../../interfaces/oc37.interface';
import { OC5 } from 'src/app/recepcion/oc5/interfaces/oc5.interface';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Oc5Service } from 'src/app/recepcion/oc5/services/oc5.service';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Oc37Service } from '../../services/oc37.service';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  modeloOc37!: Oc37;
  modelosOc5: OC5[] = [];
  occms: OCCM[] = [];
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private oc37Service: Oc37Service,
    private oc5Service: Oc5Service,
    private nomencladoresService: NomencladoresService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(){
    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.oc37Service.getModeloOc37( id ))
      )
      .subscribe((modeloOc37) => {
        this.modeloOc37 = modeloOc37;
        this.loading = false;
        console.log(  this.modeloOc37 );

        this.formEditar.patchValue({ 
          oc5: modeloOc37,
          occm: modeloOc37.occm.id_occm,
          fecha_creado: modeloOc37.fecha_creado,
         });
      });
    this.nomencladoresService.getOCCMS().subscribe(
      (occms)=>{
        this.occms = occms;
      }
    )

    this.oc5Service.getModelosOC5().subscribe(
      (modelosOc5)=>{
        this.modelosOc5 = modelosOc5;
      }
    )
  }

  formEditar: FormGroup = this.fb.group({
    oc5: ['', Validators.required],
    occm: ['', Validators.required],
    fecha_creado: ['', Validators.required],
  });

  editarModeloOc37() {

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

    const modeloOc37 = this.formEditar.value;
    this.oc37Service.putModeloOc37( this.modeloOc37.id!, modeloOc37 ).subscribe(
      (modeloOc37) => {
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
