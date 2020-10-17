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
            this.screen.screenId = element.screenId;
            this.screen.moduleId = element.moduleId;
            this.screen.screenName = element.screenName;
            this.screen.workMode = element.workMode;
            this.screen.checkOrder = element.checkOrder;
            this.screen.imagePath = element.imagePath;
            this.screen.associateScreenId = element.associateScreenId;
            this.screen.associateLevel = element.associateLevel;
            this.screen.isSubLinks = element.isSubLinks;
            this.screen.actionName = element.actionName;
            this.screen.menuLink = element.menuLink;
            this.screen.createdBy = element.createdBy;
            this.screen.createdDate = element.createdDate;
            this.screen.modifiedBy = element.modifiedBy;
            this.screen.modifiedDate = element.modifiedDate;
            if (element.isActive === '1') {
                this.screen.isActive = 'Active'.toString().trim();
            } else { this.screen.isActive = 'Inactive'.toString().trim(); }
            if (element.checkOrder === '1') {
                this.screen.checkOrder = 'Yes'.toString().trim();
            } else { this.screen.checkOrder = 'No'.toString().trim(); }
            this.Screens.push(this.screen);
        });
        return this.Screens;
    }
    ScreenTransfarmerEntity(Entity: ScreenObjEntity): ScreenObj {
        this.screen = new ScreenObj();        
        this.screen.screenId = Entity.screenId;
        this.screen.moduleId = Entity.moduleId;
        this.screen.screenName = Entity.screenName;
        this.screen.workMode = Entity.workMode;
        this.screen.checkOrder = Entity.checkOrder;
        this.screen.imagePath = Entity.imagePath;
        this.screen.associateScreenId = Entity.associateScreenId;
        this.screen.associateLevel = Entity.associateLevel;
        this.screen.isSubLinks = Entity.isSubLinks;
        this.screen.actionName = Entity.actionName;
        this.screen.menuLink = Entity.menuLink;
        this.screen.createdBy = Entity.createdBy;
        this.screen.createdDate = Entity.createdDate;
        this.screen.modifiedBy = Entity.modifiedBy;
        this.screen.modifiedDate = Entity.modifiedDate;
        if (Entity.isActive === '1') {
            this.screen.isActive = 'true'.toString().trim();
        } else { this.screen.isActive = ''.toString().trim(); }
        
        if (Entity.checkOrder === '1') {
            this.screen.checkOrder = 'true'.toString().trim();
        } else { this.screen.checkOrder = ''.toString().trim(); }
        return this.screen;
    }
    
    ScreenTransfarmer(screen: ScreenObj): ScreenObjEntity {
        this.ScreenObjEntity = new ScreenObjEntity();    
        this.ScreenObjEntity.screenId = screen.screenId;
        this.ScreenObjEntity.moduleId = screen.moduleId;
        this.ScreenObjEntity.screenName = screen.screenName;
        this.ScreenObjEntity.workMode = screen.workMode;
        this.ScreenObjEntity.checkOrder = screen.checkOrder;
        this.ScreenObjEntity.imagePath = screen.imagePath;
        this.ScreenObjEntity.associateScreenId = screen.associateScreenId;
        this.ScreenObjEntity.associateLevel = screen.associateLevel;
        this.ScreenObjEntity.isSubLinks = screen.isSubLinks;
        this.ScreenObjEntity.actionName = screen.actionName;
        this.ScreenObjEntity.menuLink = screen.menuLink;
        this.ScreenObjEntity.createdBy = screen.createdBy;
        this.ScreenObjEntity.createdDate = screen.createdDate;
        this.ScreenObjEntity.modifiedBy = screen.modifiedBy;
        this.ScreenObjEntity.modifiedDate = screen.modifiedDate;
        if (screen.isActive.toString().trim() === 'true') {
            this.ScreenObjEntity.isActive = '1';
        } else { this.ScreenObjEntity.checkOrder = '0'; }
        if (screen.checkOrder.toString().trim() === 'true') {
            this.ScreenObjEntity.checkOrder = '1';
        } else { this.ScreenObjEntity.checkOrder = '0'; }
        return this.ScreenObjEntity;
    }
}
