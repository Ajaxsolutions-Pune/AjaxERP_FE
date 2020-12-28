import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { State } from '../../Module/Masters/State.model';
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
            this.country.Country_Name_Uni = element.countryNameUNI;
            this.country.Country_Name_Eng = element.countryNameENG;
            this.country.CreatedBy = element.createdBy;
            this.country.CreDate = element.createdDate;
            this.country.ModifiedBy = element.modifiedBy;
            this.country.ModDate = element.modifiedDate;
            this.country.isActive = element.isActive;
            // this.countrys.push(this.country);
            if (element.isActive === '1') {
                this.country.isActive = 'Active'.toString().trim();
            } else { this.country.isActive = 'Inactive'.toString().trim(); }
            this.countrys.push(this.country);
        });
        return this.countrys;
    }
    CountryTransfarmerEntity(Entity: CountryEntity): Country {
        // this.states = new State()[Entity.length + 1];
        this.country = new Country();
        this.country.countryCode = Entity.countryCode;
        this.country.Country_Name_Uni = Entity.countryNameUNI;
        this.country.Country_Name_Eng = Entity.countryNameENG;
        this.country.CreDate = Entity.createdBy;
        this.country.CreatedBy = Entity.createdDate;
        this.country.ModDate = Entity.modifiedBy;
        this.country.ModifiedBy = Entity.modifiedDate;
        this.country.isActive = Entity.isActive;
        this.countrys.push(this.country);
        if (Entity.isActive === '1') {
            this.country.isActive = 'true'.toString().trim();
        } else { this.country.isActive = ''.toString().trim(); }
        return this.country;
    }
    CountryTransfarmer(country: Country): CountryEntity {
        this.countryEntity = new CountryEntity();
        this.countryEntity.countryCode = country.countryCode;
        this.countryEntity.countryNameUNI = country.Country_Name_Uni;
        this.countryEntity.countryNameENG = country.Country_Name_Eng;
        this.countryEntity.createdBy = country.CreatedBy;
        this.countryEntity.createdDate = country.CreDate;
        this.countryEntity.modifiedBy = country.ModifiedBy;
        this.countryEntity.modifiedDate = country.ModDate;
        if (country.isActive.toString().trim() === 'true') {
            this.countryEntity.isActive = '1';
        } else { this.countryEntity.isActive = '0'; }
        return this.countryEntity;
    }
}
