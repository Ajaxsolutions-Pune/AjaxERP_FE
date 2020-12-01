import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
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
import { GlobalService } from '../../../../../Components/Services/GlobalServices/Global.service';
import { CustomComboBox } from '../../../../../Components/Module/GlobalModule/CustomComboBox.model';
import { DefaultLayoutComponent } from '../../../../../containers';

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
  errormsg: string;
  quetionValFlag: boolean;
  ansValFlag: boolean;
  nextFormValFlag: boolean;

  dataquestionsObj: CustomComboBox[];
  dataAnswersObj: CustomComboBox[];
  dataNextFormObj: CustomComboBox[];
  @ViewChild('auto', null) auto: any;
  keyword = 'name';

  selectEvent(item) {
    const selectedData = {
      value: item.id,
      text: item.name
    };
    this.quetionValFlag = false;
    this.data1.questionId = selectedData.value;
    this.objquestionIdText = selectedData.text;
    // alert(this.data1.questionId);
  }

  selectAnswersEvent(item) {
    const selectedData = {
      value: item.id,
      text: item.name
    };
    this.data1.answerId = selectedData.value;
    this.objanswerIdText = selectedData.text;
    this.ansValFlag = false;
    // alert(this.data1.questionId);
  }

  selectNextFormEvent(item) {
    const selectedData = {
      value: item.id,
      text: item.name
    };
    this.nextFormValFlag = false;
    this.data1.nextFormId = selectedData.value;
    this.objnextFormIdText = selectedData.text;
    // alert(this.data1.questionId);
  }

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data1: FormQueAnsMapping,
    private questionsService: QuestionService,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private questionsTransfarmer: QuestionTransfarmer,
    private answersService: AnswerService,
    private globalService: GlobalService,
    private answersTransfarmer: AnswerTransfarmer,
    private formService: FormService,
    private formTransfarmer: FormTransfarmer,
    public dataService: DataService) {
  }

  Number_val(event) {
    let k;
    k = event.charCode;
    return this.globalService.NumberValidator(k);

  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  ngOnInit() {
    this.quetionValFlag = true;
    this.ansValFlag = true;
    this.nextFormValFlag = true;
    this.questionsService.fillDrpQuestions().subscribe(
      (par) => {
        this.questionsObj = this.questionsTransfarmer.QuestionTransfarmers(par);
        this.dataquestionsObj = [];
        this.questionsObj.forEach(a => {
          this.dataquestionsObj.push({ id: a.questionId, name: a.question })
        });
      },
      (err: any) => console.log(err));

    this.answersService.fillDrpAnswers().subscribe(
      (par) => {
        this.answersObj = this.answersTransfarmer.AnswerTransfarmers(par);
        this.dataAnswersObj = [];
        this.answersObj.forEach(a => {
          this.dataAnswersObj.push({ id: a.answerId, name: a.answer })
        });
      },
      (err: any) => console.log(err));

    this.formService.fillDrpForms().subscribe(
      (par) => {
        this.formObj = this.formTransfarmer.fTransfarmers(par);
        this.dataNextFormObj = [];
        this.formObj.forEach(a => {
          this.dataNextFormObj.push({ id: a.formId, name: a.formName });
        });
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


  onNoClick(): void {
    this.dialogRef.close();
  }

  closePanel(e): void {
    console.log(e);
    e.stopPropagation();
    this.auto.close();
  }

  NextFormChange(event) {
    const target = event.source.selected._element.nativeElement;
    const selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };
    this.objnextFormIdText = selectedData.text;
    // this.data1.questionId = selectedData.value;
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
    if (this.data1.questionId == undefined) {
      this.errormsg = 'Question required';
      // this.defaultLayoutComponent.Massage('Technical Error Please connect to Ajax Support team',
      //   'Please select form name', 'modal-danger');
      return;
    }
    if (this.data1.nextFormId == undefined) {
      alert('Next Form required');
      return;
    }
    if (this.data1.answerId == undefined) {
      alert('Answer required');
      return;
    }
    this.data1.nextFormIdText = this.objnextFormIdText;
    this.data1.questionIdText = this.objquestionIdText;
    this.data1.answerIdText = this.objanswerIdText;
    if (this.data1.isQuestionMandatory.toString() === 'true') {
      this.data1.isQuestionMandatoryText = 'Yes';
    } else {
      this.data1.isQuestionMandatoryText = 'No';
    }
    if (this.data1.isActive.toString() === 'true') {
      this.data1.isActiveText = 'Active';
    } else {
      this.data1.isActiveText = 'Inactive';
    }
    this.dataService.addFormQueAnsMapping(this.data1);
  }
}
