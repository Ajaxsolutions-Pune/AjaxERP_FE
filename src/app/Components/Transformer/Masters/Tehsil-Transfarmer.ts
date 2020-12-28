import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { State } from '../../Module/Masters/State.model';
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
            this.tehsil.tehsilNameEng = element.tehsilNameENG;
            this.tehsil.tehsilNameUni = element.tehsilNameUNI;
            this.tehsil.isActive = element.isActive;
            this.tehsil.districtCode = element.districtCode;
            if (element.isActive === '1') {
                this.tehsil.isActive = 'Active'.toString().trim();
            } else { this.tehsil.isActive = 'Inactive'.toString().trim(); }
            this.tehsils.push(this.tehsil);
        });
        return this.tehsils;
    }
    TehsilTransfarmerEntity(Entity: TehsilEntity): Tehsil {
        this.tehsil = new Tehsil();
        this.tehsil.tehsilCode = Entity.tehsilCode;
        this.tehsil.tehsilNameEng = Entity.tehsilNameENG;
        this.tehsil.tehsilNameUni = Entity.tehsilNameUNI;
        this.tehsil.districtCode = Entity.districtCode;
        this.tehsil.isActive = Entity.isActive;
        if (Entity.isActive === '1') {
            this.tehsil.isActive = 'true'.toString().trim();
        } else { this.tehsil.isActive = ''.toString().trim(); }
        return this.tehsil;
    }

    TehsilTransfarmer(tehsil: Tehsil): TehsilEntity {
        this.tehsilEntity = new TehsilEntity();
        this.tehsilEntity.tehsilCode = tehsil.tehsilCode;
        this.tehsilEntity.tehsilNameENG = tehsil.tehsilNameEng;
        this.tehsilEntity.tehsilNameUNI = tehsil.tehsilNameUni;
        this.tehsilEntity.districtCode = tehsil.districtCode;
        if (tehsil.isActive.toString().trim() === 'true') {
            this.tehsilEntity.isActive = '1';
        } else { this.tehsilEntity.isActive = '0'; }
        return this.tehsilEntity;
    }
}