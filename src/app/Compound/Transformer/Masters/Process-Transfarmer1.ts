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
        this.process.geofence = Entity.geofence;
        this.process.isActive = Entity.isActive;
        return this.process;
    }

    processTransfarmer(process1: Process): ProcessEntity {
        this.processEntity = new ProcessEntity();
        this.processEntity.processId = process1.processId;
        this.processEntity.processName = process1.processName;
        this.processEntity.geofence = process1.geofence;
        this.processEntity.isActive = process1.isActive;
        if (this.process.isActive === 'true') { this.process.isActive = '1'; } else { this.process.isActive = '1'; }
        return this.processEntity;
    }
}
