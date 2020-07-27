import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Answer } from '../../../../Compound/Module/Masters/Answer.model';
import { DefaultLayoutComponent } from '../../../../containers';
import { FormObj } from '../../../../Compound/Module/Masters/Form.model';

@Component({
  selector: 'app-form',
  templateUrl: './Form.component.html',
  styleUrls: ['./Form.component.scss']
})
export class FormComponent implements OnInit {
  form: FormObj;
  str: string;
  formList: FormObj[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent, private router: Router) {
    const status = '';
  }
  ngOnInit() {
    this.form = {
      formId: null,
      formName: null,
      isActive: null
    };
    status = '';
  }

}
