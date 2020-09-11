import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Role , RoleEntity} from '../../Module/Masters/Role.model';


//import { GlobalService } from 'src/globalservice/'

@Injectable()
export class RoleTransfarmer {
    str: string;
    roleEntity: RoleEntity;
   
    role: Role;
    roles: Role[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    
    RoleTransfarmers(Entity: RoleEntity[]): Role[] {
        this.roles = [];
        Entity.forEach(element => {
            this.role = new Role();
            this.role.roleId = element.roleId;
            this.role.roleName = element.roleName;
            this.role.roleDescription = element.roleDescription;
            this.role.roleLevel = element.roleLevel;
            this.role.roleCreateFor = element.roleCreateFor;            
            if (element.isActive === '1') {
                this.role.isActive = 'Active'.toString().trim();
            } else { this.role.isActive = 'Inactive'.toString().trim(); }
            this.roles.push(this.role);
        });
        return this.roles;
    }

    RoleTransfarmerEntity(Entity: RoleEntity): Role {
        console.log(Entity);
        this.role = new Role();
       
        this.role.roleId = Entity.roleId;
        this.role.roleName = Entity.roleName;
        this.role.roleDescription = Entity.roleDescription;
        this.role.roleLevel = Entity.roleLevel;
        this.role.roleCreateFor = Entity.roleCreateFor;
       
        console.log(Entity.isActive.toString().trim() === '1');
        console.log(Entity.isActive);
         // tslint:disable-next-line:max-line-length
         if (Entity.isActive === '1') { this.role.isActive = 'true'.toString().trim(); } else { this.role.isActive = ''.toString().trim(); }
        console.log(this.role.isActive);
        return this.role;
    }

    RoleTransfarmer(Role1: Role): RoleEntity {
        this.roleEntity = new RoleEntity();       
        this.roleEntity.roleId = Role1.roleId;
        this.roleEntity.roleName = Role1.roleName;
        this.roleEntity.roleDescription = Role1.roleDescription;
        this.roleEntity.roleLevel = Role1.roleLevel;
        this.roleEntity.roleCreateFor = Role1.roleCreateFor;
        this.roleEntity.isActive = Role1.isActive;       
         if (Role1.isActive.toString().trim() === 'true') 
         { 
             this.roleEntity.isActive = '1'; 
         } 
         else 
         { 
             this.roleEntity.isActive = '0'; 
         }
        this.roleEntity.createdBy = localStorage.getItem('username');
        this.roleEntity.modifiedBy = localStorage.getItem('username');
        this.roleEntity.createdDate =  Role1.createdDate;
        this.roleEntity.modifiedDate = Role1.modifiedDate;
        return this.roleEntity;
    }
}
