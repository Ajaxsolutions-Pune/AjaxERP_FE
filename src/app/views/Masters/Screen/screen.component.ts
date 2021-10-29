import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
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
import { MyErrorStateMatcher } from '../AngularDemo/MyErrorStateMatcher.component';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent extends FormComponentBase implements OnInit, AfterViewInit {
  // @ts-ignore
  form!: FormGroup;
  // errorMatcher = new CrossFieldErrorMatcher();
  screenobj: ScreenObj;
  moduledrp: Moduleobj[];
  screenEntity: ScreenObjEntity;
  str: string;
  matcher = new MyErrorStateMatcher();
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

    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    status = '';
    this.screenobj = {
      screenID:null,
      parentID: null,
      screenName: null,
      actionPath: null,
      is_Active: 'true',
      created_By: localStorage.getItem('username'),
      created_Date: this.globalService.GerCurrntDateStamp(),
      modified_By: localStorage.getItem('username'),
      modified_Date: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      this.getScreen(str);
      console.log(str)
      this.form = this.formBuilder.group({
        ControlscreenName: ['', [Validators.required],
          [ScreenAsyncValidator(this.screenService, str)]],
        ControlscreenID: ['', []],
        ControlisActive: ['', []]
      });
      this.form.controls['ControlscreenID'].disable();
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
    this.screenobj.created_By= localStorage.getItem('username'),
    this.screenobj.created_Date= this.globalService.GerCurrntDateStamp(),
    this.screenobj.modified_By= localStorage.getItem('username'),
    this.screenobj.modified_Date= this.globalService.GerCurrntDateStamp()
    if (status !== 'Update') {
      this.screenobj.screenID = null;
      this.screenobj.parentID = "";

      this.screenService.Save(this.screenTransfarmer.ScreenTransfarmer(this.screenobj)).subscribe(
        (par) => {
          console.log(this.screenobj)
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
      this.screenobj.parentID = "";
      this.screenService.Update(this.screenTransfarmer.ScreenTransfarmer(this.screenobj)).subscribe(
        (par) => {
          console.log(this.screenobj)
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
      screenID:null,
      parentID: null,
      screenName: null,
      actionPath: null,
      is_Active: 'true',
      created_By: localStorage.getItem('username'),
      created_Date: this.globalService.GerCurrntDateStamp(),
      modified_By: localStorage.getItem('username'),
      modified_Date: this.globalService.GerCurrntDateStamp(),
    };
    if (Screen_Code === null || Screen_Code === '') {
      this.screenobj = {
        screenID:null,
        parentID: null,
        screenName: null,
        actionPath: null,
        is_Active: 'true',
        created_By: localStorage.getItem('username'),
        created_Date: this.globalService.GerCurrntDateStamp(),
        modified_By: localStorage.getItem('username'),
        modified_Date: this.globalService.GerCurrntDateStamp(),
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
