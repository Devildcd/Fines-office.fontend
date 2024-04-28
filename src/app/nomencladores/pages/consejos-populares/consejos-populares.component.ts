import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NomencladoresService } from '../../services/nomencladores.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ConsejoPopular } from '../../interfaces/consejo-popular.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consejos-populares',
  templateUrl: './consejos-populares.component.html',
  styleUrls: ['./consejos-populares.component.css'],
})
export class ConsejosPopularesComponent {
  cpopulares: ConsejoPopular[] = [];
  displayedColumns: string[] = [
    'select',
    'id_cpopular',
    'nombre',
    'municipio_id',
    'distrito_id',
    'actions',
  ];
  
  dataSource = new MatTableDataSource<ConsejoPopular>([]);
  selection = new SelectionModel<ConsejoPopular>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarConsejosPopulares();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filtrarDatos() {
    this.dataSource.data = this.cpopulares.filter((cpopular) => {
      return (
        cpopular.id_cpopular
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        cpopular.nombre
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        cpopular.distrito_id.nombre
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        cpopular.municipio_id.nombre
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase())
      );
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarConsejosPopulares();
  }

  cargarConsejosPopulares() {
    this.nomencladoresService
      .getConsejoPopulares()
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
      .subscribe((cpopulares) => {
        this.cpopulares = cpopulares;
        this.dataSource.data = cpopulares;
        console.log(this.cpopulares);
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
  checkboxLabel(row?: ConsejoPopular): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id_cpopular + 1
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

  eliminarConsejoPopular(id: number) {
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
          this.nomencladoresService.deleteConsejoPopular(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              const index = this.cpopulares.findIndex(
                (cpopular) => cpopular.id === id
              );
              if (index !== -1) {
                this.cpopulares.splice(index, 1);
              }
              this.cargarConsejosPopulares();
              console.log('Consejo Popular eliminado exitosamente');
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
