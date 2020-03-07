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
import { StateComponent } from './views/Masters/State/state.component';
import { StateListComponent } from './views/Masters/State/state-list.component';
import { CityListComponent } from './views/Masters/City/city-list.component';
import { ManufactureListComponent } from './views/Masters/Manufacture/manufacture-list.component';
import { manufactureComponent } from './views/Masters/Manufacture/manufacture.component';
import { CityComponent } from './views/Masters/City/city.component';
import { DistrictComponent } from './views/Masters/District/district.component';
import { DistrictListComponent } from './views/Masters/District/district-list.component';
import { CityGroupComponent } from './views/Masters/CityGroup/city-group.component';
import { CityGroupListComponent } from './views/Masters/CityGroup/city-group-list.component';
import { TaxCategoryComponent } from './views/Masters/TaxCategory/tax-category.component';
import { TaxCategoryListComponent } from './views/Masters/TaxCategory/tax-category-list.component';
import { CastCategoryListComponent } from './views/Masters/CastCategory/cast-category-list.component';
import { CastCategoryComponent } from './views/Masters/CastCategory/cast-category.component';
import { CastListComponent } from './views/Masters/Cast/cast-list.component';
import { CastComponent } from './views/Masters/Cast/cast.component';
import { TehsilListComponent } from './views/Masters/Tehsil/tehsil-list.component';
import { TehsilComponent } from './views/Masters/Tehsil/tehsil.component';
import { ItemCategoryComponent } from './views/Masters/ItemCategory/item-category.component';
import { ItemCategoryListComponent } from './views/Masters/ItemCategory/item-category-list.component';
import { ItemGroupListComponent } from './views/Masters/Item/item-group-list.component';
import { ItemGroupComponent } from './views/Masters/Item/item-group.component';
import { ItemSubGroupListComponent } from './views/Masters/Item/item-sub-group-list.component';
import { ItemSubGroupComponent } from './views/Masters/Item/item-sub-group.component';
import { StateListResolverService } from './Compound/Resolver/State-List-Resolver.service';
import { CountryResolverService } from './Compound/Resolver/Masters/CountryListResolverService';

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
        resolve: {
          CountryList: CountryResolverService,
         // ProduReport: ProductionReportResolverService
        },
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
      {
        path: 'State',
        component: StateComponent,
        data: {
          title: 'Create State'
        }
      },
      {
        path: 'State/:id',
        component: StateComponent,
        data: {
          title: 'Update Brand'
        }
      },
      {
        path: 'StateList',
        component: StateListComponent,
        data: {
          title: 'State List'
        },
        resolve: {
          StateList: StateListResolverService,
         // ProduReport: ProductionReportResolverService
        },
      },
      {
        path: 'CityList',
        component: CityListComponent,
        data: {
          title: 'City List'
        }
      },
      {
        path: 'City',
        component: CityComponent,
        data: {
          title: 'Create City'
        }
      },
      {
        path: 'City/:id',
        component: CityComponent,
        data: {
          title: 'Update City'
        }
      },
      {
        path: 'ManufacturerList',
        component: ManufactureListComponent,
        data: {
          title: 'Manufacturer List'
        }
      },
      {
        path: 'MFG',
        component: manufactureComponent,
        data: {
          title: 'Create Manufacture'
        }
      },
      {
        path: 'DistrictList',
        component: DistrictListComponent,
        data: {
          title: 'District List'
        }
      },
      {
        path: 'District',
        component: DistrictComponent,
        data: {
          title: 'Create District'
        }
      },
      {
        path: 'District/:id',
        component: DistrictComponent,
        data: {
          title: 'Update District'
        }
      },
      {
        path: 'CityGroupList',
        component: CityGroupListComponent,
        data: {
          title: 'CityGroup List'
        }
      },
      {
        path: 'CityGroup',
        component: CityGroupComponent,
        data: {
          title: 'Create CityGroup'
        }
      },
      {
        path: 'CityGroup/:id',
        component: CityGroupComponent,
        data: {
          title: 'Update CityGroup'
        }
      },
      {
        path: 'TaxCategoryList',
        component: TaxCategoryListComponent,
        data: {
          title: 'TaxCategory List'
        }
      },
      {
        path: 'TaxCategory',
        component: TaxCategoryComponent,
        data: {
          title: 'Create TaxCategory'
        }
      },
      {
        path: 'TaxCategory/:id',
        component: TaxCategoryComponent,
        data: {
          title: 'Update TaxCategory'
        }
      },
      {
        path: 'CastCategoryList',
        component: CastCategoryListComponent,
        data: {
          title: ' CastCategory List'
        }
      },
      {
        path: 'CastCategory',
        component: CastCategoryComponent,
        data: {
          title: 'Create  CastCategory'
        }
      },
      {
        path: 'CastCategory/:id',
        component: CastCategoryComponent,
        data: {
          title: 'Update  CastCategory'
        }
      },
      {
        path: 'CastList',
        component: CastListComponent,
        data: {
          title: ' Casty List'
        }
      },
      {
        path: 'Cast',
        component: CastComponent,
        data: {
          title: 'Create  Cast'
        }
      },
      {
        path: 'Cast/:id',
        component: CastComponent,
        data: {
          title: 'Update  Cast'
        }
      },
      {
        path: 'TehsilList',
        component: TehsilListComponent,
        data: {
          title: ' Tehsil List'
        }
      },
      {
        path: 'Tehsil',
        component: TehsilComponent,
        data: {
          title: 'Create  Tehsil'
        }
      },
      {
        path: 'Tehsil/:id',
        component: TehsilComponent,
        data: {
          title: 'Update  Tehsil'
        }
      },
      {
        path: 'ItemCategoryList',
        component: ItemCategoryListComponent,
        data: {
          title: ' ItemCategory List'
        }
      },
      {
        path: 'ItemCategory',
        component: ItemCategoryComponent,
        data: {
          title: 'Create  ItemCategory'
        }
      },
      {
        path: 'ItemCategory/:id',
        component: ItemCategoryComponent,
        data: {
          title: 'Update  ItemCategory'
        }
      }, /// Create by Dhanraj start
      {
        path: 'ItemGroupList',
        component: ItemGroupListComponent,
        data: {
          title: 'Item Group List'
        }
      },
      {
        path: 'ItemGroup',
        component: ItemGroupComponent,
        data: {
          title: 'Create Item Group'
        }
      },
      {
        path: 'ItemGroup/:id',
        component: ItemGroupComponent,
        data: {
          title: 'Update Item Group'
        }
      },
      {
        path: 'ItemSubGroupList',
        component: ItemSubGroupListComponent,
        data: {
          title: 'Item Sub Group Llist'
        }
      },
      {
        path: 'ItemSubGroup',
        component: ItemSubGroupComponent,
        data: {
          title: 'Create Sub Item Group'
        }
      },
      {
        path: 'ItemSubGroup/:id',
        component: ItemSubGroupComponent,
        data: {
          title: 'Update Sub Item Group'
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
