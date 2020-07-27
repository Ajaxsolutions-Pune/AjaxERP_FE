import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DefaultLayoutComponent } from '../../../../containers';
import { FormObj } from '../../../../Compound/Module/Masters/Form.model';
import { FormService } from '../../../../Compound/Services/Masters/FormService';
import { FormTransfarmer } from '../../../../Compound/Transformer/Masters/Form-Transfarmer';

@Component({
  selector: 'app-form',
  templateUrl: './Form.component.html',
  styleUrls: ['./Form.component.scss']
})
export class FormComponent implements OnInit {
  form: FormObj;
  str: string;
  insertflag: boolean;
  formList: FormObj[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private formService: FormService,
    private formTransfarmer: FormTransfarmer, private router: Router) {
    const status = '';
  }
  ngOnInit() {
    status = '';
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id'); this.getForms(id.toString()); });
  }
  save(formForm: NgForm): void {
    if (status !== 'Update') {

      this.insertflag = false;
      this.form.formId = null;
      this.formService.Save(this.formTransfarmer.formTransfarmer(this.form)).subscribe(
        () => {
          formForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['BrandList']);
        }
      );

    } else {
      this.formService.Save(this.formTransfarmer.formTransfarmer(this.form)).subscribe(
        () => {
          formForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['formList']);
        }
      );
    }
    if (this.insertflag) {
      this.router.navigate(['FormList']);
    }
  }

  private getForms(formCode: string) {
    this.form = {
      formId: null,
      formName: null,
      isActive: null

    };
    if (formCode === null || formCode === '') {
      this.form = {
        formId: null,
        formName: null,
        isActive: null
      };
      status = '';

    } else {

      this.formService.getForm(formCode).subscribe(
        (par) => this.form = par,
        (err: any) => console.log(err));

      console.log(this.form);
      status = 'Update';
    }
  }

}
