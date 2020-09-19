import { Injectable } from '@angular/core';
import { environment } from '../../Module/environment';
import { ColourEntity, Colour } from '../../Module/Masters/Colour.model';

@Injectable()
export class ColourTransfarmer {
    str: string;
    OjectEntity: ColourEntity;
    Oject: Colour;
    arrOject: Colour[] = [];
    env = environment;
    constructor() {
        this.str = this.env.apiServiceIPPort;
    }
    ColourTransfarmers(Entity: ColourEntity[]): Colour[] {
        this.arrOject = [];
        Entity.forEach(element => {
            this.Oject = new Colour();
            this.Oject.colourCode = element.colourCode;
            this.Oject.colourNameENG = element.colourNameENG;
            this.Oject.colourNameENG = element.colourNameENG;
            this.Oject.createdBy = element.createdBy;
            this.Oject.createdDate = element.createdDate;
            this.Oject.modifiedBy = element.modifiedBy;
            this.Oject.modifiedDate = element.modifiedDate;
            if (element.isActive === '1') {
                this.Oject.isActive = 'Active'.toString().trim();
            } else { this.Oject.isActive = 'Inactive'.toString().trim(); }
            this.arrOject.push(this.Oject);
        });
        return this.arrOject;
    }
    ColourTransfarmerEntity(Entity: ColourEntity): Colour {
        console.log(Entity);
        this.Oject = new Colour();
        this.Oject.colourCode = Entity.colourCode;
        this.Oject.colourNameENG = Entity.colourNameENG;
        this.Oject.colourNameENG = Entity.colourNameENG;
        this.Oject.createdBy = Entity.createdBy;
        this.Oject.createdDate = Entity.createdDate;
        this.Oject.modifiedBy = Entity.modifiedBy;
        this.Oject.modifiedDate = Entity.modifiedDate;
        if (Entity.isActive === '1') {
            this.Oject.isActive = 'true'.toString().trim();
        } else { this.Oject.isActive = ''.toString().trim(); }

        return this.Oject;
    }

    ColourTransfarmer(Entity: Colour): ColourEntity {
        this.OjectEntity = new ColourEntity();
        this.OjectEntity.colourCode = Entity.colourCode;
        this.OjectEntity.colourNameENG = Entity.colourNameENG;
        this.OjectEntity.colourNameENG = Entity.colourNameENG;
        this.OjectEntity.createdBy = Entity.createdBy;
        this.OjectEntity.createdDate = Entity.createdDate;
        this.OjectEntity.modifiedBy = Entity.modifiedBy;
        this.OjectEntity.modifiedDate = Entity.modifiedDate;
         if (Entity.isActive === 'true') {  this.OjectEntity.isActive = '1';
             } else { this.OjectEntity.isActive = '0'; }
        if (Entity.isActive.toString().trim() === 'true') {
            this.OjectEntity.isActive = '1';
        } else {
            this.OjectEntity.isActive = '0';
        }
        return this.OjectEntity;
    }
}
