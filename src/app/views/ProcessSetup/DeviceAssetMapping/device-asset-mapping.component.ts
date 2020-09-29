import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';

import { DeviceAssetAddDialogComponent } from './dialogs/add/deviceassetadd.dialog.component';
import { DeviceAssetEditDialogComponent } from './dialogs/edit/deviceassetedit.dialog.component';
//import { ProcessDeleteDialogComponent } from './dialogs/delete/processdelete.dialog.component';

import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { UserDeviceDataService } from './userdevicedata.service';
import { FormComponentBase } from '../../Masters/AngularDemo/infrastructure/form-component-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrossFieldErrorMatcher } from '../../Masters/AngularDemo/infrastructure/cross-field-error-matcher';

import { Device } from '../../../Components/Module/Masters/Device.model';
import { DeviceTransfarmer } from '../../../Components/Transformer/Masters/Device-Transfarmer';
import { DeviceService } from '../../../Components/Services/Masters/DeviceService';

import { DeviceAssetMapping } from '../../../Components/Module/ProcessSetup/DeviceAssetMapping.model';

import { DeviceAssetMappingTransfarmer } from '../../../Components/Transformer/ProcessSetup/DeviceAssetMapping-Transfarmer';
import { DeviceAssetMappingService } from '../../../Components/Services/ProcessSetup/DeviceAssetMappingService';

import { DefaultLayoutComponent } from '../../../containers';
import { Router } from '@angular/router';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { DeviceAssetDataService } from './deviceassetdata.service';


@Component({
  selector: 'app-device-Asset-mapping',
  templateUrl: 'device-asset-mapping.component.html',
  styleUrls:  ['device-asset-mapping.component.scss']
})

