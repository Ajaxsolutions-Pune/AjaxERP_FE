import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { ProcessDataService } from '../../processdata.service';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs/delete/processdelete.dialog.html',
  styleUrls: ['../../dialogs/delete/processdelete.dialog.css']
})
export class ProcessDeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<ProcessDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: ProcessDataService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteProcessFormMapping(this.data.id);
  }
}
