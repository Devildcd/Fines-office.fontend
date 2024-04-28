import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Distrito } from 'src/app/nomencladores/interfaces/distritos.interface';
import { Municipio } from 'src/app/nomencladores/interfaces/municipio.interfaces';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { Provincia } from 'src/app/nomencladores/interfaces/provincia.interface';
import { tipoOficina } from 'src/app/nomencladores/interfaces/tipo-oficina.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-occm-edit',
  templateUrl: './occm-edit.component.html',
  styleUrls: ['./occm-edit.component.css'],
})
export class OccmEditComponent {
  occm!: OCCM;
  occmPadre: OCCM[] = [];
  provincias: Provincia[] = [];
  distritos: Distrito[] = [];
  municipios: Municipio[] = [];
  tiposOficinas: tipoOficina[] = [];
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
      .pipe(switchMap(({ id }) => this.nomencladoresService.getOCCM(id)))
      .subscribe((occm) => {
        this.occm = occm;
        this.loading = false;
        console.log(occm);

        this.formEditar.patchValue({
          id_occm: occm.id_occm,
          nit: occm.nit,
          descripcion: occm.descripcion,
          direccion: occm.direccion,
          telefono: occm.telefono,
          provincia_id: occm.provincia_id?.id,
          municipio_id: occm.municipio_id?.id,
          distrito_id: occm.distrito_id?.id,
          tipo_oficina_id: occm.tipo_oficina_id?.id,
          padre_id: occm.padre_id?.id,
          es_distrito: occm.es_distrito,
          ofic_con_distrito: occm.ofic_con_distrito,
          activo: occm.activo,
        });
      });

    this.nomencladoresService.getOCCMS().subscribe((occmPadre) => {
      this.occmPadre = occmPadre;
    });
    this.nomencladoresService.getProvincias().subscribe((provincias) => {
      this.provincias = provincias;
    });
    this.nomencladoresService.getMunicipios().subscribe((municipios) => {
      this.municipios = municipios;
    });
    this.nomencladoresService.getDistritos().subscribe((distritos) => {
      this.distritos = distritos;
    });
    this.nomencladoresService.getTipoOficinas().subscribe((tiposOficinas) => {
      this.tiposOficinas = tiposOficinas;
    });
  }

  formEditar: FormGroup = this.fb.group({
    id_occm: ['', Validators.required],
    nit: ['', Validators.required],
    descripcion: [''],
    direccion: ['', Validators.required],
    telefono: ['', Validators.required],
    es_distrito: [false],
    ofic_con_distrito: [false],
    activo: [true],
    provincia_id: ['', Validators.required],
    municipio_id: ['', Validators.required],
    distrito_id: ['', Validators.required],
    tipo_oficina_id: ['', Validators.required],
    padre_id: ['', Validators.required],
  });

  editarOCCM() {

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

    const occm = this.formEditar.value;
    this.nomencladoresService.putOCCM( this.occm.id!, occm ).subscribe(
      (occm) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/occm']);
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
