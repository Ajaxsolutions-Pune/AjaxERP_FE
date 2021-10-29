import { Injectable } from '@angular/core';
import { environment } from '../../Module/environment';
import { ScreenObj, ScreenObjEntity } from '../../Module/Masters/Screen.model';
@Injectable()
export class ScreenObjTransfarmer {
    str: string;
    ScreenObjEntity: ScreenObjEntity;
    screen: ScreenObj;
    Screens: ScreenObj[];
    env = environment;
    constructor() {
        this.str = this.env.apiServiceIPPort;
    }
    ScreenTransfarmers(Entity: ScreenObjEntity[]): ScreenObj[] {
        this.Screens = [];
        Entity.forEach(element => {
            this.screen = new ScreenObj();
            this.screen.screenID = element.screenID;
            this.screen.parentID = element.parentID;
            this.screen.screenName = element.screenName;
            this.screen.actionPath = element.actionPath;
            this.screen.created_By = element.created_By;
            this.screen.created_Date = element.created_Date;
            this.screen.modified_By = element.modified_By;
            this.screen.modified_Date = element.modified_Date;
            if (element.is_Active === '1') {
                this.screen.is_Active = 'Active'.toString().trim();
            } else { this.screen.is_Active = 'Inactive'.toString().trim(); }
            this.Screens.push(this.screen);
        });
        return this.Screens;
    }
    ScreenTransfarmerEntity(Entity: ScreenObjEntity): ScreenObj {
        this.screen = new ScreenObj();
        this.screen.screenID = Entity.screenID;
        this.screen.parentID = Entity.parentID;
        this.screen.screenName = Entity.screenName;
        this.screen.actionPath = Entity.actionPath;
        this.screen.created_By = Entity.created_By;
        this.screen.created_Date = Entity.created_Date;
        this.screen.modified_By = Entity.modified_By;
        this.screen.modified_Date = Entity.modified_Date;
        if (Entity.is_Active === '1') {
            this.screen.is_Active = 'true'.toString().trim();
        } else { this.screen.is_Active = ''.toString().trim(); }

        return this.screen;
    }

    ScreenTransfarmer(screen: ScreenObj): ScreenObjEntity {
        this.ScreenObjEntity = new ScreenObjEntity();
        this.ScreenObjEntity.screenID = screen.screenID;
        this.ScreenObjEntity.parentID = screen.parentID;
        this.ScreenObjEntity.screenName = screen.screenName;
        this.ScreenObjEntity.actionPath = screen.actionPath;
        this.ScreenObjEntity.created_By = screen.created_By;
        this.ScreenObjEntity.created_Date = screen.created_Date;
        this.ScreenObjEntity.modified_By = screen.modified_By;
        this.ScreenObjEntity.modified_Date = screen.modified_Date;
        if (screen.is_Active.toString().trim() === 'true') {
            this.ScreenObjEntity.is_Active = '1';
        } else { this.ScreenObjEntity.is_Active = '0'; }
        return this.ScreenObjEntity;
    }
}
