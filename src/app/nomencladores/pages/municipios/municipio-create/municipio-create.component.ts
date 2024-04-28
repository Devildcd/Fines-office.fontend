import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Municipio } from 'src/app/nomencladores/interfaces/municipio.interfaces';
import { Provincia } from 'src/app/nomencladores/interfaces/provincia.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-municipio-create',
  templateUrl: './municipio-create.component.html',
  styleUrls: ['./municipio-create.component.css']
})
export class MunicipioCreateComponent {

  municipio!: Municipio;
  provincias!:Provincia[]


  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  ngOnInit(){
    this.nomencladoresService.getProvincias().subscribe(
      (provincias)=>{
        this.provincias = provincias;
      }
    )
  }

  formCrear: FormGroup = this.fb.group({
    id_municipio: ['', Validators.required],
    nombre: ['', Validators.required],
    provincia_id: ['', Validators.required],
    activo: [true],
  });

  crearMunicipio() {

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

    this.municipio = {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postMunicipio(this.municipio).subscribe(
      (municipioCreada) => {
        this.municipio = municipioCreada;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Provincia creada',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/municipio', this.municipio.id]);
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
