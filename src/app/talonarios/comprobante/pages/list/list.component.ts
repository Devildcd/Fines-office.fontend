import { Component, ViewChild } from '@angular/core';
import { Comprobante } from '../../interfaces/comprobante.interface';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ComprobanteService } from '../../services/comprobante.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

 comprobantes: Comprobante[] = [];

 displayedColumns: string[] = [
  'select',
  'serie',
  'letra',
  'estado',
  'occm',
  'id_Entrega_Recepcion_Comprobante',
  'activo',
  'operador',
  'actions'];
dataSource = new MatTableDataSource<Comprobante>([]);
selection = new SelectionModel<Comprobante>(true, []);
loading = true;
terminoBusqueda: string = '';

@ViewChild(MatPaginator) paginator!: MatPaginator;

constructor(private comprobanteService: ComprobanteService,
  private router: Router) { }

ngOnInit() {
  this.cargarComprobante();
}

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}

cargarComprobante() {
  this.comprobanteService
    .getComprobantes()
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
    .subscribe((comprobantes) => {
      this.comprobantes = comprobantes;
      //console.log(this.comprobantes)
      this.dataSource.data = comprobantes;
      //console.log(this.comprobantes);
      this.loading = false;
      // console.log(this.token);
    });
}

filtrarDatos() {
  this.dataSource.data = this.comprobantes.filter((comprobantes) => {
    return comprobantes.serie.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
    comprobantes.letra.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
    comprobantes.estado.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
    comprobantes.occm.id_occm.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
    comprobantes.operador.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
    comprobantes.id_Entrega_Recepcion_Comprobante.serie.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
  });
}

clearBuscador() {
  this.terminoBusqueda = '';
  this.cargarComprobante();
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
checkboxLabel(row?: Comprobante): string {
  if (!row) {
    return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.serie + 1}`;
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

eliminarComprobante(id: number) {
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
        this.comprobanteService.deleteComprobante(id).subscribe(
          () => {
            // Eliminar sin recargar la página
            this.cargarComprobante();
            //console.log('Eliminado exitosamente');
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
