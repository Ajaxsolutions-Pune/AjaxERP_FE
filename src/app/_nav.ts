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
    name: 'Masters',
    url: '/Masters',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Answer',
        url: '/AnswerList',
        icon: 'icon-puzzle'
      },
      {
        name: 'Form',
        url: '/FormList',
        icon: 'icon-puzzle'
      },
      {
        name: 'Process',
        url: '/ProcessList',
        icon: 'icon-puzzle'
      },
      {
        name: 'QuestionType',
        url: '/QuestionTypeList',
        icon: 'icon-puzzle'
      },
      {
        name: 'Question',
        url: '/QuestionList',
        icon: 'icon-puzzle'
      },
     // {
       // name: 'User',
     //   url: '/UserList',
       // icon: 'icon-puzzle'
     // },
     // {
     //   name: 'Unit',
     //   url: '/UnitList',
     //   icon: 'icon-puzzle'
     // },
     // {
     //   name: 'Country',
     //   url: '/CountryList',
      //  icon: 'icon-puzzle'
     // },
     // {
     //   name: 'Brand',
       // url: '/BrandList',
      //  icon: 'icon-puzzle'
     // },
     // {
       // name: 'State',
       // url: '/StateList',
       // icon: 'icon-puzzle'
     // },
     // {
      //  name: 'City',
       // url: '/CityList',
       // icon: 'icon-puzzle'
     // },
     // {
     //   name: 'Manufacturer',
      //  url: '/ManufacturerList',
      //  icon: 'icon-puzzle'
     // },
     // {
      //  name: 'CityGroup',
       // url: '/CityGroupList',
      //  icon: 'icon-puzzle'
      // },
     // {
     //   name: 'District',
       // url: '/DistrictList',
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
    //    name: 'Tehsil',
    //    url: '/TehsilList',
    //    icon: 'icon-puzzle'
    //  },
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
    name: 'Transaction',
    url: '/Transaction',
    icon: 'cui-shield',
    children: [
      {
        name: 'Production Details',
        url: '/ProductionList',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Reports',
    url: '/Reports',
    icon: 'fa fa-newspaper-o',
    children: [
      {
        name: 'Production',
        url: '/ReportList',
        icon: 'icon-puzzle'
      }
    ]

  }
];
