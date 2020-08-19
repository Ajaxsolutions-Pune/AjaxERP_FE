import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from '../../data.service';
import { Issue } from '../../Issue';
import { Question } from '../../../../../Compound/Module/Masters/Question.model';
import { Answer } from '../../../../../Compound/Module/Masters/Answer.model';
import { FormObj } from '../../../../../Compound/Module/Masters/Form.model';
import { QuestionService } from '../../../../../Compound/Services/Masters/QuestionService';
import { QuestionTransfarmer } from '../../../../../Compound/Transformer/Masters/Question-Transfarmer';
import { AnswerService } from '../../../../../Compound/Services/Masters/AnswerService';
import { AnswerTransfarmer } from '../../../../../Compound/Transformer/Masters/Answer-Transfarmer';
import { FormService } from '../../../../../Compound/Services/Masters/FormService';
import { FormTransfarmer } from '../../../../../Compound/Transformer/Masters/Form-Transfarmer';
import { elementAt } from 'rxjs/operators';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css']
})
export class EditDialogComponent implements OnInit {
  questionsObj: Question[];
  answersObj: Answer[];
  formObj: FormObj[];
  objNextFormText: string;
  objQuestionsTex: string;
  objanswerText: string;

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
    private questionsService: QuestionService,
    private questionsTransfarmer: QuestionTransfarmer,
    private answersService: AnswerService,
    private answersTransfarmer: AnswerTransfarmer,
    private formService: FormService,
    private formTransfarmer: FormTransfarmer,
    @Inject(MAT_DIALOG_DATA) public data: Issue, public dataService: DataService) {
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);


  ngOnInit() {
    this.questionsService.getQuestions().subscribe(
      (par) => {
        this.questionsObj = this.questionsTransfarmer.QuestionTransfarmers(par);
      },
      (err: any) => console.log(err));
    this.answersService.getAnswers().subscribe(
      (par) => {
        this.answersObj = this.answersTransfarmer.AnswerTransfarmers(par);
      },
      (err: any) => console.log(err));
    this.formService.getForms().subscribe(
      (par) => {
        this.formObj = this.formTransfarmer.fTransfarmers(par);
      },
      (err: any) => console.log(err));
  }
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  NextFormChange(event) {
    const target = event.source.selected._element.nativeElement;
    const selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };
    this.objNextFormText = selectedData.text;
    console.log(this.objNextFormText);
  }
  QuestionsChange(event) {
    const target = event.source.selected._element.nativeElement;
    const selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };
    this.objQuestionsTex = selectedData.text;
  }

  AnswerTextChange(event) {
    const target = event.source.selected._element.nativeElement;
    const selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };
    this.objanswerText = selectedData.text;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.data.NextFormText = this.objNextFormText;
    this.data.QuestionsText = this.objQuestionsTex;
    this.data.answerText = this.objanswerText;
    this.objanswerText = this.answersObj.
      find(element => element.answerId === this.data.answer).answer;
      this.objQuestionsTex = this.questionsObj.
        find(element => element.questionId === this.data.Questions).question;
      this.objNextFormText = this.formObj.
        find(element => element.formId === this.data.NextForm).formName;
    if (this.data.QuestionsMandatory.toString() === 'true') {
      this.data.QuestionsMandatoryText = 'Yes';
    } else {
      this.data.QuestionsMandatoryText = 'No';
    }
    if (this.data.Active.toString() === 'true') {
      this.data.ActiveText = 'Yes';
    } else {
      this.data.ActiveText = 'No';
    }
    this.dataService.updateIssue(this.data);
  }
}
