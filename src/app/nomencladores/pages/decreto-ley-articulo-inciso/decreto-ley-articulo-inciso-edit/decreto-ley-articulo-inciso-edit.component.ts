import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Articulo } from 'src/app/nomencladores/interfaces/articulo.interface';
import { DecretoLeyArticuloInciso } from 'src/app/nomencladores/interfaces/decreto-ley-articulo-inciso.interface';
import { DecretoLey } from 'src/app/nomencladores/interfaces/decreto-ley.interface';
import { Inciso } from 'src/app/nomencladores/interfaces/inciso.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-decreto-ley-articulo-inciso-edit',
  templateUrl: './decreto-ley-articulo-inciso-edit.component.html',
  styleUrls: ['./decreto-ley-articulo-inciso-edit.component.css']
})
export class DecretoLeyArticuloIncisoEditComponent {

  decArtInc!: DecretoLeyArticuloInciso;
  decretosLey: DecretoLey[] = [];
  articulos: Articulo[] = [];
  incisos: Inciso[] = [];
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
        switchMap(({ id }) =>
          this.nomencladoresService.getDecLeyArticuloInciso(id)
        )
      )
      .subscribe((decArtInc) => {
        this.decArtInc = decArtInc;
        this.loading = false;
        console.log(decArtInc);

        this.formEditar.patchValue({
          descripcion: decArtInc.descripcion,
          decreto_ley: decArtInc.decreto_ley.id,
          articulo: decArtInc.articulo.id,
          inciso: decArtInc.inciso.id,
          duplica: decArtInc.duplica,
          dias_duplicar: decArtInc.dias_duplicar,
          tipo_dias_dup: decArtInc.tipo_dias_dup,
          apremia: decArtInc.apremia,
          dias_apremiar: decArtInc.dias_apremiar,
          tipo_dias_ap: decArtInc.tipo_dias_ap,
          cancela: decArtInc.cancela,
          dias_cancelar: decArtInc.dias_cancelar,
          tipo_dias_canc: decArtInc.tipo_dias_canc,
          traslada: decArtInc.traslada,
          bonifica: decArtInc.bonifica,
          bonifica_dias: decArtInc.bonifica_dias,
          bonifica_porc: decArtInc.bonifica_porc,
          activo: decArtInc.activo,
        });
      });

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

  formEditar: FormGroup = this.fb.group({
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

  editarDecleyArticuloInciso() {

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

    const decArtInc = this.formEditar.value;
    this.nomencladoresService.putOCCM( this.decArtInc.id!, decArtInc ).subscribe(
      (decArtInc) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/decreto-ley-articulo-inciso']);
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
