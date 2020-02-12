import { Component, OnInit, Input } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import * as alasql from 'alasql';
import { User } from '../../../Compound/Module/User.model';
import { UserService } from '../../../Compound/Services/User.Service';
import { LoginUser } from '../../../Compound/Module/LoginUser';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-List-User',
  templateUrl: './List-User.component.html',
  styleUrls: ['./List-User.component.scss']
})
export class ListUserComponent implements OnInit {
  @Input() u: User;
  user: User[];

  WithoutFilteruser: User[];
  ResultUser: User[];
  SerachCri: number;
  user1: User;
  constructor(private _router: Router,
    private userService: UserService,
    private route: ActivatedRoute) {
    this.user = this.userService.getUsers();
    this.WithoutFilteruser = this.user;
  }

  ngOnInit() {
    this.user = this.userService.getUsers();
    this.WithoutFilteruser = this.user;
    this.user1 = {
      UserNo: null,
      UserName: null,
      UserID: null,
      BranchNo: LoginUser.BranchNo,
      Password: null,
      RoleId: -1,
      IsActive: null,
      CreDate: null,
      ModDate: null,
      EmpId: -1,
      status: null,
      CreUser: LoginUser.UserName,
      ModUser: LoginUser.UserName,
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultUser = this.WithoutFilteruser;
    console.log(this.user1.UserNo);
    if (this.user1.UserName !== null && this.user1.UserName !== '') {
      this.ResultUser = this.ResultUser.filter(SubResultUser =>
        SubResultUser.UserName.toLowerCase().indexOf(this.user1.UserName.toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.user1.UserNo !== null && this.user1.UserNo.toString() !== '') {
      this.ResultUser = this.ResultUser.filter(SubResultUser =>
        SubResultUser.UserNo.toString() === this.user1.UserNo.toString());
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      console.log('resul');
      this.ResultUser = this.WithoutFilteruser;
    }
    this.user = this.ResultUser;
    console.log(this.user);
  }
  ExportToExcel(): void {
    // tslint:disable-next-line:max-line-length
    alasql('SELECT UserNo,UserID,UserName,CreUser,CreDate,IsActive,status,EmpId INTO XLSX("UserList.xlsx",{headers:true}) FROM ?', [this.user]);
  }
}
