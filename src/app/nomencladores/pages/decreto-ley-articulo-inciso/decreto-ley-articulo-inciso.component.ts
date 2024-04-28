import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { DecretoLeyArticuloInciso } from '../../interfaces/decreto-ley-articulo-inciso.interface';
import { NomencladoresService } from '../../services/nomencladores.service';

@Component({
  selector: 'app-decreto-ley-articulo-inciso',
  templateUrl: './decreto-ley-articulo-inciso.component.html',
  styleUrls: ['./decreto-ley-articulo-inciso.component.css']
})
export class DecretoLeyArticuloIncisoComponent {

  decLeyArtIncisos: DecretoLeyArticuloInciso[] = [];
  displayedColumns: string[] = [
    'select',
    'descripcion',
    'decreto_ley',
    'articulo',
    'inciso',
    'duplica',
    'dias_duplicar',
    'tipo_dias_dup',
    'apremia',
    'dias_apremiar',
    'tipo_dias_ap',
    'cancela',
    'dias_cancelar',
    'tipo_dias_canc',
    'traslada',
    'bonifica',
    'bonifica_dias',
    'bonifica_porc',
    'actions'
    ];

  dataSource = new MatTableDataSource<DecretoLeyArticuloInciso>([]);
  selection = new SelectionModel<DecretoLeyArticuloInciso>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private nomencladoresService: NomencladoresService, 
              private router: Router) { }

  ngOnInit() {
    this.cargarDecretosLeyArticulosInc();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarDecretosLeyArticulosInc() {
    this.nomencladoresService
      .getDecLeyArticulosIncisos()
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
      .subscribe((decLeyArtIncisos) => {
        this.decLeyArtIncisos = decLeyArtIncisos;
        this.dataSource.data = decLeyArtIncisos;
        console.log(this.decLeyArtIncisos);
        this.loading = false;
        // console.log(this.token);
      });
  }

  filtrarDatos() {
    this.dataSource.data = this.decLeyArtIncisos.filter((decLeyArtInciso) => {
      return 
      decLeyArtInciso.descripcion.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      decLeyArtInciso.decreto_ley.descripcion.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      decLeyArtInciso.articulo.id_articulo.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      decLeyArtInciso.inciso.id_inciso.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      decLeyArtInciso.dias_duplicar?.toString().includes(this.terminoBusqueda.toLowerCase()) ||
      decLeyArtInciso?.tipo_dias_dup.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      decLeyArtInciso?.dias_apremiar?.toString().includes(this.terminoBusqueda.toLowerCase()) ||
      decLeyArtInciso?.tipo_dias_ap.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      decLeyArtInciso?.dias_cancelar?.toString().includes(this.terminoBusqueda.toLowerCase()) || 
      decLeyArtInciso?.tipo_dias_canc.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) || 
      decLeyArtInciso?.bonifica_dias?.toString().includes(this.terminoBusqueda.toLowerCase()) || 
      decLeyArtInciso?.bonifica_porc?.toString().includes(this.terminoBusqueda.toLowerCase());
      
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarDecretosLeyArticulosInc();
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
  checkboxLabel(row?: DecretoLeyArticuloInciso): string {
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

  eliminarDecretoLeyArticuloInc(id: number) {
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
          this.nomencladoresService.deleteOCCM(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarDecretosLeyArticulosInc();
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
