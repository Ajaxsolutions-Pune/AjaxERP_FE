import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserGroupService } from '../../../Components/Services/Masters/UserGroupService';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { UserService } from '../../../Components/Services/Masters/UserService';
import { UserTransfarmer } from '../../../Components/Transformer/Masters/User-Transfarmer';
import { User } from '../../../Components/Module/Masters/User.model';
import { environment } from '../../../Components/Module/environment';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { UserGroup } from '../../../Components/Module/Masters/UserGroup.model';
import { UserGroupTransfarmer } from '../../../Components/Transformer/Masters/UserGroup-Transfarmer';
import { UserGroupAsyncValidator } from '../../../helper/async-validator';

@Component({
  selector: 'app-userGroup',
  templateUrl: './user-Group.component.html',
  styleUrls: ['./user-Group.component.scss']
})
export class UserGroupComponent extends FormComponentBase implements OnInit, AfterViewInit {
  // @ts-ignore
  userGroup: UserGroup;
  str: string;
  form!: FormGroup;
  userGroupList: UserGroup[];
  userDrp: User[];
  env = environment;
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private userGroupTransformer: UserGroupTransfarmer,
    private userGroupService: UserGroupService,
    private userService: UserService,
    private globalService: GlobalService,
    private userTransfarmer: UserTransfarmer,
    private router: Router, private formBuilder: FormBuilder) {
    super();
    const status = '';
    this.validationMessages = {
      ControlUserGroupName: {
        required: 'User Group Name is required.',
      },
      ControlUserManagerCode: {
        required: 'Manager Name is required.',
      },
      ControluserGroupType: {
        required: 'Group Type is required.',
      }
    };
  }
  isUserGroupExist(): boolean {
    return this.form.get('ControlUserGroupName').hasError('queExist');
  }
  ngOnInit() {
    status = '';
    this.userService.fillDrpUsers().subscribe(
      (par) => this.userDrp = this.userTransfarmer.UserTransfarmers(par),
      (err: any) => console.log(err));

    this.userService.fillDrpUsers().subscribe(a => this.userDrp = this.userTransfarmer.UserTransfarmers(a));
    // this.form.controls['ControlisActive'].disable();
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id'); this.getUserGroup(str);
      this.form = this.formBuilder.group({
        ControlUserGroupCode: ['', [Validators.required],],
        ControlUserGroupName: ['', [Validators.required],
        [UserGroupAsyncValidator(this.userGroupService, str)]],
        ControlUserManagerCode: ['', []],
        ControluserGroupType: ['', []],
        ControlisActive: ['', []]
      });
      this.form.controls['ControlUserGroupCode'].disable();

    });
  }

  save(): void {
    console.log('a');
    if (status !== 'Update') {
      //  this.userGroup.ouCode = null;
      console.log(this.userGroupTransformer);
      this.userGroupService.Save(this.userGroupTransformer.UserGroupTransfarmer(this.userGroup)).subscribe(
        (parm) => {
          if (parm !== null) {
            console.log(parm);
            // countryForm.reset();
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['UserGroupList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
    } else {
      this.userGroupService.Update(this.userGroupTransformer.UserGroupTransfarmer(this.userGroup)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['UserGroupList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
    }

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      //  this.firstItem.nativeElement.focus();
    }, 250);
    this.startControlMonitoring(this.form);
  }

  private getUserGroup(Id: string) {
    this.userGroup = {
      userGroupId: null,
      ouCode: this.env.OuCode,
      groupName: null,
      managerId: null,
      userGroupType: null,
      sortBy: '1',
      isActive: null,
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (Id === null || Id === '' || Id === '0') {
      this.userGroup = {
        userGroupId: null,
        ouCode: this.env.OuCode,
        groupName: null,
        managerId: null,
        userGroupType: null,
        sortBy: '1',
        isActive: null,
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.userGroupService.getUserGroup(Id).subscribe(
        (par) => {
          this.userGroup = this.userGroupTransformer.UserGroupTransfarmerEntity(par);
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
