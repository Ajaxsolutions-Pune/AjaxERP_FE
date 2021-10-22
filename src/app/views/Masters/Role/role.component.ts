import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Role, RoleEntity } from '../../../Components/Module/Masters/Role.model'
import { ActivatedRoute, Router } from '@angular/router';
import { RoleTransfarmer } from '../../../Components/Transformer/Masters/Role-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';
import { RoleService } from '../../../Components/Services/Masters/RoleService';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { environment } from '../../../Components/Module/environment';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { RoleLevel } from '../../../Components/Module/Masters/RoleLevel.model';
import { RolelevelService } from '../../../Components/Services/Masters/RolelevelService';
import { RolelevelTransfarmer } from '../../../Components/Transformer/Masters/Role-level.Transfarmer';
import { MasterDrp } from '../../../Components/Module/Masters/MasterDrp.model';

@Component({
  selector: 'app-role',
  templateUrl: './Role.component.html'
})

export class RoleComponent extends FormComponentBase implements OnInit, AfterViewInit {
  roleLevel: RoleLevel[];
  // @ts-ignore
  @ViewChild('txtRoleID') firstItem: ElementRef;
  form!: FormGroup;
  role: Role;
  roleEntity: RoleEntity;
  str: string;
  env = environment;
  drproleCreateFor: MasterDrp[];
  constructor(private route: ActivatedRoute,
    private roleTransfarmer: RoleTransfarmer,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private roleService: RoleService,
    private globalService: GlobalService,
    private rolelevelService: RolelevelService,
    private roleLevelTransfarmer: RolelevelTransfarmer,

    private router: Router, private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlroleID: {
        required: 'Role id is required.',
      },
      ControlroleName: {
        required: 'Role is required.',
      }
    };

    this.formErrors = {
      ControlroleID: '',
      ControlroleName: '',
    };
  }

  ngOnInit() {

    this.rolelevelService.fillDrpRolelevels().subscribe(
      (par) => this.roleLevel = this.roleLevelTransfarmer.RolelevelTransfarmers(par),
      (err: any) => console.log(err));


      this.globalService.fillMasterDrp('USERT').subscribe(
        (par) => this.drproleCreateFor = par,
        (err: any) => console.log(err));


    this.form = this.formBuilder.group({
      ControlroleId: ['', []],
      ControlroleName: ['', [Validators.required]],
      ControlroleDescription: ['', []],
      ControlroleCreateFor: ['', []],
      ControlisActive: ['', []],
    });
    this.form.controls['ControlroleId'].disable();
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    status = '';
    this.role = {
      roleId: null,
      roleName: null,
      roleDescription: null,
      roleCreateFor: null,
      isActive: null,
      createdBy: null,
      createdDate: null,
      modifiedBy: null,
      modifiedDate: null,
    };
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      this.getrole(str);
    });
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

  save(roleForm: NgForm): void {

    this.role.createdBy = localStorage.getItem('username');
    this.role.createdDate = this.globalService.GerCurrntDateStamp();
    this.role.modifiedBy = localStorage.getItem('username');
    this.role.modifiedDate = this.globalService.GerCurrntDateStamp();

    if (status !== 'Update') {
      this.role.roleId = null;
      // if (this.question.isActive === 'true') { this.question.isActive = '1'; } else { this.question.isActive = '0'; }

      this.roleService.Save(this.roleTransfarmer.RoleTransfarmer(this.role)).subscribe(

        (par) => {
          console.log(par);
          if (par.status === 'Inserted') {
            roleForm.reset();
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['RoleList']);
          }
        }
      );
    }
    else {
      this.roleService.Update(this.roleTransfarmer.RoleTransfarmer(this.role)).subscribe(
        () => {
          roleForm.reset();
          this.defaultLayoutComponent.Massage('',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['RoleList']);
        }
      );
    }
  }

  private getrole(role_Code: string) {
    this.role = {
      roleId: null,
      roleName: null,
      roleDescription: null,
      roleCreateFor: null,
      isActive: 'true',
      createdBy: null,
      createdDate: null,
      modifiedBy: null,
      modifiedDate: null,
    };

    if (role_Code === null || role_Code === '') {
      this.role = {
        roleId: null,
        roleName: null,
        roleDescription: null,
        roleCreateFor: null,
        isActive: 'true',
        createdBy: null,
        createdDate: null,
        modifiedBy: null,
        modifiedDate: null,
      };
      status = '';

    }
    else {
      this.roleEntity = {
        roleId: null,
        roleName: null,
        roleDescription: null,
        roleCreateFor: null,
        isActive: null,
        createdBy: null,
        createdDate: null,
        modifiedBy: null,
        modifiedDate: null
      };
      this.roleService.getRole(role_Code).subscribe(
        (par) => {
          this.roleEntity = par;
          this.role = this.roleTransfarmer.RoleTransfarmerEntity(this.roleEntity);
        },
        (err: any) => console.log(err));
      status = 'Update';

    }
  }
}


