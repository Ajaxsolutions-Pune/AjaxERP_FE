import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../../containers';
import { FormObj, FormEntity } from '../../../../Components/Module/Masters/Form.model';
import { FormTransfarmer } from '../../../../Components/Transformer/Masters/Form-Transfarmer';
import { FormService } from '../../../../Components/Services/Masters/FormService';
import { FormComponentBase } from '../../AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../../AngularDemo/infrastructure/cross-field-error-matcher';
import { GlobalService } from '../../../../Components/Services/GlobalServices/Global.service';

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
    private globalService: GlobalService,
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
      this.router.navigate(['login']);
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
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
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
    this.formobj.createdBy = localStorage.getItem('username');
    this.formobj.createdDate = this.globalService.GerCurrntDateStamp();
    this.formobj.modifiedBy = localStorage.getItem('username');
    this.formobj.modifiedDate = this.globalService.GerCurrntDateStamp();
    if (status !== 'Update') {
      this.formobj.formId = null;
      this.formService.Save(this.formTransfarmer.formTransfarmer(this.formobj)).subscribe(
        (par) => {
          console.log(par);
          if (par.status === 'Inserted') {
            console.log(par.status);
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['FormList']);
          }   else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );

    } else {
      this.formService.Update(this.formTransfarmer.formTransfarmer(this.formobj)).subscribe(
        (par) => {
          console.log(par);
          if (par.status === 'Updated') {
            console.log(par.status);
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['FormList']);
          }   else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );
    }
  }

  private getform(form_Code: string) {
    this.formobj = {
      formName: null,
      formId: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (form_Code === null || form_Code === '') {
      this.formobj = {
        formName: null,
        formId: null,
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
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
