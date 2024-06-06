import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Devolucion } from 'src/app/operaciones/interfaces/devolucion.interface';
import { DevolucionService } from '../../services/devolucion.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  devoluciones: Devolucion[] = [];
  displayedColumns: string[] = [
    'select',
    'id_matriz',
    'concepto_devolucion_id',
    'importe',
    'matriz_fecha',
    'ccancel_id',
    'tipo_multa_id',
    'organismo',
    'decreto_ley',
    'observaciones',
    'state',
    'actions'];
  dataSource = new MatTableDataSource<Devolucion>([]);
  selection = new SelectionModel<Devolucion>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private devolucionService: DevolucionService, 
              private router: Router) { }

  ngOnInit() {
    this.cargarDevolucion();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarDevolucion() {
    this.devolucionService
      .getDevoluciones()
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
      .subscribe((devoluciones) => {
        this.devoluciones = devoluciones;
        this.dataSource.data = devoluciones;
        console.log(this.devoluciones);
        this.loading = false;
        // console.log(this.token);
      });
  }

  filtrarDatos() {
    this.dataSource.data = this.devoluciones.filter((devolucion) => {
      return devolucion.id_matriz.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      devolucion.concepto_devolucion_id.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      devolucion.importe.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      devolucion.matriz_fecha.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      devolucion.ccancel_id.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      devolucion.tipo_multa_id.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      devolucion.organismo.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      devolucion.decreto_ley.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      devolucion.observaciones.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      devolucion.state.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase())
    });
  }
  
  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarDevolucion();
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
  checkboxLabel(row?: Devolucion): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id_matriz + 1}`;
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

  eliminarDevolucion(id: number) {
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
          this.devolucionService.deleteDevolucion(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarDevolucion();
              console.log('Eliminado exitosamente');
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
