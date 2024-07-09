import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoMulta } from 'src/app/nomencladores/interfaces/estado-multa.interface';
import { Matriz } from 'src/app/base/matriz/interfaces/matriz.interface';
import { SubMovMulta } from 'src/app/base/sub-mov-multa/interfaces/sub-mov-multa.interface';
import { Apremiar } from 'src/app/operaciones/interfaces/apremiar.interface';
import { ApremiarService } from '../../services/apremiar.service';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [DatePipe] 
})
export class EditComponent {
  apremiar!: Apremiar;
  matrices: Matriz[] = [];
  movimientos: SubMovMulta[] = [];
  estados: EstadoMulta[] = [];
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private apremiarService: ApremiarService,
    private nomencladoresService: NomencladoresService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.apremiarService.getApremiar(id)))
      .subscribe((apremiar) => {
        this.apremiar = apremiar;
        this.loading = false;
        console.log(apremiar);

        this.formEditar.patchValue({ 
          id_matriz: apremiar.id_matriz,
          mov_multa_id: apremiar.mov_multa_id,
          estado: apremiar.estado,
          fecha_apremio: apremiar.fecha_apremio,
          fecha_comunicada: apremiar.fecha_comunicada,
          fecha_denunciada: apremiar.fecha_denunciada,
          num_radicacion: apremiar.num_radicacion   
         });
      });
 


    this.nomencladoresService.getEstadosMultas().subscribe( (estados)=>{
      this.estados = estados;
    });

  }

  formEditar: FormGroup = this.fb.group({
    id_matriz: ['', Validators.required],
    mov_multa_id: ['', Validators.required],
    estado: ['', Validators.required],
    fecha_apremio: ['', Validators.required],
    fecha_comunicada: ['', Validators.required],
    fecha_denunciada:['', Validators.required],
    num_radicacion: ['', Validators.required],
  });

  editarApremiar() {

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

    const apremiar = this.formatDates(this.formEditar.value);
    this.apremiarService.putApremiar( this.apremiar.id!, apremiar ).subscribe(
      (apremiar) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Concepto Apremiar actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/operaciones/apremiar']);
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

  formatDates(formData: any): any {
    const apremiar = { ...formData };
    apremiar.fecha_apremio = this.datePipe.transform(formData.fecha_apremio, 'yyyy-MM-dd');
    apremiar.fecha_comunicada = this.datePipe.transform(formData.fecha_comunicada, 'yyyy-MM-dd');
    apremiar.fecha_denunciada = this.datePipe.transform(formData.fecha_denunciada, 'yyyy-MM-dd');
    return apremiar;
  }
}
