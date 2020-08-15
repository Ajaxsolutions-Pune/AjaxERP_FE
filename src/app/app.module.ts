import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
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
import { DashboardService } from './Compound/Services/Dashboard.service';


import { LogIn } from './Compound/Module/login.model';
import { LogInService } from './Compound/Services/LogIn.service';
import { LogInComponent } from './Compound/login/login.component';
import { User } from './Compound/Module/User.model';
import { UserService } from './Compound/Services/User.Service';
import { BnNgIdleService } from 'bn-ng-idle';
import { RouterModule } from '@angular/router';
import { ListUserComponent } from './views/Masters/User/List-user.component';
import { UserMasterComponent } from './views/Masters/User/user-master.component';
import { ListUOMComponent } from './views/Masters/UOM/list-uom.component';
import { UnitComponent } from './views/Masters/UOM/unit.component';
import { UOMService } from './Compound/Services/Masters/UOMService';
import { CountryComponent } from './views/Masters/Country/country.component';
import { CountryService } from './Compound/Services/Masters/CountryService';
import { CountryListComponent } from './views/Masters/Country/country-list.component';
import { UOM } from './Compound/Module/Masters/UOM.model';
import { BrandListComponent } from './views/Masters/Brand/brand-list.component';
import { BrandService } from './Compound/Services/Masters/BrandService';
import { BrandComponent } from './views/Masters/Brand/brand.component';
import { StateComponent } from './views/Masters/State/state.component';
import { StateService } from './Compound/Services/Masters/StateService';
import { StateListComponent } from './views/Masters/State/state-list.component';
import { CityListComponent } from './views/Masters/City/city-list.component';
import { ManufactureListComponent } from './views/Masters/Manufacture/manufacture-list.component';
import { manufactureComponent } from './views/Masters/Manufacture/manufacture.component';
import { CityService } from './Compound/Services/Masters/CityService';
import { CityComponent } from './views/Masters/City/city.component';
import { MFGService } from './Compound/Services/Masters/MFGService';
import { DistrictListComponent } from './views/Masters/District/district-list.component';
import { DistrictComponent } from './views/Masters/District/district.component';
import { CityGroupListComponent } from './views/Masters/CityGroup/city-group-list.component';
import { DistrictService } from './Compound/Services/Masters/DistrictService';
import { CityGroupComponent } from './views/Masters/CityGroup/city-group.component';
import { CityGroupService } from './Compound/Services/Masters/CityGroupService';
import { TaxCategoryListComponent } from './views/Masters/TaxCategory/tax-category-list.component';
import { TaxCategoryComponent } from './views/Masters/TaxCategory/tax-category.component';
import { TaxCategoryService } from './Compound/Services/Masters/TaxCategoryService';
import { CastCategoryListComponent } from './views/Masters/CastCategory/cast-category-list.component';
import { CastCategoryComponent } from './views/Masters/CastCategory/cast-category.component';
import { CastCategoryService } from './Compound/Services/Masters/CastCategoryService';
import { CastListComponent } from './views/Masters/Cast/cast-list.component';
import { CastComponent } from './views/Masters/Cast/cast.component';
import { CastService } from './Compound/Services/Masters/CastService';
import { TehsilListComponent } from './views/Masters/Tehsil/tehsil-list.component';
import { TehsilComponent } from './views/Masters/Tehsil/tehsil.component';
import { TehsilService } from './Compound/Services/Masters/TehsilService';
import { ItemCategoryListComponent } from './views/Masters/ItemCategory/item-category-list.component';
import { ItemCategoryComponent } from './views/Masters/ItemCategory/item-category.component';
import { ItemCategoryService } from './Compound/Services/Masters/ItemCategoryService';
import { ItemGroup } from './Compound/Module/Masters/ItemGroup.model';
import { ItemGroupComponent } from './views/Masters/Item/item-group.component';
import { ItemSubGroupComponent } from './views/Masters/Item/item-sub-group.component';
import { ItemSubGroupService } from './Compound/Services/Masters/ItemSubGroupService';
import { ItemGroupService } from './Compound/Services/Masters/ItemGroupService';
import { ItemGroupListComponent } from './views/Masters/Item/item-group-list.component';
import { ItemSubGroupListComponent } from './views/Masters/Item/item-sub-group-list.component';
import { StateTransfarmer } from './Compound/Transformer/Masters/State-transformer';
import { BrandTransformer } from './Compound/Transformer/Masters/Brand-Transformer';
import { StateListResolverService } from './Compound/Resolver/State-List-Resolver.service';
import { CountryResolverService } from './Compound/Resolver/Masters/CountryListResolverService';
import { CountryTransfarmer } from './Compound/Transformer/Masters/Country-Transfarmer';
import { BrandListResolverService } from './Compound/Resolver/Masters/Brand-List-Resolver.Service';
import { DistrictListResolverService } from './Compound/Resolver/Masters/District-List-Resolver-Service';
import { DistrictTransfarmer } from './Compound/Transformer/Masters/District-Transformer';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DistrictMasterResolverService } from './Compound/Resolver/Masters/District-MasterResolver';
import { TehsilTransfarmer } from './Compound/Transformer/Masters/Tehsil-Transfarmer';
import { TehsilListResolverService } from './Compound/Resolver/Masters/Tehsil-List-Resolver.Service';
import { TehsilMasterResolverService } from './Compound/Resolver/Masters/Tehsil-Master-Resolver.Service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './Compound/Services/token-interceptor.service';
import { AnswerListComponent } from './views/Masters/Answer/answer-list/answer-list.component';
import { AnswerComponent } from './views/Masters/Answer/answer/answer.component';
import { AnswerTransfarmer } from './Compound/Transformer/Masters/Answer-Transfarmer';
import { FormListComponent } from './views/Masters/Form/form-list/form-list.component';
import { FormComponent } from './views/Masters/Form/form/form.component';
import { ProcessComponent } from './views/Masters/Process/process/process.component';
import { ProcessListComponent } from './views/Masters/Process/process-list/process-list.component';
import { QuestionTypeListComponent } from './views/Masters/Question/question-type-list.component';
import { AnswerListResolverService } from './Compound/Resolver/Masters/Answer-List-Resolver.Service';
import { AnswerService } from './Compound/Services/Masters/AnswerService';
import { HttpModule } from '@angular/http';
import { FormTransfarmer } from './Compound/Transformer/Masters/Form-Transfarmer';
import { FormService } from './Compound/Services/Masters/FormService';
import { FormListResolverService } from './Compound/Resolver/Masters/Form-List-Resolver.Service';
import { ProcessService1 } from './Compound/Services/Masters/ProcessService1';
import { ProcessListResolverService } from './Compound/Resolver/Masters/Process-List-Resolver.Service';
import { ProcessTransfarmer1 } from './Compound/Transformer/Masters/Process-Transfarmer1';
import { QuestionListComponent } from './views/Masters/Question/question-list.component';
import { QuestionTransfarmer } from './Compound/Transformer/Masters/Question-Transfarmer';
import { QuestionService } from './Compound/Services/Masters/QuestionService';
import { QuestionListResolverService } from './Compound/Resolver/Masters/Question-List-Resolver-Service';
import { QuestionComponent } from './views/Masters/Question/question.component';
import { QuestionTypeComponent } from './views/Masters/Question/question-type.component';
import { QaTypeTransfarmer } from './Compound/Transformer/Masters/QaType-Transfarmer';
import { QaTypeListResolverService } from './Compound/Resolver/Masters/QaType-List-Resolver.Service';
import { QaTypeService } from './Compound/Services/Masters/QaTypeService';
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
import { DialogService } from './Compound/Services/MatServices/Dialog.service';
import { DialogTemplateComponent } from './Compound/Services/MatServices/dialog-template.component';
import {
  MatInputModule, MatDialogModule, MatButtonModule,
  ShowOnDirtyErrorStateMatcher, ErrorStateMatcher, MatFormFieldModule, MatIconModule,
  MAT_CHECKBOX_CLICK_ACTION, MatCheckboxModule, MatSelectModule, MatCardModule,
  MatSortModule, MatTableModule, MatToolbarModule, MatPaginatorModule
} from '@angular/material';
import { AngularDemoComponent } from './views/Masters/AngularDemo/angular-demo.component';
import { AssetTransfarmer } from './Compound/Transformer/Masters/Asset-Transfarmer';
import { AssetListResolverService } from './Compound/Resolver/Masters/Asset-List-Resolver.Service';
import { AssetService } from './Compound/Services/Masters/AssetService';
import { AssetGroupTransfarmer } from './Compound/Transformer/Masters/AssetGroup-Transfarmer';
import { AssetGroupService } from './Compound/Services/Masters/AssetGroupService';
import { AssetGroupListResolverService } from './Compound/Resolver/Masters/AssetGroup-List-Resolver-Service';
import { ZoneService } from './Compound/Services/Masters/ZoneService';
import { ZoneListResolverService } from './Compound/Resolver/Masters/Zone-List-Resolver.Service';
import { ZoneTransfarmer } from './Compound/Transformer/Masters/ZoneTransfarmer';
import { CircleListResolverService } from './Compound/Resolver/Masters/Circle-List-Resolver.Service';
import { CircleTransfarmer } from './Compound/Transformer/Masters/Circle-Transfarmer';
import { CircleService } from './Compound/Services/Masters/CircleService';
import { ClusterService } from './Compound/Services/Masters/ClusterService';
import { ClusterTransfarmer } from './Compound/Transformer/Masters/Cluster-Transfarmer';
import { ClusterListResolverService } from './Compound/Resolver/Masters/Cluster-List-Resolver.Service';
import { RegionService } from './Compound/Services/Masters/RegionService';
import { RegionTransfarmer } from './Compound/Transformer/Masters/Region-Transfarmer';
import { RegionListResolverService } from './Compound/Resolver/Masters/Region-List-Resolver-Service';
import { ColourTransfarmer } from './Compound/Transformer/Masters/Colour-Transfarmer';
import { ColourService } from './Compound/Services/Masters/ColourService';
import { ColourListResolverService } from './Compound/Resolver/Masters/Colour-List-Resolver.Service';
import { DeviceService } from './Compound/Services/Masters/DeviceService';
import { DeviceTransfarmer } from './Compound/Transformer/Masters/Device-Transfarmer';
import { DeviceListResolverService } from './Compound/Resolver/Masters/Device-List-Resolver-Service';
import { AssetCategoryTransfarmer } from './Compound/Transformer/Masters/Asset-Category-Transfarmer';
import { AssetCategoryService } from './Compound/Services/Masters/AssetCategory';
import { AssetCategoryListResolverService } from './Compound/Resolver/Masters/Asset-Category-List-Resolver.Service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TreeGridModule, EditService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';
import { FormQueAnsMappingListComponent } from './views/Transaction/FormQueAnsMapping/form-que-ans-mapping-list.component';
import { FormQueAnsMappingComponent } from './views/Transaction/FormQueAnsMapping/form-que-ans-mapping.component';
import { TaskDataService } from './views/Transaction/task-data.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AddDialogComponent } from './views/Transaction/FormQueAnsMapping/dialogs/add/add.dialog.component';
import { EditDialogComponent } from './views/Transaction/FormQueAnsMapping/dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './views/Transaction/FormQueAnsMapping/dialogs/delete/delete.dialog.component';
import { DataService } from './views/Transaction/FormQueAnsMapping/data.service';
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
    MatPaginatorModule
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
    DeviceComponent, AngularDemoComponent, FormQueAnsMappingListComponent, FormQueAnsMappingComponent,
  ],
  providers: [
    LogIn, LogInService, User, UOM, UserService, EditService, ToolbarService,
    CountryService, BnNgIdleService, DashboardService, CastCategoryService,
    CityService, UOMService, DefaultLayoutComponent, CookieService,
    QaTypeService, BrandService, StateService, MFGService,
    CityGroupService, ItemSubGroupService, RegionService,
    ItemGroupService, DistrictService, TaxCategoryService, CastService, BrandTransformer,
    TehsilService, ItemCategoryService, AnswerService, FormTransfarmer, QaTypeTransfarmer,
    AssetTransfarmer, AssetGroupTransfarmer, TehsilTransfarmer, QuestionTransfarmer,
    AnswerTransfarmer, ProcessTransfarmer1, ZoneTransfarmer, CircleTransfarmer,
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
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
