import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { NgForm } from '@angular/forms';
import { Tehsil, TehsilEntity } from '../../../Components/Module/Masters/Tehsil';
import { DistrictService } from '../../../Components/Services/Masters/DistrictService';
import { District } from '../../../Components/Module/Masters/District';
import { TehsilService } from '../../../Components/Services/Masters/TehsilService';
import { TehsilTransfarmer } from '../../../Components/Transformer/Masters/Tehsil-Transfarmer';
import { DistrictTransfarmer } from '../../../Components/Transformer/Masters/District-Transformer';
import { DistrictEntity } from '../../../Components/Module/Masters/DistrictEntity.model';

@Component({
  selector: 'app-tehsil',
  templateUrl: './tehsil.component.html',
  styleUrls: ['./tehsil.component.scss']
})
export class TehsilComponent implements OnInit {
  tehsil: Tehsil;
  str: string;
  tehsilList: Tehsil[];
  districtDrpList: District[];
  districtEntity: DistrictEntity[];
  districtCodeDrpList: District[];
  tehsilEntity: TehsilEntity;
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private tehsilTransfarmer: TehsilTransfarmer,
    private districtTransfarmer: DistrictTransfarmer,
    private tehsilService: TehsilService, private router: Router) {
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id'); this.gettehsils(id); });
    this.tehsilEntity = this.route.snapshot.data['Tehsil'];
    this.districtDrpList = null;
    this.districtEntity = this.route.snapshot.data['DistrictList'];

    this.districtDrpList = null;
    this.districtDrpList = this.districtTransfarmer.DistrictTransfarmers(this.districtEntity);
    console.log(this.districtDrpList);
    if (this.tehsilEntity !== null && this.tehsilEntity !== undefined) {
      this.tehsil = this.tehsilTransfarmer.TehsilTransfarmerEntity(this.tehsilEntity);

    }
    const status = '';
  }
  ngOnInit() {
    status = '';

  }
  save(tehsilForm: NgForm): void {
    console.log(status);
    if (status !== 'Update') {
      this.tehsilService.Save(this.tehsil);
    } else {
      this.tehsilService.Update(this.tehsilTransfarmer.TehsilTransfarmer(this.tehsil)).subscribe(
        () => {
          tehsilForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['TehsilList']);
        }
      );
      this.tehsilService.Update(this.tehsil);
    }
    this.router.navigate(['TehsilList']);

  }

  private gettehsils(Id: number) {

    if (Id === null || Id === 0) {
      this.tehsilEntity = {
        districtCode: null,
        isActive: null,
        tehsilCode: null,
        tehsilNameEng: null,
        tehsilNameUni: null,
      };
      this.tehsil = {
        districtCode: null,
        isActive: null,
        tehsilCode: null,
        tehsilNameEng: null,
        tehsilNameUni: null,
      };

      status = '';

    } else {
      status = 'Update';
    }
  }
}
