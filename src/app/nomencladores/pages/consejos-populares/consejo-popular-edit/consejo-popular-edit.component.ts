import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConsejoPopular } from 'src/app/nomencladores/interfaces/consejo-popular.interface';
import { Distrito } from 'src/app/nomencladores/interfaces/distritos.interface';
import { Municipio } from 'src/app/nomencladores/interfaces/municipio.interfaces';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consejo-popular-edit',
  templateUrl: './consejo-popular-edit.component.html',
  styleUrls: ['./consejo-popular-edit.component.css']
})
export class ConsejoPopularEditComponent {
  cpopulares!: ConsejoPopular;
  municipios!: Municipio[];
  distritos!:Distrito[]
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
        switchMap(({ id }) => this.nomencladoresService.getConsejoPopular( id ))
      )
      .subscribe((cpopulares) => {
        this.cpopulares = cpopulares;
        this.loading = false;
        console.log(  this.cpopulares );

        // this.formEditar.patchValue({ ...cpopulares });
        this.formEditar.patchValue({ 
          id_cpopular: cpopulares.id_cpopular,
          nombre: cpopulares.nombre,
          occm: cpopulares.occm?.id,
          municipio_id: cpopulares.municipio_id.id,
          distrito_id: cpopulares.distrito_id.id,
          activo: cpopulares.activo
         });
      });
      this.nomencladoresService.getMunicipios().subscribe(
        (municipios)=>{
          this.municipios = municipios
        }
      )
      this.nomencladoresService.getDistritos().subscribe(
        (distritos)=>{
          this.distritos = distritos
        }
      )
  }

  formEditar: FormGroup = this.fb.group({
    id_cpopular: ['', Validators.required],
    nombre: ['', Validators.required],
    municipio_id: ['', Validators.required],
    distrito_id: ['', Validators.required],
    activo: [true],
  });

  editarConsejoPopular() {

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

    const cpopulares = this.formEditar.value;
    this.nomencladoresService.putConsejoPopular( this.cpopulares.id!, cpopulares ).subscribe(
      (cpopulares) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Consejo Popular actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/consejos-populares']);
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
