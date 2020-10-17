import { HttpHeaders } from '@angular/common/http';

export const environment = {
    // apiServiceIPPort: 'http://ajaxservercl.eastus.cloudapp.azure.com:8090/AjaxErpBackEnd',
     apiServiceIPPort: 'http://ajaxdevdbcl.eastus.cloudapp.azure.com:8085/AjaxErpBackEnd',
    SessionTimeOut: 15,
    OuCode: '12',
    GlobalUserName: 'Superadmin',
    NotValideKeyCode: [60, 62],
    showLoddingIndicator: true,
    // tslint:disable-next-line:max-line-length
    GlobalToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMURwIiwiZXhwIjoxNTk1Nzc4OTE5LCJpYXQiOjE1OTU3NjA5MTl9.YxmELY2CL0I_-xk7L6Btx7ZNIqvg1WW3IPaeMnLjUYX4_nmF6nL_zAmXHSowtmW7Q6s1ZNSGDEqhhkJxl5Lo-Q',
    GlobalUserPassword: 'Admin',
    paginationPageSize: 6,
    httpOptions: {
        headers:
            new HttpHeaders({})
    }
};
