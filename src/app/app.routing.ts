import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LogInComponent } from './Compound/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard/dashboard.component';
import { UserMasterComponent } from './views/Masters/User/user-master.component';
import { ListUserComponent } from './views/Masters/User/List-user.component';
import { UnitComponent } from './views/Masters/UOM/unit.component';
import { ListUOMComponent } from './views/Masters/UOM/list-uom.component';
import { CountryComponent } from './views/Masters/Country/country.component';
import { CountryListComponent } from './views/Masters/Country/country-list.component';
import { BrandListComponent } from './views/Masters/Brand/brand-list.component';
import { BrandComponent } from './views/Masters/Brand/brand.component';

export const routes: Routes = [
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LogInComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'UserList',
        component: ListUserComponent,
        data: {
          title: 'User List'
        }
      },
      {
        path: 'CreateUser/:id',
        component: UserMasterComponent,
        data: {
          title: 'User Master'
        }
      },
      {
        path: 'EditUser/:id',
        component: UserMasterComponent,
        data: {
          title: 'Update User'
        }
      },
      {
        path: 'UnitList',
        component: ListUOMComponent,
        data: {
          title: 'Unit List'
        }
      },
      {
        path: 'Unit',
        component: UnitComponent,
        data: {
          title: 'Create Unit'
        }
      },
      {
        path: 'Unit/:id',
        component: UnitComponent,
        data: {
          title: 'Update Unit'
        }
      },
      {
        path: 'CountryList',
        component: CountryListComponent,
        data: {
          title: 'Country List'
        }
      },
      {
        path: 'Country',
        component: CountryComponent,
        data: {
          title: 'Create Country'
        }
      },
      {
        path: 'Country/:id',
        component: CountryComponent,
        data: {
          title: 'Update Country'
        }
      },
      {
        path: 'BrandList',
        component: BrandListComponent,
        data: {
          title: 'Brand List'
        }
      },
      {
        path: 'Brand',
        component: BrandComponent,
        data: {
          title: 'Create Brand'
        }
      },
      {
        path: 'Brand/:id',
        component: BrandComponent,
        data: {
          title: 'Update Brand'
        }
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
