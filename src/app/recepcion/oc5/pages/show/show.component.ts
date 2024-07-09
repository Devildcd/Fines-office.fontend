import { Component, TemplateRef, ViewChild } from '@angular/core';
import { OC5 } from '../../interfaces/oc5.interface';
import { Oc5Service } from '../../services/oc5.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  modeloOc5!: OC5;
  loading = true;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    'fecha',
    'importe',
    'impositor',
    'talon',
    'dley_art_inc',
    'tipo_multa',
    'estado_multa_id',
    'moneda',
    'conceptraslado',
    'contraventor',
    'actions'];
  
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;

  constructor(
    private oc5Service: Oc5Service,
    private activeRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.oc5Service.getModeloOc5(id)))
      .subscribe((modeloOc5) => {
        this.modeloOc5 = modeloOc5;
        this.dataSource = modeloOc5.multas_crear;
        this.loading = false;
        console.log(this.modeloOc5);
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(this.dialogTemplate, {
      disableClose: true,
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
      console.log('Resultado:', result);
    });
  }
}
