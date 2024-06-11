import { Component } from '@angular/core';
import { Operador } from '../../interfaces/operador.interface';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperadorService } from '../../services/operador.service';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  operador!: Operador;
  occms: OCCM[] = [];
  submitted = false;
  loading = true;
 
  constructor(
    private fb: FormBuilder,
    private operadorService: OperadorService,
    private nomencladoresService: NomencladoresService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activeRoute.params
    .pipe(
      switchMap(({ id }) => this.operadorService.getOperador( id ))
    )
    .subscribe((operador) => {
      this.operador = operador;
      this.loading = false;
      console.log(  this.operador );

      this.formEditar.patchValue({ 
        first_name: operador.first_name,
        last_name: operador.last_name,
        is_active: operador.is_active,
        occm: operador.occm,
        cobro: operador.cobro,
        id_operador: operador.id_operador,
        cargo: operador.cargo,
       });
    });
    this.nomencladoresService.getOCCMS().subscribe( (occms) => {
      this.occms = occms;
    } );
  }

  formEditar: FormGroup = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    is_active: [false],
    occm: [null, Validators.required],
    cobro: [null, Validators.required],
    id_operador: ['', Validators.required],
    cargo: ['', Validators.required],
  });

  editarOperador() {

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

    const operador = this.formEditar.value;
    this.operadorService.putOperador( this.operador.id!, operador ).subscribe(
      (operador) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/base/operador/listado']);
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
