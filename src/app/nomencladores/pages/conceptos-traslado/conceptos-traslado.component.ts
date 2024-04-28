import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { ConceptoTraslado } from '../../interfaces/concepto-traslado.interface';
import { NomencladoresService } from '../../services/nomencladores.service';

@Component({
  selector: 'app-conceptos-traslado',
  templateUrl: './conceptos-traslado.component.html',
  styleUrls: ['./conceptos-traslado.component.css']
})
export class ConceptosTrasladoComponent {

  conceptosTraslado: ConceptoTraslado[] = [];
  displayedColumns: string[] = ['select', 'descripcion', 'automatico', 'actions'];
  dataSource = new MatTableDataSource<ConceptoTraslado>([]);
  selection = new SelectionModel<ConceptoTraslado>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private nomencladoresService: NomencladoresService, 
               private router: Router ) {}

  ngOnInit() {
    this.cargarConceptosTraslado();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarConceptosTraslado() {
    this.nomencladoresService.
    getConceptosTraslado()
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
      .subscribe((conceptosTraslado) => {
        this.conceptosTraslado = conceptosTraslado;
        this.dataSource.data = conceptosTraslado;
        console.log(this.conceptosTraslado);
        this.loading = false;
        // console.log(this.token);
      });
  }

  filtrarDatos() {
    this.dataSource.data = this.conceptosTraslado.filter((conceptoTraslado) => {
      return conceptoTraslado.descripcion.toLowerCase().includes(this.terminoBusqueda.toLowerCase());  
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarConceptosTraslado();
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
  checkboxLabel(row?: ConceptoTraslado): string {
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

  eliminarConceptoTraslado(id: number) {
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
          this.nomencladoresService.deleteConceptoTraslado(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarConceptosTraslado();
              console.log('Concepto de Traslado eliminado exitosamente');
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
