import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LogInComponent } from './Components/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard/dashboard.component';
//import { UserMasterComponent } from './views/Masters/User/user-master.component';
//import { ListUserComponent } from './views/Masters/User/List-user.component';
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
import { StateListResolverService } from './Components/Resolver/State-List-Resolver.service';
import { CountryResolverService } from './Components/Resolver/Masters/CountryListResolverService';
import { BrandListResolverService } from './Components/Resolver/Masters/Brand-List-Resolver.Service';
import { DistrictListResolverService } from './Components/Resolver/Masters/District-List-Resolver-Service';
import { DistrictMasterResolverService } from './Components/Resolver/Masters/District-MasterResolver';
import { TehsilListResolverService } from './Components/Resolver/Masters/Tehsil-List-Resolver.Service';
import { TehsilMasterResolverService } from './Components/Resolver/Masters/Tehsil-Master-Resolver.Service';
import { AnswerListComponent } from './views/Masters/Answer/answer-list/answer-list.component';
import { AnswerComponent } from './views/Masters/Answer/answer/answer.component';
import { FormListComponent } from './views/Masters/Form/form-list/form-list.component';
import { ProcessListComponent } from './views/Masters/Process/process-list/process-list.component';
import { ProcessComponent } from './views/Masters/Process/process/process.component';
import { FormComponent } from './views/Masters/Form/form/form.component';
import { AnswerListResolverService } from './Components/Resolver/Masters/Answer-List-Resolver.Service';
import { FormListResolverService } from './Components/Resolver/Masters/Form-List-Resolver.Service';
import { QuestionListResolverService } from './Components/Resolver/Masters/Question-List-Resolver-Service';
import { QuestionListComponent } from './views/Masters/Question/question-list.component';
import { QuestionComponent } from './views/Masters/Question/question.component';
import { ProcessListResolverService } from './Components/Resolver/Masters/Process-List-Resolver.Service';
import { QuestionTypeListComponent } from './views/Masters/Question/question-type-list.component';
import { QuestionTypeComponent } from './views/Masters/Question/question-type.component';
import { QaTypeListResolverService } from './Components/Resolver/Masters/QaType-List-Resolver.Service';
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
import { AssetListResolverService } from './Components/Resolver/Masters/Asset-List-Resolver.Service';
import { AssetGroupListResolverService } from './Components/Resolver/Masters/AssetGroup-List-Resolver-Service';
import { ZoneListResolverService } from './Components/Resolver/Masters/Zone-List-Resolver.Service';
import { CircleListResolverService } from './Components/Resolver/Masters/Circle-List-Resolver.Service';
import { ClusterListResolverService } from './Components/Resolver/Masters/Cluster-List-Resolver.Service';
import { RegionListResolverService } from './Components/Resolver/Masters/Region-List-Resolver-Service';
import { ColourListResolverService } from './Components/Resolver/Masters/Colour-List-Resolver.Service';
import { DeviceListResolverService } from './Components/Resolver/Masters/Device-List-Resolver-Service';
import { AssetCategoryListResolverService } from './Components/Resolver/Masters/Asset-Category-List-Resolver.Service';
import { FormQueAnsMappingComponent } from './views/ProcessSetup/FormQueAnsMapping/form-que-ans-mapping.component';

import { RoleComponent } from './views/Masters/Role/role.component';
import { RoleListComponent } from './views/Masters/Role/role-list.component';
import { RoleListResolverService } from './Components/Resolver/Masters/Role-List-Resolver-Services';

