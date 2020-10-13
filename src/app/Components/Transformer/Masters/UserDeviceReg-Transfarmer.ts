import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { UserDeviceRegEntity, UserDeviceReg } from '../../Module/Masters/UserDeviceReg.model';

@Injectable()
export class UserDeviceRegTransfarmer {
    str: string;
    userDeviceRegEntity: UserDeviceRegEntity;
    userDeviceReg: UserDeviceReg;
    userDeviceRegs: UserDeviceReg[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    userDeviceRegTransfarmers(Entity: UserDeviceRegEntity[]): UserDeviceReg[] {
        this.userDeviceRegs = [];
        Entity.forEach(element => {
            this.userDeviceReg = new UserDeviceReg();
            this.userDeviceReg.id = element.id;
            this.userDeviceReg.approveFlag = element.approveFlag;
            this.userDeviceReg.ouCode = element.ouCode;
            this.userDeviceReg.deviceRegNo = element.deviceRegNo;
            this.userDeviceReg.firstName = element.firstName;
            this.userDeviceReg.lastName = element.lastName;
            this.userDeviceReg.employeeId = element.employeeId;
            this.userDeviceReg.mobileNo = element.mobileNo;
            this.userDeviceReg.emailId = element.emailId;
            this.userDeviceReg.appSource = element.appSource;
            this.userDeviceReg.loginId = element.loginId;
            this.userDeviceReg.deviceId = element.deviceId;
            this.userDeviceReg.password = element.password;
            this.userDeviceReg.createdBy = element.createdBy;
            this.userDeviceReg.createdDate = element.createdDate;
            this.userDeviceReg.modifiedBy = element.modifiedBy;
            this.userDeviceReg.modifiedDate = element.modifiedDate;
            if (element.isApproved === '1') {
                this.userDeviceReg.isActive = 'Active'.toString().trim();
            } else { this.userDeviceReg.isActive = 'Inactive'.toString().trim(); }
            if (element.isApproved === '1') {
                this.userDeviceReg.isApproved = 'Approved'.toString().trim();
            } else { this.userDeviceReg.isApproved = 'Pendding For Approval'.toString().trim(); }
            this.userDeviceRegs.push(this.userDeviceReg);
        });
        return this.userDeviceRegs;
    }
    userDeviceRegTransfarmerEntity(Entity: UserDeviceRegEntity): UserDeviceReg {
        this.userDeviceReg = new UserDeviceReg();
        this.userDeviceReg.id = Entity.id;
        console.log(Entity.isApproved);
        this.userDeviceReg.approveFlag = Entity.approveFlag;
        this.userDeviceReg.ouCode = Entity.ouCode;
        this.userDeviceReg.deviceRegNo = Entity.deviceRegNo;
        this.userDeviceReg.firstName = Entity.firstName;
        this.userDeviceReg.lastName = Entity.lastName;
        this.userDeviceReg.employeeId = Entity.employeeId;
        this.userDeviceReg.mobileNo = Entity.mobileNo;
        this.userDeviceReg.emailId = Entity.emailId;
        this.userDeviceReg.appSource = Entity.appSource;
        this.userDeviceReg.loginId = Entity.loginId;
        this.userDeviceReg.deviceId = Entity.deviceId;
        this.userDeviceReg.password = Entity.password;
        this.userDeviceReg.createdBy = Entity.createdBy;
        this.userDeviceReg.createdDate = Entity.createdDate;
        this.userDeviceReg.modifiedBy = Entity.modifiedBy;
        this.userDeviceReg.modifiedDate = Entity.modifiedDate;
        if (Entity.isActive === '1') {
            this.userDeviceReg.isActive = 'true'.toString().trim();
        } else { this.userDeviceReg.isActive = ''.toString().trim(); }
        if (Entity.isApproved === '1') {
            this.userDeviceReg.isApproved = 'true'.toString().trim();
        } else { this.userDeviceReg.isApproved = 'Pendding For Approval'.toString().trim(); }
        return this.userDeviceReg;
    }

    userDeviceRegTransfarmer(userDeviceReg: UserDeviceReg): UserDeviceRegEntity {
        this.userDeviceRegEntity = new UserDeviceRegEntity();
        this.userDeviceRegEntity.id = userDeviceReg.id;
        this.userDeviceRegEntity.approveFlag = userDeviceReg.approveFlag;
        this.userDeviceRegEntity.ouCode = userDeviceReg.ouCode;
        this.userDeviceRegEntity.deviceRegNo = userDeviceReg.deviceRegNo;
        this.userDeviceRegEntity.firstName = userDeviceReg.firstName;
        this.userDeviceRegEntity.lastName = userDeviceReg.lastName;
        this.userDeviceRegEntity.employeeId = userDeviceReg.employeeId;
        this.userDeviceRegEntity.mobileNo = userDeviceReg.mobileNo;
        this.userDeviceRegEntity.emailId = userDeviceReg.emailId;
        this.userDeviceRegEntity.appSource = userDeviceReg.appSource;
        this.userDeviceRegEntity.isApproved = userDeviceReg.isApproved;
        this.userDeviceRegEntity.loginId = userDeviceReg.loginId;
        this.userDeviceRegEntity.deviceId = userDeviceReg.deviceId;
        this.userDeviceRegEntity.password = userDeviceReg.password;
        this.userDeviceRegEntity.createdBy = userDeviceReg.createdBy;
        this.userDeviceRegEntity.createdDate = userDeviceReg.createdDate;
        this.userDeviceRegEntity.modifiedBy = userDeviceReg.modifiedBy;
        this.userDeviceRegEntity.modifiedDate = userDeviceReg.modifiedDate;
        if (userDeviceReg.isActive.toString().trim() === 'true') {
            this.userDeviceRegEntity.isActive = '1';
        } else { this.userDeviceRegEntity.isActive = '0'; }
        
        if (userDeviceReg.isApproved.toString().trim() === 'true') {
            this.userDeviceRegEntity.isApproved = '1';
        } else { this.userDeviceRegEntity.isApproved = '0'; }
        return this.userDeviceRegEntity;
    }
}
