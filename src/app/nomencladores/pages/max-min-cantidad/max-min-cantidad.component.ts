import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { MaxMinCantidad } from '../../interfaces/max-min-cantidad.interface';
import { NomencladoresService } from '../../services/nomencladores.service';

@Component({
  selector: 'app-max-min-cantidad',
  templateUrl: './max-min-cantidad.component.html',
  styleUrls: ['./max-min-cantidad.component.css']
})
export class MaxMinCantidadComponent {

  rangosCantidades: MaxMinCantidad[] = [];
  displayedColumns: string[] = ['select', 'descripcion', 'minima', 'maxima', 'actions'];
  dataSource = new MatTableDataSource<MaxMinCantidad>([]);
  selection = new SelectionModel<MaxMinCantidad>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private nomencladoresService: NomencladoresService, 
               private router: Router ) {}

  ngOnInit() {
    this.cargarRangosCantidades();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarRangosCantidades() {
    this.nomencladoresService
      .getRangosCantidades()
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
      .subscribe((rangosCantidades) => {
        this.rangosCantidades = rangosCantidades;
        this.dataSource.data = rangosCantidades;
        console.log(this.rangosCantidades);
        this.loading = false;
        // console.log(this.token);
      });
  }

  filtrarDatos() {
    this.dataSource.data = this.rangosCantidades.filter((rangoCantidad) => {
      return rangoCantidad.descripcion.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      rangoCantidad.minima.toString().includes(this.terminoBusqueda.toLowerCase()) ||
      rangoCantidad.maxima.toString().includes(this.terminoBusqueda.toLowerCase());
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarRangosCantidades();
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
  checkboxLabel(row?: MaxMinCantidad): string {
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

  eliminarRangoCantidad(id: number) {
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
          this.nomencladoresService.deleteRangoCantidad(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarRangosCantidades();
              console.log('Provincia eliminado exitosamente');
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
