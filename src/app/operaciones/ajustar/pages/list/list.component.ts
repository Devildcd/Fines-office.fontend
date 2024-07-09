import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Ajustar } from 'src/app/operaciones/interfaces/ajustar.interface';
import { AjustarService } from '../../services/ajustar.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  ajustes: Ajustar[] = [];
  displayedColumns: string[] = [
    'select',
    'matriz_id',
    'concepto_ajuste_id',
    'importe_ajustado',
    'no_res',
    'observaciones',
    'mov_multa_id',
    'actions'];
  dataSource = new MatTableDataSource<Ajustar>([]);
  selection = new SelectionModel<Ajustar>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ajustarService: AjustarService, 
              private router: Router) { }

  ngOnInit() {
    this.cargarAjustar();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarAjustar() {
    this.ajustarService
      .getAjustes()
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
      .subscribe((ajustes) => {
        this.ajustes = ajustes;
        this.dataSource.data = ajustes;
        console.log(this.ajustes);
        this.loading = false;
        // console.log(this.token);
      });
  }

  filtrarDatos() {
    this.dataSource.data = this.ajustes.filter((ajustar) => {
      return ajustar.matriz_id.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      ajustar.concepto_ajuste_id.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      ajustar.importe_ajustado.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      ajustar.no_res.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      ajustar.observaciones.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      ajustar.mov_multa_id.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase())    
    });
  }
  
  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarAjustar();
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
  checkboxLabel(row?: Ajustar): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.no_res + 1}`;
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

  eliminarAjustar(id: number) {
    if (id !== undefined) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: ' #3f51b5',
        cancelButtonColor: '#f44336',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Ajustar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.ajustarService.deleteAjustar(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarAjustar();
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
