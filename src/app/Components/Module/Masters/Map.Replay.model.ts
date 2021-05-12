export class mapReplayModel  {    
    assetData: assetData[]; 
    trackingData: trackingData[];
}
export class assetData
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
    
}

export class trackingData
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


