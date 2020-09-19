import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Question, QuestionEntity } from '../../../Components/Module/Masters/Question.model';
import { QuestionService } from '../../../Components/Services/Masters/QuestionService';
import { QuestionTransfarmer } from '../../../Components/Transformer/Masters/Question-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';
import { QaType } from '../../../Components/Module/Masters/QA_Type.model';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { QaTypeTransfarmer } from '../../../Components/Transformer/Masters/QaType-Transfarmer';
import { QaTypeService } from '../../../Components/Services/Masters/QaTypeService';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent extends FormComponentBase implements OnInit, AfterViewInit {

  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  question: Question;
  str: string;
  questionEntity: QuestionEntity;

  qaTypes: QaType[];
  constructor(private route: ActivatedRoute,
    private questionTransfarmer: QuestionTransfarmer,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private qaTypeService: QaTypeService,
    private globalService: GlobalService,
    private qaTypeTransfarmer: QaTypeTransfarmer,
    private questionService: QuestionService, private router: Router,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      Controlquestion: {
        required: 'Question is required.',
      }
    };

    this.formErrors = {
      Controlquestion: '',
      ControlqaTypeCode: '',
    };
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      ControlquestionId: ['', []],
      ControlisActive: ['', []],
      Controlquestion: ['', [
        Validators.required]],
      ControlqaTypeCode: ['', [
        Validators.required]]
    });
    this.form.controls['ControlquestionId'].disable();

    this.qaTypeService.fillQaTypes().subscribe(
      (par) => {
        this.qaTypes = this.qaTypeTransfarmer.QaTypeTransfarmers(par);
      },
      (err: any) => console.log(err));
    status = '';
    this.question = {
      qaTypeCode: null,
      isActive: 'true',
      question: null,
      questionId: null,
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => { const str = parameterMap.get('id'); this.getquestion(str); });
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

  save(QuestionForm: NgForm): void {
    this.question.createdBy = localStorage.getItem('username');
    this.question.createdDate = this.globalService.GerCurrntDateStamp();
    this.question.modifiedBy = localStorage.getItem('username');
    this.question.modifiedDate = this.globalService.GerCurrntDateStamp();

    if (status !== 'Update') {
      this.question.questionId = null;

      this.questionService.Save(this.questionTransfarmer.QuestionTransfarmer(this.question)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            QuestionForm.reset();
            this.router.navigate(['QuestionList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );

    } else {
      this.questionService.Update(this.questionTransfarmer.QuestionTransfarmer(this.question)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            QuestionForm.reset();
            this.router.navigate(['QuestionList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );
    }
  }

  private getquestion(Question_Code: string) {
    this.question = {
      qaTypeCode: null,
      question: null,
      questionId: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (Question_Code === null || Question_Code === '') {
      this.question = {
        qaTypeCode: null,
        question: null,
        questionId: null,
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.questionService.getQuestion(Question_Code).subscribe(
        (par) => {
          this.questionEntity = par;
          this.question = this.questionTransfarmer.QuestionTransfarmerEntity(this.questionEntity);
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