export class DeviceAssetMappingComponent extends FormComponentBase
  implements OnInit {

  deviceObj: Device[];
  displayedColumns = ['DeviceAssetMapping', 'AssetText','SortBy',  'ActiveText', 'actions'];
  exampleDatabase: DeviceAssetDataService | null;
  insertData: DeviceAssetDataService | null;
  dataSource: ExampleDataSource | null;
  objDeviceAssetMapping: DeviceAssetMapping[];
  index: number;
  id: number;
  DeviceId: string;
  mappingId: number;
  addObjDeviceAssetMapping: DeviceAssetMapping;
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();

  constructor(public httpClient: HttpClient,
    private router: Router,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private deviceService: DeviceService,
    private deviceTransfarmer: DeviceTransfarmer,
    private deviceAssetMappingTransfarmer: DeviceAssetMappingTransfarmer,
    private deviceAssetMappingService: DeviceAssetMappingService,
    public dialog: MatDialog,
    public dataService: DeviceAssetDataService,
    private globalService: GlobalService,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
        ControlDeviceCode: {
        required: 'Device is required.',
      }
    };
    this.formErrors = {
      ControlisActive: '',
    };
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;


  ngOnInit() {
    this.deviceService.fillDrpAnswers().subscribe(
      (par) => {
        this.deviceObj = this.deviceTransfarmer.DeviceTransfarmers(par);
      },
      (err: any) => console.log(err));
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew() {
    const dialogRef = this.dialog.open(DeviceAssetAddDialogComponent, {
    
      data: {
       // isQuestionMandatory: ''.toString(),
      
        deviceId: this.DeviceId,        
        isActive: ''.toString(),
        updateFlag: '1'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.insertData.dataChange.value.push(this.dataService.getDialogData());  
        this.refreshTable();
      }
    });
  }

  save(): void {
    if (this.DeviceId === undefined) {
      this.defaultLayoutComponent.Massage('Somethig Wrong',
        'Please select device name', 'modal-danger');
      return;
    }
    if (this.dataSource.filteredData.length < 1) {
      this.defaultLayoutComponent.Massage('Somethig Wrong',
        'No Item Found', 'modal-danger');
      return;
    }
    this.dataSource.filteredData.forEach(element => {
      element.deviceId = this.DeviceId;
      element.updateFlag = this.DeviceId;
      element.createdBy = localStorage.getItem('username');
      element.createdDate = this.globalService.GerCurrntDateStamp();
      element.modifiedBy = localStorage.getItem('username');
      element.modifiedDate = this.globalService.GerCurrntDateStamp();
    });
    this.objDeviceAssetMapping = [];
    this.objDeviceAssetMapping = this.dataSource.filteredData.filter(e => {
    });   
    
    this.deviceAssetMappingService.Save(this.deviceAssetMappingTransfarmer.
      ObjectToEntityDeviceAssetMappingTransfarmers (this.insertData.dataChange.value)).subscribe(
        (par) => {
          if (par.status === 'Success') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['DeviceAssetMapping']);
            this.DeviceId = this.DeviceId;
          }
        }
      );
    }

    DeviceChange(event) {
    const target = event.source.selected._element.nativeElement;
    const selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };
    this.objDeviceAssetMapping = [];
     
  
    this.insertData.dataChange.value.splice(0);

    this.exampleDatabase.dataChange.value.splice(0, 100);
    this.refreshTable();
    this.deviceAssetMappingService.getDeviceAssetMapping(selectedData.value).subscribe(
      (par) => {
        this.objDeviceAssetMapping = this.deviceAssetMappingTransfarmer.
        DeviceAssetMappingTransfarmers(par);
        this.objDeviceAssetMapping.forEach(a => {
          a.deviceId = selectedData.value;
        });
        this.objDeviceAssetMapping.forEach(element => {
          this.exampleDatabase.dataChange.value.push(element);
          this.refreshTable();
        });

      },
      (err: any) => console.log(err));
  }

  startEdit(i: number,
    daId: number,
    assetCode: string,   
    sortBy: string,
    isActive: string) {
    this.id = daId;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(DeviceAssetEditDialogComponent,{
      data: {
        daId: daId,
        assetCode: assetCode, 
        sortBy: sortBy,
        isActive: isActive,
        updateFlag: '1'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.daId === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
         // Added by ...
        const findInsertIndex = this.insertData.dataChange.value.findIndex(x => x.daId === this.id);
        if(findInsertIndex > -1){
          this.insertData.dataChange.value[findInsertIndex] = this.dataService.getDialogData(); 
        }else{
          this.insertData.dataChange.value.push(this.exampleDatabase.dataChange.value[foundIndex]);
        }        
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  /*deleteItem(i: number, FormQuestionsAnswerMapping: number, Questions: string, QuestionsMandatory: string,
    FormQuestionssequence: string, answer: string, QuestionsGroup: string, NextForm: string) {
    this.index = i;
    this.id = FormQuestionsAnswerMapping;
    const dialogRef = this.dialog.open(ProcessDeleteDialogComponent, {
      data: {
        FormQuestionsAnswerMapping: FormQuestionsAnswerMapping,
        Questions: Questions, QuestionsMandatory: QuestionsMandatory,
        FormQuestionssequence: FormQuestionssequence, answer: answer,
        QuestionsGroup: QuestionsGroup, NextForm: NextForm
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x =>
          x.udmId === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }*/


  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  public loadData() {
    this.exampleDatabase = new DeviceAssetDataService(this.httpClient);
    this.insertData = new DeviceAssetDataService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);

  }
}

export class ExampleDataSource extends DataSource<DeviceAssetMapping> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: DeviceAssetMapping[] = [];
  renderedData: DeviceAssetMapping[] = [];

  constructor(public _exampleDatabase: DeviceAssetDataService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<DeviceAssetMapping[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];
    this._exampleDatabase.getAllDeviceAssetMappings();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((deviceAssetMapping: DeviceAssetMapping) => {
        const searchStr = (deviceAssetMapping.daId + deviceAssetMapping.assetCode
          + deviceAssetMapping.sortBy + deviceAssetMapping.isActiveText).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    }
    ));
  }

  disconnect() { }

  /** Returns a sorted copy of the database data. */
  sortData(data: DeviceAssetMapping[]): DeviceAssetMapping[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'DeviceAssetMapping': [propertyA, propertyB] = [a.daId, b.daId]; break;
        case 'AssetText': [propertyA, propertyB] = [a.assetCodeText, b.assetCodeText]; break;
        case 'SortBy': [propertyA, propertyB] = [a.sortBy, b.sortBy]; break;      
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

/*import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProcessService1 } from '../../../Components/Services/Masters/ProcessService1';
import { FormService} from '../../../Components/Services/Masters/FormService';

@Component({
  selector: 'app-process-form-mapping',
  templateUrl: './process-form-mapping.component.html',
 // styleUrls: ['./create-account.component.css']
})
export class ProcessFormMappingComponent implements OnInit {
  processFormMappingForm: FormGroup;
  processes : {};
  forms: {}; 

  constructor(private processService1: ProcessService1, private formService: FormService) { } 
  ngOnInit() {
    this.processService1.fillDrpProcess().subscribe(
      data => this.processes = data
    );

    this.formService.fillDrpForms().subscribe(
      data => this.forms = data
    );

    this.processFormMappingForm = new FormGroup({
      country: new FormControl(''),
      form: new FormControl(''),     
    });
  }
}*/