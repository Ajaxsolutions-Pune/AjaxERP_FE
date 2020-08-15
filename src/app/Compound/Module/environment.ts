import { HttpHeaders } from '@angular/common/http';

export const environment = {
    // apiServiceIPPort: 'http://192.168.0.105:8081/',
    apiServiceIPPort: 'http://ajaxdevdbcl.eastus.cloudapp.azure.com:8085/AjaxErpBackEnd',
    // apiServiceIPPort: 'http://localhost:49220//api',
    SessionTimeOut: 15,
    OuCode: '12',
    GlobalUserName: 'Superadmin',
    // tslint:disable-next-line:max-line-length
    GlobalToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMURwIiwiZXhwIjoxNTk1Nzc4OTE5LCJpYXQiOjE1OTU3NjA5MTl9.YxmELY2CL0I_-xk7L6Btx7ZNIqvg1WW3IPaeMnLjUYX4_nmF6nL_zAmXHSowtmW7Q6s1ZNSGDEqhhkJxl5Lo-Q',
    GlobalUserPassword: 'Admin',

    httpOptions: {
        headers:
            new HttpHeaders({ })
    }
};
