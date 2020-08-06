import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../../containers';
import { Process, ProcessEntity } from '../../../../Compound/Module/Masters/Process.model';
import { ProcessTransfarmer1 } from '../../../../Compound/Transformer/Masters/Process-Transfarmer1';
import { ProcessService1 } from '../../../../Compound/Services/Masters/ProcessService1';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormComponentBase } from '../../AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../../AngularDemo/infrastructure/cross-field-error-matcher';

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
      geofence: null,
      isActive: null,
      processId: null,
      processName: null,
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
    if (status !== 'Update') {
      this.process.processId = null;
      console.log(this.process);
      this.processService.Save(this.processTransfarmer.processTransfarmer(this.process)).subscribe(
        (par) => {
          console.log(par);
          processForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['ProcessList']);
        }
      );

    } else {
      this.processService.Update(this.processTransfarmer.processTransfarmer(this.process)).subscribe(
        () => {
          processForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['ProcessList']);
        }
      );
    }
  }

  private getprocess(process_Code: string) {
    this.process = {
      geofence: null,
      isActive: null,
      processId: null,
      processName: null,
    };
    if (process_Code === null || process_Code === '') {
      this.process = {
        processId: null,
        processName: null,
        geofence: null,
        isActive: null,
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
}
