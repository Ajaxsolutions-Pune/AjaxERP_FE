import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormObj } from '../../../../../Components/Module/Masters/Form.model';
import { FormService } from '../../../../../Components/Services/Masters/FormService';
import { FormTransfarmer } from '../../../../../Components/Transformer/Masters/Form-Transfarmer';
import { elementAt } from 'rxjs/operators';
import { ProcessFormMapping } from '../../../../../Components/Module/ProcessSetup/ProcessFormMapping.model';
import { ProcessDataService } from '../../processdata.service';
import { GlobalService } from '../../../../../Components/Services/GlobalServices/Global.service';
import { CustomComboBox } from '../../../../../Components/Module/GlobalModule/CustomComboBox.model';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/processedit.dialog.html',
  styleUrls: ['../../dialogs/edit/processedit.dialog.css']
})
export class ProcessEditDialogComponent implements OnInit {
  formObj: FormObj[];
  objnextFormIdText: string;


  dataFormObj: CustomComboBox[];
  nextFormcount=1;
  @ViewChild('auto', null) auto: any;
  keyword = 'name';

  selectEvent(item) {
    if(this.nextFormcount !==1){
      const selectedData = {
        value: item.id,
        text: item.name
      };
      this.data.formId = selectedData.value;
      this.objnextFormIdText = selectedData.text;

    }this.nextFormcount=2;
  }
  constructor(public dialogRef: MatDialogRef<ProcessEditDialogComponent>,
    private globalService: GlobalService,
    private formService: FormService,
    private formTransfarmer: FormTransfarmer,
    @Inject(MAT_DIALOG_DATA) public data: ProcessFormMapping, public dataService: ProcessDataService) {
  }
  formControl = new FormControl('', [
    Validators.required
  ]);
  Number_val(event) {
    let k;
    k = event.charCode;
    return this.globalService.NumberValidator(k);

  }
  ngOnInit() {
    
    this.formService.fillDrpForms().subscribe(
      (par) => {
        this.formObj = this.formTransfarmer.fTransfarmers(par);
        this.dataFormObj = [];
        this.formObj.forEach(a => {
          this.dataFormObj.push({ id: a.formId, name: a.formName })
        });
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.objnextFormIdText = this.formObj.
      find(element => element.formId === this.data.formId).formName;

    this.data.formName = this.objnextFormIdText;
    if (this.data.isActive.toString() === 'true') {
      this.data.isActiveText = 'Active';
    } else {
      this.data.isActiveText = 'Inactive';
    }
    this.dataService.updateProcessFormMapping(this.data);
  }
}
