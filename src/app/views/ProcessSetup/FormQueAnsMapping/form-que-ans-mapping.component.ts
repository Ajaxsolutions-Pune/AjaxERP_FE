import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from './data.service';
import { FormComponentBase } from '../../Masters/AngularDemo/infrastructure/form-component-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrossFieldErrorMatcher } from '../../Masters/AngularDemo/infrastructure/cross-field-error-matcher';
import { FormObj } from '../../../Compound/Module/Masters/Form.model';
import { FormService } from '../../../Compound/Services/Masters/FormService';
import { FormTransfarmer } from '../../../Compound/Transformer/Masters/Form-Transfarmer';
import { FormQueAnsMapping } from '../../../Compound/Module/ProcessSetup/FormQueAnsMapping.model';
import { FormQueAnsMappingTransfarmer } from '../../../Compound/Transformer/ProcessSetup/FormQueAnsMapping-Transfarmer';
import { FormQueAnsMappingService } from '../../../Compound/Services/ProcessSetup/FormQueAnsMappingService';

@Component({
  selector: 'app-form-que-ans-mapping',
  templateUrl: './form-que-ans-mapping.component.html',
  styleUrls: ['./form-que-ans-mapping.component.scss']
})
export class FormQueAnsMappingComponent extends FormComponentBase
  implements OnInit {

  formObj: FormObj[];
  displayedColumns = ['FormQuestionsAnswerMapping', 'QuestionsText'
    , 'QuestionsMandatoryText', 'FormQuestionssequence', 'answerText',
    'QuestionsGroup', 'nextQueGroup', 'NextFormText', 'ActiveText', 'actions'];
  exampleDatabase: DataService | null;
  dataSource: ExampleDataSource | null;
  objFormQueAnsMapping: FormQueAnsMapping[];
  index: number;
  id: number;
  FormId: string;
  mappingId: number;
  addObjFormQueAnsMapping: FormQueAnsMapping;
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();

  constructor(public httpClient: HttpClient,
    private formService: FormService,
    private formTransfarmer: FormTransfarmer,
    private formQueAnsMappingTransfarmer: FormQueAnsMappingTransfarmer,
    private formQueAnsMappingService: FormQueAnsMappingService,
    public dialog: MatDialog,
    public dataService: DataService,
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

    this.formService.getForms().subscribe(
      (par) => {
        this.formObj = this.formTransfarmer.fTransfarmers(par);
        this.FormId = '55';
      },
      (err: any) => console.log(err));
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {
        isQuestionMandatory: ''.toString(),
        isActive: ''.toString()
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });


  }

  FormChange(event) {
    const target = event.source.selected._element.nativeElement;
    const selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };
    this.objFormQueAnsMapping = [];

    this.exampleDatabase.dataChange.value.splice(0, 100);
    this.refreshTable();
    this.formQueAnsMappingService.getFormQueAnsMapping(selectedData.value).subscribe(
      (par) => {
        this.objFormQueAnsMapping = this.formQueAnsMappingTransfarmer.
          FormQueAnsMappingTransfarmers(par);
        this.objFormQueAnsMapping.forEach(a => {
          a.formId = selectedData.value;
        });
        this.objFormQueAnsMapping.forEach(element => {
          this.exampleDatabase.dataChange.value.push(element);
          this.refreshTable();
        });

      },
      (err: any) => console.log(err));
  }
  startEdit(i: number,
    fqamId: number,
    questionId: string,
    isQuestionMandatory: string,
    formQueSeqNo: string,
    answerId: string,
    queGroup: string,
    nextQueGroup: string,
    nextFormId: string,
    isActive: string) {
    this.id = fqamId;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        fqamId: fqamId,
        questionId: questionId, isQuestionMandatory: isQuestionMandatory,
        formQueSeqNo: formQueSeqNo, answerId: answerId,
        queGroup: queGroup,
        nextQueGroup: nextQueGroup,
        nextFormId: nextFormId,
        isActive: isActive
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.fqamId === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, FormQuestionsAnswerMapping: number, Questions: string, QuestionsMandatory: string,
    FormQuestionssequence: string, answer: string, QuestionsGroup: string, NextForm: string) {
    this.index = i;
    this.id = FormQuestionsAnswerMapping;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
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
          x.fqamId === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/FormQueAnsMappings/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  public loadData() {
    this.exampleDatabase = new DataService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);

  }
}

export class ExampleDataSource extends DataSource<FormQueAnsMapping> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: FormQueAnsMapping[] = [];
  renderedData: FormQueAnsMapping[] = [];

  constructor(public _exampleDatabase: DataService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<FormQueAnsMapping[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllFormQueAnsMappings();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((formQueAnsMapping: FormQueAnsMapping) => {
        const searchStr = (formQueAnsMapping.fqamId + formQueAnsMapping.isQuestionMandatoryText
          + formQueAnsMapping.queGroup + formQueAnsMapping.isActiveText).toLowerCase();
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
  sortData(data: FormQueAnsMapping[]): FormQueAnsMapping[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'FormQuestionsAnswerMapping': [propertyA, propertyB] = [a.fqamId, b.fqamId]; break;
        case 'FormQuestionssequence': [propertyA, propertyB] = [a.formQueSeqNo, b.formQueSeqNo]; break;
        case 'NextForm': [propertyA, propertyB] = [a.nextFormIdText, b.nextFormIdText]; break;
        case 'Questions': [propertyA, propertyB] = [a.questionIdText, b.questionIdText]; break;
        case 'QuestionsGroup': [propertyA, propertyB] = [a.queGroup, b.queGroup]; break;
        case 'QuestionsMandatory': [propertyA, propertyB] = [a.isQuestionMandatoryText,
        b.isQuestionMandatoryText]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
