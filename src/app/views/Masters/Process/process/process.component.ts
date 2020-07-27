import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../../containers';
import { Process } from '../../../../Compound/Module/Masters/Process.model';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
  process: Process;
  str: string;
  processList: Process[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent, private router: Router) {
    const status = '';
  }
  ngOnInit() {
    this.process = {
      ProcessID: null,
      Process_Name: null,
      Geofence: null,
      Is_Active: null,
      Is_Auto: null,
      Sort_By: null,
    };
    status = '';
  }

}
