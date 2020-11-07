import { DataSource } from '@angular/cdk/table';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../Components/Module/environment';
import { UserGroup } from '../../../Components/Module/Masters/UserGroup.model';
import { UserGroupMapping } from '../../../Components/Module/ProcessSetup/UserGroupMapping.model';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { UserGroupService } from '../../../Components/Services/Masters/UserGroupService';
import { UserGroupMappingService } from '../../../Components/Services/ProcessSetup/UserGroupMappingService';
import { UserGroupTransfarmer } from '../../../Components/Transformer/Masters/UserGroup-Transfarmer';
import { UserGroupMappingTransfarmer } from '../../../Components/Transformer/ProcessSetup/UserGroupMapping-Teansfarmet';
import { DefaultLayoutComponent } from '../../../containers';
import { CrossFieldErrorMatcher } from '../../Masters/AngularDemo/infrastructure/cross-field-error-matcher';
import { FormComponentBase } from '../../Masters/AngularDemo/infrastructure/form-component-base';
import { UserGroupUserMappingAddDialogComponent } from './dialogs/add/UserGroupMappingadd.dialog.component';
import { UserGroupMappingEditDialogComponent } from './dialogs/edit/UserGroupMappingedit.dialog.component';
import { UserGroupMappingDataService } from './userdevicedata.service';

