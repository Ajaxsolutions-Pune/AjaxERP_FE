import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { TransmissionLineEntity, TransmissionLine } from '../../Module/Masters/TransmissionLine.model';

@Injectable()
export class TransmissionLineTransfarmer {
    str: string;
    transmissionLineEntity: TransmissionLineEntity;
    transmissionLine: TransmissionLine;
    transmissionLines: TransmissionLine[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    TransmissionLineTransfarmers(Entity: TransmissionLineEntity[]): TransmissionLine[] {
        this.transmissionLines = [];
        Entity.forEach(element => {
            this.transmissionLine = new TransmissionLine();
            this.transmissionLine.ouCode = element.ouCode;
            this.transmissionLine.projectCode = element.projectCode;
            this.transmissionLine.sortBy = element.sortBy;
            this.transmissionLine.tlCode = element.tlCode;
            this.transmissionLine.tlGroupCode = element.tlGroupCode;
            this.transmissionLine.tlNameENG = element.tlNameENG;
            this.transmissionLine.tlTypeCode = element.tlTypeCode;
            this.transmissionLine.createdBy = element.createdBy;
            this.transmissionLine.createdDate = element.createdDate;
            this.transmissionLine.modifiedBy = element.modifiedBy;
            this.transmissionLine.modifiedDate = element.modifiedDate;
            if (element.isActive === '1') {
                this.transmissionLine.isActive = 'Active'.toString().trim();
            } else { this.transmissionLine.isActive = 'Inactive'.toString().trim(); }
            this.transmissionLines.push(this.transmissionLine);
        });
        return this.transmissionLines;
    }
    TransmissionLineTransfarmerEntity(Entity: TransmissionLineEntity): TransmissionLine {
        this.transmissionLine = new TransmissionLine();
        this.transmissionLine.ouCode = Entity.ouCode;
        this.transmissionLine.projectCode = Entity.projectCode;
        this.transmissionLine.sortBy = Entity.sortBy;
        this.transmissionLine.tlCode = Entity.tlCode;
        this.transmissionLine.tlGroupCode = Entity.tlGroupCode;
        this.transmissionLine.tlNameENG = Entity.tlNameENG;
        this.transmissionLine.tlTypeCode = Entity.tlTypeCode;
        this.transmissionLine.createdBy = Entity.createdBy;
        this.transmissionLine.createdDate = Entity.createdDate;
        this.transmissionLine.modifiedBy = Entity.modifiedBy;
        this.transmissionLine.modifiedDate = Entity.modifiedDate;
        if (Entity.isActive === '1') {
            this.transmissionLine.isActive = 'true'.toString().trim();
        } else { this.transmissionLine.isActive = ''.toString().trim(); }
        return this.transmissionLine;
    }

    TransmissionLineTransfarmer(transmissionLine: TransmissionLine): TransmissionLineEntity {
        this.transmissionLineEntity = new TransmissionLineEntity();
        this.transmissionLineEntity.ouCode = transmissionLine.ouCode;
        this.transmissionLineEntity.projectCode = transmissionLine.projectCode;
        this.transmissionLineEntity.sortBy = transmissionLine.sortBy;
        this.transmissionLineEntity.tlCode = transmissionLine.tlCode;
        this.transmissionLineEntity.tlGroupCode = transmissionLine.tlGroupCode;
        this.transmissionLineEntity.tlNameENG = transmissionLine.tlNameENG;
        this.transmissionLineEntity.tlTypeCode = transmissionLine.tlTypeCode;
        this.transmissionLineEntity.createdBy = transmissionLine.createdBy;
        this.transmissionLineEntity.createdDate = transmissionLine.createdDate;
        this.transmissionLineEntity.modifiedBy = transmissionLine.modifiedBy;
        this.transmissionLineEntity.modifiedDate = transmissionLine.modifiedDate;
        if (transmissionLine.isActive.toString().trim() === 'true') {
            this.transmissionLineEntity.isActive = '1';
        } else { this.transmissionLineEntity.isActive = '0'; }
        return this.transmissionLineEntity;
    }
}
