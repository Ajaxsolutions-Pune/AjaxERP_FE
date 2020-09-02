import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, Form } from '@angular/forms';
import { DataService } from '../../data.service';
import { Question } from '../../../../../Components/Module/Masters/Question.model';
import { QuestionTransfarmer } from '../../../../../Components/Transformer/Masters/Question-Transfarmer';
import { QuestionService } from '../../../../../Components/Services/Masters/QuestionService';
import { Answer } from '../../../../../Components/Module/Masters/Answer.model';
import { AnswerService } from '../../../../../Components/Services/Masters/AnswerService';
import { AnswerTransfarmer } from '../../../../../Components/Transformer/Masters/Answer-Transfarmer';
import { FormService } from '../../../../../Components/Services/Masters/FormService';
import { FormTransfarmer } from '../../../../../Components/Transformer/Masters/Form-Transfarmer';
import { FormObj } from '../../../../../Components/Module/Masters/Form.model';
import { FormQueAnsMapping } from '../../../../../Components/Module/ProcessSetup/FormQueAnsMapping.model';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent implements OnInit {

  questionsObj: Question[];
  answersObj: Answer[];
  formObj: FormObj[];
  objnextFormIdText: string;
  objquestionIdText: string;
  objanswerIdText: string;

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormQueAnsMapping,
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
    this.questionsService.fillDrpQuestions().subscribe(
      (par) => this.questionsObj = this.questionsTransfarmer.QuestionTransfarmers(par),
      (err: any) => console.log(err));
    this.answersService.fillDrpAnswers().subscribe(
      (par) => this.answersObj = this.answersTransfarmer.AnswerTransfarmers(par),
      (err: any) => console.log(err));
    this.formService.fillDrpForms().subscribe(
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

  public confirmAdd(): void {
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
    this.dataService.addFormQueAnsMapping(this.data);
  }
}
