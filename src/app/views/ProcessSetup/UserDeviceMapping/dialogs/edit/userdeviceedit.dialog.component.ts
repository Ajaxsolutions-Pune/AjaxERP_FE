import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

//import { Question } from '../../../../../Components/Module/Masters/Question.model';
//import { Answer } from '../../../../../Components/Module/Masters/Answer.model';
import { User } from '../../../../../Components/Module/Masters/User.model';
import { UserService } from '../../../../../Components/Services/Masters/UserService';
import { UserTransfarmer } from '../../../../../Components/Transformer/Masters/User-Transfarmer';

import { elementAt } from 'rxjs/operators';
import { UserDeviceMapping } from '../../../../../Components/Module/ProcessSetup/UserDeviceMapping.model';
import { UserDeviceDataService } from '../../userdevicedata.service';
import { GlobalService } from '../../../../../Components/Services/GlobalServices/Global.service';
import { CustomComboBox } from '../../../../../Components/Module/GlobalModule/CustomComboBox.model';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/userdeviceedit.dialog.html',
  styleUrls: ['../../dialogs/edit/userdeviceedit.dialog.css']
})
export class UserDeviceEditDialogComponent implements OnInit {  
  user: User[];
  objnextUserIdText: string;  


  dataUserObj: CustomComboBox[];
  nextFormcount=1;
  @ViewChild('auto', null) auto: any;
  keyword = 'name';

  selectEvent(item) {
    if(this.nextFormcount !==1){
      const selectedData = {
        value: item.id,
        text: item.name
      };
      this.data.loginId = selectedData.value;
      this.objnextUserIdText = selectedData.text;

    }this.nextFormcount=2;
  }
  constructor(public dialogRef: MatDialogRef<UserDeviceEditDialogComponent>,    
    private userService: UserService,
    private globalService: GlobalService,
    private userTransfarmer: UserTransfarmer,
    @Inject(MAT_DIALOG_DATA) public data: UserDeviceMapping, public dataService: UserDeviceDataService) {
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  Number_val(event) {
    let k;
    k = event.charCode;
    return this.globalService.NumberValidator(k);

  }
  ngOnInit() {   
    this.userService.fillDrpUsers().subscribe(
      (par) => {
        this.user = this.userTransfarmer.UserTransfarmers(par);
        
        this.dataUserObj = [];
        this.user.forEach(a => {
          this.dataUserObj.push({ id: a.loginID, name: a.userNameENG })
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

  UsersChange(event) {
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
        this.objnextUserIdText = this.user.
      find(element => element.loginID === this.data.loginId).userNameENG;
      this.data.userNameENG = this.objnextUserIdText;
      if (this.data.isActive.toString() === 'true') {
        this.data.isActiveText = 'Active';
      } else {
        this.data.isActiveText = 'Inactive';
      }
    this.dataService.updateUserDeviceMapping(this.data);
  }
}
