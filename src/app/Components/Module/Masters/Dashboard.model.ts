export class dashboard  {   
    dashboardCount: dashboardCount;
    dashboardTop: dashboardTop[];
    dashboardBottom: dashboardBottom[];
}

export class dashboardCount {    
    checkIn: string;
    checkOut: string;
    idle: string;
    leave: string;
    inactive: string;
    total: string;
}
export class dashboardTop  {   
    topNDistance: string;
    userName: string;
    distance: string;
}

export class dashboardBottom  {   
    bottomNDistance: string;
    userName: string;
    distance: string;
}


