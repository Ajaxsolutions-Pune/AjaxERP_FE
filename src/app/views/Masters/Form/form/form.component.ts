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
  constructor(private route: ActivatedRoute,
    private formTransfarmer: FormTransfarmer,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private formService: FormService, private router: Router) {
  }
  ngOnInit() {
    status = '';
    this.form = {
      formId: null,
      formName: null,
      isActive: null
    };
    this.route.paramMap.subscribe(parameterMap => { const str = parameterMap.get('id'); this.getForm(str); });
  }
  save(formForm: NgForm): void {
    if (status !== 'Update') {
      this.form.formId = null;
      console.log(this.form);
      // if (this.form.isActive === 'true') { this.form.isActive = '1'; } else { this.form.isActive = '0'; }

      this.formService.Save(this.formTransfarmer.formTransfarmer(this.form)).subscribe(
        (par) => {
            console.log(par);
          formForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['FormList']);
        }
      );

    } else {
      this.formService.Update(this.formTransfarmer.formTransfarmer(this.form)).subscribe(
        () => {
          formForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['FormList']);
        }
      );
    }
  }

  private getForm(form_Code: string) {
    this.form = {
      formId: null,
      formName: null,
      isActive: null
    };
    if (form_Code === null || form_Code === '') {
      this.form = {
        formId: null,
        formName: null,
        isActive: null
      };
      status = '';

    } else {
      this.formService.getForm(form_Code).subscribe(
        (par) => this.form = par,
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
