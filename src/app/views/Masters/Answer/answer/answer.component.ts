import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Answer } from '../../../../Compound/Module/Masters/Answer.model';
import { DefaultLayoutComponent } from '../../../../containers';
import { AnswerService } from '../../../../Compound/Services/Masters/AnswerService';
import { AnswerTransfarmer } from '../../../../Compound/Transformer/Masters/Answer-Transfarmer';

@Component({
  selector: 'app-answer',
  templateUrl: './Answer.component.html',
  styleUrls: ['./Answer.component.scss']
})
export class AnswerComponent implements OnInit {
  answer: Answer;
  str: string;
  constructor(private route: ActivatedRoute,
    private answerTransfarmer: AnswerTransfarmer,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private answerService: AnswerService, private router: Router) {
  }
  ngOnInit() {
    status = '';
    this.answer = {
      answer: null,
      answerId: null,
      isActive: null,
    };
    this.route.paramMap.subscribe(parameterMap => { const str = parameterMap.get('id'); this.getanswer(str); });
  }
  save(answerForm: NgForm): void {
    if (status !== 'Update') {
      this.answer.answerId = null;
      console.log(this.answer);
     // if (this.answer.isActive === 'true') { this.answer.isActive = '1'; } else { this.answer.isActive = '0'; }

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
      isActive: null,
    };
    if (answer_Code === null || answer_Code === '') {
      this.answer = {
        answer: null,
        answerId: null,
        isActive: null,
      };
      status = '';

    } else {
      this.answerService.getAnswer(answer_Code).subscribe(
        (par) => this.answer = par,
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
