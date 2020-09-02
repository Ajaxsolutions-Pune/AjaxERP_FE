import { Component, OnInit, Input } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import * as alasql from 'alasql';
import { User } from '../../../Components/Module/User.model';
import { UserService } from '../../../Components/Services/User.Service';
import { LoginUser } from '../../../Components/Module/LoginUser';
alasql['private'].externalXlsxLib = require('xlsx');
import { DatePipe } from '@angular/common';

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
  myDate = new Date();
  constructor(private _router: Router,
    private userService: UserService,
    private datePipe: DatePipe,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      this._router.navigate(['login']);
    }
    this.user = this.userService.getUsers();
    this.WithoutFilteruser = this.user;
  }

  ngOnInit() {
    console.log(this.datePipe.transform(this.myDate, 'yyyy-MM-dd'));
    this.user = this.userService.getUsers();
    this.WithoutFilteruser = this.user;
    this.user1 = {
      UserNo: null,
      UserName: null,
      UserID: null,
      BranchNo: 1,
      Password: null,
      RoleId: -1,
      IsActive: null,
      CreDate: null,
      ModDate: null,
      EmpId: -1,
      status: null,
      CreUser: '',
      ModUser: ''
      // ModUser: LoginUser.UserName,
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
