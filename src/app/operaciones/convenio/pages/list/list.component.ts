import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Convenio } from 'src/app/operaciones/interfaces/convenio.interface';
import { ConvenioService } from '../../services/convenio.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  convenios: Convenio[] = [];
  displayedColumns: string[] = [
    'select',
    'matriz_id',
    'consecutivo_id',
    'importe',
    'cant_plazos',
    'mes_inicio',
    'fecha_cancelacion',
    'estado',
    'observaciones',
    'carga_inicial',
    'no_romper',
    'plazos_convenio',
    'actions'];
  dataSource = new MatTableDataSource<Convenio>([]);
  selection = new SelectionModel<Convenio>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private convenioService: ConvenioService, 
              private router: Router) { }

  ngOnInit() {
    this.cargarConvenio();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarConvenio() {
    this.convenioService
      .getConvenios()
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
      .subscribe((convenios) => {
        this.convenios = convenios;
        this.dataSource.data = convenios;
        console.log(this.convenios);
        this.loading = false;
        // console.log(this.token);
      });
  }

  filtrarDatos() {
    this.dataSource.data = this.convenios.filter((convenio) => {
      return convenio.matriz_id.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      convenio.consecutivo_id.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      convenio.importe.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      convenio.cant_plazos.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      convenio.mes_inicio.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      convenio.fecha_cancelacion.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      convenio.estado.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      convenio.observaciones.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      convenio.carga_inicial.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      convenio.no_romper.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      convenio.plazos_convenio.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
    });
  }
  
  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarConvenio();
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
  checkboxLabel(row?: Convenio): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.importe + 1}`;
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

  eliminarConvenio(id: number) {
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
          this.convenioService.deleteConvenio(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarConvenio();
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
