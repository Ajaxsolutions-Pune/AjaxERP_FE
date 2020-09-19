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
  str: string;
  constructor(private route: ActivatedRoute,
    private processTransfarmer: ProcessTransfarmer1,
    private globalService: GlobalService,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private processService: ProcessService1, private router: Router,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlprocessName: {
        required: 'Process Name is required.',
      }
    };
    this.formErrors = {
      ControlprocessName: '',
    };
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      ControlprocessName: ['', [
        Validators.required]],
      Controlgeofence: ['', []],
      ControlprocessId: ['', []],
      ControlisActive: ['', []]
    });
    this.form.controls['ControlprocessId'].disable();
    status = '';
    this.process = {
      geofence: '',
      isActive: 'true',
      processId: null,
      processName: null,
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => { const str = parameterMap.get('id'); this.getprocess(str); });
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
      console.log(this.process);
      this.processService.Save(this.processTransfarmer.processTransfarmer(this.process)).subscribe(
        (par) => {
          console.log(par);
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
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (process_Code === null || process_Code === '') {
      this.process = {
        processId: null,
        processName: null,
        geofence: '',
        isActive: 'true',
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
          console.log(this.processEntity);
          this.process = this.processTransfarmer.processTransfarmerEntity(this.processEntity);
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }

  omit_special_char(event) {
    console.log('omit_special_char');
    let k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32 || (k >= 48 && k <= 57));
  }
}
