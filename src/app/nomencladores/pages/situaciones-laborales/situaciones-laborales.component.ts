import { Component, ViewChild } from '@angular/core';
import { SituacionLaboral } from '../../interfaces/situacion-laboral.interface';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NomencladoresService } from '../../services/nomencladores.service';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-situaciones-laborales',
  templateUrl: './situaciones-laborales.component.html',
  styleUrls: ['./situaciones-laborales.component.css']
})
export class SituacionesLaboralesComponent {
  situacionesLaborales: SituacionLaboral[] = [];
  displayedColumns: string[] = ['select', 'descripcion','actions'];
  dataSource = new MatTableDataSource<SituacionLaboral>([]);
  selection = new SelectionModel<SituacionLaboral>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private nomencladoresService: NomencladoresService,
               private router: Router ) {}

  ngOnInit() {
    this.cargarSituacionesLaborales();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarSituacionesLaborales() {
    this.nomencladoresService.
    getSituacionesLaborales()
      .pipe(
        catchError((error) => {
          console.log('Error:', error);
          // if (error.error.message === 'Unauthenticated.') {
          //   Swal.fire({
          //     icon: 'error',
          //     title: '¡Tu sesión ha expirado!',
          //     text: 'Por favor, vuelve a iniciar sesión',
          //     showConfirmButton: false,
          //     timer: 1000, // Duración en milisegundos (1 segundo)
          //   }).then(() => {
          //     this.router.navigateByUrl('/auth/login');
          //   });
          // }
          return throwError('Ha ocurrido un error en la API');
        })
      )
      .subscribe((situacionesLaborales) => {
        this.situacionesLaborales = situacionesLaborales;
        this.dataSource.data = situacionesLaborales;
        console.log(this.situacionesLaborales);
        this.loading = false;
        // console.log(this.token);
      });
  }

  filtrarDatos() {
    this.dataSource.data = this.situacionesLaborales.filter((situacionesLaborales) => {
      return situacionesLaborales.descripcion.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarSituacionesLaborales();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: SituacionLaboral): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.descripcion + 1}`;
  }

  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  eliminarSituacionLaboral(id: number) {
    if (id !== undefined) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: ' #3f51b5',
        cancelButtonColor: '#f44336',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.nomencladoresService.deleteSituacionLaboral(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarSituacionesLaborales();
              console.log('Concepto de Situaciones Laborales eliminado exitosamente');
            },
            // (error) => {
            //   console.error(error);
            //   if (error?.error?.message === 'Unauthenticated.') {
            //     Swal.fire({
            //       icon: 'error',
            //       title: '¡Tu sesión ha expirado!',
            //       text: 'Por favor, vuelve a iniciar sesión',
            //       showConfirmButton: false,
            //       timer: 1000, // Duración en milisegundos (1 segundo)
            //     }).then(() => {
            //       this.router.navigateByUrl('/auth/login');
            //     });
            //   }
            // }
          );
        }
      });
    }
}
}
