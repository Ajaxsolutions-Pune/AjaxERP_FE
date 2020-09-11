import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { CookieService } from 'ngx-cookie-service';

import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { AppComponent } from './app.component';
// Import containers
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule, routes } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './views/dashboard/dashboard/dashboard.component'; // import bn-ng-idle service
import { DashboardService } from './Components/Services/Dashboard.service';


import { LogIn } from './Components/Module/login.model';
import { LogInService } from './Components/Services/LogIn.service';
import { LogInComponent } from './Components/login/login.component';
import { User } from './Components/Module/User.model';
import { UserService } from './Components/Services/User.Service';
import { BnNgIdleService } from 'bn-ng-idle';
import { RouterModule } from '@angular/router';
import { ListUserComponent } from './views/Masters/User/List-user.component';
import { UserMasterComponent } from './views/Masters/User/user-master.component';
import { ListUOMComponent } from './views/Masters/UOM/list-uom.component';
import { UnitComponent } from './views/Masters/UOM/unit.component';
import { UOMService } from './Components/Services/Masters/UOMService';
import { CountryComponent } from './views/Masters/Country/country.component';
import { CountryService } from './Components/Services/Masters/CountryService';
import { CountryListComponent } from './views/Masters/Country/country-list.component';
import { UOM } from './Components/Module/Masters/UOM.model';
import { BrandListComponent } from './views/Masters/Brand/brand-list.component';
import { BrandService } from './Components/Services/Masters/BrandService';
import { BrandComponent } from './views/Masters/Brand/brand.component';
import { StateComponent } from './views/Masters/State/state.component';
import { StateService } from './Components/Services/Masters/StateService';
import { StateListComponent } from './views/Masters/State/state-list.component';
import { CityListComponent } from './views/Masters/City/city-list.component';
import { ManufactureListComponent } from './views/Masters/Manufacture/manufacture-list.component';
import { manufactureComponent } from './views/Masters/Manufacture/manufacture.component';
import { CityService } from './Components/Services/Masters/CityService';
import { CityComponent } from './views/Masters/City/city.component';
import { MFGService } from './Components/Services/Masters/MFGService';
import { DistrictListComponent } from './views/Masters/District/district-list.component';
import { DistrictComponent } from './views/Masters/District/district.component';
import { CityGroupListComponent } from './views/Masters/CityGroup/city-group-list.component';
import { DistrictService } from './Components/Services/Masters/DistrictService';
import { CityGroupComponent } from './views/Masters/CityGroup/city-group.component';
import { CityGroupService } from './Components/Services/Masters/CityGroupService';
import { TaxCategoryListComponent } from './views/Masters/TaxCategory/tax-category-list.component';
import { TaxCategoryComponent } from './views/Masters/TaxCategory/tax-category.component';
import { TaxCategoryService } from './Components/Services/Masters/TaxCategoryService';
import { CastCategoryListComponent } from './views/Masters/CastCategory/cast-category-list.component';
import { CastCategoryComponent } from './views/Masters/CastCategory/cast-category.component';
import { CastCategoryService } from './Components/Services/Masters/CastCategoryService';
import { CastListComponent } from './views/Masters/Cast/cast-list.component';
import { CastComponent } from './views/Masters/Cast/cast.component';
import { CastService } from './Components/Services/Masters/CastService';
import { TehsilListComponent } from './views/Masters/Tehsil/tehsil-list.component';
import { TehsilComponent } from './views/Masters/Tehsil/tehsil.component';
import { TehsilService } from './Components/Services/Masters/TehsilService';
import { ItemCategoryListComponent } from './views/Masters/ItemCategory/item-category-list.component';
import { ItemCategoryComponent } from './views/Masters/ItemCategory/item-category.component';
import { ItemCategoryService } from './Components/Services/Masters/ItemCategoryService';
import { ItemGroup } from './Components/Module/Masters/ItemGroup.model';
import { ItemGroupComponent } from './views/Masters/Item/item-group.component';
import { ItemSubGroupComponent } from './views/Masters/Item/item-sub-group.component';
import { ItemSubGroupService } from './Components/Services/Masters/ItemSubGroupService';
import { ItemGroupService } from './Components/Services/Masters/ItemGroupService';
import { ItemGroupListComponent } from './views/Masters/Item/item-group-list.component';
import { ItemSubGroupListComponent } from './views/Masters/Item/item-sub-group-list.component';
import { StateTransfarmer } from './Components/Transformer/Masters/State-transformer';
import { BrandTransformer } from './Components/Transformer/Masters/Brand-Transformer';
import { StateListResolverService } from './Components/Resolver/State-List-Resolver.service';
import { CountryResolverService } from './Components/Resolver/Masters/CountryListResolverService';
import { CountryTransfarmer } from './Components/Transformer/Masters/Country-Transfarmer';
import { BrandListResolverService } from './Components/Resolver/Masters/Brand-List-Resolver.Service';
import { DistrictListResolverService } from './Components/Resolver/Masters/District-List-Resolver-Service';
import { DistrictTransfarmer } from './Components/Transformer/Masters/District-Transformer';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DistrictMasterResolverService } from './Components/Resolver/Masters/District-MasterResolver';
import { TehsilTransfarmer } from './Components/Transformer/Masters/Tehsil-Transfarmer';
import { TehsilListResolverService } from './Components/Resolver/Masters/Tehsil-List-Resolver.Service';
import { TehsilMasterResolverService } from './Components/Resolver/Masters/Tehsil-Master-Resolver.Service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './Components/Services/token-interceptor.service';
import { AnswerListComponent } from './views/Masters/Answer/answer-list/answer-list.component';
import { AnswerComponent } from './views/Masters/Answer/answer/answer.component';
import { AnswerTransfarmer } from './Components/Transformer/Masters/Answer-Transfarmer';
import { FormListComponent } from './views/Masters/Form/form-list/form-list.component';
import { FormComponent } from './views/Masters/Form/form/form.component';
import { ProcessComponent } from './views/Masters/Process/process/process.component';
import { ProcessListComponent } from './views/Masters/Process/process-list/process-list.component';
import { QuestionTypeListComponent } from './views/Masters/Question/question-type-list.component';
import { AnswerListResolverService } from './Components/Resolver/Masters/Answer-List-Resolver.Service';
import { AnswerService } from './Components/Services/Masters/AnswerService';
import { HttpModule } from '@angular/http';
import { FormTransfarmer } from './Components/Transformer/Masters/Form-Transfarmer';
import { FormService } from './Components/Services/Masters/FormService';
import { FormListResolverService } from './Components/Resolver/Masters/Form-List-Resolver.Service';
import { ProcessService1 } from './Components/Services/Masters/ProcessService1';
import { ProcessListResolverService } from './Components/Resolver/Masters/Process-List-Resolver.Service';
import { ProcessTransfarmer1 } from './Components/Transformer/Masters/Process-Transfarmer1';
import { QuestionListComponent } from './views/Masters/Question/question-list.component';
import { QuestionTransfarmer } from './Components/Transformer/Masters/Question-Transfarmer';
import { QuestionService } from './Components/Services/Masters/QuestionService';
import { QuestionListResolverService } from './Components/Resolver/Masters/Question-List-Resolver-Service';
import { QuestionComponent } from './views/Masters/Question/question.component';
import { QuestionTypeComponent } from './views/Masters/Question/question-type.component';
import { QaTypeTransfarmer } from './Components/Transformer/Masters/QaType-Transfarmer';
import { QaTypeListResolverService } from './Components/Resolver/Masters/QaType-List-Resolver.Service';
import { QaTypeService } from './Components/Services/Masters/QaTypeService';
import { ZoneListComponent } from './views/Masters/Zone/zone-list.component';
import { ZoneComponent } from './views/Masters/Zone/zone.component';
import { RegionComponent } from './views/Masters/Region/region.component';
import { RegionListComponent } from './views/Masters/Region/region-list.component';
import { ColourListComponent } from './views/Masters/Colour/colour-list.component';
import { ColourComponent } from './views/Masters/Colour/colour.component';
import { AssetGroupComponent } from './views/Masters/AssetGroup/asset-group.component';
import { AssetGroupListComponent } from './views/Masters/AssetGroup/asset-group-list.component';
import { CircleComponent } from './views/Masters/Circle/circle.component';
import { CircleListComponent } from './views/Masters/Circle/circle-list.component';
import { ClusterListComponent } from './views/Masters/Cluster/cluster-list.component';
import { ClusterComponent } from './views/Masters/Cluster/cluster.component';
import { AssetCategoryListComponent } from './views/Masters/AssetCategory/asset-category-list.component';
import { AssetCategoryComponent } from './views/Masters/AssetCategory/asset-category.component';
import { AssetComponent } from './views/Masters/Asset/asset.component';
import { AssetListComponent } from './views/Masters/Asset/asset-list.component';
import { DeviceListComponent } from './views/Masters/Device/device-list.component';
import { DeviceComponent } from './views/Masters/Device/device.component';
import { DialogService } from './Components/Services/MatServices/Dialog.service';
import { DialogTemplateComponent } from './Components/Services/MatServices/dialog-template.component';
import {
  MatInputModule, MatDialogModule, MatButtonModule,
  ShowOnDirtyErrorStateMatcher, ErrorStateMatcher, MatFormFieldModule, MatIconModule,
  MAT_CHECKBOX_CLICK_ACTION, MatCheckboxModule, MatSelectModule, MatCardModule,
  MatSortModule, MatTableModule, MatToolbarModule, MatPaginatorModule
} from '@angular/material';
import { AngularDemoComponent } from './views/Masters/AngularDemo/angular-demo.component';
import { AssetTransfarmer } from './Components/Transformer/Masters/Asset-Transfarmer';
import { AssetListResolverService } from './Components/Resolver/Masters/Asset-List-Resolver.Service';
import { AssetService } from './Components/Services/Masters/AssetService';
import { AssetGroupTransfarmer } from './Components/Transformer/Masters/AssetGroup-Transfarmer';
import { AssetGroupService } from './Components/Services/Masters/AssetGroupService';
import { AssetGroupListResolverService } from './Components/Resolver/Masters/AssetGroup-List-Resolver-Service';
import { ZoneService } from './Components/Services/Masters/ZoneService';
import { ZoneListResolverService } from './Components/Resolver/Masters/Zone-List-Resolver.Service';
import { ZoneTransfarmer } from './Components/Transformer/Masters/ZoneTransfarmer';
import { CircleListResolverService } from './Components/Resolver/Masters/Circle-List-Resolver.Service';
import { CircleTransfarmer } from './Components/Transformer/Masters/Circle-Transfarmer';
import { CircleService } from './Components/Services/Masters/CircleService';
import { ClusterService } from './Components/Services/Masters/ClusterService';
import { ClusterTransfarmer } from './Components/Transformer/Masters/Cluster-Transfarmer';
import { ClusterListResolverService } from './Components/Resolver/Masters/Cluster-List-Resolver.Service';
import { RegionService } from './Components/Services/Masters/RegionService';
import { RegionTransfarmer } from './Components/Transformer/Masters/Region-Transfarmer';
import { RegionListResolverService } from './Components/Resolver/Masters/Region-List-Resolver-Service';
import { ColourTransfarmer } from './Components/Transformer/Masters/Colour-Transfarmer';
import { ColourService } from './Components/Services/Masters/ColourService';
import { ColourListResolverService } from './Components/Resolver/Masters/Colour-List-Resolver.Service';
import { DeviceService } from './Components/Services/Masters/DeviceService';
import { DeviceTransfarmer } from './Components/Transformer/Masters/Device-Transfarmer';
import { DeviceListResolverService } from './Components/Resolver/Masters/Device-List-Resolver-Service';
import { AssetCategoryTransfarmer } from './Components/Transformer/Masters/Asset-Category-Transfarmer';
import { AssetCategoryService } from './Components/Services/Masters/AssetCategory';
import { AssetCategoryListResolverService } from './Components/Resolver/Masters/Asset-Category-List-Resolver.Service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TreeGridModule, EditService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';
import { AddDialogComponent } from './views/ProcessSetup/FormQueAnsMapping/dialogs/add/add.dialog.component';
import { EditDialogComponent } from './views/ProcessSetup/FormQueAnsMapping/dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './views/ProcessSetup/FormQueAnsMapping/dialogs/delete/delete.dialog.component';
import { FormQueAnsMappingListComponent } from './views/ProcessSetup/FormQueAnsMapping/form-que-ans-mapping-list.component';
import { FormQueAnsMappingComponent } from './views/ProcessSetup/FormQueAnsMapping/form-que-ans-mapping.component';
import { DataService } from './views/ProcessSetup/FormQueAnsMapping/data.service';
import { FormQueAnsMappingService } from './Components/Services/ProcessSetup/FormQueAnsMappingService';
import { FormQueAnsMappingTransfarmer } from './Components/Transformer/ProcessSetup/FormQueAnsMapping-Transfarmer';
import { TaxRateListComponent } from './views/Masters/TaxRate/tax-rate-list.component';
import { MyErrorStateMatcher } from './views/Masters/AngularDemo/MyErrorStateMatcher.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GlobalService } from './Components/Services/GlobalServices/Global.service';

