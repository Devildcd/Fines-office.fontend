import { Component } from '@angular/core';
import { SubMovMulta } from '../../interfaces/sub-mov-multa.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubMovMultaService } from '../../services/sub-mov-multa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { MatrizService } from 'src/app/base/matriz/services/matriz.service';
import { Matriz } from 'src/app/base/matriz/interfaces/matriz.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  subMovMulta!: SubMovMulta;
  matrices: Matriz[] = [];
  submitted = false;
  loading = true;
 
  constructor(
    private fb: FormBuilder,
    private subMovMultaService: SubMovMultaService,
    private matrizService: MatrizService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.subMovMultaService.getSubMovMulta( id ))
      )
      .subscribe((subMovMulta) => {
        this.subMovMulta = subMovMulta;
        this.loading = false;
        console.log(  this.subMovMulta );

        this.formEditar.patchValue({ 
          matriz: subMovMulta.matriz,
          campos_json: subMovMulta.campos_json,
          operacion: subMovMulta.operacion,
          operacion_id: subMovMulta.operacion_id,
         });
      });
      this.matrizService.getMatrices().subscribe( (matrices) => {
        this.matrices = matrices;
      } );
  }


  formEditar: FormGroup = this.fb.group({
    matriz: ['', Validators.required],
    campos_json: [[{}], Validators.required],
    operacion: ['', Validators.required],
    operacion_id: [null, Validators.required],
  });

  editarSubMovMulta() {

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

    const subMovMulta = this.formEditar.value;
    this.subMovMultaService.putSubMovMulta( this.subMovMulta.id!, subMovMulta ).subscribe(
      (subMovMulta) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/base/sub-movimiento-multa/listado']);
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
