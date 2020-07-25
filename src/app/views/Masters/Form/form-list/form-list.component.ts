import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Form } from '../../../../Compound/Module/Masters/Form.model';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {
  @Input() FormInput: Form;
  forms: Form[];

  WithoutFilterForm: Form[];
  ResultForm: Form[];
  SerachCri: number;
  Form: Form;
  constructor(private _router: Router,
    private route: ActivatedRoute) {
    this.forms = this.route.snapshot.data['FormList'];
  }

  ngOnInit() {
    this.WithoutFilterForm = this.forms;
    console.log(this.forms);
    this.Form = {
      FormId: null,
      Form_Name: null,
      Is_Active: null,
      Is_Auto: null,
      Sort_By: null
    };
    console.log(this.forms);
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultForm = this.WithoutFilterForm;
    if (this.Form.FormId !== null && this.Form.FormId !== '') {
      this.ResultForm = this.ResultForm.filter(SubResult =>
        SubResult.FormId.toLowerCase().indexOf(this.Form.FormId.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.Form.Form_Name !== null && this.Form.Form_Name.toString() !== '') {
      this.ResultForm = this.ResultForm.filter(SubResult =>
        SubResult.Form_Name.toString().toLowerCase().indexOf(this.Form.Form_Name.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.ResultForm = this.WithoutFilterForm;
    }
    this.forms = this.ResultForm;
  }

  ExportToExcel(): void {
    alasql('SELECT Form_Code,Form_Id,Form_Name_ENg,Form_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("FormList.xlsx",{headers:true}) FROM ?', [this.forms]);
  }
}
