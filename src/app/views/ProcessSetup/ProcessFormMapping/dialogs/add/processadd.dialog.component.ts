import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, Form } from '@angular/forms';
//import { Question } from '../../../../../Components/Module/Masters/Question.model';
//import { QuestionTransfarmer } from '../../../../../Components/Transformer/Masters/Question-Transfarmer';
//import { QuestionService } from '../../../../../Components/Services/Masters/QuestionService';
//import { Answer } from '../../../../../Components/Module/Masters/Answer.model';
//import { AnswerService } from '../../../../../Components/Services/Masters/AnswerService';
//import { AnswerTransfarmer } from '../../../../../Components/Transformer/Masters/Answer-Transfarmer';
import { FormService } from '../../../../../Components/Services/Masters/FormService';
import { FormTransfarmer } from '../../../../../Components/Transformer/Masters/Form-Transfarmer';
import { FormObj } from '../../../../../Components/Module/Masters/Form.model';
import { Process } from '../../../../../Components/Module/Masters/Process.model'
import { ProcessService1 } from '../../../../../Components/Services/Masters/ProcessService1';
import { ProcessTransfarmer1 } from '../../../../../Components/Transformer/Masters/Process-Transfarmer1'
import { ProcessFormMapping } from '../../../../../Components/Module/ProcessSetup/ProcessFormMapping.model';
import { ProcessDataService } from '../../processdata.service';
import { GlobalService } from '../../../../../Components/Services/GlobalServices/Global.service';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/processadd.dialog.html',
  styleUrls: ['../../dialogs/add/processadd.dialog.css']
})

export class ProcessAddDialogComponent implements OnInit {
  processObj: Process[];
  formObj: FormObj[];
  objformIdText: string;


  constructor(public dialogRef: MatDialogRef<ProcessAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProcessFormMapping,
    private formService: FormService,
    private globalService: GlobalService,
    private formTransfarmer: FormTransfarmer,
    public dataService: ProcessDataService) {
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
    this.formService.fillDrpForms().subscribe(
      (par) => this.formObj = this.formTransfarmer.fTransfarmers(par),
      (err: any) => console.log(err));
  }

  getErrorMessage() {
  }

  submit() {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  FormsChange(event) {
    const target = event.source.selected._element.nativeElement;
    const selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };
    this.objformIdText = selectedData.text;
  }

  public confirmAdd(): void {
    this.data.formName = this.objformIdText;

    if (this.data.isActive.toString() === 'true') {
      this.data.isActiveText = 'Active';
    } else {
      this.data.isActiveText = 'Inactive';
    }
    this.dataService.addProcessFormMapping(this.data);
  }
}
