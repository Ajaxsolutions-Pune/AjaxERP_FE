import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../../containers';
import { Process, ProcessEntity } from '../../../../Components/Module/Masters/Process.model';
import { ProcessTransfarmer1 } from '../../../../Components/Transformer/Masters/Process-Transfarmer1';
import { ProcessService1 } from '../../../../Components/Services/Masters/ProcessService1';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormComponentBase } from '../../AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../../AngularDemo/infrastructure/cross-field-error-matcher';
import { GlobalService } from '../../../../Components/Services/GlobalServices/Global.service';
import { AssetGroup } from '../../../../Components/Module/Masters/AssetGroup.model';
import { AssetGroupService } from '../../../../Components/Services/Masters/AssetGroupService';
import { AssetGroupTransfarmer } from '../../../../Components/Transformer/Masters/AssetGroup-Transfarmer';
import { processAsyncValidator } from '../../../../helper/async-validator';
import { EventSettingsModel, DayService, WeekService, MonthService, Timezone } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent extends FormComponentBase implements OnInit, AfterViewInit {
  // @ts-ignore
  // @ViewChild('processId') firstItem: ElementRef;
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  process: Process;
  processEntity: ProcessEntity;
  assetGroupObj: AssetGroup[];
  str: string;
  constructor(private route: ActivatedRoute,
    private processTransfarmer: ProcessTransfarmer1,
    private globalService: GlobalService,
    private assetGroupService: AssetGroupService,
    private assetGroupTransfarmer: AssetGroupTransfarmer,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private processService: ProcessService1, private router: Router,
    private formBuilder: FormBuilder) {
    super();
  }

  isQueExist(): boolean {
    return this.form.get('ControlprocessName').hasError('queExist');
  }

  special_char_val(event) {
    let k;
    k = event.charCode;
    return this.globalService.SpecialCharValidator(k);

  }

  ngOnInit() {
    let timezone: Timezone = new Timezone();
    let date: Date = new Date(2018,11,5,15,25,11);
    let timeZoneOffset: number = timezone.offset(date,"Europe/Paris");
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    status = '';
    this.process = {
      geofence: '',
      isActive: 'true',
      processId: null,
      processName: null,
      assetGroupNameENG: null,
      assetGroupCode: null,
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };



    this.assetGroupService.getAssetGroups().subscribe(
      (par) => this.assetGroupObj = this.assetGroupTransfarmer.AssetGroupTransfarmers(par),
      (err: any) => console.log(err));
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id'); this.getprocess(str);

      this.form = this.formBuilder.group({
        ControlprocessName: ['', [Validators.required], [processAsyncValidator(this.processService, str)]],
        ControlassetGroup: ['', [Validators.required]],
        Controlgeofence: ['', []],
        ControlprocessId: ['', []],
        ControlisActive: ['', []]
      });
      this.form.controls['ControlprocessId'].disable();
      // this.form.controls['ControlisActive'].disable();


    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      //  this.firstItem.nativeElement.focus();
    }, 250);
    this.startControlMonitoring(this.form);
  }
  save(processForm: NgForm): void {
    this.process.createdBy = localStorage.getItem('username');
    this.process.createdDate = this.globalService.GerCurrntDateStamp();
    this.process.modifiedBy = localStorage.getItem('username');
    this.process.modifiedDate = this.globalService.GerCurrntDateStamp();
    if (status !== 'Update') {
      this.process.processId = null;
      this.processService.Save(this.processTransfarmer.processTransfarmer(this.process)).subscribe(
        (par) => {
          processForm.reset();
          this.defaultLayoutComponent.Massage('',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['ProcessList']);
        }
      );

    } else {
      this.processService.Update(this.processTransfarmer.processTransfarmer(this.process)).subscribe(
        () => {
          processForm.reset();
          this.defaultLayoutComponent.Massage('',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['ProcessList']);
        }
      );
    }
  }

  private getprocess(process_Code: string) {
    this.process = {
      geofence: '',
      isActive: 'true',
      processId: null,
      processName: null,
      assetGroupNameENG: null,
      assetGroupCode: null,
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (process_Code === null || process_Code === '') {
      this.process = {
        processId: null,
        processName: null,
        assetGroupNameENG: null,
        geofence: '',
        isActive: 'true',
        assetGroupCode: null,
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.processService.getprocess(process_Code).subscribe(
        (par) => {
          this.processEntity = par;
          this.process = this.processTransfarmer.processTransfarmerEntity(this.processEntity);


        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }

  omit_special_char(event) {
    let k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32 || (k >= 48 && k <= 57));
  }
}
