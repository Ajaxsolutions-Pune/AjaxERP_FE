import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UOMService } from '../../../Components/Services/Masters/UOMService';
import { DefaultLayoutComponent } from '../../../containers';
import { NgForm } from '@angular/forms';
import { UOM } from '../../../Components/Module/Masters/UOM.model';

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
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id'); this.getUom(id.toString()); });
    console.log(status);
  }

  save(userForm: NgForm): void {
    this.UomService.Save(this.uom).subscribe(
      () => {
        userForm.reset();
        this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
          'Data saved successfully !', 'modal-info');
        this.router.navigate(['UnitList']);
      }
    );
  }

  private getUom(Id: string) {
    this.uom = {
      uomCode: null,
      uomDesc: null,
      isActive: null,
      uomDescUni: null,
    };
    if (Id === null || Id === '') {
      this.uom = {
        uomCode: null,
        uomDesc: null,
        isActive: null,
        uomDescUni: null
      };
    } else {
      this.UomService.getUnit(Id).pipe().subscribe(product => this.uom = product);
      status = 'Update';
      console.log('hii' + this.uom.uomCode);
    }
  }
}