import { ProjectComponent } from './views/Masters/Project/project.component';
import { ProjectListComponent } from './views/Masters/Project/project-list.component';
import { ProjectListResolverService } from './Components/Resolver/Masters/Project-List-Resolver.Service';
import { TransmissionLineListComponent } from './views/Masters/TransmissionLine/transmission-line-list.component';
import { TransmissionLineListResolverService } from './Components/Resolver/Masters/TransmissionLine-List-Resolver.Service';
import { TransmissionLineComponent } from './views/Masters/TransmissionLine/transmission-line.component';
import { HubListResolverService } from './Components/Resolver/Masters/Hub-List-Resolver.Service';
import { HubListComponent } from './views/Masters/Hub/hub-list.component';
import { HubComponent } from './views/Masters/Hub/hub.component';
import { ProcessFormMappingComponent } from './views/ProcessSetup/ProcessFormMapping/process-form-mapping.component';
import { UserDeviceMappingComponent } from './views/ProcessSetup/UserDeviceMapping/user-device-mapping.component';
import { DeviceAssetMappingComponent } from './views/ProcessSetup/DeviceAssetMapping/device-asset-mapping.component';
import { ContactListResolverService } from './Components/Resolver/Masters/Contact-List-Resolver.Service';
import { ContactListComponent } from './views/Masters/Contact/contact-list.component';
import { ContactComponent } from './views/Masters/Contact/contact.component';
import { AccessListComponent } from './views/Masters/Access/access-list.component';
import { AccessListResolverService } from './Components/Resolver/Masters/Access-List-Resolver.Service';
import { AccessComponent } from './views/Masters/Access/access.component';
import { RolelevelListResolverService } from './Components/Resolver/Masters/RoleLevel-List-Resolver.Service';
import { RolelevelListComponent } from './views/Masters/Rolelevel/rolelevel-list.component';
import { RolelevelComponent } from './views/Masters/Rolelevel/rolelevel.component';
import { UserListComponent } from './views/Masters/User/List-user.component';
import { UserListResolverService } from './Components/Resolver/Masters/User-List-Resolver.Service';
import { UserComponent } from './views/Masters/User/user-master.component';
import { UserDeviceRegListComponent } from './views/Masters/UserDeviceReg/user-device-reg-list.component';
import { UserDeviceRegListResolverService } from './Components/Resolver/Masters/UserDeviceReg-List-Resolver.Service';
import { UserDeviceRegComponent } from './views/Masters/UserDeviceReg/user-device-reg.component';
import { ModuleobjListResolverService } from './Components/Resolver/Masters/Module-List-Resolver.Service';
import { ModuleListComponent } from './views/Masters/Module/module-list.component';
import { ModuleComponent } from './views/Masters/Module/module.component';
import { ScreenObjListResolverService } from './Components/Resolver/Masters/Screen-List-Resolver.Service';
import { ScreenListComponent } from './views/Masters/Screen/screen-list.component';
import { ScreenComponent } from './views/Masters/Screen/screen.component';
import { MonitoringReportComponent } from './Report/Monitoring/MonitoringReport/monitoring-report.component';
import { UserGroupMappingComponent } from './views/ProcessSetup/UserGroupMapping/user-group-mapping.component';
import { FormQueAnsMappingListResolverService } from './Components/Resolver/ProcessSetup/FormQueAnsMapping-List-Resolver.service';
import { UserGroupListResolverService } from './Components/Resolver/Masters/UserGroup-List-Resolver.Service';
import { UserGroupListComponent } from './views/Masters/UserGroup/user-group-list.component';
import { UserGroupComponent } from './views/Masters/UserGroup/user-group.component';
import { NotificationObjListResolverService } from './Components/Resolver/Masters/NotificationObj-List-Resolver.Service';
import { NotificationObjListComponent } from './views/Masters/Notification/notification-list.component';
import { NotificationObjComponent } from './views/Masters/Notification/notification.component';
import { MapComponent } from './views/Map/map.component';
import { CityListResolverService } from './Components/Resolver/Masters/City-List-Resolver-Service';
import { CityGroupListResolverService } from './Components/Resolver/Masters/CityGroup-List-Resolver-Service';
import { MapTrackingComponent } from './views/Map/map_tracking.component';
import { QualificationListComponent } from './views/HRMS/Qualification/qualification-list/qualification-list.component';
import { QualificationListResolverService } from './Components/Resolver/HRMS/Qualification-List-Resolver.Service';
import { QualificationComponent } from './views/HRMS/Qualification/qualification/qualification.component';
import { GradeSetListResolverService } from './Components/Resolver/HRMS/GradeSet-List-Resolver.Service';
import { GradeSetListComponent } from './views/HRMS/GradeSet/grade-set-list.component';
import { GradeSetComponent } from './views/HRMS/GradeSet/grade-set.component';
import { GradeListComponent } from './views/HRMS/Grade/grade-list.component';
import { GradeListResolverService } from './Components/Resolver/HRMS/Grade-List-Resolver.Service';
import { GradeComponent } from './views/HRMS/Grade/grade.component';
import { JobListComponent } from './views/HRMS/Job/job-list.component';
import { JobListResolverService } from './Components/Resolver/HRMS/Job-List-Resolver.Service';
import { JobComponent } from './views/HRMS/Job/job.component';
import { QualificationLevelListComponent } from './views/HRMS/QualificationLevel/qualification-level-list.component';
import { QualificationLevelListResolverService } from './Components/Resolver/HRMS/QualificationLevel-List-Resolver.Service';
import { QualificationLevelComponent } from './views/HRMS/QualificationLevel/qualification-level.component';
import { SpecializationListComponent } from './views/HRMS/Specialization/specialization-list.component';
import { SpecializationListResolverService } from './Components/Resolver/HRMS/Specialization-List-Resolver.Service';
import { SpecializationComponent } from './views/HRMS/Specialization/specialization.component';
import { QualificationTypeListComponent } from './views/HRMS/QualificationType/qualification-type-list.component';
import { QualificationTypeListResolverService } from './Components/Resolver/HRMS/QualificationType-List-Resolver.Service';
import { QualificationTypeComponent } from './views/HRMS/QualificationType/qualification-type.component';
import { JobLevelListComponent } from './views/HRMS/JobLevel/job-level-list.component';
import { JobLevelListResolverService } from './Components/Resolver/HRMS/JobLevel-List-Resolver.Service';
import { JobLevelComponent } from './views/HRMS/JobLevel/job-level.component';
import { MonitoringReportNewComponent } from './Report/Monitoring/MonitoringReportNew/monitoring-report-new.component';
import { InceptionReportComponent } from './Report/Inception Report/inception-report/inception-report.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '#',
    component: LogInComponent,
    data: {
      title: 'Login Page'
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
        path: 'map',
        component: MapComponent,
        data: {
          title: 'Map'
        }
      },
      {
        path: 'mapTracking',
        component: MapTrackingComponent,
        data: {
          title: 'Map Tracking'
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
          title: 'Add Unit'
        }
      },
      {
        path: 'Unit/:id',
        component: UnitComponent,
        data: {
          title: 'Edit Unit'
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
          title: 'Add Country'
        }
      },
      {
        path: 'Country/:id',
        component: CountryComponent,
        data: {
          title: 'Edit Country'
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
          title: 'Add Brand'
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
          title: 'Edit Brand'
        }
      },
      {
        path: 'State',
        component: StateComponent,
        data: {
          title: 'Add State'
        }
      },
      {
        path: 'State/:id',
        component: StateComponent,
        data: {
          title: 'Edit Brand'
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
        },
        resolve: {
          CityList: CityListResolverService,
          // ProduReport: ProductionReportResolverService
        },
      },
      {
        path: 'City',
        component: CityComponent,
        data: {
          title: 'Add City'
        }
      },
      {
        path: 'City/:id',
        component: CityComponent,
        data: {
          title: 'Edit City'
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
          title: 'Add Manufacture'
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
          title: 'Add District'
        }
      },
      {
        path: 'District/:id',
        component: DistrictComponent,
        data: {
          title: 'Edit District'
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
        },
        resolve: {
          CityGroup: CityGroupListResolverService,
          // ProduReport: ProductionReportResolverService
        },
      },


      {
        path: 'CityGroup',
        component: CityGroupComponent,
        data: {
          title: 'Add CityGroup'
        }
      },
      {
        path: 'CityGroup/:id',
        component: CityGroupComponent,
        data: {
          title: 'Edit CityGroup'
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
          title: 'Add TaxCategory'
        }
      },
      {
        path: 'TaxCategory/:id',
        component: TaxCategoryComponent,
        data: {
          title: 'Edit TaxCategory'
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
          title: 'Add  CastCategory'
        }
      },
      {
        path: 'CastCategory/:id',
        component: CastCategoryComponent,
        data: {
          title: 'Edit  CastCategory'
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
          title: 'Add  Cast'
        }
      },
      {
        path: 'Cast/:id',
        component: CastComponent,
        data: {
          title: 'Edit  Cast'
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
          title: 'Add  Tehsil'
        },
        resolve: {
          DistrictList: DistrictListResolverService
        },
      },
      {
        path: 'Tehsil/:id',
        component: TehsilComponent,
        data: {
          title: 'Edit  Tehsil'
        },
        resolve: {
          Tehsil: TehsilMasterResolverService,
          DistrictList: DistrictListResolverService
        },
      },

      {
        path: 'QualificationList',
        component: QualificationListComponent,
        data: {
          title: ' Qualification List'
        },
        resolve: {
          QualificationList: QualificationListResolverService,
          // ProduReport: ProductionReportResolverService
        },

      },
      {
        path: 'Qualification',
        component: QualificationComponent,
        data: {
          title: 'Add  Qualification'
        }
      },
      {
        path: 'Qualification/:id',
        component: QualificationComponent,
        data: {
          title: 'Edit  Qualification'
        }
      },

      /*{
        path: 'DepartmentList',
        component: DepartmentListComponent,
        data: {
          title: ' Department List'
        },
        resolve: {
          DepartmentList: DepartmentListResolverService,
          // ProduReport: ProductionReportResolverService
        },
      },
      {
        path: 'Department',
        component: DepartmentComponent,
        data: {
          title: 'Add  Department'
        }
      },
      {
        path: 'Department/:id',
        component: DepartmentComponent,
        data: {
          title: 'Edit  Department'
        }
      },*/

      {
        path: 'GradeSetList',
        component: GradeSetListComponent,
        data: {
          title: ' Grade Set List'
        },
        resolve: {
          GradeSetList: GradeSetListResolverService,
          // ProduReport: ProductionReportResolverService
        },
      },
      {
        path: 'GradeSet',
        component: GradeSetComponent,
        data: {
          title: 'Add  Grade Set'
        }
      },
      {
        path: 'GradeSet/:id',
        component: GradeSetComponent,
        data: {
          title: 'Edit  Grade Set'
        }
      },

      {
        path: 'GradeList',
        component: GradeListComponent,
        data: {
          title: ' Grade List'
        },
        resolve: {
          GradeList: GradeListResolverService,
          // ProduReport: ProductionReportResolverService
        },
      },
      {
        path: 'Grade',
        component: GradeComponent,
        data: {
          title: 'Add  Grade'
        }
      },
      {
        path: 'Grade/:id',
        component: GradeComponent,
        data: {
          title: 'Edit  Grade'
        }
      },

     /* {
        path: 'LocationList',
        component: LocationListComponent,
        data: {
          title: ' Location List'
        },
        resolve: {
          LocationList: LocationListResolverService,
          // ProduReport: ProductionReportResolverService
        },
      },
      {
        path: 'Location',
        component: LocationComponent,
        data: {
          title: 'Add Location'
        }
      },
      {
        path: 'Location/:id',
        component: LocationComponent,
        data: {
          title: 'Edit Location'
        }
      },*/

      {
        path: 'JobList',
        component: JobListComponent,
        data: {
          title: ' Job List'
        },
        resolve: {
          JobList: JobListResolverService,
          // ProduReport: ProductionReportResolverService
        },
      },
      {
        path: 'Job',
        component: JobComponent,
        data: {
          title: 'Add Job'
        }
      },
      {
        path: 'Job/:id',
        component: JobComponent,
        data: {
          title: 'Edit Job'
        }
      },
      /*{
        path: 'PositionList',
        component: PositionListComponent,
        data: {
          title: 'Position List'
        },
        resolve: {
          PositionList: PositionListResolverService,
          // ProduReport: ProductionReportResolverService
        },
      },
      {
        path: 'Position',
        component: PositionComponent,
        data: {
          title: 'Add Position'
        }
      },
      {
        path: 'Position/:id',
        component: PositionComponent,
        data: {
          title: 'Edit Position'
        }
      },*/
      {
        path: 'QualificationLevelList',
        component: QualificationLevelListComponent,
        data: {
          title: 'Qualification Level List'
        },
        resolve: {
          QualificationLevelList: QualificationLevelListResolverService,
          // ProduReport: ProductionReportResolverService
        },
      },
      {
        path: 'QualificationLevel',
        component: QualificationLevelComponent,
        data: {
          title: 'Add Qualification Level'
        }
      },
      {
        path: 'QualificationLevel/:id',
        component: QualificationLevelComponent,
        data: {
          title: 'Edit Qualification Level'
        }
      },
      {
        path: 'SpecializationList',
        component: SpecializationListComponent,
        data: {
          title: 'Specialization List'
        },
        resolve: {
          SpecializationList: SpecializationListResolverService,
          // ProduReport: ProductionReportResolverService
        },
      },
      {
        path: 'Specialization',
        component: SpecializationComponent,
        data: {
          title: 'Add Specialization'
        }
      },
      {
        path: 'Specialization/:id',
        component: SpecializationComponent,
        data: {
          title: 'Edit Specialization'
        }
      },
      {
        path: 'QualificationTypeList',
        component: QualificationTypeListComponent,
        data: {
          title: 'Qualification Type List'
        },
        resolve: {
          QualificationTypeList: QualificationTypeListResolverService,
          // ProduReport: ProductionReportResolverService
        },
      },
      {
        path: 'QualificationType',
        component: QualificationTypeComponent,
        data: {
          title: 'Add Qualification Type'
        }
      },
      {
        path: 'QualificationType/:id',
        component: QualificationTypeComponent,
        data: {
          title: 'Edit Qualification Type'
        }
      },
      {
        path: 'JobLevelList',
        component: JobLevelListComponent,
        data: {
          title: 'Job Level List'
        },
        resolve: {
          JobLevelList: JobLevelListResolverService,
          // ProduReport: ProductionReportResolverService
        },
      },
      {
        path: 'JobLevel',
        component: JobLevelComponent,
        data: {
          title: 'Add Job Level'
        }
      },
      {
        path: 'JobLevel/:id',
        component: JobLevelComponent,
        data: {
          title: 'Edit Job Level'
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
          title: 'Add  ItemCategory'
        }
      },
      {
        path: 'ItemCategory/:id',
        component: ItemCategoryComponent,
        data: {
          title: 'Edit  ItemCategory'
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
          title: 'Add Item Group'
        }
      },
      {
        path: 'ItemGroup/:id',
        component: ItemGroupComponent,
        data: {
          title: 'Edit Item Group'
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
          title: 'Add Sub Item Group'
        }
      },
      {
        path: 'ItemSubGroup/:id',
        component: ItemSubGroupComponent,
        data: {
          title: 'Edit Sub Item Group'
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
          title: 'Add Answer'
        },
      },
      {
        path: 'Answer/:id',
        component: AnswerComponent,
        data: {
          title: 'Edit Answer'
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
        path: 'UserGroupList',
        component: UserGroupListComponent,
        data: {
          title: 'User Group List'
        },
        resolve: {
          UserGroupList: UserGroupListResolverService,
        },
      },
      {
        path: 'UserGroup',
        component: UserGroupComponent,
        data: {
          title: 'Add User Group'
        }
      },
      {
        path: 'UserGroup/:id',
        component: UserGroupComponent,
        data: {
          title: 'Edit User Group'
        }
      },
      {
        path: 'Form',
        component: FormComponent,
        data: {
          title: 'Add Form'
        },
      },
      {
        path: 'Form/:id',
        component: FormComponent,
        data: {
          title: 'Edit Form'
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
          title: 'Add Question Type '
        }
      },
      {
        path: 'QuestionType/:id',
        component: QuestionTypeComponent,
        data: {
          title: 'Edit Question Type '
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
          title: 'Add Question'
        },
      },
      {
        path: 'Question/:id',
        component: QuestionComponent,
        data: {
          title: 'Edit Question'
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
          title: 'Add Process'
        },
      },
      {
        path: 'Process/:id',
        component: ProcessComponent,
        data: {
          title: 'Edit Process'
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
          title: 'Add Zone'
        },
      },
      {
        path: 'Zone/:id',
        component: ZoneComponent,
        data: {
          title: 'Edit Zone'
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
          title: 'Add Region'
        },
      },
      {
        path: 'Region/:id',
        component: RegionComponent,
        data: {
          title: 'Edit Region'
        }
      },
      {
        path: 'NotificationList',
        component:NotificationObjListComponent,
        data: {
          title: 'Notification List'
        },
        resolve: {
          NotificationObjList: NotificationObjListResolverService,
        },
      },
      {
        path: 'Notification',
        component: NotificationObjComponent,
        data: {
          title: 'Add Notification'
        }
      },
      {
        path: 'Notification/:id',
        component: NotificationObjComponent,
        data: {
          title: 'Edit Notification'
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
          title: 'Add Colour'
        },
      },
      {
        path: 'Colour/:id',
        component: ColourComponent,
        data: {
          title: 'Edit Colour'
        }
      },
      {
        path: 'AssetGroupList',
        component: AssetGroupListComponent,
        data: {
          title: 'Warehouse Group List'
        },
        resolve: {
          AssetGroupList: AssetGroupListResolverService
        }
      },
      {
        path: 'AssetGroup',
        component: AssetGroupComponent,
        data: {
          title: 'Add Warehouse Group'
        },
      },
      {
        path: 'AssetGroup/:id',
        component: AssetGroupComponent,
        data: {
          title: 'Edit Warehouse Group'
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
          title: 'Add Circle'
        }
      },
      {
        path: 'Circle/:id',
        component: CircleComponent,
        data: {
          title: 'Edit Circle'
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
          title: 'Add Cluster'
        },
      },
      {
        path: 'Cluster/:id',
        component: ClusterComponent,
        data: {
          title: 'Edit Cluster'
        }
      },
      {
        path: 'AssetCategoryList',
        component: AssetCategoryListComponent,
        data: {
          title: 'Warehouse Category List'
        },
        resolve: {
          AssetCategoryList1: AssetCategoryListResolverService
        }
      },
      {
        path: 'AssetCategory',
        component: AssetCategoryComponent,
        data: {
          title: 'Add Warehouse Category'
        },
      },
      {
        path: 'AssetCategory/:id',
        component: AssetCategoryComponent,
        data: {
          title: 'Edit Warehouse Category'
        }
      },
      {
        path: 'AssetList',
        component: AssetListComponent,
        data: {
          title: 'Warehouse List'
        },
        resolve: {
          AssetList: AssetListResolverService
        }
      },
      {
        path: 'Asset/:id',
        component: AssetComponent,
        data: {
          title: 'Edit Warehouse'
        }
      },
      {
        path: 'Asset',
        component: AssetComponent,
        data: {
          title: 'Add Warehouse'
        },
        resolve: {
          AssetList: AssetListResolverService
        }
      },
      {
        path: 'AccessList',
        component: AccessListComponent,
        data: {
          title: 'Access List'
        },
        resolve: {
          AccessList: AccessListResolverService
        }
      },
      {
        path: 'Access/:id',
        component: AccessComponent,
        data: {
          title: 'Edit Access'
        }
      },
      {
        path: 'Access',
        component: AccessComponent,
        data: {
          title: 'Add Access'
        },
        resolve: {
          AssetList: AssetListResolverService
        }
      },
      {
        path: 'RolelevelList',
        component: RolelevelListComponent,
        data: {
          title: 'Rolelevel List'
        },
        resolve: {
          RolelevelList: RolelevelListResolverService
        }
      },
      {
        path: 'Rolelevel/:id',
        component: RolelevelComponent,
        data: {
          title: 'Edit Rolelevel'
        }
      },
      {
        path: 'Rolelevel',
        component: RolelevelComponent,
        data: {
          title: 'Add Rolelevel'
        },
        resolve: {
          AssetList: AssetListResolverService
        }
      },
      {
        path: 'ModuleList',
        component: ModuleListComponent,
        data: {
          title: 'Module List'
        },
        resolve: {
          ModuleList: ModuleobjListResolverService
        }
      },
      {
        path: 'Module/:id',
        component: ModuleComponent,
        data: {
          title: 'Edit Module'
        }
      },
      {
        path: 'Module',
        component: ModuleComponent,
        data: {
          title: 'Add Module'
        },
        resolve: {
          AssetList: ModuleobjListResolverService
        }
      },
      {
        path: 'ScreenList',
        component: ScreenListComponent,
        data: {
          title: 'Screen List'
        },
        resolve: {
          ScreenList: ScreenObjListResolverService
        }
      },
      {
        path: 'Screen/:id',
        component: ScreenComponent,
        data: {
          title: 'Edit Screen'
        }
      },
      {
        path: 'Screen',
        component: ScreenComponent,
        data: {
          title: 'Add Screen'
        },
        resolve: {
          AssetList: AssetListResolverService
        }
      },
      {
        path: 'TransmissionLineList',
        component: TransmissionLineListComponent,
        data: {
          title: 'Transmission Line List'
        },
        resolve: {
          TransmissionLineList: TransmissionLineListResolverService
        }
      },
      {
        path: 'TransmissionLine',
        component: TransmissionLineComponent,
        data: {
          title: 'Add Transmission Line'
        }
      },
      {
        path: 'TransmissionLine/:id',
        component: TransmissionLineComponent,
        data: {
          title: 'Edit Transmission Line'
        }
      },
      {
        path: 'ContactList',
        component: ContactListComponent,
        data: {
          title: 'Contact List'
        },
        resolve: {
          ContactList: ContactListResolverService
        }
      },
      {
        path: 'Contact',
        component: ContactComponent,
        data: {
          title: 'Add Contact'
        }
      },
      {
        path: 'Contact/:id',
        component: ContactComponent,
        data: {
          title: 'Edit Contact'
        }
      },
      {
        path: 'HubList',
        component: HubListComponent,
        data: {
          title: 'HUB List'
        },
        resolve: {
          HubList: HubListResolverService
        }
      },
      {
        path: 'Hub',
        component: HubComponent,
        data: {
          title: 'Add HUB'
        }
      },
      {
        path: 'Hub/:id',
        component: HubComponent,
        data: {
          title: 'Edit HUB'
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
          title: 'Add Device'
        },
      },
      {
        path: 'Demo1',
        component: AngularDemoComponent,
        data: {
          title: 'Demo'
        },
      },
      {
        path: 'Device/:id',
        component: DeviceComponent,
        data: {
          title: 'Edit Device'
        }
      },
      {
        path: 'FormQueAnsMapping',
        component: FormQueAnsMappingComponent,
        data: {
          title: 'Form Question Answer Mapping'
        },
        resolve: {
          FormList: FormQueAnsMappingListResolverService
        }
      },
      {
        path: 'ProcessFormMapping',
        component: ProcessFormMappingComponent,
        data: {
          title: 'Process Form Mapping'
        },
      },

      {
        path: 'UserDeviceMapping',
        component: UserDeviceMappingComponent,
        data: {
          title: 'User Device Mapping'
        },
      },

      {
        path: 'DeviceAssetMapping',
        component: DeviceAssetMappingComponent,
        data: {
          title: 'Device Warehouse Mapping'
        },
      },
      {
        path: 'UserGroupMapping',
        component: UserGroupMappingComponent,
        data: {
          title: 'User Group Mapping'
        },
      },

      {
        path: 'RoleList',
        component: RoleListComponent,
        data: {
          title: 'Role List'
        },
        resolve: {
          RoleList: RoleListResolverService
        },
      },

      {
        path: 'Role',
        component: RoleComponent,
        data: {
          title: 'Add Role'
        }
      },

      {
        path: 'Role/:id',
        component: RoleComponent,
        data: {
          title: 'Edit Role'
        }
      },


      {
        path: 'ProjectList',
        component: ProjectListComponent,
        data: {
          title: 'Project List'
        },
        resolve: {
          ProjectList: ProjectListResolverService
        },
      },

      {
        path: 'Project',
        component: ProjectComponent,
        data: {
          title: 'Add Project'
        }
      },

      {
        path: 'Project/:id',
        component: ProjectComponent,
        data: {
          title: 'Edit Project'
        }
      },
      {
        path: 'UserList',
        component: UserListComponent,
        data: {
          title: 'User List'
        },
        resolve: {
          UserList: UserListResolverService,
        },
      },
      {
        path: 'User',
        component: UserComponent,
        data: {
          title: 'Add User'
        }
      },
      {
        path: 'User/:id',
        component: UserComponent,
        data: {
          title: 'Edit User'
        }
      },
      {
        path: 'UserDeviceRegList',
        component: UserDeviceRegListComponent,
        data: {
          title: 'User Approve List'
        },
        resolve: {
          UserDeviceRegList: UserDeviceRegListResolverService,
        },
      },
      {
        path: 'UserDeviceReg/:id',
        component: UserDeviceRegComponent,
        data: {
          title: 'User Approve'
        }
      },

      {
        path: 'UserGroupList',
        component: UserGroupListComponent,
        data: {
          title: 'User Group List'
        }
      },
      {
        path: 'UserGroup',
        component: UserGroupComponent,
        data: {
          title: 'Add User Group'
        }
      },
      {
        path: 'UserGroup/:id',
        component: UserGroupComponent,
        data: {
          title: 'Edit User Group'
        }
      },
      /////Reports

      {
        path: 'MonitoringReport',
        component: MonitoringReportComponent,
        data: {
          title: 'Monitoring Report'
        }
      },
      {
        path: 'MonitoringReportNew',
        component: MonitoringReportNewComponent,
        data: {
          title: 'Monitoring Report New'
        }
      },
      {
        path: 'InceptionReport',
        component: InceptionReportComponent,
        data: {
          title: 'Inception Report'
        }
      },
    ]
  },
  {
    path: 'login',
    component: LogInComponent,
    data: {
      title: 'Login Page'
    }
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
