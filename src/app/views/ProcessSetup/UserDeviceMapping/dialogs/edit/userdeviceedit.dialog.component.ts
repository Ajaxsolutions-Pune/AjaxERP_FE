import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

//import { Question } from '../../../../../Components/Module/Masters/Question.model';
//import { Answer } from '../../../../../Components/Module/Masters/Answer.model';
import { User } from '../../../../../Components/Module/Masters/User.model';
import { UserService } from '../../../../../Components/Services/Masters/UserService';
import { UserTransfarmer } from '../../../../../Components/Transformer/Masters/User-Transfarmer';

import { elementAt } from 'rxjs/operators';
import { UserDeviceMapping } from '../../../../../Components/Module/ProcessSetup/UserDeviceMapping.model';
import { UserDeviceDataService } from '../../userdevicedata.service';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/userdeviceedit.dialog.html',
  styleUrls: ['../../dialogs/edit/userdeviceedit.dialog.css']
})
export class UserDeviceEditDialogComponent implements OnInit {  
  user: User[];
  objnextUserIdText: string;  

  constructor(public dialogRef: MatDialogRef<UserDeviceEditDialogComponent>,    
    private userService: UserService,
    private userTransfarmer: UserTransfarmer,
    @Inject(MAT_DIALOG_DATA) public data: UserDeviceMapping, public dataService: UserDeviceDataService) {
      console.log(data);
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);


  ngOnInit() {   
    this.userService.fillDrpUsers().subscribe(
      (par) => {
        this.user = this.userTransfarmer.UserTransfarmers(par);
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
    this.objnextUserIdText = selectedData.text;
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    //this.objanswerIdText = this.answersObj.
    //  find(element => element.answerId === this.data.answerId).answer;
    //this.objquestionIdText = this.questionsObj.
    //  find(element => element.questionId === this.data.questionId).question;
        this.objnextUserIdText = this.user.
      find(element => element.loginID === this.data.loginId).userNameENG;

      this.data.loginIdText = this.objnextUserIdText;
      //this.data.questionIdText = this.objquestionIdText;
      //this.data.answerIdText = this.objanswerIdText;
     
      if (this.data.isActive.toString() === 'true') {
        this.data.isActiveText = 'Active';
      } else {
        this.data.isActiveText = 'Inactive';
      }
    this.dataService.updateUserDeviceMapping(this.data);
  }
}