import { RoleListComponent} from './views/Masters/Role/role-list.component';
import { RoleComponent } from './views/Masters/Role/role.component';
import { RoleTransfarmer } from './Components/Transformer/Masters/Role-Transfarmer';
import { RoleService } from './Components/Services/Masters/RoleService';
import { RoleListResolverService } from './Components/Resolver/Masters/Role-List-Resolver-Services';

import { ProjectListComponent} from './views/Masters/Project/project-list.component';
import { ProjectComponent } from './views/Masters/Project/project.component';
import { ProjectTransfarmer } from './Components/Transformer/Masters/Project-Transfarmer';
import { ProjectService } from './Components/Services/Masters/ProjectService';
import { ProjectListResolverService } from './Components/Resolver/Masters/Project-List-Resolver.Service';


@NgModule({
  imports: [
    BrowserModule,
    TreeGridModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    FormsModule, HttpModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    ChartsModule,
    NgxWebstorageModule.forRoot(),
    RouterModule.forRoot(routes),
    MatInputModule, MatCheckboxModule,
    MatInputModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,

    NgxPaginationModule
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    DialogTemplateComponent
  ],
  declarations: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    AppComponent, ...APP_CONTAINERS, P404Component, P500Component, LogInComponent,
    DialogTemplateComponent,
    ListUserComponent, UserMasterComponent, DashboardComponent, ListUOMComponent,
    CountryComponent, UnitComponent, CountryListComponent, BrandListComponent,
    TaxRateListComponent, MyErrorStateMatcher,
    BrandComponent, StateComponent, StateListComponent, CityListComponent, CityComponent,
    ManufactureListComponent, manufactureComponent, DistrictListComponent, DistrictComponent,
    CityGroupListComponent, CityGroupComponent, TaxCategoryListComponent, TaxCategoryComponent,
    CastCategoryListComponent, CastCategoryComponent, DefaultLayoutComponent, CastListComponent,
    CastComponent, TehsilListComponent, TehsilComponent, ItemCategoryListComponent, ItemCategoryComponent,
    ItemGroupComponent, ItemSubGroupComponent, ItemGroupListComponent, ItemSubGroupListComponent,
    AnswerListComponent, AnswerComponent, FormListComponent, FormComponent,
    ProcessComponent, ProcessListComponent, QuestionTypeListComponent,
    QuestionListComponent, QuestionComponent, QuestionTypeComponent,
    ZoneListComponent, ZoneComponent, RegionComponent, RegionListComponent,
    ColourListComponent, ColourComponent, AssetGroupComponent,
    AssetGroupListComponent, CircleComponent, CircleListComponent,
    ClusterListComponent, ClusterComponent,
    AssetCategoryListComponent, AssetCategoryComponent,
    AssetComponent, AssetListComponent, DeviceListComponent,
    DeviceComponent, AngularDemoComponent, FormQueAnsMappingListComponent,
    FormQueAnsMappingComponent,
    RoleComponent,RoleListComponent,
    ProjectComponent, ProjectListComponent, 
  ],
  providers: [
    LogIn, LogInService, User, UOM, UserService, EditService, ToolbarService,
    CountryService, BnNgIdleService, DashboardService, CastCategoryService,
    CityService, UOMService, DefaultLayoutComponent, CookieService,
    QaTypeService, BrandService, StateService, MFGService,
    CityGroupService, ItemSubGroupService, RegionService, FormQueAnsMappingService,
    ItemGroupService, DistrictService, TaxCategoryService, CastService, BrandTransformer,
    TehsilService, ItemCategoryService, AnswerService, FormTransfarmer, QaTypeTransfarmer,
    AssetTransfarmer, AssetGroupTransfarmer, TehsilTransfarmer, QuestionTransfarmer,
    AnswerTransfarmer, ProcessTransfarmer1, ZoneTransfarmer, CircleTransfarmer,
    FormQueAnsMappingTransfarmer, DatePipe, GlobalService,
    DeviceTransfarmer, AssetCategoryTransfarmer,
    ClusterTransfarmer, RegionTransfarmer, ColourTransfarmer,
    StateTransfarmer, CountryTransfarmer, DistrictTransfarmer,
    ZoneService, CircleService, ClusterService, ColourService, DeviceService,
    FormService, ProcessService1, QuestionService, AssetService, AssetGroupService,
    AssetCategoryService, DataService,
    FormListResolverService, RegionListResolverService, ColourListResolverService,
    AssetListResolverService, ProcessListResolverService, AnswerListResolverService,
    StateListResolverService, CountryResolverService, BrandListResolverService,
    AssetCategoryListResolverService,
    QuestionListResolverService, TehsilListResolverService, TehsilMasterResolverService,
    DistrictMasterResolverService, DistrictListResolverService, QaTypeListResolverService,
    AssetGroupListResolverService, ZoneListResolverService, CircleListResolverService,
    DeviceListResolverService,
    ClusterListResolverService, DialogTemplateComponent,
    DialogService,
    RoleService,RoleTransfarmer,RoleListResolverService,
    ProjectService, ProjectTransfarmer, ProjectListResolverService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
