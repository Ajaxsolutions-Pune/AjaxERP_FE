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
    realTimeTrackingData: realTimeTrackingData[];
    places: places[];
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

export class realTimeTrackingData  {   
    loginId: string;
    userNameENG: string;
    location: string;
    speed: string;
    batteryPer: string;
    dateTime: string;
    latitude: string;
    longitude: string;
    distanceTraveled: string;
    placesVisit: string;
    formCount: string;
    placesTagged: string;
    status: string;
    userGroup: string;
    gps: string;
    highAccurecy: string;
    model: string;
    imei1: string;
    osVersion: string;
    appVersion: string;
    appType: string;
}

export class places  {  
    placeCode: string;
    assetName: string;
    placeGroupCode: string;
    placeGroupName: string;
    placeName: string;
    locationName: string;
    latitude: string;
    longitude: string;
    placeAddress: string;
    pinCode: string;
    stateName: string;
    countryName: string;
}


