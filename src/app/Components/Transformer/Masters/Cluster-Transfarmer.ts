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
        this.Oject.circleCode = Entity.circleCode;
        if (Entity.isActive === '1') {
            this.Oject.isActive = 'true'.toString().trim();
        } else { this.Oject.isActive = ''.toString().trim(); }

        return this.Oject;
    }

    ClusterTransfarmer(qaType1: Cluster): ClusterEntity {
        this.OjectEntity = new ClusterEntity();
        this.OjectEntity.clusterCode = qaType1.clusterCode;
        this.OjectEntity.clusterNameENG = qaType1.clusterNameENG;
        this.OjectEntity.clusterNameUNI = qaType1.clusterNameUNI;
        this.OjectEntity.circleCode = qaType1.circleCode;
        console.log(qaType1.circleCode);
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
