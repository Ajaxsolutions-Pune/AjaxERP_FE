import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Tehsil, TehsilEntity } from '../../../Components/Module/Masters/Tehsil';
import { DistrictService } from '../../../Components/Services/Masters/DistrictService';
import { District } from '../../../Components/Module/Masters/District';
import { TehsilService } from '../../../Components/Services/Masters/TehsilService';
import { TehsilTransfarmer } from '../../../Components/Transformer/Masters/Tehsil-Transfarmer';
import { DistrictTransfarmer } from '../../../Components/Transformer/Masters/District-Transformer';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TehsilAsyncValidator } from '../../../helper/async-validator';

@Component({
  selector: 'app-tehsil',
  templateUrl: './tehsil.component.html',
  styleUrls: ['./tehsil.component.scss']
})
export class TehsilComponent extends FormComponentBase implements OnInit, AfterViewInit {
  form!: FormGroup;
  str: string;
  tehsil: Tehsil;
  tehsilList: Tehsil[];
  districtDrpList: District[];
  tehsilEntity: TehsilEntity;

  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private tehsilTransfarmer: TehsilTransfarmer,
    private districtTransfarmer: DistrictTransfarmer,
    private tehsilService: TehsilService,
    private districtService: DistrictService,
    private globalService: GlobalService,
    private router: Router,
    private formBuilder: FormBuilder) {

    super();
    const status = '';
    this.validationMessages = {
      ControltehsilCode: {
        required: 'Tehsil Code is required.',
      },
      ControltehsilNameEng: {
        required: 'Tehsil Name Eng is required.',
      },
      ControltehsilNameUni: {
        required: 'Tehsil Name Uni is required.',
      },
      ControldistrictCode: {
        required: 'District Code is required.',
      }
    };
    this.formErrors = {
      ControlisActive: '',
    };
  }
  isTehsilExist(): boolean {
    return this.form.get('ControltehsilNameEng').hasError('queExist');

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 250);
    this.startControlMonitoring(this.form);
  }

  ngOnInit() {
    status = '';
    this.districtService.getDistricts().subscribe(
      (par) => {
        this.districtDrpList = this.districtTransfarmer.DistrictTransfarmers(par);
        console.log(this.districtDrpList);
      },
      (err: any) => console.log(err));
    this.tehsil = {
      tehsilCode: null,
      tehsilNameEng: null,
      tehsilNameUni: null,
      districtCode: null,
      isActive: 'true',
    };
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      this.getregion(str);
      this.form = this.formBuilder.group({
        ControltehsilCode: ['', []],
        ControltehsilNameEng: ['', [Validators.required],
          [TehsilAsyncValidator(this.tehsilService, str)]],
        ControltehsilNameUni: ['', []],
        ControldistrictCode: ['', [Validators.required]],
        ControlisActive: ['', []],
      });

      this.form.controls['ControltehsilCode'].disable();

    });
  }

  save(): void {
    if (status !== 'Update') {
      console.log(this.tehsilTransfarmer.TehsilTransfarmer(this.tehsil));
      this.tehsilService.Save(this.tehsilTransfarmer.TehsilTransfarmer(this.tehsil)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['TehsilList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
    } else {
      this.tehsilService.Update(this.tehsilTransfarmer.
        TehsilTransfarmer(this.tehsil)).subscribe(
          (par) => {
            if (par !== null) {
              this.defaultLayoutComponent.Massage('',
                'Data saved successfully !', 'modal-info');
              this.router.navigate(['TehsilList']);
            } else {
              this.defaultLayoutComponent.Massage('',
                'Technical Error Please connect to Ajax Support team', 'modal-info');
            }
          }
        );
    }
  }
  private getregion(Id: string) {
    this.tehsil = {
      tehsilCode: null,
      tehsilNameEng: null,
      tehsilNameUni: null,
      districtCode: null,
      isActive: 'true',

    };
    if (Id === null || Id === '0' || Id === '') {
      this.tehsil = {
        tehsilCode: null,
        tehsilNameEng: null,
        tehsilNameUni: null,
        districtCode: null,
        isActive: 'true',
      };
      status = '';
    } else {
      this.tehsilService.getTehsil(Id).subscribe(
        (par) => {
          this.tehsilEntity = par;
          //this.form.controls['ControlhubCode'].disable();
          if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
            window.location.href = 'login';
          }
          this.tehsil = this.tehsilTransfarmer.TehsilTransfarmerEntity(this.tehsilEntity);

        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}