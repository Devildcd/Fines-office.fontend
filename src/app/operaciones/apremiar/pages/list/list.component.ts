import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Apremiar } from 'src/app/operaciones/interfaces/apremiar.interface';
import Swal from 'sweetalert2';
import { ApremiarService } from '../../services/apremiar.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  apremios: Apremiar[] = [];
  displayedColumns: string[] = [
    'select',
    'id_matriz',
    'moneda',
    'fecha_imp',
    'fecha_gestion',
    'fecha_comunicada',
    'fecha_denunciada',
    'num_radicacion',
    'state',
    'actions'];
  dataSource = new MatTableDataSource<Apremiar>([]);
  selection = new SelectionModel<Apremiar>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apremiarService: ApremiarService, 
              private router: Router) { }

  ngOnInit() {
    this.cargarApremio();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarApremio() {
    this.apremiarService
      .getApremios()
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
      .subscribe((apremios) => {
        this.apremios = apremios;
        this.dataSource.data = apremios;
        console.log(this.apremios);
        this.loading = false;
        // console.log(this.token);
      });
  }

  filtrarDatos() {
    this.dataSource.data = this.apremios.filter((apremiar) => {
      return apremiar.id_matriz.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      apremiar.moneda.id_moneda.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      apremiar.fecha_imp.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      apremiar.fecha_gestion.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      apremiar.fecha_comunicada.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      apremiar.fecha_denunciada.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      apremiar.num_radicacion.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      apremiar.state.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      
      
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarApremio();
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
  checkboxLabel(row?: Apremiar): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id_matriz + 1}`;
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

  eliminarApremio(id: number) {
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
          this.apremiarService.deleteApremiar(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarApremio();
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
