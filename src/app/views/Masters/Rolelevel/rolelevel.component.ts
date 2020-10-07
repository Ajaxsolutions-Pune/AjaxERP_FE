import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, NgForm, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterDrp } from '../../../Components/Module/Masters/MasterDrp.model';
import { Rolelevel, RolelevelEntity } from '../../../Components/Module/Masters/Rolelevel.model';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { RolelevelService } from '../../../Components/Services/Masters/RolelevelService';
import { RolelevelTransfarmer } from '../../../Components/Transformer/Masters/Role-level.Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';

@Component({
  selector: 'app-rolelevel',
  templateUrl: './rolelevel.component.html',
  styleUrls: ['./rolelevel.component.scss']
})
export class RolelevelComponent extends FormComponentBase implements OnInit, AfterViewInit {
  // @ts-ignore
  // @ViewChild('RoleLevelName') firstItem: ElementRef;
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  roleLevelobj: Rolelevel;
  roleLevelEntity: RolelevelEntity;
  UserTypeDrp: MasterDrp[];
  TransmissionLineGroupDrp: MasterDrp[];
  str: string;
  constructor(private route: ActivatedRoute,
    private RoleLevelTransfarmer: RolelevelTransfarmer,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private RoleLevelService: RolelevelService,
    private globalService: GlobalService,
    private router: Router, private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlRoleLevelName: {
        required: 'RoleLevel Name is required.',
      },
      ControluserType: {
        required: 'User Type is required.',
      },
      ControlrolePriority: {
        required: 'Role Priority is required.',
      }
    };

    this.formErrors = {
      ControlRoleLevelName: '',
    };
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      ControlRoleLevelName: ['', [
        Validators.required]],
      ControluserType: ['', [
        Validators.required]],
      ControlrolePriority: ['', [
        Validators.required]],
      ControlRoleLevelId: ['', []],
      ControlisActive: ['', []]
    });
    this.form.controls['ControlRoleLevelId'].disable();
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href='login';
    }
    this.globalService.fillMasterDrp('USERT').subscribe(
      (par) => {
        this.UserTypeDrp = par;
      },
      (err: any) => console.log(err));
    status = '';
    this.roleLevelobj = {
      roleLevelDesc: null,
      roleLevelId: null,
      rolePriority: null,
      userType: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => { const str = parameterMap.get('id'); this.getRoleLevel(str); });
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
    this.roleLevelobj.createdBy = localStorage.getItem('username');
    this.roleLevelobj.createdDate = this.globalService.GerCurrntDateStamp();
    this.roleLevelobj.modifiedBy = localStorage.getItem('username');
    this.roleLevelobj.modifiedDate = this.globalService.GerCurrntDateStamp();
    if (status !== 'Update') {
      this.roleLevelobj.roleLevelId = null;
      this.RoleLevelService.Save(this.RoleLevelTransfarmer.RolelevelTransfarmer(this.roleLevelobj)).subscribe(
        (par) => {
          if (par.status === 'Inserted') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['RolelevelList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );

    } else {
      this.RoleLevelService.Update(this.RoleLevelTransfarmer.RolelevelTransfarmer(this.roleLevelobj)).subscribe(
        (par) => {
          if (par.status === 'Updated') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['RolelevelList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
    }
  }

  private getRoleLevel(RoleLevel_Code: string) {
    this.roleLevelobj = {
      roleLevelDesc: null,
      roleLevelId: null,
      rolePriority: null,
      userType: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (RoleLevel_Code === null || RoleLevel_Code === '') {
      this.roleLevelobj = {
        roleLevelDesc: null,
        roleLevelId: null,
        rolePriority: null,
        userType: null,
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.RoleLevelService.getRolelevel(RoleLevel_Code).subscribe(
        (par) => {
          this.roleLevelEntity = par;
          this.roleLevelobj = this.RoleLevelTransfarmer.RolelevelTransfarmerEntity(this.roleLevelEntity);
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
