import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { District} from '../../../Components/Module/Masters/District';
import { DistrictService } from '../../../Components/Services/Masters/DistrictService';
import { DistrictTransfarmer } from '../../../Components/Transformer/Masters/District-Transformer';
import { DistrictEntity } from '../../../Components/Module/Masters/DistrictEntity.model';

@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.scss']
})
export class DistrictListComponent implements OnInit {

  districts: District[];
  districtEntity: DistrictEntity[];

  WithoutFilterCitys: District[];
  Resultdistrict: District[];
  SerachCri: number;
  district: District;
  WithoutFilterDistricts: any[];

  constructor(private _router: Router,
    private districtService: DistrictService,
    private districtTransfarmer: DistrictTransfarmer,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this._router.navigate(['login']);
      }
    this.districtEntity = this.route.snapshot.data['DistrictList'];
    this.districts = this.districtTransfarmer.DistrictTransfarmers(this.districtEntity);
    this.WithoutFilterDistricts = this.districts;
  }

  ngOnInit() {
    this.districtService.getDistricts().subscribe(
      (par) => this.districtEntity = par,
      (err: any) => console.log(err));
      this.districts = this.districtTransfarmer.DistrictTransfarmers(this.districtEntity);
      this.WithoutFilterDistricts = this.districts;
    this.district = {
      ID: null,
      districtCode: null,
      districtNameEng: null,
      districtNameUni: null,
      stateCode: null,
      isActive: '1',

    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultdistrict = this.WithoutFilterDistricts;
    if (this.district.districtNameEng !== null && this.district.districtNameEng !== '') {
      this.Resultdistrict = this.Resultdistrict.filter(SubResult =>
        SubResult.districtNameEng.toLowerCase().indexOf(this.district.districtNameEng.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.district.districtCode !== null && this.district.districtCode.toString() !== '') {
      this.Resultdistrict = this.Resultdistrict.filter(SubResult =>
        SubResult.districtCode.toString().toLowerCase().indexOf(this.district.districtCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.Resultdistrict = this.WithoutFilterDistricts;
    }
    this.districts = this.Resultdistrict;
  }

  ExportToExcel(): void {
    alasql('SELECT Brand_Code,Brand_Id,Brand_Name_ENg,Brand_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("brandList.xlsx",{headers:true}) FROM ?', [this.districts]);
  }
}
