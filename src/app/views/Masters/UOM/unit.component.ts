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

  save(userForm: NgForm): void {
    if (this.uom.id === null) {
      this.UomService.Save(this.uom).subscribe(
        () => {
          userForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['UnitList']);
        }
      );
    } else {
      // this.UomService.UpdateUser(this.uom).subscribe(data => this.str = data);
      // userForm.reset();
      // this.defaultLayoutComponent.Massage('Update Sucsessfuly',
      //  'Data saved successfully !', 'modal-info');
      // this.router.navigate(['UserList']);
    }
  }

  private getUom(Id: number) {
    this.uom = {
      id: null,
      uomCode: null,
      uomDesc: null,
      CreatedBy: null,
      ModifiedBy: null,
      IsActive: null
    };
    if (Id !== null && Id === 0) {
      this.uom = {
        id: null,
        uomCode: null,
        uomDesc: null,
        CreatedBy: null,
        ModifiedBy: null,
        IsActive: null
      };

    } else {
      this.uom = this.UomService.getUser(Id)[0];
      status = 'Update';
    }
  }
}
