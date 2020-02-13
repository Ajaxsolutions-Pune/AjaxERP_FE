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
        name: 'User',
        url: '/UserList',
        icon: 'icon-puzzle'
      },
      {
        name: 'UnitList',
        url: '/UnitList',
        icon: 'icon-puzzle'
      },
      {
        name: 'CountryList',
        url: '/CountryList',
        icon: 'icon-puzzle'
      },
      {
        name: 'Brand List',
        url: '/BrandList',
        icon: 'icon-puzzle'
      },
      {
        name: 'State List',
        url: '/StateList',
        icon: 'icon-puzzle'
      }

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
