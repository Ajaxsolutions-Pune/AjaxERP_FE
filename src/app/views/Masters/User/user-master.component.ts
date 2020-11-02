import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { User, UserEntity } from '../../../Components/Module/Masters/User.model'
import { ActivatedRoute, Router } from '@angular/router';
import { UserTransfarmer } from '../../../Components/Transformer/Masters/User-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';
import { UserService } from '../../../Components/Services/Masters/UserService';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { environment } from '../../../Components/Module/environment';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';

import { RoleLevel } from '../../../Components/Module/Masters/RoleLevel.model';
import { RolelevelService } from '../../../Components/Services/Masters/RolelevelService';
import { RolelevelTransfarmer } from '../../../Components/Transformer/Masters/Role-level.Transfarmer';

import { UserEntity_ } from '../../../Components/Module/Masters/UserEntity.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MasterDrp } from '../../../Components/Module/Masters/MasterDrp.model';
import { MyErrorStateMatcher } from '../AngularDemo/MyErrorStateMatcher.component';
import { UserAsyncValidator, UserLoginAsyncValidator } from '../../../helper/async-validator';
import { ConfirmPassErrorStateMatcher } from '../../../Components/ErrorStateMatcher/ConfirmPassErrorStateMatcher.component';
@Component({
  selector: 'app-user',
  templateUrl: './user-master.component.html'
})

export class UserComponent extends FormComponentBase implements OnInit, AfterViewInit {
  roleLevel: RoleLevel[];
  // @ts-ignore
  @ViewChild('txtLoginID') firstItem: ElementRef;
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  user: User;
  userEntity: UserEntity;
  str: string;
  env = environment;
  userGroupDrp: MasterDrp[];
  userTypeDrp: MasterDrp[];
  userEntityDrp: UserEntity_[];
  passDisply: boolean;
  matcher = new ConfirmPassErrorStateMatcher();
  constructor(private route: ActivatedRoute,
    private userTransfarmer: UserTransfarmer,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private userService: UserService,
    private globalService: GlobalService,
    private httpClient: HttpClient,
    private rolelevelService: RolelevelService,
    private roleLevelTransfarmer: RolelevelTransfarmer,
    private router: Router, private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlloginID: {
        required: 'Login id is required.',
      },
      ControluserName: {
        required: 'User name is required.',
      },
      Controlpassword: {
        required: 'Password is required.',
      },
      Controlemail: {
        required: 'Email id is required.',
      },
      Controlmobile: {
        required: 'Mobile is required.',
      }
    };

    this.formErrors = {
      ControlloginID: '',
      ControluserName: '',
      Controlpassword: '',
      Controlemail: '',
      Controlmobile: ''
    };

