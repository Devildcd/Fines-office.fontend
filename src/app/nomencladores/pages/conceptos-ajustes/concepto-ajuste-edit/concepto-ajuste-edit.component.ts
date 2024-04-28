import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConceptoAjuste } from 'src/app/nomencladores/interfaces/concepto-ajuste.interface';
import { TipoAjuste } from 'src/app/nomencladores/interfaces/tipo-ajuste.inteface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-concepto-ajuste-edit',
  templateUrl: './concepto-ajuste-edit.component.html',
  styleUrls: ['./concepto-ajuste-edit.component.css'],
})
export class ConceptoAjusteEditComponent {
  conceptoAjuste!: ConceptoAjuste;
  tiposAjustes: TipoAjuste[] = [];
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getConceptoAjuste(id))
      )
      .subscribe((conceptoAjuste) => {
        this.conceptoAjuste = conceptoAjuste;
        this.loading = false;
        console.log(conceptoAjuste);

        this.formEditar.patchValue({
          descripcion: conceptoAjuste.descripcion,
          tipo_ajuste: conceptoAjuste.tipo_ajuste.id,
          automatico: conceptoAjuste.automatico,
          activo: conceptoAjuste.activo,
        });
      });
    this.nomencladoresService.getTiposAjustes().subscribe((tiposAjustes) => {
      this.tiposAjustes = tiposAjustes;
    });
  }

  formEditar: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    tipo_ajuste: [0, Validators.required],
    automatico: [false],
    activo: [true],
  });

  editarConceptoAjuste() {

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

    const conceptoAjuste = this.formEditar.value;
    this.nomencladoresService.putConceptoAjuste( this.conceptoAjuste.id!, conceptoAjuste ).subscribe(
      (conceptoAjuste) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Concepto de Ajuste actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/conceptos-ajustes']);
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
