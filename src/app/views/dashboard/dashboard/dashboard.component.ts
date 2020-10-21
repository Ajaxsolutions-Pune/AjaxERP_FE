import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { dashboard,bottomDistance, topDistance, topPlacesTagged,bottomPlacesTagged,topForm,
  bottomForm,topPlacesVisit,bottomPlacesVisit} from '../../../Components/Module/Masters/Dashboard.model';
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
  topDistanceObj: topDistance[];
  bottomDistanceObj: bottomDistance[];

  topPlacesTaggedObj: topPlacesTagged[];
  bottomPlacesTaggedObj: bottomPlacesTagged[];
  topFormObj: topForm[];
  bottomFormObj: bottomForm[];
  topPlacesVisitObj: topPlacesVisit[];
  bottomPlacesVisitObj: bottomPlacesVisit[];


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
      bottomDistance: [],
      topDistance: [],
      topPlacesTagged : [],
      bottomPlacesTagged: [],
      topForm:[],
      bottomForm:[],
      topPlacesVisit:[],
      bottomPlacesVisit:[]
    };
    this.dashboardObj.dashboardCount = {
      checkIn: null,
      checkOut: null,
      idle: null,
      inactive: null,
      leave: null,
      total: null,
    }

    this.topDistanceObj = [];
    this.bottomDistanceObj = [];
    this.topPlacesTaggedObj= [];
    this.bottomPlacesTaggedObj= [];
    this.topFormObj = [];
    this.bottomFormObj = [];
    this.topPlacesVisitObj = [];
    this.bottomPlacesVisitObj = [];
  

    this.dashboardService.getDashboardData().subscribe(t => {
      this.dashboardObj = t;
      this.topDistanceObj = this.dashboardObj.topDistance;
      this.bottomDistanceObj = this.dashboardObj.bottomDistance;
      this.topPlacesTaggedObj = this.dashboardObj.topPlacesTagged;
      this.bottomPlacesTaggedObj= this.dashboardObj.bottomPlacesTagged;
      this.topFormObj = this.dashboardObj.topForm;
      this.bottomFormObj = this.dashboardObj.bottomForm;
      this.topPlacesVisitObj = this.dashboardObj.topPlacesVisit;
      this.bottomPlacesVisitObj = this.dashboardObj.bottomPlacesVisit;
    });

  }
}
