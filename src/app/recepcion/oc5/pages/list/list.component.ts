import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { OC5 } from '../../interfaces/oc5.interface';
import { Oc5Service } from '../../services/oc5.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  modelosOC5: OC5[] = [];
  displayedColumns: string[] = [
    'select',
    'occm',
    'organismo_origen',
    'cantidad_multas',
    'importe_total',
    'suma_serie',
    'suma_dias',
    'estado',
    'actions'];
  dataSource = new MatTableDataSource<OC5>([]);
  selection = new SelectionModel<OC5>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private oc5Service: Oc5Service,
              private router: Router) { }

  ngOnInit() {
    this.cargarModelosOC5();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarModelosOC5() {
    this.oc5Service
      .getModelosOC5()
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
      .subscribe((modelosOC5) => {
        this.modelosOC5 = modelosOC5;
        this.dataSource.data = modelosOC5;
        console.log(this.modelosOC5);
        this.loading = false;
        // console.log(this.token);
      });
  }

  filtrarDatos() {
    this.dataSource.data = this.modelosOC5.filter((modelosOC5) => {
      return modelosOC5.organismo_origen.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      modelosOC5.cantidad_multas.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      modelosOC5.importe_total.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      modelosOC5.suma_serie.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      modelosOC5.suma_dias.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      modelosOC5.estado.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarModelosOC5();
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
  checkboxLabel(row?: OC5): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.cantidad_multas + 1}`;
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

  eliminarModelo0C5(id: number) {
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
          this.oc5Service.deleteModeloOc5(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarModelosOC5();
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
