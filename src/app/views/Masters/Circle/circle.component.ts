import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Circle } from '../../../Components/Module/Masters/Circle.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { ZoneService } from '../../../Components/Services/Masters/ZoneService';
import { ZoneTransfarmer } from '../../../Components/Transformer/Masters/ZoneTransfarmer';
import { Zone } from '../../../Components/Module/Masters/Zone.model';
import { CircleService } from '../../../Components/Services/Masters/CircleService';
import { CircleTransfarmer } from '../../../Components/Transformer/Masters/Circle-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss']
})
export class CircleComponent extends FormComponentBase implements OnInit, AfterViewInit {

  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  @Input() CircleInput: Circle;
  bindObj: Circle;
  zonedrp: Zone[];
  constructor(private router: Router,
    private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private zoneTransfarmer: ZoneTransfarmer,
    private circleService: CircleService,
    private globalService: GlobalService,
    private circleTransfarmer: CircleTransfarmer,
    private zoneService: ZoneService,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlcircleCode: {
        required: 'Circle Code is required.',
      },
      ControlcircleNameENG: {
        required: 'Circle Name ENG is required.',
      },
      ControlzoneCode: {
        required: 'Zone is required.',
      }
    };
    this.formErrors = {
      ControlisActive: '',
    };
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 250);
    this.startControlMonitoring(this.form);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      ControlcircleCode: ['', []],
      ControlcircleNameENG: ['', [
        Validators.required]],
      ControlzoneCode: ['', [
        Validators.required]],
      ControlcircleNameUNI: ['', []],
      ControlisActive: ['', []],
    });
    status = '';
    this.form.controls['ControlcircleCode'].disable();
    this.zoneService.fillZoneDrp().subscribe(
      (par) => {
        this.zonedrp = this.zoneTransfarmer.ZoneTransfarmers(par);
      },
      (err: any) => console.log(err));
    this.bindObj = {
      circleCode: null,
      circleNameENG: null,
      circleNameUNI: null,
      zoneCode: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      this.getCircle(str);
    });

  }
  save(circleForm: NgForm): void {
    if (status !== 'Update') {
      this.bindObj.circleCode = null;
      this.circleService.Save(this.circleTransfarmer.CircleTransfarmer(this.bindObj)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            circleForm.reset();
            this.router.navigate(['CircleList']);
          }   else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );

    } else {
      this.circleService.Update(this.circleTransfarmer.CircleTransfarmer(this.bindObj)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            circleForm.reset();
            this.router.navigate(['CircleList']);
          }   else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );
    }
  }

  private getCircle(Circle_Code: string) {
    this.bindObj = {
      circleCode: null,
      circleNameENG: null,
      circleNameUNI: null,
      zoneCode: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (Circle_Code === null || Circle_Code === '') {
      this.bindObj = {
        circleCode: null,
        circleNameENG: null,
        circleNameUNI: null,
        zoneCode: null,
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.circleService.getCircle(Circle_Code).subscribe(
        (par) => this.bindObj = this.circleTransfarmer.CircleTransfarmerEntity(par),
        (err: any) => console.log(err));
      status = 'Update';
    }
  }

}
