import { Component, OnInit, Input } from '@angular/core';
import { QualificationType, QualificationTypeEntity } from '../../../Components/Module/HRMS/QualificationType.model';
import { environment } from '../../../Components/Module/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { QualificationTypeTransfarmer } from '../../../Components/Transformer/HRMS/QualificationType-Transfarmer';

@Component({
  selector: 'app-qualification-type-list',
  templateUrl: './qualification-type-list.component.html',
  styleUrls: ['./qualification-type-list.component.scss']
})
export class QualificationTypeListComponent implements OnInit {


  @Input() questionInput: QualificationType;
  arrOject: QualificationType[];
  arrOjectEntity: QualificationTypeEntity[];

  WithoutFilterObj: QualificationType[];
  ResultOject: QualificationType[];
  SerachCri: number;
  bindObj: QualificationType;
  config: { itemsPerPage: any; currentPage: number; totalItems: any; };
  env = environment;
  constructor(private _router: Router,
    objTrans: QualificationTypeTransfarmer,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    this.arrOjectEntity = this.route.snapshot.data['QualificationTypeList'];
    this.arrOject = objTrans.QualificationTypeTransfarmers(this.arrOjectEntity);
    this.WithoutFilterObj = this.arrOject;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.arrOject.length
    };
  }

  ngOnInit() {
    this.WithoutFilterObj = this.arrOject;
    this.bindObj = {
      ouCode: null,
      qualificationTypeName: null,
      qualificationTypeDesc: null,
      qualificationTypeCode: null,
      qualificationTypeStatus: '3',
      createdBy: null,
      createdDate: null,
      modifiedBy: null,
      modifiedDate: null,
    };
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultOject = this.WithoutFilterObj;
    if (this.bindObj.qualificationTypeCode !== null && this.bindObj.qualificationTypeCode !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.qualificationTypeCode.toString().toLowerCase().indexOf(
          this.bindObj.qualificationTypeCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.qualificationTypeName !== null && this.bindObj.qualificationTypeName !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.qualificationTypeName.toString().toLowerCase().indexOf(
          this.bindObj.qualificationTypeName.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }

    if (this.bindObj.qualificationTypeStatus !== null && this.bindObj.qualificationTypeStatus.toString() !== '-1') {
      if (this.bindObj.qualificationTypeStatus.toString() === '3') {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.qualificationTypeStatus.toString() === 'Active' || SubResultProd.qualificationTypeStatus.toString() === 'Inactive');
      } else {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.qualificationTypeStatus.toString() === this.bindObj.qualificationTypeStatus.toString());
      }
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.ResultOject = this.WithoutFilterObj;
    }
    this.arrOject = this.ResultOject;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.arrOject.length
    };
  }

  ExportToExcel(): void {
    alasql('SELECT qualificationTypeCode Qualification_Type_Code,qualificationTypeName Qualification_Type_Name,qualificationTypeDesc Qualification_Type_Description,' +
      'qualificationTypeStatus Status INTO XLSX("QualificationTypeList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
