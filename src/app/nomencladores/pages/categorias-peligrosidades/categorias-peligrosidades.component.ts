import { Component, ViewChild } from '@angular/core';
import { CategoriaPeligrosidad } from '../../interfaces/categoria-peligrosidad.interface';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NomencladoresService } from '../../services/nomencladores.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias-peligrosidades',
  templateUrl: './categorias-peligrosidades.component.html',
  styleUrls: ['./categorias-peligrosidades.component.css']
})
export class CategoriasPeligrosidadesComponent {
  categoriasPeligrosidades: CategoriaPeligrosidad[] = [];
  displayedColumns: string[] = ['select', 'descripcion','actions'];
  dataSource = new MatTableDataSource<CategoriaPeligrosidad>([]);
  selection = new SelectionModel<CategoriaPeligrosidad>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private nomencladoresService: NomencladoresService,
               private router: Router ) {}

  ngOnInit() {
    this.cargarCategoriasPeligrosidades();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  cargarCategoriasPeligrosidades() {
    this.nomencladoresService.
    getCategoriasPeligrosidades()
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
      .subscribe((categoriasPeligrosidades) => {
        this.categoriasPeligrosidades = categoriasPeligrosidades;
        this.dataSource.data = categoriasPeligrosidades;
        console.log(this.categoriasPeligrosidades);
        this.loading = false;
        // console.log(this.token);
      });
  }

  filtrarDatos() {
    this.dataSource.data = this.categoriasPeligrosidades.filter((categoriasPeligrosidades) => {
      return categoriasPeligrosidades.descripcion.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarCategoriasPeligrosidades();
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
  checkboxLabel(row?: CategoriaPeligrosidad): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.descripcion + 1}`;
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

  eliminarCategoriasPeligrosidades(id: number) {
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
          this.nomencladoresService.deleteCategoriaPeligrosidad(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarCategoriasPeligrosidades();
              console.log('Categoria de peligrosidad eliminada exitosamente');
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
