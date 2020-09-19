import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormObj, FormEntity } from '../../../../Components/Module/Masters/Form.model';
import { FormTransfarmer } from '../../../../Components/Transformer/Masters/Form-Transfarmer';
import * as alasql from 'alasql';
alasql['private'].externalXlsxLib = require('xlsx');
import { environment } from '../../../../Components/Module/environment';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {
  @Input() FormInput: FormObj;
  forms: FormObj[];

  WithoutFilterForm: FormObj[];
  ResultForm: FormObj[];
  formEntity: FormEntity[];
  SerachCri: number;
  Form: FormObj;
  config: any;
  env = environment;
  constructor(private _router: Router,
    objTrans: FormTransfarmer,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      this._router.navigate(['login']);
    }
    this.formEntity = this.route.snapshot.data['FormList'];
    this.forms = objTrans.fTransfarmers(this.formEntity);
    console.log(this.forms[1].isActive);
    this.WithoutFilterForm = this.forms;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.forms.length
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
  ngOnInit() {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      this._router.navigate(['login']);
    }
    this.WithoutFilterForm = this.forms;
    this.Form = {
      isActive: '3',
      formId: null,
      formName: null,
      createdBy: null,
      createdDate: null,
      modifiedBy: null,
      modifiedDate: null,
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultForm = this.WithoutFilterForm;
    if (this.Form.formId !== null && this.Form.formId !== '') {
      this.ResultForm = this.ResultForm.filter(SubResult =>
        SubResult.formId.toLowerCase().indexOf(this.Form.formId.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.Form.formName !== null && this.Form.formName.toString() !== '') {
      this.ResultForm = this.ResultForm.filter(SubResult =>
        SubResult.formName.toString().toLowerCase().indexOf(this.Form.formName.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }

    if (this.Form.isActive !== null && this.Form.isActive.toString() !== '-1') {
      if (this.Form.isActive.toString() === '3') {
        this.ResultForm = this.ResultForm.filter(SubResultProd =>
          SubResultProd.isActive.toString() === 'Active'
          || SubResultProd.isActive.toString() === 'Inactive');
      } else {
        this.ResultForm = this.ResultForm.filter(SubResultProd =>
          SubResultProd.isActive.toString() === this.Form.isActive.toString());
        console.log(this.ResultForm);
      }
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.ResultForm = this.WithoutFilterForm;
    }
    this.forms = this.ResultForm;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.forms.length
    };
  }

  ExportToExcel(): void {
    alasql('SELECT formId Form_Id,formName Form_Name,isActive Is_Active' +
      ' INTO XLSX("FormList.xlsx",{headers:true}) FROM ?', [this.forms]);
  }
}
