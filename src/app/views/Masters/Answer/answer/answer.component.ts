import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Answer, AnswerEntity } from '../../../../Components/Module/Masters/Answer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerTransfarmer } from '../../../../Components/Transformer/Masters/Answer-Transfarmer';
import { DefaultLayoutComponent } from '../../../../containers';
import { AnswerService } from '../../../../Components/Services/Masters/AnswerService';
import { FormComponentBase } from '../../AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../../AngularDemo/infrastructure/cross-field-error-matcher';
import { environment } from '../../../../Components/Module/environment';
import { GlobalService } from '../../../../Components/Services/GlobalServices/Global.service';
import { LoginUser } from '../../../../Components/Module/LoginUser';
import { answerAsyncValidator } from '../../../../helper/async-validator';

@Component({
  selector: 'app-answer',
  templateUrl: './Answer.component.html',
  styleUrls: ['./Answer.component.scss']
})
export class AnswerComponent extends FormComponentBase implements OnInit, AfterViewInit {
  // @ts-ignore
  @ViewChild('txtAnswerID') firstItem: ElementRef;
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  answer: Answer;
  answerEntity: AnswerEntity;
  str: string;
  env = environment;
  constructor(private route: ActivatedRoute,
    private answerTransfarmer: AnswerTransfarmer,
    private answerService: AnswerService,
    private globalService: GlobalService,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private router: Router, private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlAnswerID: {
        required: 'Answer id is required.',
      },
      ControlAnswer: {
        required: 'Answer is required.',
      }
    };

    this.formErrors = {
      ControlAnswerID: '',
      ControlAnswer: '',
    };
  }

  isQueExist(): boolean {
    return this.form.get('ControlAnswer').hasError('queExist');
  }


  ngOnInit() {

    
   
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href='login';
    }
    status = '';
    this.answer = {
      answer: null,
      answerId: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };

    this.route.paramMap.subscribe(parameterMap => 
      { const str = parameterMap.get('id'); 
      this.getanswer(str);

      this.form = this.formBuilder.group({
        ControlAnswerID: ['', []],
        ControlisActive: ['', []],
        ControlAnswer: ['', [Validators.required], 
        [answerAsyncValidator(this.answerService,str)]],
      });
      this.form.controls['ControlAnswerID'].disable();    
    }); 
  
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

  save(answerForm: NgForm): void {
    this.answer.createdBy = localStorage.getItem('username');
    this.answer.createdDate = this.globalService.GerCurrntDateStamp();
    this.answer.modifiedBy = localStorage.getItem('username');
    this.answer.modifiedDate = this.globalService.GerCurrntDateStamp();

    if (status !== 'Update') {
      this.answer.answerId = null;
      this.answerService.Save(this.answerTransfarmer.AnswerTransfarmer(this.answer)).subscribe(
        (par) => {
          if (par.status === 'Inserted') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['AnswerList']);
          }   else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );

    } else {
      this.answerService.Update(this.answerTransfarmer.AnswerTransfarmer(this.answer)).subscribe(
        (par) => {
          if (par.status === 'Updated') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['AnswerList']);
          }   else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-danger');
          }
        }
      );
    }
  }

  special_char_val(event) {
    let k;
    k = event.charCode;
    return this.globalService.SpecialCharValidator(k);
    
  }

  private getanswer(answer_Code: string) {
    this.answer = {
      answer: null,
      answerId: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (answer_Code === null || answer_Code === '') {
      this.answer = {
        answer: null,
        answerId: null,
        isActive:  'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.answerEntity = {
        answer: null,
        answerId: null,
        isActive: null,
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };


     

      this.answerService.getAnswer(answer_Code).subscribe(
        (par) => {
          this.answerEntity = par;
          this.answer = this.answerTransfarmer.AnswerTransfarmerEntity(this.answerEntity);
          this.answer.createdBy = localStorage.getItem('username');
          this.answer.modifiedBy = localStorage.getItem('username');
          this.answer.createdDate = this.globalService.GerCurrntDateStamp();
          this.answer.modifiedDate = this.globalService.GerCurrntDateStamp();
          console.log(this.answer);      

           
        },
        (err: any) => console.log(err));
      status = 'Update';

     
      
    }
  }
}
