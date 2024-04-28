import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DecretoLey } from 'src/app/nomencladores/interfaces/decreto-ley.interface';
import { Organismo } from 'src/app/nomencladores/interfaces/organismo.interface';
import { TipoMulta } from 'src/app/nomencladores/interfaces/tipo-multa.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-organismo-create',
  templateUrl: './organismo-create.component.html',
  styleUrls: ['./organismo-create.component.css'],
})
export class OrganismoCreateComponent {
  organismo!: Organismo;
  organismosAsociados: Organismo[] = [];
  tiposMultas: TipoMulta[] = [];
  decretosLey: DecretoLey[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  ngOnInit() {
    this.nomencladoresService.getOrganismos().subscribe((organismos) => {
      this.organismosAsociados = organismos;
    });

    this.nomencladoresService.getTiposMultas().subscribe((tiposMultas) => {
      this.tiposMultas = tiposMultas;
    });

    this.nomencladoresService.getDecretos().subscribe((decretosLey) => {
      this.decretosLey = decretosLey;
    });
  }

  formCrear: FormGroup = this.fb.group({
    id_organismo: ['', Validators.required],
    nombre: ['', Validators.required],
    decreto_ley_id: [0, Validators.required],
    asociado: [false],
    asociado_id: [0],
    tipo_multa_id: [0, Validators.required],
    activo: [true]
  });

  crearOrganismo() {

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

    this.organismo = {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postOrganismo(this.organismo).subscribe(
      (organismoCreado) => {
        this.organismo = organismoCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Organismo creado',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/organismo', this.organismo.id]);
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
