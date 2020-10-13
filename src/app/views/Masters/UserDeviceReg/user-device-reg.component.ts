import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDeviceReg, UserDeviceRegEntity } from '../../../Components/Module/Masters/UserDeviceReg.model';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { UserDeviceRegService } from '../../../Components/Services/Masters/UserDeviceRegService';
import { UserDeviceRegTransfarmer } from '../../../Components/Transformer/Masters/UserDeviceReg-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';

@Component({
  selector: 'app-user-device-reg',
  templateUrl: './user-device-reg.component.html',
  styleUrls: ['./user-device-reg.component.scss']
})
export class UserDeviceRegComponent extends FormComponentBase implements OnInit, AfterViewInit {
  // @ts-ignore
  // @ViewChild('UserDeviceRegName') firstItem: ElementRef;
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  userDeviceRegobj: UserDeviceReg;
  userDeviceRegEntity: UserDeviceRegEntity;
  str: string;
  constructor(private route: ActivatedRoute,
    private UserDeviceRegTransfarmer: UserDeviceRegTransfarmer,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private UserDeviceRegService: UserDeviceRegService,
    private globalService: GlobalService,
    private router: Router, private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlUserDeviceRegName: {
        required: 'UserDeviceReg Name is required.',
      }
    };

    this.formErrors = {
      ControlUserDeviceRegName: '',
    };
  }

  // isUserDeviceRegExist(): boolean {
  //   return this.form.get('ControlUserDeviceRegName').hasError('queExist');
  // }
  ngOnInit() {
    this.form = this.formBuilder.group({
      ControlCode: ['', []],
      ControlUserDeviceRegCode: ['', []],
      ControlfirstName: ['', []],
      ControllastName: ['', []],
      ControlmobileNo: ['', []],
      ControlemployeeId: ['', []],
      ControlemailId: ['', []],
      ControlisApproved: ['', []],
      ControlisActive: ['', []]
    });
    this.form.controls['ControlCode'].disable();
    this.form.controls['ControlUserDeviceRegCode'].disable();
    this.form.controls['ControlfirstName'].disable();
    this.form.controls['ControllastName'].disable();
    this.form.controls['ControlmobileNo'].disable();
    this.form.controls['ControlemailId'].disable();
    this.form.controls['ControlisApproved'].disable();
    this.form.controls['ControlemployeeId'].disable();
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    status = '';
    this.userDeviceRegobj = {
      password: null,
      appSource: null,
      deviceId: null,
      deviceRegNo: null,
      emailId: null,
      employeeId: null,
      firstName: null,
      id: null,
      isApproved: null,
      lastName: null,
      loginId: null,
      mobileNo: null,
      ouCode: null,
      approveFlag: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => { const str = parameterMap.get('id'); this.getUserDeviceReg(str); });
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

  Approve(): void {
    this.userDeviceRegobj.approveFlag = 'A';
    this.userDeviceRegobj.deviceRegNo = this.userDeviceRegobj.id;
    this.UserDeviceRegService.Approve(this.UserDeviceRegTransfarmer.userDeviceRegTransfarmer(this.userDeviceRegobj)).subscribe(
      (par) => {
        if (par !== null) {
          this.defaultLayoutComponent.Massage('',
          par.status, 'modal-info');
          this.router.navigate(['UserDeviceRegList']);
        }
      }
    );
  }

  private getUserDeviceReg(UserDeviceReg_Code: string) {
    this.userDeviceRegobj = {
      password: null,
      appSource: null,
      deviceId: null,
      deviceRegNo: null,
      emailId: null,
      employeeId: null,
      firstName: null,
      id: null,
      approveFlag: null,
      isApproved: null,
      lastName: null,
      loginId: null,
      mobileNo: null,
      ouCode: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (UserDeviceReg_Code === null || UserDeviceReg_Code === '') {
      this.userDeviceRegobj = {
        password: null,
        appSource: null,
        deviceId: null,
        deviceRegNo: null,
        emailId: null,
        employeeId: null,
        firstName: null,
        id: null,
        isApproved: null,
        lastName: null,
        loginId: null,
        mobileNo: null,
        ouCode: null,
        approveFlag: null,
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.UserDeviceRegService.getUserDeviceReg(UserDeviceReg_Code).subscribe(
        (par) => {
          this.userDeviceRegEntity = par;
          this.userDeviceRegobj = this.UserDeviceRegTransfarmer.userDeviceRegTransfarmerEntity(this.userDeviceRegEntity);
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
