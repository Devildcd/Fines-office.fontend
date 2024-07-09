import { Component, ViewChild } from '@angular/core';
import { EntregaRecepcionImposicion } from '../../interfaces/entrega-recepcion-imposicion.interface';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EntregaRecepcionImposicionService } from '../../services/entrega-recepcion-imposicion.service';
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

  entregas_recepcion_imposicion: EntregaRecepcionImposicion[] = [];

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
  dataSource = new MatTableDataSource<EntregaRecepcionImposicion>([]);
  selection = new SelectionModel<EntregaRecepcionImposicion>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private entregarecepcionimposicionService: EntregaRecepcionImposicionService, 
    private router: Router) { }

    ngOnInit() {
      this.cargarEntregaRecepcionImposicion();
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    cargarEntregaRecepcionImposicion() {
      this.entregarecepcionimposicionService
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
        .subscribe((entregas_recepcion_imposicion) => {
          this.entregas_recepcion_imposicion = this.entregas_recepcion_imposicion;
          console.log(this.entregas_recepcion_imposicion)
          this.dataSource.data = entregas_recepcion_imposicion;
          console.log(this.entregas_recepcion_imposicion);
          this.loading = false;
          // console.log(this.token);
        });
    }

    filtrarDatos() {
      this.dataSource.data = this.entregas_recepcion_imposicion.filter((entregas_recepcion_imposicion) => {
        return entregas_recepcion_imposicion.fecha.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_imposicion.movimiento.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_imposicion.codentrada.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_imposicion.entregadox.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_imposicion.recibidox.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_imposicion.referencia.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_imposicion.serie.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_imposicion.numerd.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) || 
        entregas_recepcion_imposicion.numerh.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_imposicion.numerd.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_imposicion.estado.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_imposicion.tipo.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_imposicion.occm_destino.id_occm.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_imposicion.organismo.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      
      });
    }

    clearBuscador() {
      this.terminoBusqueda = '';
      this.cargarEntregaRecepcionImposicion();
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
  checkboxLabel(row?: EntregaRecepcionImposicion): string {
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

  eliminarEntregaRecepcionImposicion(id: number) {
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
          this.entregarecepcionimposicionService.deleteEntrega_Recepcion_Imposicion(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarEntregaRecepcionImposicion();
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
