import { ArrayType, sharedStylesheetJitUrl } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as alasql from 'alasql';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Script } from 'vm';
alasql['private'].externalXlsxLib = require('xlsx');
import { environment } from '../../Components/Module/environment';
import{mapReplayModel,assetData,trackingData} from '../../Components/Module/Masters/Map.Replay.model';
import{MapReplayService} from '../../Components/Services/Masters/MapReplayService';
import{UserService} from '../../Components/Services/Masters/UserService';
import{User} from '../../Components/Module/Masters/User.model';
import { DatePipe } from '@angular/common';
//temp
import { Answer,AnswerEntity } from '../../Components/Module/Masters/Answer.model';
import { UserTransfarmer } from '../../Components/Transformer/Masters/User-Transfarmer';
import { CustomComboBox } from '../../Components/Module/GlobalModule/CustomComboBox.model';
import { DefaultLayoutComponent } from '../../containers';

declare var google: any;
declare var myMapFunction: Function;
declare var myMapAssetFunction : Function; 
declare var myMapAssetHideFunction : Function;
declare var clearAllFunction : Function
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

  LoginId : string = "";
  Start_Date: Date;
  Start_DateStr: string;
  End_Date : Date;
  End_DateStr: string;

  mapReplayModelObj : mapReplayModel;  
  assetDataObj : assetData[];
  trackingDataObj : trackingData[];

  ResultPlace: assetData[];
  ResultUserTracking: trackingData[];

  map;
  TowerCount : string = "0";
  SubStationCount : string = "0";

  CheckIn : string = "0";
  CheckOut : string = "0";
  Off : string = "0";
  Inactive : string = "0";
  polling: any;

  IsLoopStart : number = 0;

  checkBox_Check : boolean;

  answer = Answer;

  isShowDiv = true;

  map_replay_interval = 1000;

  DaysCount : any;

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
    private mapReplayService : MapReplayService,
    private userService : UserService,
    private userTransfarmer: UserTransfarmer,
    private datepipe: DatePipe,
    private defaultLayoutComponent: DefaultLayoutComponent,
    
  private router: Router, private formBuilder: FormBuilder,
    ) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    //this.ResultUser = this.userDetailObj;
    this.ResultUserTracking = this.trackingDataObj;
    this.ResultPlace = this.assetDataObj;        
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,      
    }; 
  } 

  AutoRefreshStart(): void {   
    this.Count = 60;
    if(this.isAutoRefresh === 0)
    {
      this.Start_DateStr = this.datepipe.transform(this.Start_Date, 'yyyy-MM-dd');
      this.End_DateStr = this.datepipe.transform(this.End_Date, 'yyyy-MM-dd');
      this.id = setInterval(() => {        
        this.MapLoad(this.LoginId,this.Start_DateStr,this.End_DateStr);  
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


  onChangeStartDate(event) : void{
    this.Start_Date = event.value;
    this.Start_DateStr = this.datepipe.transform(this.Start_Date, 'MM-dd-yyyy')
    this.DateValidation(this.Start_Date,this.End_Date);
  }

  onChangeEndDate(event) : void{
    this.End_Date = event.value;
    this.End_DateStr = this.datepipe.transform(this.End_Date, 'MM-dd-yyyy')
    this.DateValidation(this.Start_Date,this.End_Date);
  }

  DateValidation(date1, date2) : void{ 
    this.DaysCount =  new Date(date2 - date1).getDate();    
  }

  SearchUser(value): void {  
    this.IsLoopStart = 1;  
    this.checkBox_Check = true;
    clearAllFunction();   
    this.checkBox_Check = false;      
    this.LoginId = value;     
    this.MapLoad(this.LoginId,this.Start_DateStr,this.End_DateStr); 
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
    //this.SearchUser(this.objloginId);
  }

  Clear_Map(){
    //for clear map
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

  MapLoad(LoginId:String, Start_Date:String, End_Date:String)
  {
    //this.mapModelObj.assetData = [];
    //this.mapModelObj.trackingData = [];
    this.assetDataObj = [];
    this.trackingDataObj = [];
    
    if(this.DaysCount <= 5)
    {

    this.mapReplayModelObj
    this.mapReplayModelObj = {
      assetData:[],
      trackingData:[]
    }; 

    this.assetDataObj = [];
    this.trackingDataObj = []; 
    
    //Asset data from map service
    this.mapReplayService.getMapReplayData(LoginId, Start_Date, End_Date).subscribe(t => {
      this.mapReplayModelObj = t;     
      this.assetDataObj = this.mapReplayModelObj.assetData;
      this.trackingDataObj = this.mapReplayModelObj.trackingData;       
      
      //console.log(this.userTrackingObj);
      //console.log(this.placeDetailObj);
     
      //alert(this.userTrackingObj.length);      
      if(this.trackingDataObj !== null)
      {
      if(this.trackingDataObj.length !== 0 )
      {          
         this.createMap();
      }
      else
      {
        this.Clear_Map();
      }
      }
      else{
        this.Clear_Map();
      }
    }); 
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
      'You can select maximum 5 days for map replay.', 'modal-info');
    }
  }

  changeMapType(e) {
    //console.log(e.target.value);
    //this.MapType = e.target.value;   
    //this.createMap();
  }  
  
  NextSpeed(){
    this.map_replay_interval = this.map_replay_interval + 1000;
    //alert(this.map_replay_interval);
  }

  createMap()
  {    
    const myLatlng = new google.maps.LatLng(this.trackingDataObj[0]['latitude'],this.trackingDataObj[0]['longitude']);
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
    
    console.log(this.trackingDataObj);

    // UserTracking
    this.IsLoopStart = 0;
   
    this.trackingDataObj.forEach((name, i) => {       
      {
    setTimeout(() => {        
    //for (var i=0; i < this.userTrackingObj.length; i++) {     
      var trackingID = this.trackingDataObj[i]['trackingId'];
      var LoginId = this.trackingDataObj[i]['loginId'];
      var userNameENG = this.trackingDataObj[i]['userNameENG'];
      var mobileNo = this.trackingDataObj[i]['mobileNo'];
      var dateTime = this.trackingDataObj[i]['dateTime'];
      var lat = this.trackingDataObj[i]['latitude'];
      var lang = this.trackingDataObj[i]['longitude'];
      var location =  this.trackingDataObj[i]['location'];
      var batteryPer =  this.trackingDataObj[i]['batteryPer'];      
      var speed = this.trackingDataObj[i]['speed'];   
      myMapUserTrackingFunction(trackingID,LoginId,userNameENG,mobileNo, dateTime,lat,
        lang,location,batteryPer,speed,iconBase,this.map,i,this.trackingDataObj.length);           
       
    }, i * this.map_replay_interval);  


   

  }  
  });       



     //Asset    
     for (var i=0; i < this.assetDataObj.length; i++) {    
      var placeGroupCode = this.assetDataObj[i]['placeGroupCode'] ;
      var lat = this.assetDataObj[i]['latitude'];
      var lang = this.assetDataObj[i]['longitude'];
      var PlaceName = this.assetDataObj[i]['placeName'];
      var PlaceGroupName = this.assetDataObj[i]['placeGroupName'];
      var AssetName = this.assetDataObj[i]['assetName'];
      var PlaceAddress = this.assetDataObj[i]['placeAddress'];
      var StateName =  this.assetDataObj[i]['stateName'];
      var PinCode =  this.assetDataObj[i]['pinCode'] ;      
      var Location = this.assetDataObj[i]['location'];   
      var Redius = this.assetDataObj[i]['redius'];                 
      myMapAssetFunction(placeGroupCode,lat,lang,PlaceName, PlaceGroupName,AssetName,
      Location,PlaceAddress,iconBase,StateName,PinCode,Redius,this.map,i,this.assetDataObj.length);
    }    
  }

  onTowerChange(e) 
  {       
    if(this.checkBox_Check == false){
      this.checkBox_Check = true;
    }
    myMapAssetHideFunction('Tower');
    myMapAssetHideFunction('SubStation');
  }
}
