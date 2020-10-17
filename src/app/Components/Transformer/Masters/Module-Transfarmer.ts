import { Injectable } from '@angular/core';
import { environment } from '../../Module/environment';
import { ModuleobjEntity, Moduleobj } from '../../Module/Masters/Module.model';

@Injectable()
export class ModuleobjTransfarmer {
    str: string;
    ModuleobjEntity: ModuleobjEntity;
    Moduleobj: Moduleobj;
    Moduleobjs: Moduleobj[];
    env = environment;
    constructor() {
        this.str = this.env.apiServiceIPPort;
    }
    ModuleobjTransfarmers(Entity: ModuleobjEntity[]): Moduleobj[] {
        this.Moduleobjs = [];
        Entity.forEach(element => {
            this.Moduleobj = new Moduleobj();
            this.Moduleobj.moduleId = element.moduleId;
            this.Moduleobj.moduleName = element.moduleName;
            this.Moduleobj.imagePath = element.imagePath;
            this.Moduleobj.checkOrder = element.checkOrder;
            this.Moduleobj.createdBy = element.createdBy;
            this.Moduleobj.createdDate = element.createdDate;
            this.Moduleobj.modifiedBy = element.modifiedBy;
            this.Moduleobj.modifiedDate = element.modifiedDate;
            if (element.isActive === '1') {
                this.Moduleobj.isActive = 'Active'.toString().trim();
            } else { this.Moduleobj.isActive = 'Inactive'.toString().trim(); }
           // if (element.checkOrder === '1') {
           //     this.Moduleobj.checkOrder = 'Yes'.toString().trim();
           // } else { this.Moduleobj.checkOrder = 'No'.toString().trim(); }
            this.Moduleobjs.push(this.Moduleobj);
        });
        return this.Moduleobjs;
    }
    ModuleobjTransfarmerEntity(Entity: ModuleobjEntity): Moduleobj {
        this.Moduleobj = new Moduleobj();
        this.Moduleobj.moduleId = Entity.moduleId;
        this.Moduleobj.moduleName = Entity.moduleName;
        this.Moduleobj.imagePath = Entity.imagePath;
        // this.Moduleobj.checkOrder = Entity.checkOrder;
        this.Moduleobj.createdBy = Entity.createdBy;
        this.Moduleobj.createdDate = Entity.createdDate;
        this.Moduleobj.modifiedBy = Entity.modifiedBy;
        this.Moduleobj.modifiedDate = Entity.modifiedDate;
        if (Entity.isActive === '1') {
            this.Moduleobj.isActive = 'true'.toString().trim();
        } else { this.Moduleobj.isActive = ''.toString().trim(); }

        
        if (Entity.checkOrder === '1') {
            this.Moduleobj.checkOrder = 'true'.toString().trim();
        } else { this.Moduleobj.checkOrder = ''.toString().trim(); }
        return this.Moduleobj;
    }

    ModuleobjTransfarmer(Moduleobj: Moduleobj): ModuleobjEntity {
        this.ModuleobjEntity = new ModuleobjEntity();
        this.ModuleobjEntity.moduleId = Moduleobj.moduleId;
        this.ModuleobjEntity.moduleName = Moduleobj.moduleName; 
        this.ModuleobjEntity.imagePath = Moduleobj.imagePath;
        // this.ModuleobjEntity.checkOrder = Moduleobj.checkOrder;
        this.ModuleobjEntity.createdBy = Moduleobj.createdBy;
        this.ModuleobjEntity.createdDate = Moduleobj.createdDate;
        this.ModuleobjEntity.modifiedBy = Moduleobj.modifiedBy;
        this.ModuleobjEntity.modifiedDate = Moduleobj.modifiedDate;
        if (Moduleobj.isActive.toString().trim() === 'true') {
            this.ModuleobjEntity.isActive = '1';
        } else { this.ModuleobjEntity.checkOrder = '0'; }
        if (Moduleobj.checkOrder.toString().trim() === 'true') {
            this.ModuleobjEntity.checkOrder = '1';
        } else { this.ModuleobjEntity.checkOrder = '0'; }
        return this.ModuleobjEntity;
    }
}
