import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Answer, AnswerEntity } from '../../../../Compound/Module/Masters/Answer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerTransfarmer } from '../../../../Compound/Transformer/Masters/Answer-Transfarmer';
import { DefaultLayoutComponent } from '../../../../containers';
import { AnswerService } from '../../../../Compound/Services/Masters/AnswerService';
import { FormComponentBase } from '../../AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../../AngularDemo/infrastructure/cross-field-error-matcher';
import { environment } from '../../../../Compound/Module/environment';

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
    private defaultLayoutComponent: DefaultLayoutComponent,
    private answerService: AnswerService,
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
      isActive: null,
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
    if (status !== 'Update') {
      this.answer.answerId = null;
      console.log(this.answer);
      // if (this.question.isActive === 'true') { this.question.isActive = '1'; } else { this.question.isActive = '0'; }

      this.answerService.Save(this.answerTransfarmer.AnswerTransfarmer(this.answer)).subscribe(
        (par) => {
          console.log(par);
          answerForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['AnswerList']);
        }
      );

    } else {
      this.answerService.Update(this.answerTransfarmer.AnswerTransfarmer(this.answer)).subscribe(
        () => {
          answerForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['AnswerList']);
        }
      );
    }
  }

  private getanswer(answer_Code: string) {
    this.answer = {
      answer: null,
      answerId: null,
      isActive: 'true',
    };
    if (answer_Code === null || answer_Code === '') {
      this.answer = {
        answer: null,
        answerId: null,
        isActive:  'true',
      };
      status = '';

    } else {
      this.answerEntity = {
        answer: null,
        answerId: null,
        isActive: null,
      };
      this.answerService.getAnswer(answer_Code).subscribe(
        (par) => {
          this.answerEntity = par;
          this.answer = this.answerTransfarmer.AnswerTransfarmerEntity(this.answerEntity);
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
