import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { State } from '../../Module/Masters/State.model';
import { City, CityEntity } from '../../Module/City';

@Injectable()
export class CityTransfarmer {
    str: string;
    cityEntity: CityEntity;
    city: City;
    citys: City[] = [];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    ListState: State[];
    CityTransfarmers(Entity: CityEntity[]): City[] {
        // this.states = new State()[Entity.length + 1];
        this.citys = [];
        console.log(Entity);
        Entity.forEach(element => {
            
            this.city = new City();
            this.city.cityCode = element.cityCode;
            this.city.cityNameENG = element.cityNameENG;
            this.city.cityNameUNI = element.cityNameUNI;
            this.city.districtCode = element.districtCode;
            this.city.tehsilCode = element.tehsilCode;
            this.city.cityGroupCode = element.cityGroupCode;
            this.city.zipPinCode = element.zipPinCode;
            this.city.sortBy = element.sortBy;
            this.city.isActive = element.isActive;
            this.city.createdBy = element.createdBy;
            this.city.createdDate = element.createdDate;
            this.city.modifiedBy = element.modifiedBy;
            this.city.modifiedDate = element.modifiedDate;
            //this.districts.push(this.district);
            if (element.isActive === '1') {
                this.city.isActive = 'Active'.toString().trim();
            } else { this.city.isActive = 'Inactive'.toString().trim(); }
            this.citys.push(this.city);
        });
        return this.citys;
    }
    CityTransfarmerEntity(Entity: CityEntity): City {
        this.city = new City();
            this.city.cityCode = Entity.cityCode;
            this.city.cityNameENG = Entity.cityNameENG;
            this.city.cityNameUNI = Entity.cityNameUNI;
            this.city.districtCode = Entity.districtCode;
            this.city.tehsilCode = Entity.tehsilCode;
            this.city.cityGroupCode = Entity.cityGroupCode;
            this.city.sortBy = Entity.sortBy;
            this.city.createdBy = Entity.createdBy;
            this.city.createdDate = Entity.createdDate;
            this.city.modifiedBy = Entity.modifiedBy;
            this.city.modifiedDate = Entity.modifiedDate;
            this.city.isActive = Entity.isActive;
            if (Entity.isActive === '1') {
                this.city.isActive = 'true'.toString().trim();
            } else { this.city.isActive = ''.toString().trim(); }
            return this.city;
    }

    CityTransfarmer(city: City): CityEntity {
        this.cityEntity = new CityEntity();
        this.cityEntity.cityCode = city.cityCode;
        this.cityEntity.cityNameENG = city.cityNameENG;
        this.cityEntity.cityNameUNI = city.cityNameUNI;
        this.cityEntity.districtCode = city.districtCode;
        this.cityEntity.tehsilCode = city.tehsilCode;
        this.cityEntity.cityGroupCode = city.cityGroupCode;
        this.cityEntity.zipPinCode = city.zipPinCode;
        this.cityEntity.sortBy = city.sortBy;
        this.cityEntity.createdBy = city.createdBy;
        this.cityEntity.createdDate = city.createdDate;
        this.cityEntity.modifiedBy = city.modifiedBy;
        this.cityEntity.modifiedDate = city.modifiedDate;
        this.cityEntity.isActive = city.isActive;
        if (city.isActive.toString().trim() === 'true') {
            this.cityEntity.isActive = '1';
        } else { this.cityEntity.isActive = '0'; }
        console.log(this.cityEntity);
        return this.cityEntity;
    }
}