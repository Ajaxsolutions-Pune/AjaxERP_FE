import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { Issue } from './Issue';

@Component({
  selector: 'app-form-que-ans-mapping',
  templateUrl: './form-que-ans-mapping.component.html',
  styleUrls: ['./form-que-ans-mapping.component.scss']
})
export class FormQueAnsMappingComponent implements OnInit {
  displayedColumns = ['FormQuestionsAnswerMapping', 'Questions'
    , 'QuestionsMandatory', 'FormQuestionssequence', 'answer',
    'QuestionsGroup', 'NextForm', 'Active', 'actions'];
  exampleDatabase: DataService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: string;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public dataService: DataService) { }

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew() {
    console.log(this.dataSource);
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { issue: Issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number,
    FormQuestionsAnswerMapping: string,
    Questions: string,
    QuestionsMandatory: string,
    FormQuestionssequence: string,
    answer: string,
    QuestionsGroup: string,
    NextForm: string,
    Active: string) {
    this.id = FormQuestionsAnswerMapping;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(Active);
    console.log(this.index);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        FormQuestionsAnswerMapping: FormQuestionsAnswerMapping,
        Questions: Questions, QuestionsMandatory: QuestionsMandatory,
        FormQuestionssequence: FormQuestionssequence, answer: answer,
        QuestionsGroup: QuestionsGroup,
        NextForm: NextForm,
        Active: Active
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.FormQuestionsAnswerMapping === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }
  deleteItem(i: number, FormQuestionsAnswerMapping: string, Questions: string, QuestionsMandatory: string,
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
          x.FormQuestionsAnswerMapping === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  /*   // If you don't need a filter or a pagination this can be simplified, you just use code from else block
    // OLD METHOD:
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }*/



    public loadData() {
      this.exampleDatabase = new DataService(this.httpClient);
      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
      fromEvent(this.filter.nativeElement, 'keyup')
        // .debounceTime(150)
        // .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) {
            return;
          }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
    }
}

export class ExampleDataSource extends DataSource<Issue> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Issue[] = [];
  renderedData: Issue[] = [];

  constructor(public _exampleDatabase: DataService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Issue[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllIssues();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((issue: Issue) => {
        const searchStr = (issue.FormQuestionsAnswerMapping + issue.Questions
          + issue.QuestionsGroup + issue.Active).toLowerCase();
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
  sortData(data: Issue[]): Issue[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'FormQuestionsAnswerMapping': [propertyA, propertyB] = [a.FormQuestionsAnswerMapping, b.FormQuestionsAnswerMapping]; break;
        case 'FormQuestionssequence': [propertyA, propertyB] = [a.FormQuestionssequence, b.FormQuestionssequence]; break;
        case 'NextForm': [propertyA, propertyB] = [a.NextForm, b.NextForm]; break;
        case 'Questions': [propertyA, propertyB] = [a.Questions, b.Questions]; break;
        case 'QuestionsGroup': [propertyA, propertyB] = [a.QuestionsGroup, b.QuestionsGroup]; break;
        case 'QuestionsMandatory': [propertyA, propertyB] = [a.QuestionsMandatory,
        b.QuestionsMandatory]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
