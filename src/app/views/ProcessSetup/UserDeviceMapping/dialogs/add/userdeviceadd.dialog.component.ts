import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, Form } from '@angular/forms';

import { UserService } from '../../../../../Components/Services/Masters/UserService';
import { UserTransfarmer } from '../../../../../Components/Transformer/Masters/User-Transfarmer';
import { User} from '../../../../../Components/Module/Masters/User.model';

import { UserDeviceMapping } from '../../../../../Components/Module/ProcessSetup/UserDeviceMapping.model';
import { UserDeviceDataService } from '../../userdevicedata.service';
import { GlobalService } from '../../../../../Components/Services/GlobalServices/Global.service';
import { CustomComboBox } from '../../../../../Components/Module/GlobalModule/CustomComboBox.model';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/userdeviceadd.dialog.html',
  styleUrls: ['../../dialogs/add/userdeviceadd.dialog.css']
})

export class UserDeviceAddDialogComponent implements OnInit{ 
  user: User[];  
  objloginIdText: string;    
  loginVal: boolean;    

  dataUserObj: CustomComboBox[];
  @ViewChild('auto', null) auto: any;
  keyword = 'name';

  selectEvent(item) {
    const selectedData = {
      value: item.id,
      text: item.name
    };
    this.loginVal = false;
    this.data.loginId = selectedData.value;
    this.objloginIdText = selectedData.text;
    // alert(this.data1.questionId);
  }
  constructor(public dialogRef: MatDialogRef<UserDeviceAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDeviceMapping,   
    private userService: UserService,
    private globalService: GlobalService,
    private userTransfarmer: UserTransfarmer,
    public dataService: UserDeviceDataService) {
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
    this.loginVal = true;
    this.userService.fillDrpUsers().subscribe(
      (par) =>{

        this.user = this.userTransfarmer.UserTransfarmers(par)
        this.dataUserObj = [];
        this.user.forEach(a => {
          this.dataUserObj.push({ id: a.loginID, name: a.userNameENG })
        })},
      (err: any) => console.log(err));
  }
  
  getErrorMessage() {
   /* return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';*/       
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  UsersChange(event) {
    const target = event.source.selected._element.nativeElement;
    const selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };
    this.objloginIdText = selectedData.text;
  }

  public confirmAdd(): void {    
    console.log(this.objloginIdText);
    this.data.userNameENG = this.objloginIdText;    
   
    if (this.data.isActive.toString() === 'true') {
      this.data.isActiveText = 'Active';
    } else {
      this.data.isActiveText = 'Inactive';
    }
    this.dataService.addUserDeviceMapping(this.data);
  }
}
