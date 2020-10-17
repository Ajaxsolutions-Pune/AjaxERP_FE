import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {dashboard} from '../../../Components/Module/Masters/Dashboard.model';
//import { FormTransfarmer } from '../../../Components/Transformer/Masters/Form-Transfarmer';
import * as alasql from 'alasql';
alasql['private'].externalXlsxLib = require('xlsx');
import { environment } from '../../../Components/Module/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  @Input() FormInput: dashboard;
  dashboardObj: dashboard[];

  WithoutFilterForm: dashboard[];
  ResultForm: dashboard[];

  SerachCri: number;
  dashboard: dashboard;

  config: any;
  env = environment;
  constructor(private _router: Router,   
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href='login';
    }
    //this.formEntity = this.route.snapshot.data['FormList'];    
    this.WithoutFilterForm = this.dashboardObj;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      //totalItems: this.forms.length
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
  
  ngOnInit() {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href='login';
    }
    this.WithoutFilterForm = this.dashboardObj;

    //this.dashboard = {      
      
    //};
  }

  

  
}
