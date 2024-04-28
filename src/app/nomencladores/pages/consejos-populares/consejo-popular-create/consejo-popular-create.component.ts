import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsejoPopular } from 'src/app/nomencladores/interfaces/consejo-popular.interface';
import { Distrito } from 'src/app/nomencladores/interfaces/distritos.interface';
import { Municipio } from 'src/app/nomencladores/interfaces/municipio.interfaces';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consejo-popular-create',
  templateUrl: './consejo-popular-create.component.html',
  styleUrls: ['./consejo-popular-create.component.css']
})
export class ConsejoPopularCreateComponent {

  cpopular!: ConsejoPopular;
  municipios!:Municipio[];
  distritos!:Distrito[]

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  ngOnInit(){
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

  formCrear: FormGroup = this.fb.group({
    id_cpopular: ['', Validators.required],
    nombre: ['', Validators.required],
    municipio_id: ['', Validators.required],
    distrito_id: [''],
  });

  crearConsejoPopular() {

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

    this.cpopular = {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postConsejoPopular(this.cpopular).subscribe(
      (consejoPopularCreada) => {
        this.cpopular = consejoPopularCreada;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Consejo Popular creada',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/consejo-popular/', this.cpopular.id]);
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
