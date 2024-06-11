import { Component, ViewChild } from '@angular/core';
import { EntregaRecepcion } from '../../interfaces/entrega-recepcion.interface';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EntregaRecepcionService } from '../../services/entrega-recepcion.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: false,
  //imports: [],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {

  entregas_recepcion: EntregaRecepcion[] = [];

  displayedColumns: string[] = [
    'select',
    'fecha',
    'movimiento',
    'codentrada',
    'entregadox',
    'recibidox',
    'referencia',
    'serie',
    'numerd',
    'numerh',
    'carga_inicial',
    'activo',
    'occm_destino',
    'organismo',
    'actions'];
  dataSource = new MatTableDataSource<EntregaRecepcion>([]);
  selection = new SelectionModel<EntregaRecepcion>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private entregarecepcionService: EntregaRecepcionService, 
    private router: Router) { }

    ngOnInit() {
      this.cargarEntregaRecepcion();
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    cargarEntregaRecepcion() {
      this.entregarecepcionService
        .getEntregas_Recepcion_Imposicion()
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
        .subscribe((entregas_recepcion) => {
          this.entregas_recepcion = entregas_recepcion;
          console.log(this.entregas_recepcion)
          this.dataSource.data = entregas_recepcion;
          console.log(this.entregas_recepcion);
          this.loading = false;
          // console.log(this.token);
        });
    }

    filtrarDatos() {
      this.dataSource.data = this.entregas_recepcion.filter((entregas_recepcion) => {
        return entregas_recepcion.fecha.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion.movimiento.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion.codentrada.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion.entregadox.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion.recibidox.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion.referencia.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion.serie.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion.numerd.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) || 
        entregas_recepcion.numerh.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion.numerd.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion.estado.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion.tipo.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion.occm_destino.id_occm.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion.organismo.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      
      });
    }

    clearBuscador() {
      this.terminoBusqueda = '';
      this.cargarEntregaRecepcion();
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
  checkboxLabel(row?: EntregaRecepcion): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.serie + 1}`;
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

  eliminarEntregaRecepcion(id: number) {
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
          this.entregarecepcionService.deleteEntrega_Recepcion_Imposicion(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarEntregaRecepcion();
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
