import { Component, ViewChild } from '@angular/core';
import { EntregaRecepcionComprobante } from '../../interfaces/entrega-recepcion-comprobante.interface';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { EntregaRecepcionComprobanteService } from '../../services/entrega-recepcion-cmprobante.service';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  entregas_recepcion_comprobante: EntregaRecepcionComprobante[] = [];

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
    'operador',
    'actions'];
  dataSource = new MatTableDataSource<EntregaRecepcionComprobante>([]);
  selection = new SelectionModel<EntregaRecepcionComprobante>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private entregarecepcioncomprobanteService: EntregaRecepcionComprobanteService,
    private router: Router) { }


  ngOnInit() {
    this.cargarEntregaRecepcionComprobante();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarEntregaRecepcionComprobante() {
    this.entregarecepcioncomprobanteService
      .getEntregas_Recepcion_Comprobante()
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
      .subscribe((entregas_recepcion_comprobante) => {
        this.entregas_recepcion_comprobante = this.entregas_recepcion_comprobante;
        console.log(this.entregas_recepcion_comprobante)
        this.dataSource.data = entregas_recepcion_comprobante;
        console.log(this.entregas_recepcion_comprobante);
        this.loading = false;
        // console.log(this.token);
      });
  }

  filtrarDatos() {
    this.dataSource.data = this.entregas_recepcion_comprobante.filter((entregas_recepcion_comprobante) => {
      return entregas_recepcion_comprobante.fecha.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_comprobante.movimiento.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_comprobante.codentrada.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_comprobante.entregadox.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_comprobante.recibidox.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_comprobante.referencia.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_comprobante.serie.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_comprobante.numerd.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_comprobante.numerh.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_comprobante.numerd.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_comprobante.estado.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_comprobante.tipo.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_comprobante.occm_destino.id_occm.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        entregas_recepcion_comprobante.operador.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarEntregaRecepcionComprobante();
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
  checkboxLabel(row?: EntregaRecepcionComprobante): string {
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

  eliminarEntregaRecepcionComprobante(id: number) {
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
          this.entregarecepcioncomprobanteService.deleteEntrega_Recepcion_Comprobante(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarEntregaRecepcionComprobante();
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
