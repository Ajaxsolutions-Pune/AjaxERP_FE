import { ArrayType, sharedStylesheetJitUrl } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as alasql from 'alasql';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Script } from 'vm';
alasql['private'].externalXlsxLib = require('xlsx');
import { environment } from '../../Components/Module/environment';
import{mapModel,placeSummery,placeDetail,userSummery,userDetail,userTracking} from '../../Components/Module/Masters/Map.model';
import{MapService} from '../../Components/Services/Masters/MapService';

//temp
import { Answer,AnswerEntity } from '../../Components/Module/Masters/Answer.model';

declare var google: any;
declare var myMapFunction: Function;
declare var myMapAssetFunction : Function; 
declare var myMapAssetHideFunction : Function;
declare var myMapUserHideFunction : Function;
declare var CreateTransmissionLine : Function;
declare var myMapUserTrackingFunction : Function;
declare var dragElement: Function;

@Component({
  selector: 'app-map',  
  templateUrl: './map_tracking.component.html',
  styleUrls: ['./map_tracking.component.css']  
})

export class MapTrackingComponent implements OnInit {
  //@Input() FormInput: map;  
  form!: FormGroup;
  config: any;
  env = environment;  
  lat: number = 0;
  lng: number = 0;
  id : any;
  id2 : any;
  isAutoRefresh : number = 0;
  Count : number = 60;

  MapType: string = "ROADMAP";
  AssetType: string = "Tower";
  Checked : string = "false";

  UserName_Search : string = "";
  PlaceName_Search : string = "";

  mapModelObj : mapModel;
  placeSummeryObj : placeSummery[];
  placeDetailObj : placeDetail[];
  userSummaryObj : userSummery[];
  userDetailObj : userDetail[];
  userTrackingObj : userTracking[];

  ResultUser: userDetail[];
  ResultPlace: placeDetail[];
  ResultUserTracking: userTracking[];

  map;
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
    private mapService : MapService,
    private router: Router, private formBuilder: FormBuilder,
    ) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    this.ResultUser = this.userDetailObj;
    this.ResultUserTracking = this.userTrackingObj;
    this.ResultPlace = this.placeDetailObj;
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

  SearchUser(value): void {       
    this.UserName_Search = value;     
    this.ResultUserTracking = this.userTrackingObj;
    if (this.UserName_Search !== null && this.UserName_Search !== '') {
      this.ResultUserTracking = this.ResultUserTracking.filter(SubResult =>
          SubResult.userNameENG.toLowerCase().indexOf(this.UserName_Search.toString().toLowerCase()) !== -1);
        }        
      if(this.ResultUserTracking.length !== 0)
      {          
           this.createMap();
      }
  }        

   

  ngOnInit() {    
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    this.MapLoad();        
    this.route.paramMap.subscribe(parameterMap => 
      {
      this.form = this.formBuilder.group({
        ControlSearchUser: ['', []],     
      });   
      this.form = this.formBuilder.group({
        ControlSearchPlace: ['', []],     
      });     
    }); 
  }

  MapLoad()
  {
    this.mapModelObj
    this.mapModelObj = {
      placeSummery:[],
      placeDetail:[],
      userSummery:[],
      userDetail:[],
      userTracking:[]
    };    

    this.placeSummeryObj = [];
    this.placeDetailObj = [];
    this.userSummaryObj = [];
    this.userDetailObj = [];  
    this.userTrackingObj = []; 
    
    //Asset data from map service
    this.mapService.getMapData().subscribe(t => {
      this.mapModelObj = t;
      this.placeSummeryObj = this.mapModelObj.placeSummery;
      this.placeDetailObj = this.mapModelObj.placeDetail;   
      this.userSummaryObj = this.mapModelObj.userSummery;
      this.userDetailObj = this.mapModelObj.userDetail;
      this.userTrackingObj = this.mapModelObj.userTracking;
      this.ResultUser = this.userDetailObj;

      console.log(this.userTrackingObj);

      if(this.userDetailObj.length > 0 ) //!= []
      {      
        //this.createMap();
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
    //this.MapType = e.target.value;   
    //this.createMap();
  }

  
  

  createMap()
  {
    const myLatlng = new google.maps.LatLng(this.userDetailObj[0]['latitude'],this.userDetailObj[0]['longitude']);
    const iconBase = '../../../assets/img/Content/';
    const mapProp= {         
      center:myLatlng,      
      zoom:15,          
    };    
    this.map = new google.maps.Map(document.getElementById("googleMap"),mapProp);          
    
    if(this.MapType === 'SATELLITE')
    {
      this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    }
    else if(this.MapType === 'HYBRID')
    {
      this.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
    }
    else if(this.MapType === 'ROADMAP')
    {
      this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    }  
    
    // UserTracking
    for (var i=0; i < this.ResultUserTracking.length; i++) {    
      var trackingID = this.ResultUserTracking[i]['trackingId'];
      var LoginId = this.ResultUserTracking[i]['loginId'];
      var userNameENG = this.ResultUserTracking[i]['userNameENG'];
      var mobileNo = this.ResultUserTracking[i]['mobileNo'];
      var dateTime = this.ResultUserTracking[i]['dateTime'];
      var lat = this.ResultUserTracking[i]['latitude'];
      var lang = this.ResultUserTracking[i]['longitude'];
      var location =  this.ResultUserTracking[i]['location'];
      var batteryPer =  this.ResultUserTracking[i]['batteryPer'];      
      var speed = this.ResultUserTracking[i]['speed'];                  
      myMapUserTrackingFunction(trackingID,LoginId,userNameENG,mobileNo, dateTime,lat,
        lang,location,batteryPer,speed,iconBase,this.map);
    }      
  }
}