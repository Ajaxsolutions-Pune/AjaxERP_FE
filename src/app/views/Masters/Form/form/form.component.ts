import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Answer } from '../../../../Compound/Module/Masters/Answer.model';
import { DefaultLayoutComponent } from '../../../../containers';
import { Form } from '../../../../Compound/Module/Masters/Form.model';

@Component({
  selector: 'app-form',
  templateUrl: './Form.component.html',
  styleUrls: ['./Form.component.scss']
})
export class FormComponent implements OnInit {
  form: Form;
  str: string;
  formList: Form[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent, private router: Router) {
    const status = '';
  }
  ngOnInit() {
    this.form = {
      Form_Name: null,
      FormId: null,
      Is_Active: null,
      Is_Auto: null,
      Sort_By: null,
    };
    status = '';
  }

}
