import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { NgForm } from '@angular/forms';
import { MFG } from '../../../Compound/Module/Masters/MFG';
import { MFGService } from '../../../Compound/Services/Masters/MFGService';

@Component({
  selector: 'app-MFG',
  templateUrl: './manufacture.component.html',
  styleUrls: ['./manufacture.component.scss']
})
export class manufactureComponent implements OnInit {
  MFG: MFG;
  str: string;
  MFGList: MFG[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private MFGService: MFGService, private router: Router) {
    const status = '';
  }
  ngOnInit() {
    status = '';
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id'); this.getcountrys(id); });

  }
  save(countryForm: NgForm): void {
    if (status !== 'Update') {
      this.MFG.ID = this.MFGService.getMaxMFGId() + 1;
      this.MFGService.Save(this.MFG);
    } else {
      this.MFGService.Update(this.MFG);
    }
    this.router.navigate(['ManufacturerList']);

  }
  private getcountrys(Id: number) {
    this.MFG = {
      ID: null,
      manufactureCode: null,
      manufactureDesc: null,
      manufactureDescUni: null,
      isActive: null
    }
    if (Id === null || Id === 0) {
      this.MFG = {
        ID: null,
        manufactureCode: null,
        manufactureDesc: null,
        manufactureDescUni: null,
        isActive: null
      };
      status = '';

    } else {
      this.MFG = this.MFGService.getMFG(Id)[0];
      status = 'Update';
    }
  }
}
