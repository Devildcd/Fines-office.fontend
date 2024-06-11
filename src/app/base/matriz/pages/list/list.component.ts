import { Component, ViewChild } from '@angular/core';
import { Matriz } from '../../interfaces/matriz.interface';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatrizService } from '../../services/matriz.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  matrices: Matriz[] = [];
  displayedColumns: string[] = [
    'select',
    'temporal',
    'oc5',
    'impositor',
    'talon',
    'c1',
    'c2',
    'fecha',
    'importe',
    'dley_art_inc',
    'tipo_multa',
    'estado_multa_id',
    'oc6',
    'devolver',
    'recibida_traslado',
    'carga',
    'moneda',
    'conceptraslado',
    'contraventor',
    'nivel',
    'fecha_creacion',
    'fecha_edicion',
    'actions',
  ];
  dataSource = new MatTableDataSource<Matriz>([]);
  selection = new SelectionModel<Matriz>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private matrizService: MatrizService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarMatrices() 
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarMatrices() {
    this.matrizService
      .getMatrices()
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
      .subscribe((matrices) => {
        this.matrices = matrices;
        this.dataSource.data = matrices;
        console.log(this.matrices);
        this.loading = false;
        // console.log(this.token);
      });
  }

  filtrarDatos() {
    this.dataSource.data = this.matrices.filter((matriz) => {
      return (
        (matriz.oc5?.estado ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (matriz.impositor?.nombre ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (matriz.talon ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (matriz.c1 ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (matriz.c2 ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (matriz.fecha ?? '')
          .toString()
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (matriz.importe ?? '')
          .toString()
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (matriz.dley_art_inc?.descripcion ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (matriz.tipo_multa ?? '')
          .toString()
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (matriz.estado_multa_id.descripcion ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (matriz.oc6?.estado ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (matriz.moneda?.id_moneda ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (matriz.conceptraslado?.descripcion ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (matriz.contraventor?.nombre ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (matriz.fecha_creacion ?? '')
          .toString()
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (matriz.fecha_edicion?.toString() ?? '')
          .toString()
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) 
      );
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarMatrices();
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
  checkboxLabel(row?: Matriz): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.c1 + 1
    }`;
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
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  eliminarMatriz(id: number) {
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
          this.matrizService.deleteMatriz(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarMatrices();
              console.log('Eliminado exitosamente');
            }
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
