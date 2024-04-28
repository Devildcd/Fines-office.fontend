import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DecretoLey } from '../../interfaces/decreto-ley.interface';
import { Organismo } from '../../interfaces/organismo.interface';
import { NomencladoresService } from '../../services/nomencladores.service';

@Component({
  selector: 'app-decretos-ley-dialog',
  templateUrl: './decretos-ley-dialog.component.html',
  styleUrls: ['./decretos-ley-dialog.component.css'],
})
export class DecretosLeyDialogComponent {
  organismo!: Organismo;
  displayedColumns: string[] = ['id_decreto_ley', 'descripcion'];
  dataSource = new MatTableDataSource<DecretoLey>([]);
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private nomencladoresService: NomencladoresService
  ) {
    console.log('Element ID passed to dialog:', this.data.id);
  }

  ngOnInit() {
    this.nomencladoresService
      .getOrganismo(this.data.id)
      .subscribe((organismo) => {
        this.organismo = organismo;
        this.dataSource.data = organismo.decreto_ley_id;
        console.log(this.dataSource.data)
        console.log(organismo);
      });
  }
}
