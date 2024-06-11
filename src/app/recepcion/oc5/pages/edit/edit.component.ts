import { Component } from '@angular/core';
import { OC5 } from '../../interfaces/oc5.interface';
import { Organismo } from 'src/app/nomencladores/interfaces/organismo.interface';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { Oc5Service } from '../../services/oc5.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  modeloOc5!: OC5;
  organismos: Organismo[] = [];
  occms: OCCM[] = [];
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private oc5Service: Oc5Service,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.oc5Service.getModeloOc5( id ))
      )
      .subscribe((modeloOc5) => {
        this.modeloOc5 = modeloOc5;
        this.loading = false;
        console.log(  this.modeloOc5 );

        this.formEditar.patchValue({ 
          occm: modeloOc5.occm,
          organismo_origen: modeloOc5.organismo_origen,
          cantidad_multas: modeloOc5.cantidad_multas,
          importe_total: modeloOc5.importe_total,
          suma_serie: modeloOc5.suma_serie,
          suma_dias: modeloOc5.suma_dias,
          estado: modeloOc5.estado,
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
    organismo_origen: ['', Validators.required],
    cantidad_multas: ['', Validators.required],
    importe_total: ['', Validators.required],
    suma_serie: ['', Validators.required],
    suma_dias: ['', Validators.required],
    estado: ['', Validators.required],
    multas: [[]],
  });

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
