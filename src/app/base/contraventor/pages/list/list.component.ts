import { Component, ViewChild } from '@angular/core';
import { Contraventor } from '../../interfaces/contraventor.interface';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ContraventorService } from '../../services/contraventor.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  contraventores: Contraventor[] = [];
  displayedColumns: string[] = [
    'select',
    'ci',
    'nombre',
    'apellido1',
    'apellido2',
    'direccion',
    'direccion_garux',
    'provincia_id',
    'municipio_id',
    'distrito_id',
    'cpopular_id',
    'zona_id',
    'sitlaboral_id',
    'sit_lab_id',
    'nombre_ctrabajo',
    'direccion_ctrabajo',
    'menor_edad',
    'far',
    'pasaporte',
    'cant_multa',
    'cant_importe',
    'cant_mult_calc',
    'carga',
    'fecha_actualizacion_suin',
    'actions',
  ];
  dataSource = new MatTableDataSource<Contraventor>([]);
  selection = new SelectionModel<Contraventor>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private contraventorService: ContraventorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarContraventores();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarContraventores() {
    this.contraventorService
      .getContraventores()
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
      .subscribe((contraventores) => {
        this.contraventores = contraventores;
        this.dataSource.data = contraventores;
        console.log(this.contraventores);
        this.loading = false;
        // console.log(this.token);
      });
  }

  filtrarDatos() {
    this.dataSource.data = this.contraventores.filter((contraventor) => {
      return (
        (contraventor.ci ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (contraventor.nombre ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (contraventor.apellido1 ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (contraventor.apellido2 ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (contraventor.direccion ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (contraventor.direccion_garux ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (contraventor.provincia_id?.nombre ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (contraventor.municipio_id?.nombre ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (contraventor.distrito_id?.nombre ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (contraventor.cpopular_id?.nombre ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (contraventor.zona_id?.nombre ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (contraventor.sitlaboral_id?.descripcion ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (contraventor.sit_lab_id?.nombre ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (contraventor.nombre_ctrabajo ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (contraventor.direccion_ctrabajo ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (contraventor.cant_multa?.toString() ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (contraventor.cant_importe?.toString() ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (contraventor.cant_mult_calc?.toString() ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        (contraventor.fecha_actualizacion_suin ?? '')
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase())
      );
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarContraventores();
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
  checkboxLabel(row?: Contraventor): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.ci + 1
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

  eliminarContraventor(id: number) {
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
          this.contraventorService.deleteContraventor(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarContraventores();
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
