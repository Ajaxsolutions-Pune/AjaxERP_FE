import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Question } from '../../../Compound/Module/Masters/Question.model';
import { QuestionService } from '../../../Compound/Services/Masters/QuestionService';
import { QuestionTransfarmer } from '../../../Compound/Transformer/Masters/Question-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { QaType } from '../../../Compound/Module/Masters/QA_Type.model';

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

  qaTypes: QaType[] = [
    { qaTypeCode: 'LB', qaTypeDesc: 'LB', isActive: '1' },
    { qaTypeCode: 'IM', qaTypeDesc: 'IM', isActive: '1' },
    { qaTypeCode: 'LT', qaTypeDesc: 'LT', isActive: '1' }
  ];
  constructor(private route: ActivatedRoute,
    private questionTransfarmer: QuestionTransfarmer,
    private defaultLayoutComponent: DefaultLayoutComponent,
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

    status = '';
    this.question = {
      qaTypeCode: null,
      isActive: null,
      question: null,
      questionId: null,
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
    if (status !== 'Update') {
      this.question.questionId = null;
      console.log(this.question);
      // if (this.question.isActive === 'true') { this.question.isActive = '1'; } else { this.question.isActive = '0'; }

      this.questionService.Save(this.questionTransfarmer.QuestionTransfarmer(this.question)).subscribe(
        (par) => {
          status = par,
            console.log(par);
          QuestionForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['QuestionList']);
        }
      );

    } else {
      this.questionService.Update(this.questionTransfarmer.QuestionTransfarmer(this.question)).subscribe(
        () => {
          QuestionForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['QuestionList']);
        }
      );
    }
  }

  private getquestion(Question_Code: string) {
    this.question = {
      qaTypeCode: null,
      question: null,
      questionId: null,
      isActive: null
    };
    if (Question_Code === null || Question_Code === '') {
      this.question = {
        qaTypeCode: null,
        question: null,
        questionId: null,
        isActive: null
      };
      status = '';

    } else {
      this.questionService.getQuestion(Question_Code).subscribe(
        (par) => this.question = par,
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
