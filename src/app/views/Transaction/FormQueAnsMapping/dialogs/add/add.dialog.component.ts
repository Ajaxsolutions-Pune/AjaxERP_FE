import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, Form } from '@angular/forms';
import { Issue } from '../../Issue';
import { DataService } from '../../data.service';
import { Question } from '../../../../../Compound/Module/Masters/Question.model';
import { QuestionTransfarmer } from '../../../../../Compound/Transformer/Masters/Question-Transfarmer';
import { QuestionService } from '../../../../../Compound/Services/Masters/QuestionService';
import { Answer } from '../../../../../Compound/Module/Masters/Answer.model';
import { AnswerService } from '../../../../../Compound/Services/Masters/AnswerService';
import { AnswerTransfarmer } from '../../../../../Compound/Transformer/Masters/Answer-Transfarmer';
import { FormService } from '../../../../../Compound/Services/Masters/FormService';
import { FormTransfarmer } from '../../../../../Compound/Transformer/Masters/Form-Transfarmer';
import { FormObj } from '../../../../../Compound/Module/Masters/Form.model';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent implements OnInit {

  questionsObj: Question[];
  answersObj: Answer[];
  formObj: FormObj[];
  objNextFormText: string;
  objQuestionsTex: string;
  objanswerText: string;

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Issue,
    private questionsService: QuestionService,
    private questionsTransfarmer: QuestionTransfarmer,
    private answersService: AnswerService,
    private answersTransfarmer: AnswerTransfarmer,
    private formService: FormService,
    private formTransfarmer: FormTransfarmer,
    public dataService: DataService) {
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  ngOnInit() {
    this.questionsService.getQuestions().subscribe(
      (par) => this.questionsObj = this.questionsTransfarmer.QuestionTransfarmers(par),
      (err: any) => console.log(err));
    this.answersService.getAnswers().subscribe(
      (par) => this.answersObj = this.answersTransfarmer.AnswerTransfarmers(par),
      (err: any) => console.log(err));
    this.formService.getForms().subscribe(
      (par) => this.formObj = this.formTransfarmer.fTransfarmers(par),
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


  onNoClick(): void {
    this.dialogRef.close();
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

  public confirmAdd(): void {
    this.data.NextFormText = this.objNextFormText;
    this.data.QuestionsText = this.objQuestionsTex;
    this.data.answerText = this.objanswerText;
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
    this.dataService.addIssue(this.data);
  }
}
