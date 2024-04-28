import { Component, ViewChild } from '@angular/core';
import { tipoOficina } from '../../interfaces/tipo-oficina.interface';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NomencladoresService } from '../../services/nomencladores.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipos-oficinas',
  templateUrl: './tipos-oficinas.component.html',
  styleUrls: ['./tipos-oficinas.component.css']
})
export class TiposOficinasComponent {

  oficinas: tipoOficina[] = [];
  displayedColumns: string[] = ['select', 'identificador', 'descripcion', 'actions'];
  dataSource = new MatTableDataSource<tipoOficina>([]);
  selection = new SelectionModel<tipoOficina>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( 
    private nomencladoresService: NomencladoresService, 
    private router: Router ) {}

  ngOnInit() {
    this.cargarTiposOficinas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filtrarDatos() {
    this.dataSource.data = this.oficinas.filter((oficina) => {
      return (
        oficina.identificador
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
          oficina.descripcion
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase())
      );
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarTiposOficinas();
  }

  cargarTiposOficinas() {
    this.nomencladoresService
      .getTipoOficinas()
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
      .subscribe((oficinas) => {
        this.oficinas = oficinas;
        this.dataSource.data = oficinas;
        console.log(this.oficinas);
        this.loading = false;
        // console.log(this.token);
      });
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
  checkboxLabel(row?: tipoOficina): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.identificador + 1}`;
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

  eliminarTipoOficina(id: number) {
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
          this.nomencladoresService.deleteTipoOficina(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarTiposOficinas();
              console.log('Tipo de Oficina eliminada exitosamente');
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
