import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UOMService } from '../../../Compound/Services/Masters/UOMService';
import { DefaultLayoutComponent } from '../../../containers';
import { NgForm } from '@angular/forms';
import { UOM } from '../../../Compound/Module/Masters/UOM.model';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {
  uom: UOM;
  str: string;
  status: string;
  uomList: UOM[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private UomService: UOMService, private router: Router) {
  }
  ngOnInit() {
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id'); this.getUom(id); });
    console.log(status);

  }
  save(uomForm: NgForm): void {
    if (status !== 'Update') {
      this.UomService.Save(this.uom);
    } else {
      this.UomService.Update(this.uom);
    }
    this.router.navigate(['UnitList']);

  }

  private getUom(Id: number) {
    this.uom = {
      UOM_Id: null,
      UOM_Description: null,
      UOM_ShortDescription: null,
      CreatedBy: null,
      ModifiedBy: null,
      CreDate: null,
      ModDate: null,
      IsActive: null
    };
    if (Id !== null && Id === 0) {
      this.uom = {
        UOM_Id: null,
        UOM_Description: null,
        UOM_ShortDescription: null,
        CreatedBy: null,
        ModifiedBy: null,
        CreDate: null,
        ModDate: null,
        IsActive: null
      };

    } else {
      this.uom = this.UomService.getUser(Id)[0];
      status = 'Update';
    }
  }
}
