import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Process } from '../../../Components/Module/Masters/Process.model';
import { QaType, QaTypeEntity } from '../../../Components/Module/Masters/QA_Type.model';
import { QaTypeTransfarmer } from '../../../Components/Transformer/Masters/QaType-Transfarmer';

@Component({
  selector: 'app-question-type-list',
  templateUrl: './question-type-list.component.html',
  styleUrls: ['./question-type-list.component.scss']
})
export class QuestionTypeListComponent implements OnInit {
  @Input() questionInput: QaType;
  arrOject: QaType[];
  arrOjectEntity: QaTypeEntity[];

  WithoutFilterObj: QaType[];
  ResultOject: QaType[];
  SerachCri: number;
  bindObj: QaType;
  constructor(private _router: Router,
    objTrans: QaTypeTransfarmer,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this._router.navigate(['login']);
      }
    this.arrOjectEntity = this.route.snapshot.data['QaTypeList'];
    this.arrOject = objTrans.QaTypeTransfarmers(this.arrOjectEntity);
    this.WithoutFilterObj = this.arrOject;
  }

  ngOnInit() {
    this.WithoutFilterObj = this.arrOject;
    console.log(this.arrOject);
    this.bindObj = {
      qaTypeCode: null,
      qaTypeDesc: null,
      isActive: null,
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultOject = this.WithoutFilterObj;
    if (this.bindObj.qaTypeDesc !== null && this.bindObj.qaTypeDesc !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.qaTypeDesc.toLowerCase().indexOf(this.bindObj.qaTypeDesc.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.qaTypeCode !== null && this.bindObj.qaTypeCode.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.qaTypeCode.toString().toLowerCase().indexOf(this.bindObj.qaTypeCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.ResultOject = this.WithoutFilterObj;
    }
    this.arrOject = this.ResultOject;
  }

  ExportToExcel(): void {
    alasql('SELECT question_Code,question_Id,question_Name_ENg,question_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("questionList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
