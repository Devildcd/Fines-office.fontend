import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConceptoAjuste } from 'src/app/nomencladores/interfaces/concepto-ajuste.interface';
import { TipoAjuste } from 'src/app/nomencladores/interfaces/tipo-ajuste.inteface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-concepto-ajuste-create',
  templateUrl: './concepto-ajuste-create.component.html',
  styleUrls: ['./concepto-ajuste-create.component.css']
})
export class ConceptoAjusteCreateComponent {

  conceptoAjuste!: ConceptoAjuste;
  tiposAjustes: TipoAjuste[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  ngOnInit() {

    this.nomencladoresService.getTiposAjustes().subscribe(
      ( tiposAjustes ) => {
        this.tiposAjustes = tiposAjustes;
      }
    )
  }

  formCrear: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    tipo_ajuste: [0, Validators.required],
    automatico: [false],
    activo: [true]
  });

  crearConceptoAjuste() {

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

    this.conceptoAjuste = {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postConceptoAjuste(this.conceptoAjuste).subscribe(
      (conceptoAjusteCreado) => {
        this.conceptoAjuste = conceptoAjusteCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Concepto de Ajuste creado',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/concepto-ajuste', this.conceptoAjuste.id]);
        }, 1000);
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
