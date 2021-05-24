export class mapModel  {     
    placeSummery: placeSummery[];  
    placeDetail: placeDetail[]; 
    userSummery: userSummery[];
    userDetail: userDetail[];
    userTracking: userTracking[];
}
export class placeSummery  {   
    placeGroupName: string;
    placeGroupCode: string;
    totalPlaceCount: string;
    placeCount: string;
}
export class placeDetail
{
    placeCode: string;
    assetName: string;
    placeGroupCode: string;
    placeGroupName: string;
    placeName: string;
    locationName: string;
    latitude:string;
    longitude: string;
    placeAddress: string;
    pinCode: string;
    stateName: string;
    countryName: string;   
    redius: string;
}
export class userSummery
{
    userStatus: string;
    userStatusCount: string;
    totalUserCount: string;
}
export class userDetail
{
    loginId: string;
    userStatus: string;
    userNameENG: string;
    userGroupCode: string;
    userGroupName: string;
    googleAddress:string;
    speed: string;
    batteryPer: string;
    latitude: string;
    longitude: string;
    distanceTraveled: string;
    highAccurecy: string;
    model: string;
    imei1: string;
    osVersion: string;
    appVersion: string;    
}
export class userTracking
{
    trackingId: string;
    loginId: string;
    userNameENG: string;
    mobileNo: string;
    dateTime: string;
    latitude: string;
    longitude: string;
    location: string;
    batteryPer: string;
    speed: string;
}

