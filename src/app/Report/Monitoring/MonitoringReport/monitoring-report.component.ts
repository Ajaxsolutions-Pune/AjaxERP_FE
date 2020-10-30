import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
import { FormControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AssetGroupService } from '../../../Components/Services/Masters/AssetGroupService';
import { AssetGroupTransfarmer } from '../../../Components/Transformer/Masters/AssetGroup-Transfarmer';
import { DatePipe } from '@angular/common';
import { AssetService } from '../../../Components/Services/Masters/AssetService';
import { AssetTransfarmer } from '../../../Components/Transformer/Masters/Asset-Transfarmer';
import { ProcessService1 } from '../../../Components/Services/Masters/ProcessService1';
import { ProcessTransfarmer1 } from '../../../Components/Transformer/Masters/Process-Transfarmer1';
import { UserEntity_ } from '../../../Components/Module/Masters/UserEntity.model';
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
  assetGroupDrp: AssetGroup[];
  processDrp: Process[];
  userDrp: User[];
  stateDrp: StateEntity[];
  CustomerEntityDrp: UserEntity_[];
  assetDrp: Asset[];
  formDrp: FormObj[];
  monitoringReport: MonitoringReport[];
  fieldsvalues: Object;
  data: Array<Object> = [];
  fields: Object;
  datePickerConfig: Partial<BsDatepickerConfig>;
  value: string;
  Date1: string;
  placeholder: string;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  fromDate: Date;
  toDate: Date;
  fromDateStr: string;
  withImage: string;
  toDateStr: string;
  assetGroupCode: string; processId: string;
  userId: string; customerCode: string; assetCode: string; state: string;
  constructor(private route: ActivatedRoute,
    //private projectService: ProjectService,
    private globalService: GlobalService,
    private assetGroupService: AssetGroupService,
    private assetGroupTransfarmer: AssetGroupTransfarmer,
    private assetService: AssetService,
    private assetTransfarmer: AssetTransfarmer,
    private processService: ProcessService1,
    private processTransfarmer: ProcessTransfarmer1,
    private httpClient: HttpClient,
    private datepipe: DatePipe,
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

  fillUserDrp(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.str + '/User/getList', this.env.httpOptions);
  }

  fillStateDrp(): Observable<StateEntity[]> {
    return this.httpClient.get<StateEntity[]>(this.str + '/State/getList', this.env.httpOptions);
  }

  fillAssetDrp(): Observable<Asset[]> {
    return this.httpClient.get<Asset[]>(this.str + '/Asset/getList', this.env.httpOptions);
  }
  save(): void {
    this.fromDateStr = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
    this.toDateStr = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
    if (this.withImage.toString().trim() === 'true') {
      this.withImage = '1';
    } else { this.withImage = '0'; }
    this.globalService.getExcelfil(this.fromDateStr, this.toDateStr, 
    this.assetGroupCode, this.processId
    ,this.userId, this.customerCode, this.assetCode, this.withImage);
  }

  ngOnInit() {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    this.Date1 = null;
    this.state = 'All'; this.processId = '1';
    this.userId = 'All'; this.customerCode = 'All'; this.assetCode = 'All';
    //Asset Group combo
    this.assetGroupService.fillAssetGroupDrp().subscribe(
      (par) => { this.assetGroupDrp = 
        this.assetGroupTransfarmer.AssetGroupTransfarmers(par) },
      (err: any) => console.log(err));

    //Process combo
    this.fillUserDrp().subscribe(
      (par) => { this.userDrp = par; },
      (err: any) => console.log(err));
    this.assetGroupCode = '2';

    //Asset combo
    this.assetService.fillDrpAssetsByAssetGruopCode(this.assetGroupCode).subscribe(
      (par) => { this.assetDrp = 
        this.assetTransfarmer.AssetTransfarmers(par); },
      (err: any) => console.log(err));

    //Process combo
    this.processService.fillProcessDrpByAssetGroup(this.assetGroupCode).subscribe(
      (par) => { this.processDrp = 
        this.processTransfarmer.processTransfarmers(par); },
      (err: any) => console.log(err));
    //State combo
    this.fillStateDrp().subscribe(
      (par) => { this.stateDrp = par; },
      (err: any) => console.log(err));

    this.fillEntityDrp('CUS').subscribe(
      (par) => {
        this.CustomerEntityDrp = par;
      },
      (err: any) => console.log(err));


    this.form = this.formBuilder.group({
      ControlAssetGroup: ['', []],
      ControlProcess: ['', []],
      ControlcustomerCode: ['', []],
      ControlUser: ['', []],
      ControlState: ['', []],
      ControlAsset: ['', []],
      ControlisImage: ['', []],
      ControlStartDate: ['', []],
      ControlEndDate: ['', []],
      ControlForm: ['', []],
    });
    status = '';
    this.fromDate = new Date();
    this.toDate = new Date();
  }

  fillEntityDrp(GroupEntity: string): Observable<UserEntity_[]> {
    return this.httpClient.get<UserEntity_[]>(this.str +
      '/GetEntity/getList/' + localStorage.getItem('username').toString() + '/' + this.env.OuCode +
      '?entityGroupCode=' + GroupEntity + '&entityCode=NULL&activeStatus=1', this.env.httpOptions);
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

  AssetGroupChange(event) {
    const target = event.source.selected._element.nativeElement;
    const selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };

    this.state = 'All';
    this.userId = 'All'; this.customerCode = 'All'; this.assetCode = 'All';
    //Asset combo
    this.assetService.fillDrpAssetsByAssetGruopCode(selectedData.value).subscribe(
      (par) => { this.assetDrp = this.assetTransfarmer.AssetTransfarmers(par); },
      (err: any) => console.log(err));

    //Process combo
    this.processService.fillProcessDrpByAssetGroup(selectedData.value).subscribe(
      (par) => { this.processDrp = this.processTransfarmer.processTransfarmers(par); },
      (err: any) => console.log(err));
  }

}