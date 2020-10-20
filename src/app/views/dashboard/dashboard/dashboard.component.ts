import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { dashboard, dashboardBottom, dashboardTop } from '../../../Components/Module/Masters/Dashboard.model';
import { DashboardService } from '../../../Components/Services/Masters/DashboardService';
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
  dashboardObj: dashboard;
  dashboardTopObj: dashboardTop[];
  dashboardBottomObj: dashboardBottom[];


  config: any;
  env = environment;
  constructor(private _router: Router,
    private route: ActivatedRoute,
    private dashboardService: DashboardService) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }

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
      window.location.href = 'login';
    }

    this.dashboardObj
    this.dashboardObj = {
      dashboardCount: null,
      dashboardBottom: [],
      dashboardTop: []
    };
    this.dashboardObj.dashboardCount = {
      checkIn: null,
      checkOut: null,
      idle: null,
      inactive: null,
      leave: null,
      total: null,
    }

    this.dashboardTopObj = [];
    this.dashboardBottomObj = [];
    this.dashboardService.getDashboardData().subscribe(t => {
      this.dashboardObj = t;
      this.dashboardTopObj = this.dashboardObj.dashboardTop;
      this.dashboardBottomObj = this.dashboardObj.dashboardBottom;
    });

  }
}
