import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { State } from '../../Module/Masters/State.model';
import { DistrictEntity } from '../../Module/Masters/District.Entity.model';
import { District } from '../../Module/Masters/District';

@Injectable()
export class DistrictTransfarmer {
    str: string;
    districtEntity: DistrictEntity;
    district: District;
    districts: District[] = [];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    ListState: State[];
    DistrictTransfarmers(Entity: DistrictEntity[]): District[] {
        // this.states = new State()[Entity.length + 1];
        this.districts = [];
        Entity.forEach(element => {
            this.district = new District();
            this.district.districtCode = element.districtCode;
            this.district.districtNameUni = element.districtNameUNI;
            this.district.districtNameEng = element.districtNameENG;
            this.district.isActive = element.isActive;
            this.district.createdBy = element.createdBy;
            this.district.createdDate = element.createdDate;
            this.district.modifiedBy = element.modifiedBy;
            this.district.modifiedDate = element.modifiedDate;
            this.district.stateCode = element.stateCode;
            //this.districts.push(this.district);
            if (element.isActive === '1') {
                this.district.isActive = 'Active'.toString().trim();
            } else { this.district.isActive = 'Inactive'.toString().trim(); }
            this.districts.push(this.district);
        });
        return this.districts;
    }
    DistrictTransfarmerEntity(Entity: DistrictEntity): District {
        this.district = new District();
            this.district.districtCode = Entity.districtCode;
            this.district.districtNameEng = Entity.districtNameENG;
            this.district.districtNameUni = Entity.districtNameUNI;
            this.district.stateCode = Entity.stateCode;
            this.district.createdBy = Entity.createdBy;
            this.district.createdDate = Entity.createdDate;
            this.district.modifiedBy = Entity.modifiedBy;
            this.district.modifiedDate = Entity.modifiedDate;
            this.district.isActive = Entity.isActive;
            if (Entity.isActive === '1') {
                this.district.isActive = 'true'.toString().trim();
            } else { this.district.isActive = ''.toString().trim(); }
            return this.district;
    }

    DistrictTransfarmer(district: District): DistrictEntity {
        this.districtEntity = new DistrictEntity();
        this.districtEntity.districtCode = district.districtCode;
        this.districtEntity.districtNameENG = district.districtNameEng;
        this.districtEntity.districtNameUNI = district.districtNameUni;
        this.districtEntity.isActive = district.isActive;
        this.districtEntity.stateCode = district.stateCode;
        this.districtEntity.createdBy = district.createdBy;
        this.districtEntity.createdDate = district.createdDate;
        this.districtEntity.modifiedBy = district.modifiedBy;
        this.districtEntity.modifiedDate = district.modifiedDate;
        if (district.isActive.toString().trim() === 'true') {
            this.districtEntity.isActive = '1';
        } else { this.districtEntity.isActive = '0'; }
        return this.districtEntity;
    }
}
