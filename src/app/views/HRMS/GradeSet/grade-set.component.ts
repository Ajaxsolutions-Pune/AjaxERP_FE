import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GradeSet, GradeSetEntity } from '../../../Components/Module/HRMS/GradeSet.model';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { GradeSetService } from '../../../Components/Services/HRMS/GradeSetService';
import { GradeSetTransfarmer } from '../../../Components/Transformer/HRMS/GradeSet-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';
import { CrossFieldErrorMatcher } from '../../Masters/AngularDemo/infrastructure/cross-field-error-matcher';
import { FormComponentBase } from '../../Masters/AngularDemo/infrastructure/form-component-base';
import { GradeSetAsyncValidator } from '../../../helper/async-validator';

@Component({
  selector: 'app-grade-set',
  templateUrl: './grade-set.component.html',
  styleUrls: ['./grade-set.component.scss']
})
export class GradeSetComponent extends FormComponentBase implements OnInit, AfterViewInit {
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  gradesetobj: GradeSet;
  gradesetEntity: GradeSetEntity;
  str: string;
  startDate: Date;
  constructor(private route: ActivatedRoute,
    private gradesetTransfarmer: GradeSetTransfarmer,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private gradeSetService: GradeSetService,
    private globalService: GlobalService,
    private router: Router,
    private datepipe: DatePipe,
    private formBuilder: FormBuilder) {
    super();

    this.validationMessages = {

      ControlGradeSetName: {
        required: 'Grade Set Name is required.',
      },
      ControlGradeSetDescription: {
        required: 'Grade Set Description is required.'
      }

    };
    this.formErrors = {
      ControlGradeSetName: '',
    };
  }

  isGradeSetExist(): boolean {
    return this.form.get('ControlGradeSetName').hasError('queExist');
  }
  selectAnswersEvent(item) {
    const selectedData = {
      value: item.id,
      text: item.name
    };
    this.gradesetobj.gradeSetName = selectedData.text;
  }
  ngOnInit() {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';

    }
    status = '';
    this.gradesetobj = {
      gradeSetName: null,
      ouCode: '12',
      gradeSetCode: null,
      gradeSetStatus: 'true',
      gradeSetDescription: null,
      startDate: null,
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      console.log(str);
      this.getGradeSet(str);
      this.form = this.formBuilder.group({
        ControlGradeSetName: ['', [Validators.required], [GradeSetAsyncValidator(this.gradeSetService, str)]],
        ControlGradeSetCode: ['', []],
        ControlStartDate: ['', []],
        ControlgradeSetStatus: ['', []],
        ControlGradeSetDescription: ['', [Validators.required]],

      });
      this.form.controls['ControlGradeSetCode'].disable();
    });
  }
  special_char_val(event) {
    let k;
    k = event.charCode;
    return this.globalService.SpecialCharValidator(k);

  }


  ngAfterViewInit(): void {
    setTimeout(() => {
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
    this.gradesetobj.createdBy = localStorage.getItem('username');
    this.gradesetobj.createdDate = this.globalService.GerCurrntDateStamp();
    this.gradesetobj.modifiedBy = localStorage.getItem('username');
    this.gradesetobj.modifiedDate = this.globalService.GerCurrntDateStamp();
    // this.gradesetobj.ouCode = '12';
    this.gradesetobj.startDate = this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
    if (status !== 'Update') {
      this.gradesetobj.gradeSetCode = null;
      console.log(this.gradesetTransfarmer.GradeSetTransfarmer(this.gradesetobj));
      this.gradeSetService.Save(this.gradesetTransfarmer.GradeSetTransfarmer(this.gradesetobj)).subscribe(
        (par) => {
          // console.log(par);
          if (par.status === 'Inserted') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['GradeSetList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );

    } else {
      this.gradeSetService.Update(this.gradesetTransfarmer.GradeSetTransfarmer(this.gradesetobj)).subscribe(
        (par) => {
          if (par.status === 'Updated') {
            this.defaultLayoutComponent.Massage('',
              'Data updated successfully !', 'modal-info');
            this.router.navigate(['GradeSetList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
    }
  }

  private getGradeSet(id: string) {
    this.gradesetobj = {
      gradeSetName: null,
      ouCode: '12',
      gradeSetCode: null,
      gradeSetStatus: 'true',
      gradeSetDescription: null,
      startDate: null,
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (id === null || id === '') {
      this.gradesetobj = {
        gradeSetName: null,
        ouCode: '12',
        gradeSetCode: null,
        gradeSetDescription: null,
        gradeSetStatus: 'true',
        startDate: null,
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.gradeSetService.getGradeSet(id).subscribe(

        (par) => {
          console.log(par);
          this.gradesetEntity = par;
          this.gradesetobj = this.gradesetTransfarmer.GradeSetTransfarmerEntity(this.gradesetEntity);
          this.startDate = new Date(this.gradesetobj.startDate);
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}



//   ngOnInit() {
//     this.form = this.formBuilder.group({
//       ControlGradeSetCode: ['', []],
//       ControlGradeSetName: ['', [Validators.required]],
//       ControlGradeSetDescription: ['', [Validators.required]],
//     });

//     this.form.controls['ControlGradeSetCode'].disable();
//   }
//   save(gradesetForm: NgForm): void {
//   }
// }
