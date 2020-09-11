import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Role,RoleEntity} from '../../../Components/Module/Masters/Role.model'
import { ActivatedRoute, Router } from '@angular/router';
import { RoleTransfarmer} from '../../../Components/Transformer/Masters/Role-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';
import { RoleService } from '../../../Components/Services/Masters/RoleService';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { environment } from '../../../Components/Module/environment';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';

@Component({
    selector: 'app-role',
    templateUrl:'./Role.component.html'     
  })

  export class RoleComponent extends FormComponentBase implements OnInit, AfterViewInit 
  {
    // @ts-ignore
    @ViewChild('txtRoleID') firstItem: ElementRef;
    form!: FormGroup;
    errorMatcher = new CrossFieldErrorMatcher();
    role: Role;
    roleEntity: RoleEntity;
    str: string;
    env = environment;

    constructor(private route: ActivatedRoute,
      private roleTransfarmer: RoleTransfarmer,
      private defaultLayoutComponent: DefaultLayoutComponent,
      private roleService: RoleService,
      private globalService: GlobalService,
      private router: Router, private formBuilder: FormBuilder) 
    {
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
        this.form = this.formBuilder.group({
          ControlroleId: ['', []],
          ControlroleName: ['', [Validators.required]],
          ControlroleDescription : ['', []],
          ControlroleCreateFor : ['', []],
          ControlroleLevel  : ['', []],  
          ControlisActive: ['', []],
        });
        this.form.controls['ControlroleId'].disable();
        status = '';
        this.role = {
          roleId: null,
          roleName: null,
          roleDescription : null,
          roleCreateFor : null,
          roleLevel : null,
          isActive: null,
          createdBy: null,
          createdDate : null,
          modifiedBy: null,
          modifiedDate: null,
        };
        this.route.paramMap.subscribe(parameterMap => { 
          const str = parameterMap.get('id'); 
          this.getrole(str); });
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

      save(roleForm: NgForm): void 
      {

        this.role.createdBy = localStorage.getItem('username');
        this.role.createdDate = this.globalService.GerCurrntDateStamp();
        this.role.modifiedBy = localStorage.getItem('username');
        this.role.modifiedDate = this.globalService.GerCurrntDateStamp();

        if (status !== 'Update') 
        {
          this.role.roleId = null;
          console.log(this.role);
          // if (this.question.isActive === 'true') { this.question.isActive = '1'; } else { this.question.isActive = '0'; }
    
          this.roleService.Save(this.roleTransfarmer.RoleTransfarmer(this.role)).subscribe(          

            (par) => {              
              console.log(par);
             if(par.status === 'Inserted'){
              roleForm.reset();
              this.defaultLayoutComponent.Massage('',
                'Data saved successfully !', 'modal-info');
              this.router.navigate(['RoleList']);
              }
            }
          );    
        } 
        else 
        {
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

      private getrole(role_Code: string) 
      {
        this.role = {
          roleId: null,
          roleName: null,
          roleDescription : null,
          roleCreateFor : null,
          roleLevel : null,
          isActive: 'true',
          createdBy: null,
          createdDate : null,
          modifiedBy: null,
          modifiedDate: null,
        };

        if (role_Code === null || role_Code === '') {
          this.role = {
            roleId: null,
            roleName: null,
            roleDescription : null,
            roleCreateFor : null,
            roleLevel : null,           
            isActive:  'true',
            createdBy: null,
            createdDate : null,
            modifiedBy: null,
            modifiedDate: null,
          };
          status = '';
    
        } 
        else 
        {
          this.roleEntity = {
            roleId: null,
            roleName: null,
            roleDescription : null,
            roleCreateFor : null,
            roleLevel : null,           
            isActive: null,
            createdBy: null,
            createdDate : null,
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
    
    