import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { UserEntity, User } from '../../Module/Masters/User.model';

@Injectable()
export class UserTransfarmer {
    str: string;
    userEntity: UserEntity;
    user: User;
    users: User[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    UserTransfarmers(Entity: UserEntity[]): User[] {
        this.users = [];
        Entity.forEach(element => {
            this.user = new User();
            this.user.ouCode = this.env.OuCode;
            this.user.id = element.id;
            this.user.loginID = element.loginID;
            this.user.pwd = element.pwd;
            this.user.userNameENG = element.userNameENG;
            this.user.userNameUNI = element.userNameUNI;
            this.user.userTypeCode = element.userTypeCode;
            this.user.emailID = element.emailID;
            this.user.mobileNo = element.mobileNo;
            this.user.pwdChangedDate = element.pwdChangedDate;
            this.user.pwdExpiryDate = element.pwdExpiryDate;
            //this.user.isBlocked = element.isBlocked ;
            if (element.isBlocked === '1') {
                this.user.isBlocked = 'Block'.toString().trim();
            } else {
                this.user.isBlocked = 'Unblock'.toString().trim();
            }
            this.user.userGroupCode = element.userGroupCode;
            this.user.entityCode = element.entityCode;
            this.user.entityBranchCode = element.entityBranchCode;
            this.user.desigination = element.desigination;
            //this.user.isPswdChanged = element.isPswdChanged;
            this.user.desigination = element.desigination;
            //this.user.isPswdChanged = element.isPswdChanged;      
            if (element.isPswdChanged === '1') {
                this.user.isPswdChanged = 'Changed'.toString().trim();
            } else {
                this.user.isPswdChanged = 'Not Changed'.toString().trim();
            }
            this.user.createdBy = element.createdBy;
            this.user.createdDate = element.createdDate;
            this.user.modifiedBy = element.modifiedBy;
            this.user.modifiedDate = element.modifiedDate;
            if (element.isActive === '1') {
                this.user.isActive = 'Active'.toString().trim();
            } else { this.user.isActive = 'Inactive'.toString().trim(); }
            this.users.push(this.user);
        });
        return this.users;
    }

    UserTransfarmerEntity(Entity: UserEntity): User {
        this.user = new User();
        this.user.ouCode =  this.env.OuCode;
        this.user.id = Entity.id;
        this.user.loginID = Entity.loginID;
        this.user.pwd =  '';//Entity.pwd;
        this.user.confipwd = '';//Entity.pwd;
        this.user.userNameENG = Entity.userNameENG;
        this.user.userNameUNI = Entity.userNameUNI;
        this.user.userTypeCode = Entity.userTypeCode;
        this.user.emailID = Entity.emailID;
        this.user.mobileNo = Entity.mobileNo;
        this.user.pwdChangedDate = Entity.pwdChangedDate;
        this.user.pwdExpiryDate = Entity.pwdExpiryDate;
        //this.user.isBlocked = Entity.isBlocked;
        if (Entity.isBlocked === '1') {
            this.user.isBlocked = 'true'.toString().trim();
        } else {
            this.user.isBlocked = ''.toString().trim();
        }
        this.user.userGroupCode = Entity.userGroupCode;
        this.user.entityCode = Entity.entityCode;
        this.user.entityBranchCode = Entity.entityBranchCode;
        this.user.desigination = Entity.desigination;
        //this.user.isPswdChanged = Entity.isPswdChanged;
        this.user.desigination = Entity.desigination;
        //this.user.isPswdChanged = Entity.isPswdChanged;  
        if (Entity.isPswdChanged === '1') {
            this.user.isPswdChanged = 'true'.toString().trim();
        } else {
            this.user.isPswdChanged = ''.toString().trim();
        }
        this.user.createdBy = Entity.createdBy;
        this.user.createdDate = Entity.createdDate;
        this.user.modifiedBy = Entity.modifiedBy;
        this.user.modifiedDate = Entity.modifiedDate;
        if (Entity.isActive === '1') {
            this.user.isActive = 'true'.toString().trim();
        } else {
            this.user.isActive = ''.toString().trim();
        }
        return this.user;
    }

    UserTransfarmer(User1: User): UserEntity {
        this.userEntity = new UserEntity();
        this.userEntity.id = User1.id;
        this.userEntity.ouCode =  this.env.OuCode;
        this.userEntity.loginID = User1.loginID;
        this.userEntity.pwd = User1.pwd;
        this.userEntity.userNameENG = User1.userNameENG;
        this.userEntity.userNameUNI = User1.userNameUNI;
        this.userEntity.userTypeCode = User1.userTypeCode;
        this.userEntity.emailID = User1.emailID;
        this.userEntity.mobileNo = User1.mobileNo;
        this.userEntity.pwdChangedDate = User1.pwdChangedDate;
        this.userEntity.pwdExpiryDate = User1.pwdExpiryDate;
        //this.userEntity.isBlocked = User1.isBlocked ;
        if (User1.isBlocked.toString().trim() === 'true') { this.userEntity.isBlocked = '1'; }
        else { this.userEntity.isBlocked = '0'; }
        this.userEntity.userGroupCode = User1.userGroupCode;
        this.userEntity.entityCode = User1.entityCode;
        this.userEntity.entityBranchCode = User1.entityBranchCode;
        this.userEntity.desigination = User1.desigination;
        //this.userEntity.isPswdChanged = User1.isPswdChanged;
        if (User1.isPswdChanged.toString().trim() === 'true') { this.userEntity.isPswdChanged = '1'; }
        else { this.userEntity.isPswdChanged = '0'; }
        this.userEntity.desigination = User1.desigination;
        this.userEntity.createdBy = User1.createdBy;
        this.userEntity.createdDate = User1.createdDate;
        this.userEntity.modifiedBy = User1.modifiedBy;
        this.userEntity.modifiedDate = User1.modifiedDate;
        if (User1.isActive.toString().trim() === 'true') { this.userEntity.isActive = '1'; }
        else { this.userEntity.isActive = '0'; }

        console.log(this.userEntity);
        return this.userEntity;
    }
}
