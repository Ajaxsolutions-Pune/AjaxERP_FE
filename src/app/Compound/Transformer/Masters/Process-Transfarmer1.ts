import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { ProcessEntity, Process } from '../../Module/Masters/Process.model';

@Injectable()
export class ProcessTransfarmer1 {
    str: string;
    processEntity: ProcessEntity;
    process: Process;
    processs: Process[] = [];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    processTransfarmers(Entity: ProcessEntity[]): Process[] {
        this.processs = [];
        Entity.forEach(element => {
            this.process = new Process();
            this.process.processId = element.processId;
            this.process.processName = element.processName;
            this.process.geofence = element.geofence;
            this.process.isActive = element.isActive;
            this.processs.push(this.process);
        });
        return this.processs;
    }
    processTransfarmerEntity(Entity: ProcessEntity): Process {
        this.process = new Process();
        this.process.processId = Entity.processId;
        this.process.processName = Entity.processName;
        if (Entity.isActive === '1') {
            this.process.isActive = 'true'.toString().trim();
        } else { this.process.isActive = ''.toString().trim(); }

        if (Entity.geofence === '1') {
            this.process.geofence = 'true'.toString().trim();
        } else { this.process.geofence = ''.toString().trim(); }

        return this.process;
    }

    processTransfarmer(process1: Process): ProcessEntity {
        this.processEntity = new ProcessEntity();
        this.processEntity.processId = process1.processId;
        this.processEntity.processName = process1.processName;
        console.log('hiiiiiii');
        if (process1.geofence.toString().trim() === 'true') {
            this.processEntity.geofence = '1';
        } else {
            this.processEntity.geofence = '0';
        }
        // this.processEntity.geofence = process1.geofence;
        if (process1.isActive.toString().trim() === 'true') {
            this.processEntity.isActive = '1';
        } else {
            this.processEntity.isActive = '0';
        }
        return this.processEntity;
    }
}
