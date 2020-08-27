import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Question } from '../../../Compound/Module/Masters/Question.model';
import { QuestionService } from '../../../Compound/Services/Masters/QuestionService';
import { QuestionTransfarmer } from '../../../Compound/Transformer/Masters/Question-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';
import { QaType } from '../../../Compound/Module/Masters/QA_Type.model';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { QaTypeTransfarmer } from '../../../Compound/Transformer/Masters/QaType-Transfarmer';
import { QaTypeService } from '../../../Compound/Services/Masters/QaTypeService';

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

  qaTypes: QaType[];
  constructor(private route: ActivatedRoute,
    private questionTransfarmer: QuestionTransfarmer,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private qaTypeService: QaTypeService,
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
      this.questionService.Save(this.questionTransfarmer.QuestionTransfarmer(this.question)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
              QuestionForm.reset();
            this.router.navigate(['QuestionList']);
          }   else {
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
          }   else {
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
      isActive: 'true'
    };
    if (Question_Code === null || Question_Code === '') {
      this.question = {
        qaTypeCode: null,
        question: null,
        questionId: null,
        isActive: 'true'
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
