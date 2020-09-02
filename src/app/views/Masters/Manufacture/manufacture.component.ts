import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { NgForm } from '@angular/forms';
import { MFG } from '../../../Components/Module/Masters/MFG';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-MFG',
  templateUrl: './manufacture.component.html',
  styleUrls: ['./manufacture.component.scss']
})
// tslint:disable-next-line:class-name
export class manufactureComponent implements OnInit {
  MFG: MFG;
  str: string;
  MFGList: MFG[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent, private router: Router) {
    const status = '';
  }
  ngOnInit() {
    status = '';
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id'); this.getcountrys(id); });

  }
  save(countryForm: NgForm): void {
    this.router.navigate(['ManufacturerList']);

  }
  private getcountrys(Id: number) {
    this.MFG = {
      ID: null,
      manufactureCode: null,
      manufactureDesc: null,
      manufactureDescUni: null,
      isActive: null
    };
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
      status = 'Update';
    }
  }
}
