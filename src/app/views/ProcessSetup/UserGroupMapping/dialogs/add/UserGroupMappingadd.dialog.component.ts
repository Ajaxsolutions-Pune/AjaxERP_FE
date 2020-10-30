import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, Form } from '@angular/forms';

import { UserService } from '../../../../../Components/Services/Masters/UserService';
import { UserTransfarmer } from '../../../../../Components/Transformer/Masters/User-Transfarmer';
import { User} from '../../../../../Components/Module/Masters/User.model';

import { GlobalService } from '../../../../../Components/Services/GlobalServices/Global.service';
import { UserGroupMappingDataService } from '../../userdevicedata.service';
import { UserGroupMapping } from '../../../../../Components/Module/ProcessSetup/UserGroupMapping.model';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/UserGroupMappingadd.dialog.html',
  styleUrls: ['../../dialogs/add/UserGroupMappingadd.dialog.css']
})

export class UserGroupUserMappingAddDialogComponent implements OnInit{ 
  user: User[];  
  objloginIdText: string;    

  constructor(public dialogRef: MatDialogRef<UserGroupUserMappingAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserGroupMapping,   
    private userService: UserService,
    private globalService: GlobalService,
    private userTransfarmer: UserTransfarmer,
    public dataService: UserGroupMappingDataService) {
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

  UsersChange(event) {
    const target = event.source.selected._element.nativeElement;
    const selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };
    this.objloginIdText = selectedData.text;
  }

  public confirmAdd(): void {    
   // this.data.userNameENG = this.objloginIdText;    
   
    if (this.data.isActive.toString() === 'true') {
      this.data.isActiveText = 'Active';
    } else {
      this.data.isActiveText = 'Inactive';
    }
    this.dataService.addUserGroupMapping(this.data);
  }
}
