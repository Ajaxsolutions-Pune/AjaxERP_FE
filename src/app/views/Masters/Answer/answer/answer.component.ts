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
  insertflag: boolean;
  answerList: Answer[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private answerService: AnswerService,
    private answerTransfarmer: AnswerTransfarmer, private router: Router) {
    const status = '';
  }
  ngOnInit() {
    status = '';
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id'); this.getanswers(id.toString()); });
  }
  save(answerForm: NgForm): void {
    if (status !== 'Update') {

      this.insertflag = false;
      this.answer.answerId = null;
      this.answerService.Save(this.answerTransfarmer.AnswerTransfarmer(this.answer)).subscribe(
        () => {
          answerForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['BrandList']);
        }
      );

    } else {
      this.answerService.Save(this.answerTransfarmer.AnswerTransfarmer(this.answer)).subscribe(
        () => {
          answerForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['AnswerList']);
        }
      );
    }
    if (this.insertflag) {
      this.router.navigate(['AnswerList']);
    }
  }

  private getanswers(answerCode: string) {
    this.answer = {
      answer: null,
      answerId: null,
      isActive: null,

    };
    if (answerCode === null || answerCode === '') {
      this.answer = {
        answer: null,
        answerId: null,
        isActive: null,
      };
      status = '';

    } else {

    this.answerService.getAnswer(answerCode).subscribe(
      (par) => this.answer = par,
      (err: any) => console.log(err));

      console.log(this.answer);
      status = 'Update';
    }
  }
}
