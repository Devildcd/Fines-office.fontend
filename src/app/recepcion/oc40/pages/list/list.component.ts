import { Component, ViewChild } from '@angular/core';
import { Oc40 } from '../../interfaces/oc40.interface';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Oc40Service } from '../../services/oc40.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  modelosOC40: Oc40[] = [];
  displayedColumns: string[] = [
    'select',
    'occm',
    'occm_destino',
    'cantidad_multas',
    'importe_total',
    'suma_serie',
    'suma_dias',
    'estado',
    'actions'];
  dataSource = new MatTableDataSource<Oc40>([]);
  selection = new SelectionModel<Oc40>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private oc40Service: Oc40Service,
              private router: Router) { }

  ngOnInit() {
    this.cargarModelosOC40();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarModelosOC40() {
    this.oc40Service
      .getModelosOC40()
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
      .subscribe((modelosOC40) => {
        this.modelosOC40 = modelosOC40;
        this.dataSource.data = modelosOC40;
        console.log(this.modelosOC40);
        this.loading = false;
        // console.log(this.token);
      });
  }

  filtrarDatos() {
    this.dataSource.data = this.modelosOC40.filter((modeloOC40) => {
      return modeloOC40.occm_destino.id_occm.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      modeloOC40.cantidad_multas.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      modeloOC40.importe_total.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      modeloOC40.suma_serie.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      modeloOC40.suma_dias.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      modeloOC40.estado.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarModelosOC40();
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
  checkboxLabel(row?: Oc40): string {
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

  eliminarModelo0C40(id: number) {
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
          this.oc40Service.deleteModeloOc40(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarModelosOC40();
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
