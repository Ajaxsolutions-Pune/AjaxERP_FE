import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Moduleobj, ModuleobjEntity } from '../../../Components/Module/Masters/Module.model';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { ModuleobjService } from '../../../Components/Services/Masters/ModuleService';
import { ModuleobjTransfarmer } from '../../../Components/Transformer/Masters/Module-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';
import { AccessAsyncValidator, circleAsyncValidator, ModuleAsyncValidator } from '../../../helper/async-validator';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { MyErrorStateMatcher } from '../AngularDemo/MyErrorStateMatcher.component';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent extends FormComponentBase implements OnInit, AfterViewInit {
  // @ts-ignore
  // @ViewChild('ModuleName') firstItem: ElementRef;
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  moduleobj: Moduleobj;
  moduleEntity: ModuleobjEntity;
  str: string;
  matcher = new MyErrorStateMatcher();
  constructor(private route: ActivatedRoute,
    private moduleTransfarmer: ModuleobjTransfarmer,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private moduleService: ModuleobjService,
    private globalService: GlobalService,
    private router: Router, private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlModuleName: {
        required: 'Module Name is required.',
      }
    };

    this.formErrors = {
      ControlModuleName: '',
    };
  }
  isModuleExist(): boolean {
    return this.form.get('ControlModuleName').hasError('queExist');
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
    this.moduleobj = {
      checkOrder: null,
      moduleId: null,
      moduleName: null,
      imagePath: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id'); this.getModule(str);

      this.form = this.formBuilder.group({
        ControlModuleName: ['', [Validators.required],
          [ModuleAsyncValidator(this.moduleService, str)]],
        ControlimagePath: ['', []],
        ControlModuleId: ['', []],
        ControlisActive: ['', []],
        ControlcheckOrder: ['', []]
      });
      this.form.controls['ControlModuleId'].disable();
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
    this.moduleobj.createdBy = localStorage.getItem('username');
    this.moduleobj.createdDate = this.globalService.GerCurrntDateStamp();
    this.moduleobj.modifiedBy = localStorage.getItem('username');
    this.moduleobj.modifiedDate = this.globalService.GerCurrntDateStamp();
    if (status !== 'Update') {
      this.moduleobj.moduleId = null;
      this.moduleService.Save(this.moduleTransfarmer.ModuleobjTransfarmer(this.moduleobj)).subscribe(
        (par) => {
          if (par.status === 'Inserted') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['ModuleList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );

    } else {
      this.moduleService.Update(this.moduleTransfarmer.ModuleobjTransfarmer(this.moduleobj)).subscribe(
        (par) => {
          if (par.status === 'Updated') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['ModuleList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
    }
  }

  private getModule(Module_Code: string) {
    this.moduleobj = {
      checkOrder: null,
      moduleId: null,
      moduleName: null,
      imagePath: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (Module_Code === null || Module_Code === '') {
      this.moduleobj = {
        checkOrder: null,
        moduleId: null,
        moduleName: null,
        imagePath: null,
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.moduleService.getModuleobj(Module_Code).subscribe(
        (par) => {
          this.moduleEntity = par;
          this.moduleobj = this.moduleTransfarmer.ModuleobjTransfarmerEntity(this.moduleEntity);
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
