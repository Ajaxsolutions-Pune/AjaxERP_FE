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
import { AlertModule, ModalModule } from 'ngx-bootstrap';
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
import { StateTransfarmer } from './Compound/Transformer/Masters/State.transformer';
import { BrandTransformer } from './Compound/Transformer/Masters/Brand.transformer';
import { StateListResolverService } from './Compound/Resolver/State-List-Resolver.service';
import { CountryResolverService } from './Compound/Resolver/Masters/CountryListResolverService';
import { CountryTransfarmer } from './Compound/Transformer/Masters/CountryTransfarmer';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    FormsModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    ChartsModule,
    NgxWebstorageModule.forRoot(),
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    })
  ],
  declarations: [
    AppComponent, ...APP_CONTAINERS, P404Component, P500Component, LogInComponent,
    ListUserComponent, UserMasterComponent, DashboardComponent, ListUOMComponent,
    CountryComponent, UnitComponent, CountryListComponent, BrandListComponent,
    BrandComponent, StateComponent, StateListComponent, CityListComponent, CityComponent,
    ManufactureListComponent, manufactureComponent, DistrictListComponent, DistrictComponent,
    CityGroupListComponent, CityGroupComponent, TaxCategoryListComponent, TaxCategoryComponent,
    CastCategoryListComponent, CastCategoryComponent, DefaultLayoutComponent, CastListComponent,
    CastComponent, TehsilListComponent, TehsilComponent, ItemCategoryListComponent, ItemCategoryComponent,
    ItemGroupComponent, ItemSubGroupComponent, ItemGroupListComponent, ItemSubGroupListComponent,
  ],
  providers: [
    LogIn, LogInService, User, UOM, UserService,
    CountryService, BnNgIdleService, DashboardService, CastCategoryService,
    CityService, UOMService, DefaultLayoutComponent, CookieService,
    BrandService, StateService, MFGService, CityGroupService, ItemSubGroupService,
    StateTransfarmer, CountryTransfarmer,
    StateListResolverService, CountryResolverService,
    ItemGroupService, DistrictService, TaxCategoryService, CastService, BrandTransformer,
    TehsilService, ItemCategoryService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
