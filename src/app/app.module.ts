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
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LogInComponent,
    ListUserComponent,
    UserMasterComponent,
    DashboardComponent,
    ListUOMComponent,
    CountryComponent,
    UnitComponent,
    CountryListComponent,
    BrandListComponent,
    BrandComponent
  ],
  providers: [
    LogIn,
    LogInService,
    User,
    UOM,
    UserService,
    CountryService,
    BnNgIdleService,
    DashboardService,
    UOMService,
    CookieService, BrandService,
    DefaultLayoutComponent,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
