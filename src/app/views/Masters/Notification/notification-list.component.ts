import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as alasql from 'alasql';
import { environment } from '../../../Components/Module/environment';
import { NotificationObj } from '../../../Components/Module/Masters/NotificationObj.model';
import { NotificationObjService } from '../../../Components/Services/Masters/NotificationObjService';
import { NotificationObjTransfarmer } from '../../../Components/Transformer/Masters/NotificationObj-Transfarmer';
alasql['private'].externalXlsxLib = require('xlsx');
@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationObjListComponent implements OnInit {
  @Input() NotificationObjInput: NotificationObj;
  notificationObjs: NotificationObj[];

  WithoutFilterNotificationObjs: NotificationObj[];
  ResultnotificationObjs: NotificationObj[];
  SerachCri: number;
  notificationObj: NotificationObj;
  config: any;
  env = environment;
  constructor(private _router: Router,
    private notificationObjService: NotificationObjService,
    objTrans: NotificationObjTransfarmer,
    private route: ActivatedRoute) {   
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        window.location.href='login';
      }
      console.log((this.route.snapshot.data['NotificationObjList']));
      this.notificationObjs = objTrans.NotificationObjTransfarmers(this.route.snapshot.data['NotificationObjList']);
      this.WithoutFilterNotificationObjs = this.notificationObjs;
      console.log(this.notificationObjs);
      this.config = {
        itemsPerPage: this.env.paginationPageSize,
        currentPage: 1,
        totalItems: this.notificationObjs.length
      };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  ngOnInit() {
    this.notificationObj = {
      notificationId:null,
      ouCode:null,
      userGroupId:null,
      notificationMessage:null,
      startDate:null,
      endDate:null,
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
    this.ResultnotificationObjs = this.WithoutFilterNotificationObjs;
    if(this.notificationObj.notificationMessage !== null && this.notificationObj.notificationMessage !== '') {
    this.ResultnotificationObjs = this.ResultnotificationObjs.filter(SubResult =>
      SubResult.notificationMessage.toLowerCase().indexOf(this.notificationObj.notificationMessage.toString().toLowerCase())
      !== -1);
    this.SerachCri = 1;
  }
  if (this.notificationObj.notificationId !== null && this.notificationObj.notificationId.toString() !== '') {
    console.log(this.notificationObj.notificationId);
    this.ResultnotificationObjs = this.ResultnotificationObjs.filter(SubResult =>
      SubResult.notificationId.toString().toLowerCase().indexOf(
        this.notificationObj.notificationId.toString().toLowerCase()) !== -1);       
    this.SerachCri = 1;
  }
  if (this.notificationObj.isActive !== null && this.notificationObj.isActive.toString() !== '-1') {
    if (this.notificationObj.isActive.toString() === '3') {
      this.ResultnotificationObjs = this.ResultnotificationObjs.filter(SubResultProd =>
        SubResultProd.isActive.toString() === 'Active' || SubResultProd.isActive.toString() === 'Inactive');
    } else {
      this.ResultnotificationObjs = this.ResultnotificationObjs.filter(SubResultProd =>
        SubResultProd.isActive.toString() === this.notificationObj.isActive.toString());
    }
    this.SerachCri = 1;
  }
  console.log( this.ResultnotificationObjs);
  if (this.SerachCri === 0) {
    this.ResultnotificationObjs = this.WithoutFilterNotificationObjs;
  }
  this.notificationObjs = this.ResultnotificationObjs;
  this.config = {
    itemsPerPage: this.env.paginationPageSize,
    currentPage: 1,
    totalItems: this.notificationObjs.length
  };
  
}


  ExportToExcel(): void {
    alasql('SELECT notificationId Code,notificationMessage Message,' +
      'isActive Status INTO XLSX("NotificationList.xlsx",{headers:true}) FROM ?', [this.notificationObjs]);
  }
}
 