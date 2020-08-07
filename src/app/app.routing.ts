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
import { BrandListResolverService } from './Compound/Resolver/Masters/Brand-List-Resolver.Service';
import { DistrictListResolverService } from './Compound/Resolver/Masters/District-List-Resolver-Service';
import { DistrictMasterResolverService } from './Compound/Resolver/Masters/District-MasterResolver';
import { TehsilListResolverService } from './Compound/Resolver/Masters/Tehsil-List-Resolver.Service';
import { TehsilMasterResolverService } from './Compound/Resolver/Masters/Tehsil-Master-Resolver.Service';
import { AnswerListComponent } from './views/Masters/Answer/answer-list/answer-list.component';
import { AnswerComponent } from './views/Masters/Answer/answer/answer.component';
import { FormListComponent } from './views/Masters/Form/form-list/form-list.component';
import { ProcessListComponent } from './views/Masters/Process/process-list/process-list.component';
import { ProcessComponent } from './views/Masters/Process/process/process.component';
import { FormComponent } from './views/Masters/Form/form/form.component';
import { AnswerListResolverService } from './Compound/Resolver/Masters/Answer-List-Resolver.Service';
import { FormListResolverService } from './Compound/Resolver/Masters/Form-List-Resolver.Service';
import { QuestionListResolverService } from './Compound/Resolver/Masters/Question-List-Resolver-Service';
import { QuestionListComponent } from './views/Masters/Question/question-list.component';
import { QuestionComponent } from './views/Masters/Question/question.component';
import { ProcessListResolverService } from './Compound/Resolver/Masters/Process-List-Resolver.Service';
import { QuestionTypeListComponent } from './views/Masters/Question/question-type-list.component';
import { QuestionTypeComponent } from './views/Masters/Question/question-type.component';
import { QaTypeListResolverService } from './Compound/Resolver/Masters/QaType-List-Resolver.Service';
import { ZoneComponent } from './views/Masters/Zone/zone.component';
import { ZoneListComponent } from './views/Masters/Zone/zone-list.component';
import { RegionListComponent } from './views/Masters/Region/region-list.component';
import { RegionComponent } from './views/Masters/Region/region.component';
import { ColourComponent } from './views/Masters/Colour/colour.component';
import { ColourListComponent } from './views/Masters/Colour/colour-list.component';
import { AssetGroupListComponent } from './views/Masters/AssetGroup/asset-group-list.component';
import { AssetGroupComponent } from './views/Masters/AssetGroup/asset-group.component';
import { CircleComponent } from './views/Masters/Circle/circle.component';
import { CircleListComponent } from './views/Masters/Circle/circle-list.component';
import { ClusterListComponent } from './views/Masters/Cluster/cluster-list.component';
import { ClusterComponent } from './views/Masters/Cluster/cluster.component';
import { AssetCategoryListComponent } from './views/Masters/AssetCategory/asset-category-list.component';
import { AssetCategoryComponent } from './views/Masters/AssetCategory/asset-category.component';
import { AssetListComponent } from './views/Masters/Asset/asset-list.component';
import { AssetComponent } from './views/Masters/Asset/asset.component';
import { DeviceComponent } from './views/Masters/Device/device.component';
import { DeviceListComponent } from './views/Masters/Device/device-list.component';
import { AngularDemoComponent } from './views/Masters/AngularDemo/angular-demo.component';
import { AssetListResolverService } from './Compound/Resolver/Masters/Asset-List-Resolver.Service';
import { AssetGroupListResolverService } from './Compound/Resolver/Masters/AssetGroup-List-Resolver-Service';
import { ZoneListResolverService } from './Compound/Resolver/Masters/Zone-List-Resolver.Service';
import { CircleListResolverService } from './Compound/Resolver/Masters/Circle-List-Resolver.Service';
import { ClusterListResolverService } from './Compound/Resolver/Masters/Cluster-List-Resolver.Service';
import { RegionListResolverService } from './Compound/Resolver/Masters/Region-List-Resolver-Service';
import { ColourListResolverService } from './Compound/Resolver/Masters/Colour-List-Resolver.Service';
import { DeviceListResolverService } from './Compound/Resolver/Masters/Device-List-Resolver-Service';

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
        },
        resolve: {
          BrandList: BrandListResolverService,
          // ProduReport: ProductionReportResolverService
        },
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
        },
        resolve: {
          DistrictList: DistrictListResolverService,
          // ProduReport: ProductionReportResolverService
        },
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
        },
        resolve: {
          District: DistrictMasterResolverService,
          // ProduReport: ProductionReportResolverService
        },
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
        },
        resolve: {
          TehsilList: TehsilListResolverService,
          DistrictList: DistrictListResolverService
        },
      },
      {
        path: 'Tehsil',
        component: TehsilComponent,
        data: {
          title: 'Create  Tehsil'
        },
        resolve: {
          DistrictList: DistrictListResolverService
        },
      },
      {
        path: 'Tehsil/:id',
        component: TehsilComponent,
        data: {
          title: 'Update  Tehsil'
        },
        resolve: {
          Tehsil: TehsilMasterResolverService,
          DistrictList: DistrictListResolverService
        },
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
      },
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
      // ERP route
      {
        path: 'AnswerList',
        component: AnswerListComponent,
        data: {
          title: 'Answer List'
        },
        resolve: {
          AnswerList: AnswerListResolverService
        },
      },
      {
        path: 'Answer',
        component: AnswerComponent,
        data: {
          title: 'Create answer'
        },
      },
      {
        path: 'Answer/:id',
        component: AnswerComponent,
        data: {
          title: 'Update answer'
        }
      },
      {
        path: 'FormList',
        component: FormListComponent,
        data: {
          title: 'Form List'
        },
        resolve: {
          FormList: FormListResolverService
        }
      },
      {
        path: 'Form',
        component: FormComponent,
        data: {
          title: 'Create Form'
        },
      },
      {
        path: 'Form/:id',
        component: FormComponent,
        data: {
          title: 'Update Form'
        }
      },
      {
        path: 'QuestionTypeList',
        component: QuestionTypeListComponent,
        data: {
          title: 'Question Type List'
        },
        resolve: {
          QaTypeList: QaTypeListResolverService
        }
      },
      {
        path: 'QuestionType',
        component: QuestionTypeComponent,
        data: {
          title: 'Create Question Type '
        }
      },
      {
        path: 'QuestionType/:id',
        component: QuestionTypeComponent,
        data: {
          title: 'Update Question Type '
        }
      },
      {
        path: 'QuestionList',
        component: QuestionListComponent,
        data: {
          title: 'Question List'
        },
        resolve: {
          QuestionList: QuestionListResolverService
        }
      },
      {
        path: 'Question',
        component: QuestionComponent,
        data: {
          title: 'Create Question'
        },
      },
      {
        path: 'Question/:id',
        component: QuestionComponent,
        data: {
          title: 'Update Question'
        }
      },
      {
        path: 'ProcessList',
        component: ProcessListComponent,
        data: {
          title: 'Process List'
        },
        resolve: {
          ProcessList1: ProcessListResolverService
        }
      },
      {
        path: 'Process',
        component: ProcessComponent,
        data: {
          title: 'Create Process'
        },
      },
      {
        path: 'Process/:id',
        component: ProcessComponent,
        data: {
          title: 'Update Process'
        }
      },
      {
        path: 'ZoneList',
        component: ZoneListComponent,
        data: {
          title: 'Zone List'
        },
        resolve: {
          ZoneList: ZoneListResolverService
        }
      },
      {
        path: 'Zone',
        component: ZoneComponent,
        data: {
          title: 'Create Zone'
        },
      },
      {
        path: 'Zone/:id',
        component: ZoneComponent,
        data: {
          title: 'Update Zone'
        }
      },
      {
        path: 'RegionList',
        component: RegionListComponent,
        data: {
          title: 'Region List'
        },
        resolve: {
          RegionList: RegionListResolverService
        }
      },
      {
        path: 'Region',
        component: RegionComponent,
        data: {
          title: 'Create Region'
        },
      },
      {
        path: 'Region/:id',
        component: RegionComponent,
        data: {
          title: 'Update Region'
        }
      },
      {
        path: 'ColourList',
        component: ColourListComponent,
        data: {
          title: 'Colour List'
        },
        resolve: {
          ColourList: ColourListResolverService
        }
      },
      {
        path: 'Colour',
        component: ColourComponent,
        data: {
          title: 'Create Colour'
        },
      },
      {
        path: 'Colour/:id',
        component: ColourComponent,
        data: {
          title: 'Update Colour'
        }
      },
      {
        path: 'AssetGroupList',
        component: AssetGroupListComponent,
        data: {
          title: 'AssetGroup List'
        },
        resolve: {
          AssetGroupList: AssetGroupListResolverService
        }
      },
      {
        path: 'AssetGroup',
        component: AssetGroupComponent,
        data: {
          title: 'Create Asset Group'
        },
      },
      {
        path: 'AssetGroup/:id',
        component: AssetGroupComponent,
        data: {
          title: 'Update Asset Group'
        }
      },
      {
        path: 'CircleList',
        component: CircleListComponent,
        data: {
          title: 'Circle List'
        },
        resolve: {
          CircleList: CircleListResolverService
        }
      },
      {
        path: 'Circle',
        component: CircleComponent,
        data: {
          title: 'Create Circle'
        }
      },
      {
        path: 'Circle/:id',
        component: CircleComponent,
        data: {
          title: 'Update Circle'
        }
      },
      {
        path: 'ClusterList',
        component: ClusterListComponent,
        data: {
          title: 'Cluster List'
        },
        resolve: {
          ClusterList: ClusterListResolverService
        }
      },
      {
        path: 'Cluster',
        component: ClusterComponent,
        data: {
          title: 'Create Cluster'
        },
      },
      {
        path: 'Cluster/:id',
        component: ClusterComponent,
        data: {
          title: 'Update Cluster'
        }
      },
      {
        path: 'AssetCategoryList',
        component: AssetCategoryListComponent,
        data: {
          title: 'Cluster List'
        }
      },
      {
        path: 'AssetCategory',
        component: AssetCategoryComponent,
        data: {
          title: 'Create Asset Category'
        },
      },
      {
        path: 'AssetCategory/:id',
        component: AssetCategoryComponent,
        data: {
          title: 'Update Asset Category'
        }
      },
      {
        path: 'AssetList',
        component: AssetListComponent,
        data: {
          title: 'Asset List'
        },
        resolve: {
          AssetList: AssetListResolverService
        }
      },
      {
        path: 'Asset',
        component: AssetComponent,
        data: {
          title: 'Create Asset'
        },
        resolve: {
          AssetList: AssetListResolverService
        }
      },
      {
        path: 'Asset/:id',
        component: AssetComponent,
        data: {
          title: 'Update Asset'
        }
      },
      {
        path: 'DeviceList',
        component: DeviceListComponent,
        data: {
          title: 'Device List'
        },
        resolve: {
          DeviceList: DeviceListResolverService
        }
      },
      {
        path: 'Device',
        component: DeviceComponent,
        data: {
          title: 'Create Device'
        },
      },
      {
        path: 'Demo',
        component: AngularDemoComponent,
        data: {
          title: 'Demo'
        },
      },
      {
        path: 'Device/:id',
        component: DeviceComponent,
        data: {
          title: 'Update Device'
        }
      }

    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
