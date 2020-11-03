import { ArrayType, sharedStylesheetJitUrl } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as alasql from 'alasql';
import { map } from 'rxjs/operators';
import { Script } from 'vm';
alasql['private'].externalXlsxLib = require('xlsx');
import { environment } from '../../Components/Module/environment';
//import { MapModel } from '../../Components/Module/Masters/Map.model';
import { dashboard,bottomDistance, topDistance, topPlacesTagged,bottomPlacesTagged,topForm,
  bottomForm,topPlacesVisit,bottomPlacesVisit,
  realTimeTrackingData,places} from '../../Components/Module/Masters/Dashboard.model';

import { DashboardService } from '../../Components/Services/Masters/DashboardService';

//temp
import { Answer,AnswerEntity } from '../../Components/Module/Masters/Answer.model';

declare var jQuery: any;
declare var google: any;
declare var myMap: any;
declare var myMapFunction: Function;
declare var myMapAssetFunction : Function; 
declare var myMapAssetHideFunction : Function;

declare var dragElement: Function;


@Component({
  selector: 'app-map',  
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']  
})


/*type MyArrayType = Array<{id: number, text: string}>;
const arr: MyArrayType = [
    {id: 1, text: 'Sentence 1'},
    {id: 2, text: 'Sentence 2'},
    {id: 3, text: 'Sentence 3'},
    {id: 4, text: 'Sentenc 4'},
];*/


export class MapComponent implements OnInit {
  //@Input() FormInput: map;  
  config: any;
  env = environment;
  //mapObject: MapModel[];
  lat: number = 0;
  lng: number = 0;

  MapType: string = "ROADMAP";
  AssetType: string = "Tower";
  Checked : string = "false";

  dashboardObj: dashboard;
  topDistanceObj: topDistance[];
  bottomDistanceObj: bottomDistance[];

  topPlacesTaggedObj: topPlacesTagged[];
  bottomPlacesTaggedObj: bottomPlacesTagged[];
  topFormObj: topForm[];
  bottomFormObj: bottomForm[];
  topPlacesVisitObj: topPlacesVisit[];
  bottomPlacesVisitObj: bottomPlacesVisit[];
  realTimeTrackingDataObj: realTimeTrackingData[];
  placesObj : places[];

  answer = Answer;
  constructor(private _router: Router,
    private route: ActivatedRoute,
    private dashboardService: DashboardService
    ) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }

    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      //totalItems: this.forms.length
    }; 
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
      bottomPlacesVisit:[],
      realTimeTrackingData:[],
      places:[]
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
    this.realTimeTrackingDataObj = [];
    this.placesObj = [];
  

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
      this.realTimeTrackingDataObj = this.dashboardObj.realTimeTrackingData;    
      this.placesObj = this.dashboardObj.places;
   
    if(this.realTimeTrackingDataObj.length > 0 ) //!= []
    {      
      this.createMap();
    }
  });
  }

  changeMapType(e) {
    //console.log(e.target.value);
    this.MapType = e.target.value;   
    this.createMap();
  }

  onTowerChange(e)
  {    
    myMapAssetHideFunction('Tower');
  }

  onSubStationChange(e)
  {
    myMapAssetHideFunction('SubStation');
  }


  createMap()
  {
    const myLatlng = new google.maps.LatLng(this.realTimeTrackingDataObj[0]['latitude'],this.realTimeTrackingDataObj[0]['longitude']);
    const iconBase = '../../../assets/img/Content/';
    const mapProp= {         
      center:myLatlng,      
      zoom:12,          
    };    
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);          
    
    if(this.MapType === 'SATELLITE')
    {
      map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    }
    else if(this.MapType === 'HYBRID')
    {
      map.setMapTypeId(google.maps.MapTypeId.HYBRID);
    }
    else if(this.MapType === 'ROADMAP')
    {
      map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    }

    //user 
   
    for (var i=0; i < this.realTimeTrackingDataObj.length; i++) {     
      var lat = this.realTimeTrackingDataObj[i]['latitude'];
      var lang = this.realTimeTrackingDataObj[i]['longitude'];
      var UserCode = this.realTimeTrackingDataObj[i]['loginId'];
      var UserName = this.realTimeTrackingDataObj[i]['userNameENG'];
      var Status = this.realTimeTrackingDataObj[i]['status'];
      var Battery =  this.realTimeTrackingDataObj[i]['batteryPer'];
      var Speed =  this.realTimeTrackingDataObj[i]['speed'] ;
      var LastUpdate = this.realTimeTrackingDataObj[i]['dateTime'];
      var Location = this.realTimeTrackingDataObj[i]['location'];                  
    myMapFunction(lat,lang,UserCode,UserName,Status,Battery,Speed,LastUpdate,Location,iconBase,map);  
    
    
      //Asset
      for (var i=0; i < this.placesObj.length; i++) {     
        var lat = this.placesObj[i]['latitude'];
        var lang = this.placesObj[i]['longitude'];
        var PlaceGroupName = this.placesObj[i]['placeGroupName'];
        var AssetName = this.placesObj[i]['assetName'];
        var PlaceAddress = this.placesObj[i]['placeAddress'];
        var StateName =  this.placesObj[i]['stateName'];
        var PinCode =  this.placesObj[i]['pinCode'] ;      
        var Location = this.placesObj[i]['location'];                  
      myMapAssetFunction(lat,lang, PlaceGroupName,AssetName,Location,PlaceAddress,iconBase,StateName,PinCode,map);
      }
    } 
  }
}
