import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, NgForm, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Access, AccessEntity } from '../../../Components/Module/Masters/Access.model';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { AccessService } from '../../../Components/Services/Masters/AccessService';
import { AccessTransfarmer } from '../../../Components/Transformer/Masters/Access-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent extends FormComponentBase implements OnInit, AfterViewInit {
  // @ts-ignore
 // @ViewChild('AccessName') firstItem: ElementRef;
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  accessobj: Access;
  accessEntity: AccessEntity;
  str: string;
  constructor(private route: ActivatedRoute,
    private accessTransfarmer: AccessTransfarmer,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private accessService: AccessService,
    private globalService: GlobalService,
    private router: Router, private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlAccessName: {
        required: 'Access Name is required.',
      }
    };

    this.formErrors = {
      ControlAccessName: '',
    };
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      this.router.navigate(['login']);
    }
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      ControlAccessName: ['', [
        Validators.required]],
      ControlAccessId: ['', []],
      ControlisActive: ['', []]
    });
    this.form.controls['ControlAccessId'].disable();

    status = '';
    this.accessobj = {
      accessName: null,
      accessId: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => { const str = parameterMap.get('id'); this.getAccess(str); });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
    //  this.firstItem.nativeElement.focus();
    }, 250);
    this.startControlMonitoring(this.form);
  }

  registerClicked(): void {
    if (this.form.invalid) {
      return;
    }
    alert('Registration Complete');
  }

  save(): void {
    this.accessobj.createdBy = localStorage.getItem('username');
    this.accessobj.createdDate = this.globalService.GerCurrntDateStamp();
    this.accessobj.modifiedBy = localStorage.getItem('username');
    this.accessobj.modifiedDate = this.globalService.GerCurrntDateStamp();
    if (status !== 'Update') {
      this.accessobj.accessId = null;
      this.accessService.Save(this.accessTransfarmer.AccessTransfarmer(this.accessobj)).subscribe(
        (par) => {
          console.log(par);
          if (par.status === 'Inserted') {
            console.log(par.status);
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['AccessList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );

    } else {
      this.accessService.Update(this.accessTransfarmer.AccessTransfarmer(this.accessobj)).subscribe(
        (par) => {
          console.log(par);
          if (par.status === 'Updated') {
            console.log(par.status);
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['AccessList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );
    }
  }

  private getAccess(Access_Code: string) {
    this.accessobj = {
      accessName: null,
      accessId: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (Access_Code === null || Access_Code === '') {
      this.accessobj = {
        accessName: null,
        accessId: null,
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.accessService.getAccess(Access_Code).subscribe(
        (par) => {
          this.accessEntity = par;
          console.log(this.accessEntity);
          this.accessobj = this.accessTransfarmer.AccessTransfarmerEntity(this.accessEntity);
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
