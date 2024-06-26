import { Component, ViewChild } from '@angular/core';
import { Oc6 } from '../../interfaces/oc6.interface';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Oc6Service } from '../../services/oc6.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  modelosOC6: Oc6[] = [];
  displayedColumns: string[] = [
    'select',
    'occm',
    'occm_origen',
    'cantidad_multas',
    'importe_total',
    'suma_serie',
    'suma_dias',
    'estado',
    'actions'];
  dataSource = new MatTableDataSource<Oc6>([]);
  selection = new SelectionModel<Oc6>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private oc6Service: Oc6Service,
              private router: Router) { }

  ngOnInit() {
    this.cargarModelosOC6();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarModelosOC6() {
    this.oc6Service
      .getModelosOC6()
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
      .subscribe((modelosOC6) => {
        this.modelosOC6 = modelosOC6;
        this.dataSource.data = modelosOC6;
        console.log(this.modelosOC6);
        this.loading = false;
        // console.log(this.token);
      });
  }

  filtrarDatos() {
    this.dataSource.data = this.modelosOC6.filter((modelosOC6) => {
      return modelosOC6.occm_origen.id_occm.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      modelosOC6.cantidad_multas.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      modelosOC6.importe_total.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      modelosOC6.suma_serie.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      modelosOC6.suma_dias.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      modelosOC6.estado.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarModelosOC6();
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
  checkboxLabel(row?: Oc6): string {
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

  eliminarModelo0C6(id: number) {
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
          this.oc6Service.deleteModeloOc6(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarModelosOC6();
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
