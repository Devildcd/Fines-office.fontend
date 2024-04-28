import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Distrito } from '../../interfaces/distritos.interface';

import { NomencladoresService } from '../../services/nomencladores.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-distritos',
  templateUrl: './distritos.component.html',
  styleUrls: ['./distritos.component.css']
})
export class DistritosComponent {

  distritos: Distrito[] = [];
  displayedColumns: string[] = ['select', 'id_distrito', 'nombre', 'occm', 'municipio_id', 'actions'];
  dataSource = new MatTableDataSource<Distrito>([]);
  selection = new SelectionModel<Distrito>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private nomencladoresService: NomencladoresService, private router: Router) { }

  ngOnInit() {
    this.cargarDistritos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarDistritos() {
    this.nomencladoresService
      .getDistritos()
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
      .subscribe((distritos) => {
        this.distritos = distritos;
        this.dataSource.data = distritos;
        console.log(this.distritos);
        this.loading = false;
        // console.log(this.token);
      });
  }

  filtrarDatos() {
    this.dataSource.data = this.distritos.filter((distrito) => {
      return distrito.id_distrito.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
             distrito.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
             distrito.municipio_id.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarDistritos();
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
  checkboxLabel(row?: Distrito): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id_distrito + 1}`;
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

  eliminarDistrito(id: number) {
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
          this.nomencladoresService.deleteDistrito(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarDistritos();
              console.log('Distrito eliminado exitosamente');
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
