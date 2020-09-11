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
    console.log(localStorage.getItem('username'));
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
  ngOnInit() {
    this.form = this.formBuilder.group({
      ControlAnswerID: ['', []],
      ControlisActive: ['', []],
      ControlAnswer: ['', [
        Validators.required]]
    });
    this.form.controls['ControlAnswerID'].disable();
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
    this.route.paramMap.subscribe(parameterMap => { const str = parameterMap.get('id'); this.getanswer(str); });
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
      console.log(this.answerTransfarmer.AnswerTransfarmer(this.answer));
      // if (this.question.isActive === 'true') { this.question.isActive = '1'; } else { this.question.isActive = '0'; }

      this.answerService.Save(this.answerTransfarmer.AnswerTransfarmer(this.answer)).subscribe(
        (par) => {
          if (par.status === 'Inserted') {
            console.log(par.status);
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['AnswerList']);
          }   else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );

    } else {
      console.log(this.answerTransfarmer.AnswerTransfarmer(this.answer));
      this.answerService.Update(this.answerTransfarmer.AnswerTransfarmer(this.answer)).subscribe(
        (par) => {
          console.log(par);
          if (par.status === 'Updated') {
            console.log(par.status);
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['AnswerList']);
          }   else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-danger');
          }
        }
      );
    }
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
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
