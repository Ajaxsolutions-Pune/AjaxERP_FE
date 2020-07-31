import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../../containers';
import { Process } from '../../../../Compound/Module/Masters/Process.model';
import { ProcessTransfarmer1 } from '../../../../Compound/Transformer/Masters/Process-Transfarmer1';
import { ProcessService1 } from '../../../../Compound/Services/Masters/ProcessService1';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
  process: Process;
  str: string;
  constructor(private route: ActivatedRoute,
    private processTransfarmer: ProcessTransfarmer1,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private processService: ProcessService1, private router: Router) {
  }
  ngOnInit() {
    status = '';
    this.process = {
      geofence: null,
      isActive: null,
      processId: null,
      processName: null,
    };
    this.route.paramMap.subscribe(parameterMap => { const str = parameterMap.get('id'); this.getprocess(str); });
  }
  save(processForm: NgForm): void {
    if (status !== 'Update') {
      this.process.processId = null;
      console.log(this.process);
      this.processService.Save(this.processTransfarmer.processTransfarmer(this.process)).subscribe(
        (par) => {
            console.log(par);
          processForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['ProcessList']);
        }
      );

    } else {
      this.processService.Update(this.processTransfarmer.processTransfarmer(this.process)).subscribe(
        () => {
          processForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['ProcessList']);
        }
      );
    }
  }

  private getprocess(process_Code: string) {
    this.process = {
      geofence: null,
      isActive: null,
      processId: null,
      processName: null,
    };
    if (process_Code === null || process_Code === '') {
      this.process = {
        processId: null,
        processName: null,
        geofence: null,
        isActive: null,
      };
      status = '';

    } else {
      this.processService.getprocess(process_Code).subscribe(
        (par) => this.process = par,
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
