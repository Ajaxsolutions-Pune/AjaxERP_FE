import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../Components/Module/environment';
import { Asset } from '../../../Components/Module/Masters/Asset.model';
import { AssetGroup } from '../../../Components/Module/Masters/AssetGroup.model';
import { FormObj } from '../../../Components/Module/Masters/form.model';
import { Process } from '../../../Components/Module/Masters/Process.model';
import { StateEntity } from '../../../Components/Module/Masters/StateEntity.model';
import { MonitoringReport } from '../../../Components/Module/Report/MonitoringReport.model';
import { User } from '../../../Components/Module/User.model';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { DefaultLayoutComponent } from '../../../containers';
import { CrossFieldErrorMatcher } from '../../../views/Masters/AngularDemo/infrastructure/cross-field-error-matcher';
import { FormComponentBase } from '../../../views/Masters/AngularDemo/infrastructure/form-component-base';

import {FormControl} from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AssetGroupService } from '../../../Components/Services/Masters/AssetGroupService';
import { AssetGroupTransfarmer } from '../../../Components/Transformer/Masters/AssetGroup-Transfarmer';
@Component({
  selector: 'app-monitoring-report',
  templateUrl: './monitoring-report.component.html',
  styleUrls: ['./monitoring-report.component.scss']
})
export class MonitoringReportComponent extends FormComponentBase implements OnInit, AfterViewInit {
  // @ts-ignore
 // @ViewChild('txtProjectID') firstItem: ElementRef;
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  str: string;
  env = environment; 
  assetGroupDrp : AssetGroup[];
  processDrp : Process[];
  userDrp : User[];
  stateDrp : StateEntity[];
  assetDrp : Asset[];
  formDrp : FormObj[];
  monitoringReport : MonitoringReport[];
  fieldsvalues: Object;
  data: Array<Object> = [];   
  fields: Object;
  datePickerConfig: Partial<BsDatepickerConfig>;
  value: string;
  Date1: string;
  placeholder: string;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(private route: ActivatedRoute,   
    //private projectService: ProjectService,
    private globalService: GlobalService,
    private assetGroupService: AssetGroupService,
    private assetGroupTransfarmer: AssetGroupTransfarmer,
    private httpClient: HttpClient,
    private defaultLayoutComponent: DefaultLayoutComponent,       
    private router: Router, private formBuilder: FormBuilder    
    ) {
        super();       
        this.datePickerConfig = Object.assign({},
          {
            containerClass: 'theme-dark-blue',
            showWeekNumbers: false,
            dateInputFormat: 'DD/MM/YYYY'
          });
     this.str = this.env.apiServiceIPPort;
  }
  fillProcessDrp(): Observable<Process[]> {
      return this.httpClient.get<Process[]>(this.str + '/Process/getList', this.env.httpOptions);
      }

  fillUserDrp(): Observable<User[]> {
      return this.httpClient.get<User[]>(this.str + '/User/getList', this.env.httpOptions);
      }

  fillStateDrp(): Observable<StateEntity[]> {
     return this.httpClient.get<StateEntity[]>(this.str + '/State/getList', this.env.httpOptions);
      }

  fillAssetDrp(): Observable<Asset[]> {
     return this.httpClient.get<Asset[]>(this.str + '/Asset/getList', this.env.httpOptions);
      } 
      
  fillFormDrp(): Observable<FormObj[]> {
      return this.httpClient.get<FormObj[]>(this.str + '/Form/getList', this.env.httpOptions);
      } 

  ngOnInit() {   
    this.Date1 = null;
    //Asset Group combo
    this.assetGroupService.fillAssetGroupDrp().subscribe(
      (par) => { this.assetGroupDrp =this.assetGroupTransfarmer.AssetGroupTransfarmers(par)},
      (err: any) => console.log(err)); 

    //Process combo
    this.fillProcessDrp().subscribe(
      (par) => { this.processDrp = par;},
      (err: any) => console.log(err)); 

    //Process combo
    this.fillUserDrp().subscribe(
      (par) => { this.userDrp = par;},
      (err: any) => console.log(err)); 

    //State combo
    this.fillStateDrp().subscribe(
      (par) => { this.stateDrp = par;},
      (err: any) => console.log(err)); 

    //Asset combo
    this.fillAssetDrp().subscribe(
      (par) => { this.assetDrp = par;},
      (err: any) => console.log(err)); 

    //Form combo
    this.fillFormDrp().subscribe(
      (par) => { this.formDrp = par;},
      (err: any) => console.log(err)); 
     
    this.form = this.formBuilder.group({
        ControlAssetGroup: ['', []],      
        ControlProcess : ['', []],  
        ControlUser : ['', []],  
        ControlState : ['', []],  
        ControlAsset : ['', []], 
        ControlisImage: ['', []],      
        ControlStartDate: ['', []], 
        ControlEndDate: ['', []],  
        ControlForm: ['', []],  
    });   
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href='login';
    }
    status = '';    
  } 

  ngAfterViewInit(): void {
    setTimeout(() => {
     // this.firstItem.nativeElement.focus();
    }, 250);
    this.startControlMonitoring(this.form);
  }

  registerClicked(): void {
    if (this.form.invalid) {
      return;
    }
    alert('Registration Complete');
  }

}