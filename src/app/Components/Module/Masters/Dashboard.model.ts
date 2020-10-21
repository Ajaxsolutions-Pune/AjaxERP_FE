export class dashboard  {   
    dashboardCount: dashboardCount;
    topDistance: topDistance[];
    bottomDistance: bottomDistance[];
    topPlacesTagged: topPlacesTagged[];
    bottomPlacesTagged: bottomPlacesTagged[];
    topForm: topForm[];
    bottomForm: bottomForm[];
    topPlacesVisit: topPlacesVisit[];
    bottomPlacesVisit: bottomPlacesVisit[];
}

export class dashboardCount {    
    checkIn: string;
    checkOut: string;
    idle: string;
    leave: string;
    inactive: string;
    total: string;
}
export class topDistance  {   
    topNDistance: string;
    userName: string;
    distance: string;
}

export class bottomDistance  {   
    bottomNDistance: string;
    userName: string;
    distance: string;
}

export class topPlacesTagged{   
    topN: string;
    userName: string;
    placesTagged: string;
}

export class bottomPlacesTagged  {   
    bottomN: string;
    userName: string;
    placesTagged: string;
}

export class topForm  {   
    topN: string;
    userName: string;
    formCount: string;
}

export class bottomForm  {   
    topN: string;
    userName: string;
    formCount: string;
}

export class topPlacesVisit  {   
    topN: string;
    userName: string;
    placesVisit: string;
}

export class bottomPlacesVisit  {   
    topN: string;
    userName: string;
    placesVisit: string;
}


