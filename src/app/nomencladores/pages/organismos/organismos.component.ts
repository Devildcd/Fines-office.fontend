import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

import { Organismo } from '../../interfaces/organismo.interface';
import { NomencladoresService } from '../../services/nomencladores.service';
import { TipoMulta } from '../../interfaces/tipo-multa.interface';
import { DecretoLey } from '../../interfaces/decreto-ley.interface';
import { MatDialog } from '@angular/material/dialog';
import { DecretosLeyDialogComponent } from '../../components/decretos-ley-dialog/decretos-ley-dialog.component';

@Component({
  selector: 'app-organismos',
  templateUrl: './organismos.component.html',
  styleUrls: ['./organismos.component.css']
})
export class OrganismosComponent {

  organismos: Organismo[] = [];
  tiposMultas: TipoMulta[] = [];
  decretosLey: DecretoLey[] = [];
  displayedColumns: string[] = ['select', 'id_organismo', 'nombre', 'asociado_id', 'tipo_multa_id', 'decretos', 'actions'];
  dataSource = new MatTableDataSource<Organismo>([]);
  selection = new SelectionModel<Organismo>(true, []);
  loading = true;
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private nomencladoresService: NomencladoresService, private router: Router,
                public dialog: MatDialog ) { }

  ngOnInit() {
    this.nomencladoresService.getTiposMultas().subscribe(( tiposMultas )=>{
      this.tiposMultas = tiposMultas;
    });
    this.nomencladoresService.getDecretos().subscribe(( decretosLey )=>{
      this.decretosLey = decretosLey;
    });
    this.cargarOrganismos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarOrganismos() {
    this.nomencladoresService
      .getOrganismos()
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
      .subscribe((organismos) => {
        this.organismos = organismos;
        this.dataSource.data = organismos;
        console.log(this.organismos);
        this.loading = false;
        // console.log(this.token);
      });
  }

  filtrarDatos() {
    this.dataSource.data = this.organismos.filter((organismo) => {
      return organismo.id_organismo.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      organismo.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      organismo.tipo_multa_id.descripcion.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.cargarOrganismos();
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
  checkboxLabel(row?: Organismo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id_organismo + 1}`;
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

  openDialog(elementId: any): void {
    const dialogRef = this.dialog.open(DecretosLeyDialogComponent, {
      data: { id: elementId } // Pasar el ID como parte de los datos enviados al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  eliminarOrganismo(id: number) {
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
          this.nomencladoresService.deleteOrganismo(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarOrganismos();
              console.log('Organismo eliminado exitosamente');
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
