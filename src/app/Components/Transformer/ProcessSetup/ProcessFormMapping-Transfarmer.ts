import { Injectable } from '@angular/core';
import { environment } from '../../Module/environment';
import { ProcessFormMappingEntity, ProcessFormMapping } from '../../Module/ProcessSetup/ProcessFormMapping.model';
@Injectable()
export class ProcessFormMappingTransfarmer {
    str: string;
    OjectEntity: ProcessFormMappingEntity;
    Oject: ProcessFormMapping;
    arrOject: ProcessFormMapping[] = [];
    arrOjectEntity: ProcessFormMappingEntity[] = [];
    env = environment;
    constructor() {
        this.str = this.env.apiServiceIPPort;
    }
    
    ProcessFormMappingTransfarmers(Entity: ProcessFormMappingEntity[]): ProcessFormMapping[] {
        this.arrOject = [];
        Entity.forEach(element => {
            this.Oject = new ProcessFormMapping();
            this.Oject.pfmId = element.pfmId;
            this.Oject.processId = element.processId;           
            this.Oject.formId = element.formId;
            this.Oject.formName = element.formName;
            this.Oject.sortBy = element.sortBy;           
            this.Oject.isActiveText = element.isActiveText;           
            if (element.isActive === '1') {
                this.Oject.isActive = 'true'.toString().trim();
            } else { this.Oject.isActive = ''.toString().trim(); }
            this.arrOject.push(this.Oject);
        });
        return this.arrOject;
    }

    ObjectToEntityProcessFormMappingTransfarmers(Entity: ProcessFormMapping[]): ProcessFormMappingEntity[] {
        this.arrOjectEntity = [];
        Entity.forEach(element => {
            this.Oject = new ProcessFormMappingEntity();
            this.Oject.pfmId = element.pfmId;
            this.Oject.processId = element.processId;           
            this.Oject.formId = element.formId;
            this.Oject.formName = element.formName;
            this.Oject.sortBy = element.sortBy;           
            this.Oject.isActiveText = element.isActiveText;   
            this.Oject.createdBy = element.createdBy;
            this.Oject.createdDate = element.createdDate;
            this.Oject.modifiedBy = element.modifiedBy;
            this.Oject.modifiedDate = element.modifiedDate;           
            if (element.isActive.toString().trim() === 'true') {
                this.Oject.isActive = '1';
            } else {
                this.Oject.isActive = '0';
            }
            this.arrOjectEntity.push(this.Oject);
            console.log('##### Transform -->>'+this.arrOjectEntity.values.toString); 
        });
        return this.arrOjectEntity;
    }

    ProcessFormMappingTransfarmerEntity(Entity: ProcessFormMappingEntity): ProcessFormMapping {
        console.log(Entity);
        this.Oject = new ProcessFormMapping();   
        this.Oject.pfmId = Entity.pfmId;
        this.Oject.processId = Entity.processId;           
        this.Oject.formId = Entity.formId;
        this.Oject.formName = Entity.formName;
        this.Oject.sortBy = Entity.sortBy;          
        this.Oject.isActiveText = Entity.isActiveText;
        this.Oject.isActive = Entity.isActive;
        this.Oject.createdBy = Entity.createdBy;
        this.Oject.createdDate = Entity.createdDate;
        this.Oject.modifiedBy = Entity.modifiedBy;
        this.Oject.modifiedDate = Entity.modifiedDate;
        if (Entity.isActive === '1') {
            this.Oject.isActive = 'true'.toString().trim();
        } else { this.Oject.isActive = ''.toString().trim(); }
        return this.Oject;
    }

    ProcessFormMappingTransfarmer(element: ProcessFormMapping): ProcessFormMappingEntity {
        this.OjectEntity = new ProcessFormMappingEntity();
        this.Oject.pfmId = element.pfmId;
        this.Oject.processId = element.processId;           
        this.Oject.formId = element.formId;
        this.Oject.formName = element.formName;
        this.Oject.sortBy = element.sortBy;        
        this.OjectEntity.isActiveText = element.isActiveText;
        this.OjectEntity.createdBy = element.createdBy;
        this.OjectEntity.createdDate = element.createdDate;
        this.OjectEntity.modifiedBy = element.modifiedBy;
        this.OjectEntity.modifiedDate = element.modifiedDate;
        if (element.isActive === 'true') {
            this.OjectEntity.isActive = '1';
        } else { this.OjectEntity.isActive = '0'; }
        if (element.isActive.toString().trim() === 'true') {
            this.OjectEntity.isActive = '1';
        } else {
            this.OjectEntity.isActive = '0';
        }
        return this.OjectEntity;
    }
}
