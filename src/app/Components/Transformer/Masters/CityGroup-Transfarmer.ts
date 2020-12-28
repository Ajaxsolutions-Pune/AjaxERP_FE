import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { State } from '../../Module/Masters/State.model';
import { DistrictEntity } from '../../Module/Masters/District.Entity.model';
import { District } from '../../Module/Masters/District';
import { City, CityEntity } from '../../Module/City';
import { CityGroup, CityGroupEntity } from '../../Module/Masters/CityGroup';

@Injectable()
export class CityGroupTransfarmer {
    str: string;
    cityGroupEntity: CityGroupEntity;
    cityGroup: CityGroup;
    cityGroups: CityGroup[] = [];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    ListState: State[];
    CityGroupTransfarmers(Entity: CityGroupEntity[]): CityGroup[] {
        // this.states = new State()[Entity.length + 1];
        this.cityGroups = [];
        console.log(Entity);
        Entity.forEach(element => {
            this.cityGroup = new CityGroup();
            this.cityGroup.CityGroup_Code = element.cityGroupCode;
            this.cityGroup.CityGroup_Name_ENG = element.cityGroupNameENG;
            this.cityGroup.CityGroup_Name_UNI = element.cityGroupNameUNI;
            this.cityGroup.IsActive = element.isActive;
            //this.districts.push(this.district);
            if (element.isActive === '1') {
                this.cityGroup.IsActive = 'Active'.toString().trim();
            } else { this.cityGroup.IsActive = 'Inactive'.toString().trim(); }
            this.cityGroups.push(this.cityGroup);
        });
        return this.cityGroups;
    }
    CityGroupTransfarmerEntity(Entity: CityGroupEntity): CityGroup {
        this.cityGroup = new CityGroup();
            this.cityGroup.CityGroup_Code = Entity.cityGroupCode;
            this.cityGroup.CityGroup_Name_ENG = Entity.cityGroupNameENG;
            this.cityGroup.CityGroup_Name_UNI = Entity.cityGroupNameUNI;
            this.cityGroup.IsActive = Entity.isActive;
            if (Entity.isActive === '1') {
                this.cityGroup.IsActive = 'true'.toString().trim();
            } else { this.cityGroup.IsActive = ''.toString().trim(); }
            return this.cityGroup;
    }

    CityGroupTransfarmer(cityGroup: CityGroup): CityGroupEntity {
        this.cityGroupEntity = new CityGroupEntity();
        this.cityGroupEntity.cityGroupCode = cityGroup.CityGroup_Code;
        this.cityGroupEntity.cityGroupNameENG = cityGroup.CityGroup_Name_ENG;
        this.cityGroupEntity.cityGroupNameUNI = cityGroup.CityGroup_Name_UNI;



        
        this.cityGroupEntity.sortBy = '0';
        this.cityGroupEntity.isActive = cityGroup.IsActive;
        this.cityGroupEntity.createdBy = cityGroup.createdBy;
        this.cityGroupEntity.createdDate = cityGroup.createdDate;
        this.cityGroupEntity.modifiedBy = cityGroup.modifiedBy;
        this.cityGroupEntity.modifiedDate = cityGroup.modifiedDate;
        this.cityGroupEntity.isActive = cityGroup.IsActive;
        if (cityGroup.IsActive.toString().trim() === 'true') {
            this.cityGroupEntity.isActive = '1';
        } else { this.cityGroupEntity.isActive = '0'; }
        return this.cityGroupEntity;
    }
}
