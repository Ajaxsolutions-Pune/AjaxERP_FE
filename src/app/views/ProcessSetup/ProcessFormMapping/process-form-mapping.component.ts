import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { ProcessAddDialogComponent } from './dialogs/add/processadd.dialog.component';
import { ProcessEditDialogComponent } from './dialogs/edit/processedit.dialog.component';
import { ProcessDeleteDialogComponent } from './dialogs/delete/processdelete.dialog.component';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProcessDataService } from './processdata.service';
import { FormComponentBase } from '../../Masters/AngularDemo/infrastructure/form-component-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrossFieldErrorMatcher } from '../../Masters/AngularDemo/infrastructure/cross-field-error-matcher';
import { Process } from '../../../Components/Module/Masters/Process.model';
//import { ProcessService1 } from '../../../Components/Services/Masters/FormService';
import { ProcessTransfarmer1 } from '../../../Components/Transformer/Masters/Process-Transfarmer1';
import { ProcessFormMapping } from '../../../Components/Module/ProcessSetup/ProcessFormMapping.model';
import { ProcessFormMappingTransfarmer } from '../../../Components/Transformer/ProcessSetup/ProcessFormMapping-Transfarmer';
import { ProcessFormMappingService } from '../../../Components/Services/ProcessSetup/ProcessFormMappingService';
import { DefaultLayoutComponent } from '../../../containers';
import { Router } from '@angular/router';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { ProcessService1 } from '../../../Components/Services/Masters/ProcessService1';

@Component({
  selector: 'app-process-form-mapping',
  templateUrl: './process-form-mapping.component.html',
  styleUrls:  ['./process-form-mapping.component.scss']
})

export class ProcessFormMappingComponent extends FormComponentBase
  implements OnInit {

  processObj: Process[];
  displayedColumns = ['ProcFormMapping', 'FormText','SortBy',  'ActiveText', 'actions'];
  exampleDatabase: ProcessDataService | null;
  insertData: ProcessDataService | null;
  dataSource: ExampleDataSource | null;
  objProcessFormMapping: ProcessFormMapping[];
  index: number;
  id: number;
  ProcessId: string;
  mappingId: number;
  addObjProcessFormMapping: ProcessFormMapping;
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();

  constructor(public httpClient: HttpClient,
    private router: Router,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private processService: ProcessService1,
    private processTransfarmer: ProcessTransfarmer1,
    private processFormMappingTransfarmer: ProcessFormMappingTransfarmer,
    private processformMappingService: ProcessFormMappingService,
    public dialog: MatDialog,
    public dataService: ProcessDataService,
    private globalService: GlobalService,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlFormCode: {
        required: 'Form is required.',
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
    this.processService.fillDrpProcess().subscribe(
      (par) => {
        this.processObj = this.processTransfarmer.processTransfarmers(par);
      },
      (err: any) => console.log(err));
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew() {
    const dialogRef = this.dialog.open(ProcessAddDialogComponent, {
    
      data: {
       // isQuestionMandatory: ''.toString(),
      
        processId: this.ProcessId,        
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
    console.log(this.ProcessId);
    if (this.ProcessId === undefined) {
      this.defaultLayoutComponent.Massage('Somethig Wrong',
        'Please select process name', 'modal-danger');
      return;
    }
    if (this.dataSource.filteredData.length < 1) {
      this.defaultLayoutComponent.Massage('Somethig Wrong',
        'No Item Found', 'modal-danger');
      return;
    }
    this.dataSource.filteredData.forEach(element => {
      element.processId = this.ProcessId;
      element.updateFlag = this.ProcessId;
      element.createdBy = localStorage.getItem('username');
      element.createdDate = this.globalService.GerCurrntDateStamp();
      element.modifiedBy = localStorage.getItem('username');
      element.modifiedDate = this.globalService.GerCurrntDateStamp();
    });
    console.log(this.processFormMappingTransfarmer.
      ObjectToEntityProcessFormMappingTransfarmers(this.dataSource.filteredData));
    this.objProcessFormMapping = [];
    this.objProcessFormMapping = this.dataSource.filteredData.filter(e => {
      console.log(e.updateFlag);
    });

    // Added by Rahul 
    this.insertData.dataChange.value.forEach(element => {
      console.log('Id ->'+element.pfmId +' Is_active -->'+element.isActive);  
      console.log('CreatedDate ->'+element.createdBy +' CreatedDate -->'+element.createdDate);
      console.log('FormId ->'+element.formId +' FormQueSeqNo -->'+element.formId);
      console.log('SortBy ->'+element.formId +' SortBy -->'+element.sortBy);
      console.log('ModifyBy ->'+element.modifiedBy +' ModifyDate -->'+element.modifiedDate);
      console.log('Update flag ->'+element.updateFlag );     
    });
    
    console.log('DataChange -->'+this.insertData.dataChange.value);
    
    this.processformMappingService.Save(this.processFormMappingTransfarmer.
      ObjectToEntityProcessFormMappingTransfarmers(this.insertData.dataChange.value)).subscribe(
        (par) => {
          console.log(par);
          if (par.status === 'Success') {
            console.log(par.status);
            this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['ProcessFormMapping']);
            this.ProcessId = this.ProcessId;
          }
        }
      );
  }

  FormChange(event) {
    const target = event.source.selected._element.nativeElement;
    const selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };
    this.objProcessFormMapping = [];
     
    // Added by Rahul 
    this.insertData.dataChange.value.splice(0);

    this.exampleDatabase.dataChange.value.splice(0, 100);
    this.refreshTable();
    this.processformMappingService.getProcessFormMapping(selectedData.value).subscribe(
      (par) => {
        this.objProcessFormMapping = this.processFormMappingTransfarmer.
        ProcessFormMappingTransfarmers(par);
        this.objProcessFormMapping.forEach(a => {
          a.processId = selectedData.value;
        });
        this.objProcessFormMapping.forEach(element => {
          this.exampleDatabase.dataChange.value.push(element);
          this.refreshTable();
        });

      },
      (err: any) => console.log(err));
  }



  startEdit(i: number,
    pfmId: number,
    formId: string,   
    sortBy: string,
    isActive: string) {
    this.id = pfmId;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(ProcessEditDialogComponent, {
      data: {
        pfmId: pfmId,
        formId: formId, 
        sortBy: sortBy,
        isActive: isActive,
        updateFlag: '1'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.pfmId === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
         // Added by Rahul
        const findInsertIndex = this.insertData.dataChange.value.findIndex(x => x.pfmId === this.id);
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

  deleteItem(i: number, FormQuestionsAnswerMapping: number, Questions: string, QuestionsMandatory: string,
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
          x.pfmId === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  public loadData() {
    this.exampleDatabase = new ProcessDataService(this.httpClient);
    this.insertData = new ProcessDataService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);

  }
}

export class ExampleDataSource extends DataSource<ProcessFormMapping> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: ProcessFormMapping[] = [];
  renderedData: ProcessFormMapping[] = [];

  constructor(public _exampleDatabase: ProcessDataService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ProcessFormMapping[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllProcessFormMappings();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((processFormMapping: ProcessFormMapping) => {
        const searchStr = (processFormMapping.pfmId + processFormMapping.formName
          + processFormMapping.sortBy + processFormMapping.isActiveText).toLowerCase();
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
  sortData(data: ProcessFormMapping[]): ProcessFormMapping[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'FormQuestionsAnswerMapping': [propertyA, propertyB] = [a.pfmId, b.pfmId]; break;
        case 'FormText': [propertyA, propertyB] = [a.formName, b.formName]; break;
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