import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../Module/environment";
import { Specialization, SpecializationEntity } from "../../Module/HRMS/Specialization.model";

@Injectable()
export class  SpecializationTransfarmer {
    str: string;
    specializationEntity: SpecializationEntity;
    specialization:  Specialization;
    specializations:  Specialization[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    SpecializationTransfarmers(Entity:  SpecializationEntity[]):  Specialization[] {
        this.specializations = [];
        Entity.forEach(element => {
            this.specialization = new  Specialization();
            this.specialization.ouCode = element.ouCode;
            this.specialization.specializationName = element.specializationName;
            this.specialization.specializationDesc = element.specializationDesc;
            this.specialization.specializationCode = element.specializationCode;
            this.specialization.specializationStatus = element.specializationStatus;
            this.specialization.createdBy = element.createdBy;
            this.specialization.createdDate = element.createdDate;
            this.specialization.modifiedBy = element.modifiedBy;
            this.specialization.modifiedDate = element.modifiedDate;
            if (element.specializationStatus === '1') {
                this.specialization.specializationStatus = 'Active'.toString().trim();
            } else { this.specialization.specializationStatus = 'Inactive'.toString().trim(); }
            this.specializations.push(this.specialization);
        });
        return this.specializations;
    }
    SpecializationTransfarmerEntity(Entity: SpecializationEntity): Specialization {
            this.specialization = new Specialization();
            this.specialization.ouCode = Entity.ouCode;
            this.specialization.specializationName = Entity.specializationName;
            this.specialization.specializationDesc = Entity.specializationDesc;
            this.specialization.specializationCode = Entity.specializationCode;
            this.specialization.specializationStatus = Entity.specializationStatus;
            this.specialization.createdBy = Entity.createdBy;
            this.specialization.createdDate = Entity.createdDate;
            this.specialization.modifiedBy = Entity.modifiedBy;
            this.specialization.modifiedDate = Entity.modifiedDate;
            if (Entity.specializationStatus === '1') {      
                this.specialization.specializationStatus = 'true'.toString().trim();
        } else {this.specialization.specializationStatus = ''.toString().trim(); } 
        return this.specialization;
    }

    SpecializationTransfarmer(Specialization: Specialization): SpecializationEntity {
        this.specializationEntity = new SpecializationEntity();
        this.specializationEntity.ouCode = Specialization.ouCode;
        this.specializationEntity.specializationName = Specialization.specializationName;
        this.specializationEntity.specializationDesc = Specialization.specializationDesc;
        this.specializationEntity.specializationCode= Specialization.specializationCode;
        this.specializationEntity.specializationStatus =Specialization.specializationStatus;
        this.specializationEntity.createdBy = Specialization.createdBy;
        this.specializationEntity.createdDate = Specialization.createdDate;
        this.specializationEntity.modifiedBy = Specialization.modifiedBy;
        this.specializationEntity.modifiedDate = Specialization.modifiedDate;
        if (Specialization.specializationStatus.toString().trim() === 'true') {
            this.specializationEntity.specializationStatus = '1';
        } else { this.specializationEntity.specializationStatus = '0'; }
        return this.specializationEntity;
    }
}
