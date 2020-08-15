import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { FormComponentBase } from '../../AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../../AngularDemo/infrastructure/cross-field-error-matcher';
import { passwordsDoNotMatch } from '../../AngularDemo/infrastructure/passwords-do-not-match.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../../containers';
import { FormObj, FormEntity } from '../../../../Compound/Module/Masters/Form.model';
import { FormTransfarmer } from '../../../../Compound/Transformer/Masters/Form-Transfarmer';
import { FormService } from '../../../../Compound/Services/Masters/FormService';

@Component({
  selector: 'app-form',
  templateUrl: './Form.component.html',
  styleUrls: ['./Form.component.scss']
})
export class FormComponent extends FormComponentBase implements OnInit, AfterViewInit {
  // @ts-ignore
  @ViewChild('processName') firstItem: ElementRef;
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  formobj: FormObj;
  formEntity: FormEntity;
  str: string;
  constructor(private route: ActivatedRoute,
    private formTransfarmer: FormTransfarmer,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private formService: FormService,
    private router: Router, private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlformName: {
        required: 'Form Name is required.',
      }
    };

    this.formErrors = {
      ControlformName: '',
    };
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      this. router.navigate(['login']);
    }
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      ControlformName: ['', [
        Validators.required]],
      ControlformId: ['', []],
      ControlisActive: ['', []]
    });
    this.form.controls['ControlformId'].disable();

    status = '';
    this.formobj = {
      formId: null,
      formName: null,
      isActive: null,
    };
    this.route.paramMap.subscribe(parameterMap => { const str = parameterMap.get('id'); this.getform(str); });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.firstItem.nativeElement.focus();
    }, 250);
    this.startControlMonitoring(this.form);
  }

  registerClicked(): void {
    if (this.form.invalid) {
      return;
    }
    alert('Registration Complete');
  }
  save(formForm: NgForm): void {
    if (status !== 'Update') {
      this.formobj.formId = null;
      this.formService.Save(this.formTransfarmer.formTransfarmer(this.formobj)).subscribe(
        (par) => {
          console.log(par.status);
          formForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['FormList']);
        }
      );

    } else {
      this.formService.Update(this.formTransfarmer.formTransfarmer(this.formobj)).subscribe(
        (par) => {
          if (par.status === 'Success') {
            formForm.reset();
            this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['FormList']);
          }
        }
      );
    }
  }

  private getform(form_Code: string) {
    this.formobj = {
      formName: null,
      formId: null,
      isActive: null,
    };
    if (form_Code === null || form_Code === '') {
      this.formobj = {
        formName: null,
        formId: null,
        isActive: null,
      };
      status = '';

    } else {
      this.formService.getForm(form_Code).subscribe(
        (par) => {
          this.formEntity = par;
          console.log(this.formEntity);
          this.formobj = this.formTransfarmer.formTransfarmerEntity(this.formEntity);
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
