import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { DecretoLey } from 'src/app/nomencladores/interfaces/decreto-ley.interface';
import { Organismo } from 'src/app/nomencladores/interfaces/organismo.interface';
import { TipoMulta } from 'src/app/nomencladores/interfaces/tipo-multa.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-organismo-edit',
  templateUrl: './organismo-edit.component.html',
  styleUrls: ['./organismo-edit.component.css']
})
export class OrganismoEditComponent {

  organismo!: Organismo;
  organismosAsociados: Organismo[] = [];
  tiposMultas: TipoMulta[] = [];
  decretosLey: DecretoLey[] = [];
  decretoLeyIdsControl = new FormControl<number[]>([]);
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
      .pipe(switchMap(({ id }) => this.nomencladoresService.getOrganismo(id)))
      .subscribe((organismo) => {
        this.organismo = organismo;
        this.loading = false;
        console.log(organismo);

        this.formEditar.patchValue({
          id_organismo: organismo.id_organismo,
          nombre: organismo.nombre,
          decreto_ley_id: organismo.decreto_ley_id,
          asociado: organismo.asociado,
          asociado_id: organismo.asociado_id?.id,
          tipo_multa_id: organismo.tipo_multa_id.id,
          activo: organismo.activo,
        });
        const decretoLeyIds = organismo.decreto_ley_id
          .filter((decreto) => decreto && decreto.id) // Filtra los elementos indefinidos o aquellos sin ID
          .map((decreto) => decreto.id as number); // Mapea los IDs asegurándote de su tipo
        this.formEditar.get('decreto_ley_id')!.setValue(decretoLeyIds);
      });
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

  formEditar: FormGroup = this.fb.group({
    id_organismo: ['', Validators.required],
    nombre: ['', Validators.required],
    decreto_ley_id: [[]],
    asociado: [false],
    asociado_id: [0],
    tipo_multa_id: [0, Validators.required],
    activo: [true]
  });

  editarOrganismo() {

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

    const organismo = this.formEditar.value;
    this.nomencladoresService.putOrganismo( this.organismo.id!, organismo ).subscribe(
      (organismo) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Organismo actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/organismos']);
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
