import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { State } from '../../Module/Masters/State.model';
import { StateEntity } from '../../Module/Masters/StateEntity.model';
import { District } from '../../Module/Masters/District';
import { DistrictEntity } from '../../Module/Masters/DistrictEntity.model';

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
        Entity.forEach(element => {
            this.district = new District();
            this.district.districtCode = element.districtCode;
            this.district.districtNameUni = element.districtNameUni;
            this.district.districtNameEng = element.districtName;
            this.district.isActive = element.isActive;
            this.district.stateCode = element.stateCode;
            this.districts.push(this.district);
        });
        return this.districts;
    }
    DistrictTransfarmerEntity(Entity: DistrictEntity): District {
        console.log('byyy' + Entity.districtName);
        this.district = new District();
            this.district.districtCode = Entity.districtCode;
            console.log(Entity.districtName);
            this.district.districtNameEng = Entity.districtName;
            this.district.districtNameUni = Entity.districtNameUni;
            this.district.stateCode = Entity.stateCode;
            this.district.isActive = Entity.isActive;
        return this.district;
    }

    DistrictTransfarmer(district: District): DistrictEntity {
        this.districtEntity = new DistrictEntity();
        this.districtEntity.districtCode = district.districtCode;
        this.districtEntity.districtNameUni = district.districtNameUni;
        this.districtEntity.isActive = district.isActive;
        this.districtEntity.stateCode = district.stateCode;
        if (district.isActive === 'true') { this.district.isActive = '1'; } else { this.district.isActive = '1'; }
        return this.districtEntity;
    }
}
