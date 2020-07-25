import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { State } from '../../Module/Masters/State.model';
import { StateEntity } from '../../Module/Masters/StateEntity.model';
import { District } from '../../Module/Masters/District';
import { DistrictEntity } from '../../Module/Masters/DistrictEntity.model';
import { TehsilEntity, Tehsil } from '../../Module/Masters/Tehsil';

@Injectable()
export class TehsilTransfarmer {
    str: string;
    tehsilEntity: TehsilEntity;
    tehsil: Tehsil;
    tehsils: Tehsil[] = [];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    ListState: State[];
    TehsilTransfarmers(Entity: TehsilEntity[]): Tehsil[] {
        // this.states = new State()[Entity.length + 1];
        Entity.forEach(element => {
            this.tehsil = new Tehsil();
            this.tehsil.tehsilCode = element.tehsilCode;
            this.tehsil.tehsilNameEng = element.tehsilNameEng;
            this.tehsil.tehsilNameUni = element.tehsilNameUni;
            this.tehsil.isActive = element.isActive;
            this.tehsil.districtCode = element.districtCode;
            this.tehsils.push(this.tehsil);
        });
        return this.tehsils;
    }
    TehsilTransfarmerEntity(Entity: TehsilEntity): Tehsil {
        this.tehsil = new Tehsil();
        this.tehsil.tehsilCode = Entity.tehsilCode;
        this.tehsil.tehsilNameEng = Entity.tehsilNameEng;
        this.tehsil.tehsilNameUni = Entity.tehsilNameUni;
        this.tehsil.districtCode = Entity.districtCode;
        this.tehsil.isActive = Entity.isActive;
        return this.tehsil;
    }

    TehsilTransfarmer(tehsil: Tehsil): TehsilEntity {
        this.tehsilEntity = new TehsilEntity();
        this.tehsilEntity.tehsilCode = tehsil.tehsilCode;
        this.tehsilEntity.tehsilNameEng = tehsil.tehsilNameEng;
        this.tehsilEntity.tehsilNameUni = tehsil.tehsilNameUni;
        this.tehsilEntity.districtCode = tehsil.districtCode;
        if (tehsil.isActive === 'true') { this.tehsil.isActive = '1'; } else { this.tehsil.isActive = '1'; }
        return this.tehsilEntity;
    }
}