    this.str = this.env.apiServiceIPPort;
  }

  isUserExist(): boolean {
    return this.form.get('ControluserName').hasError('queExist');
  }
  UserLoginExist(): boolean {
    return this.form.get('ControlloginID').hasError('queExist');
  }
  fillEntityDrp(GroupEntity: string): Observable<UserEntity_[]> {
    return this.httpClient.get<UserEntity_[]>(this.str +
      '/GetEntity/getList/' + localStorage.getItem('username').toString() + '/' + this.env.OuCode +
      '?entityGroupCode=' + GroupEntity + '&entityCode=NULL&activeStatus=1', this.env.httpOptions);
  }

  ngOnInit() {
    this.rolelevelService.fillDrpRolelevels().subscribe(
      (par) => this.roleLevel = this.roleLevelTransfarmer.RolelevelTransfarmers(par),
      (err: any) => console.log(err));
    //user hroup combo
    this.globalService.fillMasterDrp('USERG').subscribe(
      (par) => { this.userGroupDrp = par; }, (err: any) => console.log(err));
    this.globalService.fillMasterDrp('USERT').subscribe(
      (par) => { this.userTypeDrp = par; },
      (err: any) => console.log(err));

    // this.form.controls['ControlloginID'].disable();
    status = '';
    this.user = {
      ouCode: null, confipwd: null, id: null, loginID: null,
      pwd: null, userNameENG: null, userNameUNI: null, userTypeCode: null,
      emailID: null, mobileNo: null, pwdChangedDate: this.globalService.GerCurrntDateStamp(),
      pwdExpiryDate: this.globalService.GerCurrntDateStamp(),
      isBlocked: null, userGroupCode: null, entityCode: null, entityBranchCode: null,
      desigination: null, isPswdChanged: null, isActive: null, createdBy: null,
      createdDate: null, modifiedBy: null, modifiedDate: null,
    };
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      this.getuser(str);
    });
  }
  special_char_val(event) {
    let k;
    k = event.charCode;
    return this.globalService.SpecialCharValidator(k);

  }

  number_char_val(event) {
    let k;
    k = event.charCode;
    return this.globalService.NumberValidator(k);

  }
  isCircleExist(): boolean {
    return this.form.get('ControlcircleNameENG').hasError('queExist');
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.Controlpassword.value;
    let confirmPass = group.controls.Controlconfipwd.value;
    return pass === confirmPass ? null : { notSame: true }
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

  EntityChange(event) {
    const target = event.source.selected._element.nativeElement;
    const selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };

    //Entity combo
    this.fillEntityDrp(selectedData.value).subscribe(
      (par) => {
        this.userEntityDrp = par;
      },
      (err: any) => console.log(err));
  }

  save(userForm: NgForm): void {
    this.user.createdBy = localStorage.getItem('username');
    this.user.createdDate = this.globalService.GerCurrntDateStamp();
    this.user.modifiedBy = localStorage.getItem('username');
    this.user.modifiedDate = this.globalService.GerCurrntDateStamp();
    if (status !== 'Update') {
      this.user.id = null;
      this.user.pwdChangedDate = this.globalService.GerCurrntDate();
      this.user.pwdExpiryDate = this.globalService.GerCurrntDate();
      this.userService.Save(this.userTransfarmer.UserTransfarmer(this.user)).subscribe(
        (par) => {
          console.log(par);
          if (par !== null) {
            userForm.reset();
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['UserList']);
          }
        }
      );
    }
    else {
      this.userService.Update(this.userTransfarmer.UserTransfarmer(this.user)).subscribe(
        () => {
          userForm.reset();
          this.defaultLayoutComponent.Massage('',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['UserList']);
        }
      );
    }
  }

  private getuser(Login_Id: string) {
    this.user = {
      ouCode: null,
      confipwd: null,
      id: null,
      loginID: null,
      pwd: null,
      userNameENG: null,
      userNameUNI: null,
      userTypeCode: null,
      emailID: null,
      mobileNo: null,
      pwdChangedDate: this.globalService.GerCurrntDate(),
      pwdExpiryDate: this.globalService.GerCurrntDate(),
      isBlocked: 'false',
      userGroupCode: null,
      entityCode: null,
      entityBranchCode: null,
      desigination: null,
      isPswdChanged: 'false',
      isActive: 'true',
      createdBy: null,
      createdDate: null,
      modifiedBy: null,
      modifiedDate: null,
    };
    if (Login_Id === null || Login_Id === '') {
      this.passDisply = true;
      this.user = {
        ouCode: null,
        confipwd: null,
        id: null,
        loginID: null,
        pwd: null,
        userNameENG: null,
        userNameUNI: null,
        userTypeCode: null,
        emailID: null,
        mobileNo: null,
        pwdChangedDate: this.globalService.GerCurrntDate(),
        pwdExpiryDate: this.globalService.GerCurrntDate(),
        isBlocked: 'false',
        userGroupCode: null,
        entityCode: null,
        entityBranchCode: null,
        desigination: null,
        isPswdChanged: 'false',
        isActive: 'true',
        createdBy: null,
        createdDate: null,
        modifiedBy: null,
        modifiedDate: null,
      };
      status = '';
      this.form = this.formBuilder.group({
        ControlloginID: ['', [Validators.required],
          [UserLoginAsyncValidator(this.userService)]],
        ControluserName: ['', [Validators.required]],
        Controlconfipwd: ['', [Validators.required]],
        Controlpassword: ['', [Validators.required]], Controlemail: ['', [Validators.required]],
        Controlmobile: ['', [Validators.required]], ControluserType: ['', []],
        ControlPassChangeDate: ['', []], ControlPassExpiryDate: ['', []],
        ControluserGroupCode: ['', []], ControlentityCode: ['', []],
        ControlentityBranchCode: ['', []], Controldesigination: ['', []],
        ControlisBlocked: ['', []], ControlisActive: ['', []],
        ControlpasswordChanged: ['', []],
      }, { validator: this.checkPasswords });

      this.form.controls['ControlPassChangeDate'].disable()
      this.form.controls['ControlPassExpiryDate'].disable()
    }
    else {
      this.passDisply = false;
      this.userEntity = {
        ouCode: null,
        id: null,
        loginID: null,
        pwd: null,
        userNameENG: null,
        userNameUNI: null,
        userTypeCode: null,
        emailID: null,
        mobileNo: null,
        pwdChangedDate: this.globalService.GerCurrntDate(),
        pwdExpiryDate: this.globalService.GerCurrntDate(),
        isBlocked: null,
        userGroupCode: null,
        entityCode: null,
        entityBranchCode: null,
        desigination: null,
        isPswdChanged: null,
        isActive: null,
        createdBy: null,
        createdDate: null,
        modifiedBy: null,
        modifiedDate: null,
      };


      this.form = this.formBuilder.group({
        ControlloginID: ['', [Validators.required]],
        ControluserName: ['', [Validators.required]],
        Controlconfipwd: [''],
        Controlpassword: [''], Controlemail: ['', [Validators.required]],
        Controlmobile: ['', [Validators.required]], ControluserType: ['', []],
        ControlPassChangeDate: ['', []], ControlPassExpiryDate: ['', []],
        ControluserGroupCode: ['', []], ControlentityCode: ['', []],
        ControlentityBranchCode: ['', []], Controldesigination: ['', []],
        ControlisBlocked: ['', []], ControlisActive: ['', []],
        ControlpasswordChanged: ['', []],
      });

      this.form.controls['ControlPassChangeDate'].disable()
      this.form.controls['ControlPassExpiryDate'].disable()
      this.userService.getUser(Login_Id).subscribe(
        (par) => {
          this.userEntity = par;
          this.user = this.userTransfarmer.UserTransfarmerEntity(this.userEntity);
          this.form.controls['ControlloginID'].disable()
        },
        (err: any) => console.log(err));
      status = 'Update';

    }
  }
}


