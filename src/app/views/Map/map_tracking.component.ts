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
import{UserService} from '../../Components/Services/Masters/UserService';
import{User} from '../../Components/Module/Masters/User.model';
//temp
import { Answer,AnswerEntity } from '../../Components/Module/Masters/Answer.model';
import { UserTransfarmer } from '../../Components/Transformer/Masters/User-Transfarmer';
import { CustomComboBox } from '../../Components/Module/GlobalModule/CustomComboBox.model';
import { DefaultLayoutComponent } from '../../containers';

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
  
  user: User[];  
  objloginIdText: string;    
  objloginId: string;
  loginVal: boolean;
  data: CustomComboBox[];
  keyword = 'name';

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

  isShowDiv = true;

  map_replay_interval = 1000;

  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    //this.hidePassword = !this.hidePassword;
    // do something when input is focused
  }

  constructor(private _router: Router,
    private route: ActivatedRoute,
    private mapService : MapService,
    private userService : UserService,
    private userTransfarmer: UserTransfarmer,
    private defaultLayoutComponent: DefaultLayoutComponent,
    
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
      else
      {
        const myLatlng = new google.maps.LatLng(0,0);
        const iconBase = '../../../assets/img/Content/';
        const mapProp= {         
          center:myLatlng,      
          zoom:15,          
        };    
        this.map = new google.maps.Map(document.getElementById("googleMap"),mapProp);    

        this.defaultLayoutComponent.Massage('',
              'Data not available for this user.', 'modal-info');

      }
  }        

   

  ngOnInit() {    
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';  
    }

     // this.loginFal = true;
   this.loginVal = true;
   this.userService.fillDrpUsers().subscribe(
     (par) =>{

       this.user = this.userTransfarmer.UserTransfarmers(par)
       this.data = [];
       this.user.forEach(a => {
         this.data.push({ id: a.loginID, name: a.userNameENG })
       });
      console.log();
      },
     (err: any) => console.log(err));

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

  selectEvent(item) {
    const selectedData = {
      value: item.id,
      text: item.name
    };
    this.loginVal = false;
    this.objloginId = selectedData.value;
    this.objloginIdText = selectedData.text;
    // alert(this.data1.questionId);

   // alert(this.objloginIdText);

    this.SearchUser(this.objloginIdText);

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
  
  NextSpeed(){
    this.map_replay_interval = this.map_replay_interval + 1000;
    alert(this.map_replay_interval);
  }

  createMap()
  {    
    const myLatlng = new google.maps.LatLng(this.ResultUserTracking[0]['latitude'],this.ResultUserTracking[0]['longitude']);
    const iconBase = '../../../assets/img/Content/';
    const mapProp= {         
      center:myLatlng,      
      zoom:10,          
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
    
    console.log(this.ResultUserTracking);

    // UserTracking
    
    this.ResultUserTracking.forEach((name, i) => {
    setTimeout(() => {
        
     
    
    //for (var i=0; i < this.ResultUserTracking.length; i++) {     
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
        lang,location,batteryPer,speed,iconBase,this.map,i,this.ResultUserTracking.length);       
      //}
    }, i * this.map_replay_interval);
  });   

    

     //Asset    
     for (var i=0; i < this.placeDetailObj.length; i++) {    
      var placeGroupCode = this.placeDetailObj[i]['placeGroupCode'] ;
      var lat = this.placeDetailObj[i]['latitude'];
      var lang = this.placeDetailObj[i]['longitude'];
      var PlaceName = this.placeDetailObj[i]['placeName'];
      var PlaceGroupName = this.placeDetailObj[i]['placeGroupName'];
      var AssetName = this.placeDetailObj[i]['assetName'];
      var PlaceAddress = this.placeDetailObj[i]['placeAddress'];
      var StateName =  this.placeDetailObj[i]['stateName'];
      var PinCode =  this.placeDetailObj[i]['pinCode'] ;      
      var Location = this.placeDetailObj[i]['location'];                  
      myMapAssetFunction(placeGroupCode,lat,lang,PlaceName, PlaceGroupName,AssetName,
      Location,PlaceAddress,iconBase,StateName,PinCode,this.map,i,this.placeDetailObj.length);
    }    
  }

  
  onTowerChange(e) 
  {        
    myMapAssetHideFunction('Tower');
    myMapAssetHideFunction('SubStation');
  }
}
