import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Process } from '../../../Compound/Module/Masters/Process.model';
import { QaType } from '../../../Compound/Module/Masters/QA_Type.model';

@Component({
  selector: 'app-question-type-list',
  templateUrl: './question-type-list.component.html',
  styleUrls: ['./question-type-list.component.scss']
})
export class QuestionTypeListComponent implements OnInit {
  @Input() FormInput: QaType;
  arrOject: QaType[];

  WithoutFilterObj: QaType[];
  ResultProcess: QaType[];
  SerachCri: number;
  bindObj: QaType;
  constructor(private _router: Router,
    private route: ActivatedRoute) {
    this.arrOject = this.route.snapshot.data['ProcessList'];
  }

  ngOnInit() {
    this.WithoutFilterObj = this.arrOject;
    this.bindObj = {
      ID: null,
      QA_Type_Code: null,
      QA_Type_Desc: null,
      Is_Active: null,
      Is_Auto: null,
      Sort_By: null
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultProcess = this.WithoutFilterObj;
    if (this.bindObj.QA_Type_Code !== null && this.bindObj.QA_Type_Code !== '') {
      this.ResultProcess = this.ResultProcess.filter(SubResult =>
        SubResult.QA_Type_Code.toLowerCase().indexOf(this.bindObj.QA_Type_Code.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.QA_Type_Desc !== null && this.bindObj.QA_Type_Desc.toString() !== '') {
      this.ResultProcess = this.ResultProcess.filter(SubResult =>
        SubResult.QA_Type_Desc.toString().toLowerCase().indexOf(this.bindObj.QA_Type_Desc.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.ResultProcess = this.WithoutFilterObj;
    }
    this.arrOject = this.ResultProcess;
  }

  ExportToExcel(): void {
    alasql('SELECT Form_Code,Form_Id,Form_Name_ENg,Form_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("FormList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
