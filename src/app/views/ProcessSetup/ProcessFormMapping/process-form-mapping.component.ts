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
import { ProcessTransfarmer1 } from '../../../Components/Transformer/Masters/Process-Transfarmer1';
import { ProcessFormMapping } from '../../../Components/Module/ProcessSetup/ProcessFormMapping.model';
import { ProcessFormMappingTransfarmer } from '../../../Components/Transformer/ProcessSetup/ProcessFormMapping-Transfarmer';
import { ProcessFormMappingService } from '../../../Components/Services/ProcessSetup/ProcessFormMappingService';
import { DefaultLayoutComponent } from '../../../containers';
import { Router } from '@angular/router';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { ProcessService1 } from '../../../Components/Services/Masters/ProcessService1';
import { CustomComboBox } from '../../../Components/Module/GlobalModule/CustomComboBox.model';

@Component({
  selector: 'app-process-form-mapping',
  templateUrl: './process-form-mapping.component.html',
  styleUrls: ['./process-form-mapping.component.scss']
})

export class ProcessFormMappingComponent extends FormComponentBase
  implements OnInit {

  processObj: Process[];
  displayedColumns = ['ProcFormMapping', 'FormText', 'ActiveText', 'actions'];
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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;


  @ViewChild('auto', null) auto: any;  
  keyword = 'name';
  data: CustomComboBox[];
  hidePassword: boolean = true;
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

  selectEvent(item) {
    const selectedData = {
      value: item.id,
      text: item.name
    };
    this.ProcessId = selectedData.value;
    this.objProcessFormMapping = [];
    // Added by Rahul
    this.insertData.dataChange.value.splice(0);
    this.exampleDatabase.dataChange.value.splice(0,10000);
    this.refreshTable();
    this.processformMappingService.getProcessFormMapping(selectedData.value).subscribe(
      (par) => {
        console.log();
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
  my() {
    this.hidePassword = !this.hidePassword;
    var name = document.getElementById('auto');
    //  alert(name);
    this.auto.focus();
    name.focus();
  }
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    this.hidePassword = !this.hidePassword;
    // do something when input is focused
  }
  myFunction() {
    // alert('a');
  }
  ngOnInit() {
    this.processService.fillDrpProcess().subscribe(
      (par) => {
        this.processObj = this.processTransfarmer.processTransfarmers(par);
        
    this.data = [];
    this.processObj.forEach(a => {
      this.data.push({ id: a.processId, name: a.processName })
    })
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
    if (this.ProcessId === undefined) {
      this.defaultLayoutComponent.Massage('Technical Error Please connect to Ajax Support team',
        'Please select process name', 'modal-danger');
      return;
    }
    if (this.dataSource.filteredData.length < 1) {
      this.defaultLayoutComponent.Massage('Technical Error Please connect to Ajax Support team',
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
    this.objProcessFormMapping = [];
    this.objProcessFormMapping = this.dataSource.filteredData.filter(e => {
    });
    this.processformMappingService.Save(this.processFormMappingTransfarmer.
      ObjectToEntityProcessFormMappingTransfarmers(this.insertData.dataChange.value)).subscribe(
        (par) => {
          if (par.status === 'Success') {
            this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['ProcessFormMapping']);
            this.ProcessId = this.ProcessId;
            this.GetRouteData(this.ProcessId);
          }
          else if (par.status === 'Failed') {
            this.defaultLayoutComponent.Massage('',
              'Form already exist', 'modal-info');
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
  }

  GetRouteData(formId: string): void {
    const selectedData = {
      value: formId,
      text: formId
    };
    this.objProcessFormMapping = [];
    this.insertData.dataChange.value.splice(0);

    this.exampleDatabase.dataChange.value.splice(0,10000);
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

  FormChange(event) {
    const target = event.source.selected._element.nativeElement;
    const selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };
    this.objProcessFormMapping = [];
    // Added by Rahul
    this.insertData.dataChange.value.splice(0);
    this.exampleDatabase.dataChange.value.splice(0,10000);
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
    formText: string,
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
        formName: formText,
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
        if (findInsertIndex > -1) {
          this.insertData.dataChange.value[findInsertIndex] = this.dataService.getDialogData();
        } else {
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
