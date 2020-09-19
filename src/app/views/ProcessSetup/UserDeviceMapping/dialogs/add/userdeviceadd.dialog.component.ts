import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, Form } from '@angular/forms';

import { UserService } from '../../../../../Components/Services/Masters/UserService';
import { UserTransfarmer } from '../../../../../Components/Transformer/Masters/User-Transfarmer';
import { User} from '../../../../../Components/Module/Masters/User.model';

import { UserDeviceMapping } from '../../../../../Components/Module/ProcessSetup/UserDeviceMapping.model';
import { UserDeviceDataService } from '../../userdevicedata.service';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/userdeviceadd.dialog.html',
  styleUrls: ['../../dialogs/add/userdeviceadd.dialog.css']
})

export class UserDeviceAddDialogComponent implements OnInit{ 
  user: User[];  
  objloginIdText: string;    

  constructor(public dialogRef: MatDialogRef<UserDeviceAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDeviceMapping,   
    private userService: UserService,
    private userTransfarmer: UserTransfarmer,
    public dataService: UserDeviceDataService) {
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  ngOnInit() {   
    this.userService.fillDrpUsers().subscribe(
      (par) => this.user = this.userTransfarmer.UserTransfarmers(par),
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

  FormsChange(event) {
    const target = event.source.selected._element.nativeElement;
    const selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };
    this.objloginIdText = selectedData.text;
  }

  public confirmAdd(): void {    
    this.data.loginIdText = this.objloginIdText;    
   
    if (this.data.isActive.toString() === 'true') {
      this.data.isActiveText = 'Active';
    } else {
      this.data.isActiveText = 'Inactive';
    }
    this.dataService.addUserDeviceMapping(this.data);
  }
}
