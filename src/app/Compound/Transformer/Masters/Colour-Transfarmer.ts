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
            this.Oject.isActive = element.isActive;
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
        if (Entity.isActive === '1') {
            this.Oject.isActive = 'true'.toString().trim();
        } else { this.Oject.isActive = ''.toString().trim(); }

        return this.Oject;
    }

    ColourTransfarmer(qaType1: Colour): ColourEntity {
        this.OjectEntity = new ColourEntity();
        this.OjectEntity.colourCode = qaType1.colourCode;
        this.OjectEntity.colourNameENG = qaType1.colourNameENG;
        this.OjectEntity.colourNameENG = qaType1.colourNameENG;
         if (qaType1.isActive === 'true') {  this.OjectEntity.isActive = '1';
             } else { this.OjectEntity.isActive = '0'; }
        if (qaType1.isActive.toString().trim() === 'true') {
            this.OjectEntity.isActive = '1';
        } else {
            this.OjectEntity.isActive = '0';
        }
        return this.OjectEntity;
    }
}
