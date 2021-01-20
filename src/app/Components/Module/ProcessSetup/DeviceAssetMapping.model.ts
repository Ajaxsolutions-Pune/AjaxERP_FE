export class DeviceAssetMapping {
    //ssetCode: string;
    //assetNameENG: string;
    //status: string;
    //assigned: string;
    daId: number;
    ouCode : number;
    deviceId : string; 
    assetCode: string;   
    assetName: string;  
    sortBy  : string;   
    isActive: string;
    assigned: string;        
    createdBy: string;
    createdDate: string;
    modifiedBy: string;
    modifiedDate: string;    
    deviceName: string;   
}

export class DeviceAssetMappingEntity {
    daId: number;
    ouCode : number;
    deviceId : string; 
    assetCode: string;   
    assetName: string;  
    sortBy  : string;   
    isActive: string;
    assigned: string;       
    createdBy: string;
    createdDate: string;
    modifiedBy: string;
    modifiedDate: string; 
    deviceName: string;       
}

export class DeviceAssetMapping_Delete {    
    daId: number;
    ouCode : number;
    deviceId : string; 
    assetCode: string;   
    assetName: string;  
    sortBy  : string;   
    isActive: string;
    assigned: string;        
    createdBy: string;
    createdDate: string;
    modifiedBy: string;
    modifiedDate: string;    
    deviceName: string;   
}

export class DeviceAssetMapping_Transmission_Line {            
    transmissionline: string;   
}
