import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { State } from '../../Module/Masters/State.model';
import { StateEntity } from '../../Module/Masters/StateEntity.model';
import { Country, CountryEntity } from '../../Module/Masters/Country.model';

@Injectable()
export class CountryTransfarmer {
    str: string;
    countryEntity: CountryEntity;
    country: Country;
    countrys: Country[] = [];
    env = environment;
    constructor() {
    }
    CountryTransfarmers(Entity: CountryEntity[]): Country[] {
        this.countrys = [];
        Entity.forEach(element => {
            this.country = new Country();
            this.country.countryCode = element.countryCode;
            this.country.Country_Name_Uni = element.countryNameUni;
            this.country.Country_Name_ENg = element.countryNameEng;
            this.country.IsActive = element.isActive;
            this.countrys.push(this.country);
        });
        return this.countrys;
    }
    CountryTransfarmerOne(Entity: CountryEntity): Country {
        // this.states = new State()[Entity.length + 1];
        this.country = new Country();
        this.country.countryCode = Entity.countryCode;
        this.country.Country_Name_Uni = Entity.countryNameUni;
        this.country.Country_Name_ENg = Entity.countryNameEng;
        this.country.IsActive = Entity.isActive;
        this.countrys.push(this.country);
        return this.country;
    }
    CountryTransfarmer(country: Country): CountryEntity {
        this.countryEntity = new CountryEntity();
        this.countryEntity.countryCode = country.countryCode;
        this.countryEntity.countryNameUni = country.Country_Name_Uni;
        this.countryEntity.countryNameEng = country.Country_Name_ENg;
        if (country.IsActive === 'true') { this.countryEntity.isActive = '1'; } else { this.countryEntity.isActive = '1'; }
        return this.countryEntity;
    }
}
