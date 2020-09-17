import { Injectable } from '@angular/core';
import { environment } from '../../Module/environment';
import { ClusterEntity, Cluster } from '../../Module/Masters/Cluster.model';

@Injectable()
export class ClusterTransfarmer {
    str: string;
    OjectEntity: ClusterEntity;
    Oject: Cluster;
    arrOject: Cluster[] = [];
    env = environment;
    constructor() {
        this.str = this.env.apiServiceIPPort;
    }
    ClusterTransfarmers(Entity: ClusterEntity[]): Cluster[] {
        this.arrOject = [];
        Entity.forEach(element => {
            this.Oject = new Cluster();
            this.Oject.clusterCode = element.clusterCode;
            this.Oject.clusterNameENG = element.clusterNameENG;
            this.Oject.clusterNameUNI = element.clusterNameUNI;
            this.Oject.circleCode = element.circleCode;

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
    ClusterTransfarmerEntity(Entity: ClusterEntity): Cluster {
        console.log(Entity);
        this.Oject = new Cluster();
        this.Oject.clusterCode = Entity.clusterCode;
        this.Oject.clusterNameENG = Entity.clusterNameENG;
        this.Oject.clusterNameUNI = Entity.clusterNameUNI;

        this.Oject.createdBy = Entity.createdBy;
        this.Oject.createdDate = Entity.createdDate;
        this.Oject.modifiedBy = Entity.modifiedBy;
        this.Oject.modifiedDate = Entity.modifiedDate;

        this.Oject.circleCode = Entity.circleCode;
        if (Entity.isActive === '1') {
            this.Oject.isActive = 'true'.toString().trim();
        } else { this.Oject.isActive = ''.toString().trim(); }

        return this.Oject;
    }

    ClusterTransfarmer(element: Cluster): ClusterEntity {
        this.OjectEntity = new ClusterEntity();
        this.OjectEntity.clusterCode = element.clusterCode;
        this.OjectEntity.clusterNameENG = element.clusterNameENG;
        this.OjectEntity.clusterNameUNI = element.clusterNameUNI;
        this.OjectEntity.circleCode = element.circleCode;

        this.OjectEntity.createdBy = element.createdBy;
        this.OjectEntity.createdDate = element.createdDate;
        this.OjectEntity.modifiedBy = element.modifiedBy;
        this.OjectEntity.modifiedDate = element.modifiedDate;

        console.log(element.circleCode);
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
