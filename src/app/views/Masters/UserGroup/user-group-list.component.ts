import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserGroupService } from '../../../Components/Services/Masters/UserGroupService';

import * as alasql from 'alasql';
import { UserGroup } from '../../../Components/Module/Masters/UserGroup.model';
import { UserGroupTransfarmer } from '../../../Components/Transformer/Masters/UserGroup-Transfarmer';
import { environment } from '../../../Components/Module/environment';
alasql['private'].externalXlsxLib = require('xlsx');
@Component({
  selector: 'app-userGroup-list',
  templateUrl: './user-Group-list.component.html',
  styleUrls: ['./user-Group-list.component.scss']
})
export class UserGroupListComponent implements OnInit {
  @Input() UserGroupInput: UserGroup;
  userGroups: UserGroup[];

  WithoutFilterUserGroups: UserGroup[];
  ResultuserGroups: UserGroup[];
  SerachCri: number;
  userGroup: UserGroup;
  config: any;
  env = environment;
  constructor(private _router: Router,
    private userGroupService: UserGroupService,
    objTrans: UserGroupTransfarmer,
    private route: ActivatedRoute) {   
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        window.location.href='login';
      }
      console.log((this.route.snapshot.data['UserGroupList']));
      this.userGroups = objTrans.UserGroupTransfarmers(this.route.snapshot.data['UserGroupList']);
      this.userGroups = 
      this.WithoutFilterUserGroups = this.userGroups;
      console.log(this.userGroups);
      this.config = {
        itemsPerPage: this.env.paginationPageSize,
        currentPage: 1,
        totalItems: this.userGroups.length
      };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  ngOnInit() {
    this.userGroup = {
      userGroupId:null,
      ouCode:null,
      groupName:null,
      managerId:null,
      userGroupType:null,
      sortBy:null,
      isActive:'3',
      createdBy:null,
      createdDate:null,
      modifiedBy:null,
      modifiedDate:null,
    };
  }

  resultChanged(): void {
    console.log('hii');
    this.SerachCri = 0;
    this.ResultuserGroups = this.WithoutFilterUserGroups;
    if(this.userGroup.groupName !== null && this.userGroup.groupName !== '') {
    this.ResultuserGroups = this.ResultuserGroups.filter(SubResult =>
      SubResult.groupName.toLowerCase().indexOf(this.userGroup.groupName.toString().toLowerCase())
      !== -1);
    this.SerachCri = 1;
  }
  if (this.userGroup.userGroupId !== null && this.userGroup.userGroupId.toString() !== '') {
    console.log(this.userGroup.userGroupId);
    this.ResultuserGroups = this.ResultuserGroups.filter(SubResult =>
      SubResult.userGroupId.toString().toLowerCase().indexOf(
        this.userGroup.userGroupId.toString().toLowerCase()) !== -1);       
    this.SerachCri = 1;
  }
  if (this.userGroup.isActive !== null && this.userGroup.isActive.toString() !== '-1') {
    if (this.userGroup.isActive.toString() === '3') {
      this.ResultuserGroups = this.ResultuserGroups.filter(SubResultProd =>
        SubResultProd.isActive.toString() === 'Active' || SubResultProd.isActive.toString() === 'Inactive');
    } else {
      this.ResultuserGroups = this.ResultuserGroups.filter(SubResultProd =>
        SubResultProd.isActive.toString() === this.userGroup.isActive.toString());
    }
    this.SerachCri = 1;
  }
  console.log( this.ResultuserGroups);
  if (this.SerachCri === 0) {
    this.ResultuserGroups = this.WithoutFilterUserGroups;
  }
  this.userGroups = this.ResultuserGroups;
  this.config = {
    itemsPerPage: this.env.paginationPageSize,
    currentPage: 1,
    totalItems: this.userGroups.length
  };
  
}


  ExportToExcel(): void {
    alasql('SELECT userGroupId Code,groupName Name,managerId Manager, ' +
      'isActive Status INTO XLSX("UserGroupList.xlsx",{headers:true}) FROM ?', [this.userGroups]);
  }
}
 