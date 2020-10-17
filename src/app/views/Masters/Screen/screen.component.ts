import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Moduleobj } from '../../../Components/Module/Masters/Module.model';
import { ScreenObj, ScreenObjEntity } from '../../../Components/Module/Masters/Screen.model';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { ModuleobjService } from '../../../Components/Services/Masters/ModuleService';
import { ScreenObjService } from '../../../Components/Services/Masters/ScreenService';
import { ModuleobjTransfarmer } from '../../../Components/Transformer/Masters/Module-Transfarmer';
import { ScreenObjTransfarmer } from '../../../Components/Transformer/Masters/Screen-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';
import { ScreenAsyncValidator } from '../../../helper/async-validator';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent extends FormComponentBase implements OnInit, AfterViewInit {
  // @ts-ignore
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  screenobj: ScreenObj;
  moduledrp: Moduleobj[];
  screenEntity: ScreenObjEntity;
  str: string;
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private screenService: ScreenObjService,
    private screenTransfarmer: ScreenObjTransfarmer,
    private moduleService: ModuleobjService,
    private moduleTransfarmer: ModuleobjTransfarmer,
    private globalService: GlobalService,
    private router: Router, private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlscreenName: {
        required: 'Screen Name is required.',
      }
    };

    this.formErrors = {
      ControlscreenName: '',
    };
  }
  isScreenExist(): boolean {
    return this.form.get('ControlscreenName').hasError('queExist');
  }
  special_char_val(event) {
    let k;
    k = event.charCode;
    return this.globalService.SpecialCharValidator(k);    
  }
  ngOnInit() {
    this.moduleService.fillDrpModuleobjs().subscribe(
      (par) => {
        this.moduledrp = this.moduleTransfarmer.ModuleobjTransfarmers(par);
      },
      (err: any) => console.log(err));
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    status = '';
    this.screenobj = {
      screenId: null,
      moduleId: null,
      screenName: null,
      workMode: null,
      checkOrder: null,
      imagePath: null,
      associateScreenId: null,
      associateLevel: null,
      isSubLinks: null,
      actionName: null,
      menuLink: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id'); this.getScreen(str);

      this.form = this.formBuilder.group({
        ControlscreenName: ['', [Validators.required],
          [ScreenAsyncValidator(this.screenService, str)]],
        ControlimagePath: ['', []],
        ControlscreenId: ['', []],
        ControlisActive: ['', []],
        ControlcheckOrder: ['', []],
        ControlmoduleId: ['', []]
      });
      this.form.controls['ControlscreenId'].disable();
    });
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
    this.screenobj.createdBy = localStorage.getItem('username');
    this.screenobj.createdDate = this.globalService.GerCurrntDateStamp();
    this.screenobj.modifiedBy = localStorage.getItem('username');
    this.screenobj.modifiedDate = this.globalService.GerCurrntDateStamp();
    if (status !== 'Update') {
      this.screenobj.screenId = null;
      this.screenService.Save(this.screenTransfarmer.ScreenTransfarmer(this.screenobj)).subscribe(
        (par) => {
          if (par.status === 'Inserted') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['ScreenList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );

    } else {
      this.screenService.Update(this.screenTransfarmer.ScreenTransfarmer(this.screenobj)).subscribe(
        (par) => {
          if (par.status === 'Updated') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['ScreenList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
    }
  }

  private getScreen(Screen_Code: string) {
    this.screenobj = {
      screenId: null,
      moduleId: null,
      screenName: null,
      workMode: null,
      checkOrder: null,
      imagePath: null,
      associateScreenId: null,
      associateLevel: null,
      isSubLinks: null,
      actionName: null,
      menuLink: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (Screen_Code === null || Screen_Code === '') {
      this.screenobj = {
        screenId: null,
        moduleId: null,
        screenName: null,
        workMode: null,
        checkOrder: null,
        imagePath: null,
        associateScreenId: null,
        associateLevel: null,
        isSubLinks: null,
        actionName: null,
        menuLink: null,
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.screenService.getScreen(Screen_Code).subscribe(
        (par) => {
          this.screenEntity = par;
          this.screenobj = this.screenTransfarmer.ScreenTransfarmerEntity(this.screenEntity);
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
