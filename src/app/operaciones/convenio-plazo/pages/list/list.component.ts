import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConvenioPlazo } from 'src/app/operaciones/interfaces/convenio-plazo.interface';
import { ConvenioPlazoService } from '../../service/convenio-plazo.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  convenioPlazos: ConvenioPlazo[] = [];
  displayedColumns: string[] = [
    'select',
    'mes',
    'plazo',
    'importe_plazo',
    'convenio_pago_id',
    'actions'];
  dataSource = new MatTableDataSource<ConvenioPlazo>([]);
  selection = new SelectionModel<ConvenioPlazo>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private convenioPlazoService: ConvenioPlazoService, 
              private router: Router) { }

  ngOnInit() {
    this.cargarConvenioPlazo();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarConvenioPlazo() {
    this.convenioPlazoService
      .getConvenioPlazos()
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
      .subscribe((convenioPlazos) => {
        this.convenioPlazos = convenioPlazos;
        this.dataSource.data = convenioPlazos;
        console.log(this.convenioPlazos);
        this.loading = false;
        // console.log(this.token);
      });
  }

  filtrarDatos() {
    this.dataSource.data = this.convenioPlazos.filter((convenioPlazo) => {
      return convenioPlazo.mes.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      convenioPlazo.plazo.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      convenioPlazo.importe_plazo.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      convenioPlazo.convenio_pago_id.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase())
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarConvenioPlazo();
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
  checkboxLabel(row?: ConvenioPlazo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.importe_plazo + 1}`;
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

  eliminarConvenioPlazo(id: number) {
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
          this.convenioPlazoService.deleteConvenioPlazo(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarConvenioPlazo();
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
