import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Question } from '../../../Compound/Module/Masters/Question.model';
import { QuestionService } from '../../../Compound/Services/Masters/QuestionService';
import { QuestionTransfarmer } from '../../../Compound/Transformer/Masters/Question-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  question: Question;
  str: string;
  constructor(private route: ActivatedRoute,
    private questionTransfarmer: QuestionTransfarmer,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private questionService: QuestionService, private router: Router) {
  }
  ngOnInit() {
    status = '';
    this.question = {
      qaTypeCode: null,
      isActive: null,
      question: null,
      questionId: null,
    };
    this.route.paramMap.subscribe(parameterMap => { const str = parameterMap.get('id'); this.getquestion(str); });
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
