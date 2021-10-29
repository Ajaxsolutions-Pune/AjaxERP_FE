import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../Components/Module/environment';
import { RoleUserMapping, RoleUserMappingEntity } from '../../../Components/Module/Masters/RoleUserMapping.model';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { RoleUserMappingService } from '../../../Components/Services/Masters/RoleUserMappingService';
import { RoleUserMappingTransfarmer } from '../../../Components/Transformer/Masters/Role-User-Mapping-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';
import { RoleUserMappingAsyncValidator } from '../../../helper/async-validator';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';

@Component({
  selector: 'app-role-user-mapping',
  templateUrl: './role-user-mapping.component.html',
  styleUrls: ['./role-user-mapping.component.scss']
})
export class RoleUserMappingComponent extends FormComponentBase implements OnInit, AfterViewInit {
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  roleUserobj: RoleUserMapping;
 roleUserEntity: RoleUserMappingEntity;
 loginIddrp:RoleUserMapping[];
 roleIddrp:RoleUserMapping[];
  str: string;
  constructor(private route: ActivatedRoute,
    private roleUserTransfarmer: RoleUserMappingTransfarmer,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private roleuerService: RoleUserMappingService,
    private globalService: GlobalService,
    private router: Router, private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlroleID: {
        required: 'Role ID required.',
      },
      ControlloginID:{
        required: 'Login ID required.',
      }
    };

    this.formErrors = {
      ControlisActive: '',
      ControlloginID:'',
    };
  }


  ngOnInit() {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    status = '';
    this.roleuerService.fillDrpRoleuser().subscribe(
      (par) => {
        this.roleIddrp = this.roleUserTransfarmer.RoleUserMappingTransfarmers(par);
      },
      (err: any) => console.log(err));
      this.roleuerService.fillDrpRoleuser().subscribe(
        (par) => {
          this.loginIddrp = this.roleUserTransfarmer.RoleUserMappingTransfarmers(par);
        },
        (err: any) => console.log(err));
    this.roleUserobj = {
      roleLoginTrnId: null,
      roleId: null,
      loginId: null,
      roleBelongsTo: null,
      effectiveFromDate: null,
      effectiveToDate: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id'); this.getRoleUserMapping(str);
      console.log(str)
      this.form = this.formBuilder.group({
        ControlroleID: ['', []],
        ControlloginID: ['', [Validators.required],
        [RoleUserMappingAsyncValidator(this.roleuerService, str)]],
        ControlisActive: ['', []]
      });
       });
  }
  special_char_val(event) {
    let k;
    k = event.charCode;
    return this.globalService.SpecialCharValidator(k);

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
    this.roleUserobj.createdBy = localStorage.getItem('username');
    this.roleUserobj.createdDate = this.globalService.GerCurrntDateStamp();
    this.roleUserobj.modifiedBy = localStorage.getItem('username');
    this.roleUserobj.modifiedDate = this.globalService.GerCurrntDateStamp();
    if (status !== 'Update') {
      this.roleUserobj.roleLoginTrnId = null;
      this.roleUserobj.roleBelongsTo = "";
      this.roleuerService.Save(this.roleUserTransfarmer.RoleUserMappingTransfarmer(this.roleUserobj)).subscribe(
        (par) => {
          console.log(this.roleUserobj)
          if (par.status === 'Inserted') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['RoleUserMappingList']);
            console.log(this.roleUserobj)
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );

    } else {
      this.roleuerService.Update(this.roleUserTransfarmer.RoleUserMappingTransfarmer(this.roleUserobj)).subscribe(
        (par) => {
          if (par.status === 'Updated') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['RoleUserMappingList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
    }
  }

  private getRoleUserMapping(TranID: string) {
    this.roleUserobj = {
      roleLoginTrnId: null,
      roleId: null,
      loginId: null,
      roleBelongsTo: null,
      effectiveFromDate: null,
      effectiveToDate: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (TranID === null || TranID === '') {
      this.roleUserobj = {
        roleLoginTrnId: null,
        roleId: null,
        loginId: null,
        roleBelongsTo: null,
        effectiveFromDate: null,
        effectiveToDate: null,
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.roleuerService.getRoleUserMapping(TranID).subscribe(
        (par) => {
          this.roleUserEntity = par;
          this.roleUserobj = this.roleUserTransfarmer.RoleUserMappingTransfarmerEntity(this.roleUserEntity);
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
