import { Component } from '@angular/core';
import { Imposicion } from '../../interfaces/imposicion.interface';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { Organismo } from 'src/app/nomencladores/interfaces/organismo.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import { EntregaRecepcionImposicionService } from 'src/app/talonarios/entrega-recepcion-imposicion/services/entrega-recepcion-imposicion.service';
import { ImposicionService } from '../../services/imposicion.service';
import { EntregaRecepcionImposicion } from 'src/app/talonarios/entrega-recepcion-imposicion/interfaces/entrega-recepcion-imposicion.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  imposicions!: Imposicion;
  occms!: OCCM[];
  organismos!: Organismo[];
  id_Entregas_Recepcions_Imposicions!: EntregaRecepcionImposicion[];
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private imposicionService: ImposicionService,
    private entregarecepcionimposicionService: EntregaRecepcionImposicionService,
    private nomencladoresService: NomencladoresService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.imposicionService.getImposicion(id)))
      .subscribe((imposicions) => {
        this.imposicions = imposicions;
        this.loading = false;
        //console.log(this.imposicions);

        this.formEditar.patchValue({
          serie: imposicions.serie,
          letra: imposicions.letra,
          estado: imposicions.estado,
          occm: imposicions.occm.id,
          organismo: imposicions.organismo.id,
          id_Entrega_Recepcion_Imposicion: imposicions.id_Entrega_Recepcion_Imposicion.id,
          activo: imposicions.activo,
          forestal: imposicions.forestal
        });
      });

    this.nomencladoresService.getOCCMS().subscribe(
      (occms) => {
        this.occms = occms;
      }
    );
    this.entregarecepcionimposicionService.getEntregas_Recepcion_Imposicion().subscribe(
      (id_Entregas_Recepcions_Imposicions) => {
        this.id_Entregas_Recepcions_Imposicions = id_Entregas_Recepcions_Imposicions;
      }
    );
    this.nomencladoresService.getOrganismos().subscribe(
      (organismos) => {
        this.organismos = organismos;
      }
    );
  }

  formEditar: FormGroup = this.fb.group({
    serie: [null, Validators.required],
    letra: [null, Validators.required],
    estado: [null, Validators.required],
    occm: [null, Validators.required],
    organismo: [null, Validators.required],
    id_Entrega_Recepcion_Imposicion: [null, Validators.required],
    activo: [true],
    forestal: [true],
  });

  editarImposicion() {
    if (this.formEditar.untouched) {
      // El formulario es inválido o no se ha tocadocls

      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, modifique algún campo',
        showConfirmButton: true,
      });
      return;
    }

    const imposicions = this.formEditar.value;
    this.imposicionService.putImposicion(this.imposicions.id!, imposicions).subscribe(
      (imposicions) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/talonarios/imposicion/listado']);
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
