import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, UserEntity } from '../../../Components/Module/Masters/User.model';
import { UserTransfarmer } from '../../../Components/Transformer/Masters/User-Transfarmer';
import { UserService } from '../../../Components/Services/Masters/UserService';
import * as alasql from 'alasql';
import { environment } from '../../../Components/Module/environment';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  selector: 'app-user-list',
  templateUrl: './List-user.component.html',
  styleUrls: ['./List-user.component.scss']
})


export class UserListComponent implements OnInit {
  @Input() UserInput: User;
  users: User[];
  usersEntity: UserEntity[];
  config: any;
  env = environment;

  WithoutFilterRole: User[];
  Resultuser: User[];
  SerachCri: number;
  objUser: User;
  constructor(private _router: Router,
    objTrans: UserTransfarmer,
    private roleService: UserService,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    this.usersEntity = this.route.snapshot.data['UserList'];
    this.users = objTrans.UserTransfarmers(this.usersEntity);
    this.WithoutFilterRole = this.users;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.users.length
    };
  }

  ngOnInit() {
    this.WithoutFilterRole = this.users;
    this.objUser = {
      confipwd: null,
      id: null,
      ouCode: null,
      loginID: null,
      pwd: null,
      userNameENG: null,
      userNameUNI: null,
      userTypeCode: null,
      emailID: null,
      mobileNo: null,
      pwdChangedDate: null,
      pwdExpiryDate: null,
      isBlocked: null,
      userGroupCode: null,
      entityCode: null,
      entityBranchCode: null,
      desigination: null,
      isPswdChanged: null,
      isActive: '3',
      createdBy: null,
      createdDate: null,
      modifiedBy: null,
      modifiedDate: null
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultuser = this.WithoutFilterRole;

    if (this.objUser.userNameENG !== null && this.objUser.userNameENG !== '') {
      console.log(this.objUser.userNameENG.toString().toLowerCase());
      this.Resultuser = this.Resultuser.filter(SubResult =>
        SubResult.userNameENG.toLowerCase().indexOf(this.objUser.userNameENG.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }

    if (this.objUser.loginID !== null && this.objUser.loginID.toString() !== '') {
      this.Resultuser = this.Resultuser.filter(SubResult =>
        SubResult.loginID.toString().toLowerCase().indexOf(this.objUser.loginID.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }

    if (this.objUser.isActive !== null && this.objUser.isActive.toString() !== '-1') {
      if (this.objUser.isActive.toString() === '3') {
        this.Resultuser = this.Resultuser.filter(SubResultProd =>
          SubResultProd.isActive.toString() === 'Active'
          || SubResultProd.isActive.toString() === 'Inactive');
      } else {
        this.Resultuser = this.Resultuser.filter(SubResultProd =>
          SubResultProd.isActive.toString() === this.objUser.isActive.toString());
      }
      this.SerachCri = 1;
    }

    if (this.SerachCri === 0) {
      this.Resultuser = this.WithoutFilterRole;
    }
    this.users = this.Resultuser;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.users.length
    };
  }

  ExportToExcel(): void {
    alasql('SELECT roleId Role_Id,roleName Role_Name, roleDescription Role_Description , rolecreatefor Role_Create_For , isActive Is_Active' +
      ' INTO XLSX("RoleList.xlsx",{headers:true}) FROM ?', [this.users]);
  }

}

