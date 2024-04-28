import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DecretoLey } from '../../interfaces/decreto-ley.interface';
import { NomencladoresService } from '../../services/nomencladores.service';

@Component({
  selector: 'app-decreto-ley',
  templateUrl: './decreto-ley.component.html',
  styleUrls: ['./decreto-ley.component.css'],
})
export class DecretoLeyComponent {
  decretos: DecretoLey[] = [];
  displayedColumns: string[] = [
    'select',
    'id_decreto_ley',
    'descripcion',
    'tipo_multa',
    'actions',
  ];
  dataSource = new MatTableDataSource<DecretoLey>([]);
  selection = new SelectionModel<DecretoLey>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarDecretos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarDecretos() {
    this.nomencladoresService.getDecretos().subscribe(
      (decretos) => {
        this.decretos = decretos;
        this.dataSource.data = decretos;
        console.log(this.decretos);
        this.loading = false;
      }
      // (error) => {
      //   console.log('Error:', error);
      //   if (error.error && error.error.message === 'Unauthenticated.') {
      //     Swal.fire({
      //       icon: 'error',
      //       title: '¡Tu sesión ha expirado!',
      //       text: 'Por favor, vuelve a iniciar sesión',
      //       showConfirmButton: false,
      //       timer: 1000 // Duración en milisegundos (1 segundo)
      //     }).then(() => {
      //       this.router.navigateByUrl('/auth/login');
      //     });
      //   }
      // }
    );
  }

  filtrarDatos() {
    this.dataSource.data = this.decretos.filter((decreto) => {
      return (
        decreto.id_decreto_ley
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        decreto.descripcion
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        decreto.tipo_multa.descripcion
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase())
      );
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarDecretos();
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
  checkboxLabel(row?: DecretoLey): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id_decreto_ley + 1
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

  eliminarDecreto(id: number) {
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
          this.nomencladoresService.deleteDecreto(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarDecretos();
              console.log('Decreto Ley eliminado exitosamente');
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
