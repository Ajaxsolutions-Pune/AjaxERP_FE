interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Monitoring Masters',
    url: '/Masters',
    //  icon: 'nav-icon icon-layers',
    children: [
      {
        name: 'Form',
        url: '/FormList',
        icon: 'icon-puzzle'
      },
      {
        name: 'Question',
        url: '/QuestionList',
        icon: 'icon-puzzle'
      },
      {
        name: 'Answer',
        url: '/AnswerList',
        icon: 'icon-puzzle'
      },
      {
        name: 'Process',
        url: '/ProcessList',
        icon: 'icon-puzzle'
      },

      /*{
        name: 'Role',
        url: '/RoleList',
        icon: 'icon-puzzle'
      },

      {
        name: 'Role Level',
        url: '/Role-level',
        icon: 'icon-puzzle'
      },

      {
        name: 'Project',
        url: '/ProjectList',
        icon: 'icon-puzzle'
      },*/

      // {
      //   name: 'QuestionType',
      //   url: '/QuestionTypeList',
      //   icon: 'icon-puzzle'
      // },
      {
        name: 'Zone',
        url: '/ZoneList',
        icon: 'icon-puzzle'
      },
      {
        name: 'Circle',
        url: '/CircleList',
        icon: 'icon-puzzle'
      },
       {
         name: 'Cluster',
         url: '/ClusterList',
         icon: 'icon-puzzle'
       },
       {
         name: 'Region',
         url: '/RegionList',
         icon: 'icon-puzzle'
       },
      // {
      //   name: 'Asset Category',
      //   url: '/AssetCategoryList',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Asset Group',
      //   url: '/AssetGroupList',
      //   icon: 'icon-puzzle'
      // },
      /*{
        name: 'Asset',
        url: '/AssetList',
        icon: 'icon-puzzle'
      },
      {
        name: 'Device',
        url: '/DeviceList',
        icon: 'icon-puzzle'
      },*/
      // {
      //   name: 'Colour',
      //   url: '/ColourList',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Country',
      //   url: '/CountryList',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'State',
      //   url: '/StateList',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'District',
      //   url: '/DistrictList',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Tehsil',
      //   url: '/TehsilList',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'City',
      //   url: '/CityList',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'City Group',
      //   url: '/CityGroupList',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'User',
      //   url: '/UserList',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Unit',
      //   url: '/UnitList',
      //   icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Brand',
      // url: '/BrandList',
      //  icon: 'icon-puzzle'
      // },
      // {
      //   name: 'Manufacturer',
      //  url: '/ManufacturerList',
      //  icon: 'icon-puzzle'
      // },
      // {
      //   name: 'TaxCategory',
      //   url: '/TaxCategoryList',
      //   icon: 'icon-puzzle'
      //  },
      //  {
      //   name: 'Cast Category',
      //   url: '/CastCategoryList',
      //  icon: 'icon-puzzle'
      // },

      // {
      // name: 'Cast',
      // url: '/CastList',
      // icon: 'icon-puzzle'
      // },
      // {
      //    name: 'Item Category',
      //    url: '/ItemCategoryList',
      //    icon: 'icon-puzzle'
      //  }, /// Create by Dhanraj start
      //  {
      //     name: 'Item Group',
      //     url: '/ItemGroupList',
      //      icon: 'icon-puzzle'
      //    },
      //    {
      //      name: 'Item Sub Group',
      //     url: '/ItemSubGroupList',
      //      icon: 'icon-puzzle'
      //    },


    ]
  },
  {
    name: 'Process Setup',
    url: '/Mapping',
    icon: '',
    children: [
      {
        name: 'Form Que Ans',
        url: '/FormQueAnsMapping',
        icon: 'icon-puzzle'
      },
      // {
      // name: 'Process Form',
      // url: '/FormQueAnsMapping',
      //   icon: 'icon-puzzle'
      // },
    ]
  },
  {
    name: 'Monitoring Reports',
    url: '/Reports',
    //   icon: 'fa fa-newspaper-o',
    children: [
    ]

  }
];
