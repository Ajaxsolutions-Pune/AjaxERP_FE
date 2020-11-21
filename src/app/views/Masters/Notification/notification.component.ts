import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { environment } from '../../../Components/Module/environment';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { NotificationObjTransfarmer } from '../../../Components/Transformer/Masters/NotificationObj-Transfarmer';
import { NotificationObjService } from '../../../Components/Services/Masters/NotificationObjService';
import { UserGroupService } from '../../../Components/Services/Masters/UserGroupService';
import { DatePipe } from '@angular/common';
import { NotificationObj } from '../../../Components/Module/Masters/NotificationObj.model';
import { UserGroup } from '../../../Components/Module/Masters/UserGroup.model';
import { UserGroupTransfarmer } from '../../../Components/Transformer/Masters/UserGroup-Transfarmer';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationObjComponent extends FormComponentBase implements OnInit, AfterViewInit {
  // @ts-ignore
  notificationObj: NotificationObj;
  str: string;
  form!: FormGroup;
  notificationObjList: NotificationObj[];
  userDrp: UserGroup[];
  env = environment;
  startDate: Date;
  endDate: Date;
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private notificationObjTransformer: NotificationObjTransfarmer,
    private notificationObjService: NotificationObjService,
    private userGroupService: UserGroupService,
    private globalService: GlobalService,
    private datepipe: DatePipe,
    private userGroupTransfarmer: UserGroupTransfarmer,
    private router: Router, private formBuilder: FormBuilder) {
    super();
    const status = '';
    this.validationMessages = {
      ControlNotificationId: {
        required: 'Notification Id is required.',
      },
      ControlUserGroupId: {
        required: 'User Group Id is required.',
      },
      ControlNotificationMessage: {
        required: 'Notification Message is required.',
      }
    };
  }
  ngOnInit() {
    status = '';
    this.userGroupService.fillDrpUserGroups().subscribe(a => 
      this.userDrp = this.userGroupTransfarmer.UserGroupTransfarmers(a));
      // this.form.controls['ControlisActive'].disable();
      this.route.paramMap.subscribe(parameterMap => {
        const str = parameterMap.get('id'); this.getNotificationObj(str);
     
      });
    this.form = this.formBuilder.group({
      ControlNotificationObjId: ['', [Validators.required],],
      ControlUserGroupId: ['', [Validators.required]],
      ControlNotificationMessage: ['', []],
      ControlisActive: ['', []],
      ControlStartDate: ['', []],
      ControlEndDate: ['', []]
    });
    this.form.controls['ControlNotificationObjId'].disable();
  }
  
  save(): void {
    console.log('a');
    if (status !== 'Update') {
      this.notificationObj.startDate = this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
      this.notificationObj.endDate = this.datepipe.transform(this.endDate, 'yyyy-MM-dd');;
      this.notificationObjService.Save(this.notificationObjTransformer.
        NotificationObjTransfarmer(this.notificationObj)).subscribe(
        (parm) => {
          console.log(parm);
          if (parm !== null) {
            // countryForm.reset();
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['NotificationList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
    } else {
      this.notificationObjService.Update(this.notificationObjTransformer.NotificationObjTransfarmer(this.notificationObj)).subscribe(
        (par) => {
          console.log(par);
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['NotificationList']);
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

  private getNotificationObj(Id: string) {
    this.notificationObj = {
      notificationId:null,
      userGroupId: null,
      ouCode: this.env.OuCode,
      notificationMessage:null,
      startDate:null,
      endDate:null,
      sortBy: '1',
      isActive: null,
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (Id === null || Id === '' || Id === '0') {
      this.notificationObj  = {
        notificationId:null,
        userGroupId: null,
        ouCode: this.env.OuCode,
        notificationMessage:null,
        startDate:null,
        endDate:null,
        sortBy: '1',
        isActive: null,
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.notificationObjService.getNotificationObj(Id).subscribe(
        (par) => {
          this.notificationObj = this.notificationObjTransformer.NotificationObjTransfarmerEntity(par); 
        this.startDate = new Date(this.notificationObj.startDate);
        console.log(this.notificationObj.endDate);
        this.endDate =  new Date(this.notificationObj.endDate);       },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