@Component({
  selector: 'app-user-group-mapping',
  templateUrl: './user-group-mapping.component.html',
  styleUrls: ['./user-group-mapping.component.scss']
})
export class UserGroupMappingComponent extends FormComponentBase
  implements OnInit {

  env = environment;
  userGroupObj: UserGroup[];
  displayedColumns = ['UserGroupMapping', 'UserText', 'SortBy', 'ActiveText', 'actions'];
  exampleDatabase: UserGroupMappingDataService | null;
  insertData: UserGroupMappingDataService | null;
  dataSource: ExampleDataSource | null;
  objUserGroupMapping: UserGroupMapping[];
  index: number;
  ugmId: number;
  userGroupId: string;
  mappingId: number;
  addObjUserGroupMapping: UserGroupMapping;
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  constructor(public httpClient: HttpClient,
    private router: Router,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private userGroupService: UserGroupService,
    private userGroupTransfarmer: UserGroupTransfarmer,
    private userGroupMappingTransfarmer: UserGroupMappingTransfarmer,
    private userGroupMappingService: UserGroupMappingService,
    public dialog: MatDialog,
    public dataService: UserGroupMappingDataService,
    private globalService: GlobalService,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControluserGroupCode: {
        required: 'User Group is required.',
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
    this.userGroupService.fillDrpUserGroups().subscribe(
      (par) => {
        this.userGroupObj = this.userGroupTransfarmer.UserGroupTransfarmers(par);
      },
      (err: any) => console.log(err));
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew() {
    const dialogRef = this.dialog.open(UserGroupUserMappingAddDialogComponent, {

      data: {
        // isQuestionMandatory: ''.toString(),

        userGroupId: this.userGroupId,
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
    if (this.userGroupId === undefined) {
      this.defaultLayoutComponent.Massage('Technical Error Please connect to Ajax Support team',
        'Please select device name', 'modal-danger');
      return;
    }
    if (this.dataSource.filteredData.length < 1) {
      this.defaultLayoutComponent.Massage('Technical Error Please connect to Ajax Support team',
        'No Item Found', 'modal-danger');
      return;
    }
    this.dataSource.filteredData.forEach(element => {
      element.userGroupId = this.userGroupId;
      element.ouCode = this.env.OuCode;
      if (element.ugmId === undefined)
        element.ugmId = null;
      element.createdBy = localStorage.getItem('username');
      // element.updateFlag = this.DeviceId;
      element.createdBy = localStorage.getItem('username');
      element.createdDate = this.globalService.GerCurrntDateStamp();
      element.modifiedBy = localStorage.getItem('username');
      element.modifiedDate = this.globalService.GerCurrntDateStamp();
    });
    this.objUserGroupMapping = [];
    this.objUserGroupMapping = this.dataSource.filteredData.filter(e => {
    });
    this.userGroupMappingService.Save(this.userGroupMappingTransfarmer.
      ObjectToEntityUserGroupMappingTransfarmers(this.dataSource.filteredData)).subscribe(
        (par) => {
          if (par.status === 'Success') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['UserGroupMapping']);
            this.userGroupId = this.userGroupId;
            this.GetRouteData(this.userGroupId);
          }
          else if (par.status === 'Failed') {
            this.defaultLayoutComponent.Massage('',
              'Duplicate Login Id Found', 'modal-info');
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
  }

  GetRouteData(loginId: string): void {
    const selectedData = {
      value: loginId,
      text: loginId
    };
    this.objUserGroupMapping = [];
    this.insertData.dataChange.value.splice(0);

    this.exampleDatabase.dataChange.value.splice(0,10000);
    this.refreshTable();
    this.userGroupMappingService.getUserGroupMapping(selectedData.value).subscribe(
      (par) => {
        this.objUserGroupMapping = this.userGroupMappingTransfarmer.
          UserGroupMappingTransfarmers(par);
        this.objUserGroupMapping.forEach(a => {
          a.userGroupId = selectedData.value;
        });
        this.objUserGroupMapping.forEach(element => {
          this.exampleDatabase.dataChange.value.push(element);
          this.refreshTable();
        });

      },
      (err: any) => console.log(err));
  }

  DeviceChange(event) {
    const target = event.source.selected._element.nativeElement;
    const selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };
    this.objUserGroupMapping = [];
    this.insertData.dataChange.value.splice(0);
    this.exampleDatabase.dataChange.value.splice(0,10000);
    this.refreshTable();
    this.userGroupMappingService.getUserGroupMapping(selectedData.value).subscribe(
      (par) => {
        this.objUserGroupMapping = this.userGroupMappingTransfarmer.
          UserGroupMappingTransfarmers(par);
        this.objUserGroupMapping.forEach(a => {
          a.userGroupId = selectedData.value;
        });
        this.objUserGroupMapping.forEach(element => {
          this.exampleDatabase.dataChange.value.push(element);
          this.refreshTable();
        });

      },
      (err: any) => console.log(err));
  }

  startEdit(i: number,
    ugmId: number,
    loginId: string,
    sortBy: string,
    isActive: string) {
    this.ugmId = ugmId;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(UserGroupMappingEditDialogComponent, {
      data: {
        ugmId: ugmId,
        loginId: loginId,
        sortBy: sortBy,
        isActive: isActive,
        updateFlag: '1'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.ugmId === this.ugmId);
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        const findInsertIndex = this.insertData.dataChange.value.findIndex(x => x.ugmId === this.ugmId);
        if (findInsertIndex > -1) {
          this.insertData.dataChange.value[findInsertIndex] = this.dataService.getDialogData();
        } else {
          this.insertData.dataChange.value.push(this.exampleDatabase.dataChange.value[foundIndex]);
        } this.refreshTable();
      }
    });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  public loadData() {
    this.exampleDatabase = new UserGroupMappingDataService(this.httpClient);
    this.insertData = new UserGroupMappingDataService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);

  }
}

export class ExampleDataSource extends DataSource<UserGroupMapping> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: UserGroupMapping[] = [];
  renderedData: UserGroupMapping[] = [];

  constructor(public _exampleDatabase: UserGroupMappingDataService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserGroupMapping[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllUserGroupMappings();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((userGroupMapping: UserGroupMapping) => {
        const searchStr = (userGroupMapping.ugmId + userGroupMapping.userGroupId
          + userGroupMapping.sortBy + userGroupMapping.isActiveText).toLowerCase();
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
  sortData(data: UserGroupMapping[]): UserGroupMapping[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'UserGroupMapping': [propertyA, propertyB] = [a.ugmId, b.ugmId]; break;
        case 'LoginText': [propertyA, propertyB] = [a.userGroupId, b.userGroupId]; break;
        case 'SortBy': [propertyA, propertyB] = [a.sortBy, b.sortBy]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
