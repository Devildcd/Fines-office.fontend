import { Component, ViewChild } from '@angular/core';
import { EnviarTraslado } from '../../interfaces/enviar-traslado.interface';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EnviarTrasladoService } from '../../services/enviar-traslado.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  enviarTraslados: EnviarTraslado[] = [];
  displayedColumns: string[] = [
    'select',
    'occm',
    'occm_destino',
    'cantidad_multas',
    'importe_total',
    'suma_serie',
    'suma_dias',
    'estado',
    'multas_enviar',
    'actions'];
  dataSource = new MatTableDataSource<EnviarTraslado>([]);
  selection = new SelectionModel<EnviarTraslado>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private enviarTrasladoService: EnviarTrasladoService,
              private router: Router) { }

  ngOnInit() {
    this.cargarEnviarTraslados();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarEnviarTraslados() {
    this.enviarTrasladoService
      .getEnviarTraslados()
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
      .subscribe((enviarTraslados) => {
        this.enviarTraslados = enviarTraslados;
        this.dataSource.data = enviarTraslados;
        console.log(this.enviarTraslados);
        this.loading = false;
        // console.log(this.token);
      });
  }

  filtrarDatos() {
    this.dataSource.data = this.enviarTraslados.filter((enviarTraslado) => {
      return enviarTraslado.occm.descripcion!.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      enviarTraslado.cantidad_multas.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      enviarTraslado.importe_total.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      enviarTraslado.suma_serie.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      enviarTraslado.suma_dias.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      enviarTraslado.estado.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      enviarTraslado.occm_destino.descripcion!.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarEnviarTraslados();
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
  checkboxLabel(row?: EnviarTraslado): string {
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

  eliminarEnviarTraslado(id: number) {
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
          this.enviarTrasladoService.deleteEnviarTraslado(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarEnviarTraslados();
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
