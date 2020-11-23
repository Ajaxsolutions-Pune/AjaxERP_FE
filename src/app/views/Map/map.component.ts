import { ArrayType, sharedStylesheetJitUrl } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as alasql from 'alasql';
import { map } from 'rxjs/operators';
import { Script } from 'vm';
alasql['private'].externalXlsxLib = require('xlsx');
import { environment } from '../../Components/Module/environment';
//import { MapModel } from '../../Components/Module/Masters/Map.model';
//import { dashboard,bottomDistance, topDistance, topPlacesTagged,bottomPlacesTagged,topForm,
//  bottomForm,topPlacesVisit,bottomPlacesVisit,
//  realTimeTrackingData,places} from '../../Components/Module/Masters/Dashboard.model';

import{mapModel,placeSummery,placeDetail,userSummery,userDetail} from '../../Components/Module/Masters/Map.model';
import{MapService} from '../../Components/Services/Masters/MapService';
//import { DashboardService } from '../../Components/Services/Masters/DashboardService';

//temp
import { Answer,AnswerEntity } from '../../Components/Module/Masters/Answer.model';

declare var jQuery: any;
declare var google: any;
declare var myMap: any;
declare var myMapFunction: Function;
declare var myMapAssetFunction : Function; 
declare var myMapAssetHideFunction : Function;
declare var myMapUserHideFunction : Function;

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
  id : any;
  id2 : any;
  isAutoRefresh : number = 0;
  Count : number = 60;

  MapType: string = "ROADMAP";
  AssetType: string = "Tower";
  Checked : string = "false";

  /*dashboardObj: dashboard;
  topDistanceObj: topDistance[];
  bottomDistanceObj: bottomDistance[];
  topPlacesTaggedObj: topPlacesTagged[];
  bottomPlacesTaggedObj: bottomPlacesTagged[];
  topFormObj: topForm[];
  bottomFormObj: bottomForm[];
  topPlacesVisitObj: topPlacesVisit[];
  bottomPlacesVisitObj: bottomPlacesVisit[];
  realTimeTrackingDataObj: realTimeTrackingData[];
  placesObj : places[];*/

  mapModelObj : mapModel;
  placeSummeryObj : placeSummery[];
  placeDetailObj : placeDetail[];
  userSummaryObj : userSummery[];
  userDetailObj : userDetail[];

  TowerCount : string = "0";
  SubStationCount : string = "0";

  CheckIn : string = "0";
  CheckOut : string = "0";
  Off : string = "0";
  Inactive : string = "0";

  polling: any;

  answer = Answer;
  constructor(private _router: Router,
    private route: ActivatedRoute,
    //private dashboardService: DashboardService,
    private mapService : MapService
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

  AutoRefreshStart(): void {   
    this.Count = 60;
    if(this.isAutoRefresh === 0)
    {
      this.id = setInterval(() => {        
        this.MapLoad(); 
        }, 60000);
      this.isAutoRefresh = 1;

      this.id2 = setInterval(() => {        
        this.Count--;
        if(this.Count === 0)
        {
          this.Count = 60;
        }
        }, 1000);      
    }     
    else if(this.isAutoRefresh === 1)
    {
      if (this.id) {
        clearInterval(this.id);
      }
      if (this.id2) {
        clearInterval(this.id2);
        this.Count = 0;
      }
      this.isAutoRefresh = 0;
    }
  }

  ngOnInit() {    
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    this.MapLoad();       
  }


  MapLoad()
  {
    this.mapModelObj
    this.mapModelObj = {
      placeSummery: [],
      placeDetail:[],
      userSummery:[],
      userDetail:[]
    };

    /*this.dashboardObj
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
    this.placesObj = [];*/

    this.placeSummeryObj = [];
    this.placeDetailObj = [];
    this.userSummaryObj = [];
    this.userDetailObj = [];
  
    //User data from dashboard service
    /*this.dashboardService.getDashboardData().subscribe(t => {
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
      
      if(this.userDetailObj.length > 0 ) //!= []
      {      
        this.createMap();
      }    
    });*/

    //Asset data from map service
    this.mapService.getMapData().subscribe(t => {
      this.mapModelObj = t;
      this.placeSummeryObj = this.mapModelObj.placeSummery;
      this.placeDetailObj = this.mapModelObj.placeDetail;   
      this.userSummaryObj = this.mapModelObj.userSummery;
      this.userDetailObj = this.mapModelObj.userDetail;

      if(this.userDetailObj.length > 0 ) //!= []
      {      
        this.createMap();
      }    
      
      if(this.placeSummeryObj.length > 0 ) //
      {
        for (var i=0; i < this.placeSummeryObj.length; i++) 
        {
            if(this.placeSummeryObj[i]['placeGroupName'] === 'Tower')
            {
              this.TowerCount = this.placeSummeryObj[i]['placeCount'];
            }
            if(this.placeSummeryObj[i]['placeGroupName'] === 'Sub Station')
            {
              this.SubStationCount = this.placeSummeryObj[i]['placeCount'];
            }
        }   
      }

      if(this.userSummaryObj.length > 0)
      {
        for (var i=0; i < this.userSummaryObj.length; i++) 
        {
            if(this.userSummaryObj[i]['userStatus'] === 'Check In')
            {
              this.CheckIn = this.userSummaryObj[i]['userStatusCount'];
            }
            else if(this.userSummaryObj[i]['userStatus'] === 'Check Out')
            {
              this.CheckOut = this.userSummaryObj[i]['userStatusCount'];
            }
            else if(this.userSummaryObj[i]['userStatus'] === 'Inactive')
            {
              this.Inactive = this.userSummaryObj[i]['userStatusCount'];
            }
            else if(this.userSummaryObj[i]['userStatus'] === 'Off')
            {
              this.Off = this.userSummaryObj[i]['userStatusCount'];
            }           
        }   
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

  

  onUserCheckInChange(e)
  {
    myMapUserHideFunction('Check In');
  }

  onUserCheckOutChange(e)
  {
    myMapUserHideFunction('Check Out');
  }

  onUserOfChange(e)
  {
    myMapUserHideFunction('Off');
  }

  onUserInactiveChange(e)
  {
    myMapUserHideFunction('Inactive');
  }

  createMap()
  {
    const myLatlng = new google.maps.LatLng(this.userDetailObj[0]['latitude'],this.userDetailObj[0]['longitude']);
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
    for (var i=0; i < this.userDetailObj.length; i++) {     
      var lat = this.userDetailObj[i]['latitude'];
      var lang = this.userDetailObj[i]['longitude'];
      var UserCode = this.userDetailObj[i]['loginId'];
      var UserName = this.userDetailObj[i]['userNameENG'];
      var Status = this.userDetailObj[i]['userStatus'];
      var Battery =  this.userDetailObj[i]['batteryPer'];
      var Speed =  this.userDetailObj[i]['speed'] ;
      var LastUpdate = ""; //this.realTimeTrackingDataObj[i]['dateTime'];
      var Location = this.userDetailObj[i]['googleAddress'];                
    myMapFunction(lat,lang,UserCode,UserName,Status,Battery,Speed,LastUpdate,Location,iconBase,map);  
    }
    
    //Asset    
    for (var i=0; i < this.placeDetailObj.length; i++) {    
      var placeGroupCode = this.placeDetailObj[i]['placeGroupCode'] ;
      var lat = this.placeDetailObj[i]['latitude'];
      var lang = this.placeDetailObj[i]['longitude'];
      var PlaceGroupName = this.placeDetailObj[i]['placeGroupName'];
      var AssetName = this.placeDetailObj[i]['assetName'];
      var PlaceAddress = this.placeDetailObj[i]['placeAddress'];
      var StateName =  this.placeDetailObj[i]['stateName'];
      var PinCode =  this.placeDetailObj[i]['pinCode'] ;      
      var Location = this.placeDetailObj[i]['location'];                  
    myMapAssetFunction(placeGroupCode,lat,lang, PlaceGroupName,AssetName,Location,PlaceAddress,iconBase,StateName,PinCode,map);
    }    
  }
}
