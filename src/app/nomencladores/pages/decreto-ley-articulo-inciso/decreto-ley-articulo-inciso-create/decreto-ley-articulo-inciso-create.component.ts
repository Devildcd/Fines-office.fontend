import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Articulo } from 'src/app/nomencladores/interfaces/articulo.interface';
import { DecretoLeyArticuloInciso } from 'src/app/nomencladores/interfaces/decreto-ley-articulo-inciso.interface';
import { DecretoLey } from 'src/app/nomencladores/interfaces/decreto-ley.interface';
import { Inciso } from 'src/app/nomencladores/interfaces/inciso.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-decreto-ley-articulo-inciso-create',
  templateUrl: './decreto-ley-articulo-inciso-create.component.html',
  styleUrls: ['./decreto-ley-articulo-inciso-create.component.css']
})
export class DecretoLeyArticuloIncisoCreateComponent {

  decArtInc!: DecretoLeyArticuloInciso;
  decretosLey: DecretoLey[] = [];
  articulos: Articulo[] = [];
  incisos: Inciso[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  ngOnInit() {

    this.nomencladoresService.getDecretos().subscribe(
      (decretosLey)=>{
        this.decretosLey = decretosLey;
      }
    );
    this.nomencladoresService.getIncisos().subscribe(
      (incisos)=>{
        this.incisos = incisos;
      }
    );
    this.nomencladoresService.getArticulos().subscribe(
      ( articulos ) => {
        this.articulos = articulos;
      }
    );
  }

  formCrear: FormGroup = this.fb.group({
    descripcion: [''],
    decreto_ley: ['', Validators.required],
    articulo: ['', Validators.required],
    inciso: ['', Validators.required],
    duplica: [true],
    dias_duplicar: [],
    tipo_dias_dup: [''],
    apremia: [true],
    dias_apremiar: [],
    tipo_dias_ap: [''],
    cancela: [true],
    dias_cancelar: [],
    tipo_dias_canc: [''],
    traslada: [true],
    bonifica: [true],
    bonifica_dias: [],
    bonifica_porc: [],
    activo: [true],
  });

  crearDecArtInc() {

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

    this.decArtInc = {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postDecLeyArticuloInciso(this.decArtInc).subscribe(
      (decArtIncCreado) => {
        this.decArtInc = decArtIncCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/decreto-ley-articulo-inciso', this.decArtInc.id]);
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
