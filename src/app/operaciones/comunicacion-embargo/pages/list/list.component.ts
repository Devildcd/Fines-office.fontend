import { ComunicacionEmbargoService } from './../../services/comunicacion-embargo.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ComunicacionEmbargo } from 'src/app/operaciones/interfaces/comunicacion-embargo.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  comunicacionEmbargos: ComunicacionEmbargo[] = [];
  displayedColumns: string[] = [
    'select',
    'municipio_id',
    'id_matriz',
    'contraventor',
    'importe_pen',
    'importe_liq',
    'confirmado',
    'fecha_comunicacion',
    'recibido_por',
    'cargo',
    'observaciones',
    'mes',
    'state',
    'actions'];
  dataSource = new MatTableDataSource<ComunicacionEmbargo>([]);
  selection = new SelectionModel<ComunicacionEmbargo>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private comunicacionEmbargoService: ComunicacionEmbargoService, 
              private router: Router) { }

  ngOnInit() {
    this.cargarComunicacionEmbargo();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarComunicacionEmbargo() {
    this.comunicacionEmbargoService
      .getComunicacionEmbargos()
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
      .subscribe((comunicacionEmbargos) => {
        this.comunicacionEmbargos = comunicacionEmbargos;
        this.dataSource.data = comunicacionEmbargos;
        console.log(this.comunicacionEmbargos);
        this.loading = false;
        // console.log(this.token);
      });
  }

  filtrarDatos() {
    this.dataSource.data = this.comunicacionEmbargos.filter((comunicacionEmbargo) => {
      return comunicacionEmbargo.municipio_id.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      comunicacionEmbargo.id_matriz.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      comunicacionEmbargo.contraventor.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      comunicacionEmbargo.importe_pen.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      comunicacionEmbargo.importe_liq.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      comunicacionEmbargo.confirmado.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      comunicacionEmbargo.fecha_comunicacion.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      comunicacionEmbargo.recibido_por.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      comunicacionEmbargo.cargo.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      comunicacionEmbargo.observaciones.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      comunicacionEmbargo.mes.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      comunicacionEmbargo.state.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
    });
  }
  
  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarComunicacionEmbargo();
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
  checkboxLabel(row?: ComunicacionEmbargo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.contraventor + 1}`;
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

  eliminarComunicacionEmbargo(id: number) {
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
          this.comunicacionEmbargoService.deleteComunicacionEmbargo(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarComunicacionEmbargo();
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
