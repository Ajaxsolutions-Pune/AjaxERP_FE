import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from '../../data.service';
import { Question } from '../../../../../Components/Module/Masters/Question.model';
import { Answer } from '../../../../../Components/Module/Masters/Answer.model';
import { FormObj } from '../../../../../Components/Module/Masters/Form.model';
import { QuestionService } from '../../../../../Components/Services/Masters/QuestionService';
import { QuestionTransfarmer } from '../../../../../Components/Transformer/Masters/Question-Transfarmer';
import { AnswerService } from '../../../../../Components/Services/Masters/AnswerService';
import { AnswerTransfarmer } from '../../../../../Components/Transformer/Masters/Answer-Transfarmer';
import { FormService } from '../../../../../Components/Services/Masters/FormService';
import { FormTransfarmer } from '../../../../../Components/Transformer/Masters/Form-Transfarmer';
import { elementAt } from 'rxjs/operators';
import { FormQueAnsMapping } from '../../../../../Components/Module/ProcessSetup/FormQueAnsMapping.model';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css']
})
export class EditDialogComponent implements OnInit {
  questionsObj: Question[];
  answersObj: Answer[];
  formObj: FormObj[];
  objnextFormIdText: string;
  objquestionIdText: string;
  objanswerIdText: string;

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
    private questionsService: QuestionService,
    private questionsTransfarmer: QuestionTransfarmer,
    private answersService: AnswerService,
    private answersTransfarmer: AnswerTransfarmer,
    private formService: FormService,
    private formTransfarmer: FormTransfarmer,
    @Inject(MAT_DIALOG_DATA) public data: FormQueAnsMapping, public dataService: DataService) {
      console.log(data);
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);


  ngOnInit() {
    this.questionsService.fillDrpQuestions().subscribe(
      (par) => {
        this.questionsObj = this.questionsTransfarmer.QuestionTransfarmers(par);
      },
      (err: any) => console.log(err));
    this.answersService.fillDrpAnswers().subscribe(
      (par) => {
        this.answersObj = this.answersTransfarmer.AnswerTransfarmers(par);
       // this.data.answerId = '2';
      },
      (err: any) => console.log(err));
    this.formService.fillDrpForms().subscribe(
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
    this.objnextFormIdText = selectedData.text;
  }
  QuestionsChange(event) {
    const target = event.source.selected._element.nativeElement;
    const selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };
    this.objquestionIdText = selectedData.text;
  }

  AnswerTextChange(event) {
    const target = event.source.selected._element.nativeElement;
    const selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };
    this.objanswerIdText = selectedData.text;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.objanswerIdText = this.answersObj.
      find(element => element.answerId === this.data.answerId).answer;
    this.objquestionIdText = this.questionsObj.
      find(element => element.questionId === this.data.questionId).question;
    this.objnextFormIdText = this.formObj.
      find(element => element.formId === this.data.nextFormId).formName;

      this.data.nextFormIdText = this.objnextFormIdText;
      this.data.questionIdText = this.objquestionIdText;
      this.data.answerIdText = this.objanswerIdText;
      if (this.data.isQuestionMandatory.toString() === 'true') {
        this.data.isQuestionMandatoryText = 'Yes';
      } else {
        this.data.isQuestionMandatoryText = 'No';
      }
      if (this.data.isActive.toString() === 'true') {
        this.data.isActiveText = 'Active';
      } else {
        this.data.isActiveText = 'Inactive';
      }
    this.dataService.updateFormQueAnsMapping(this.data);
  }
}
