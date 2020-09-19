import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Colour, ColourEntity } from '../../../Components/Module/Masters/Colour.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { ColourService } from '../../../Components/Services/Masters/ColourService';
import { ColourTransfarmer } from '../../../Components/Transformer/Masters/Colour-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';

@Component({
  selector: 'app-colour',
  templateUrl: './colour.component.html',
  styleUrls: ['./colour.component.scss']
})
export class ColourComponent extends FormComponentBase implements OnInit, AfterViewInit {

  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  @Input() colourInput: Colour;
  arrOject: Colour[];
  arrOjectEntity: ColourEntity[];

  WithoutFilterObj: Colour[];
  ResultOject: Colour[];
  SerachCri: number;
  bindObj: Colour;
  constructor(private _router: Router,
    private route: ActivatedRoute, private router: Router,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private colourService: ColourService,
    private globalService: GlobalService,
    private colourTransfarmer: ColourTransfarmer,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlcolourCode: {
        required: 'Colour Code is required.',
      },
      ControlcolourNameENG: {
        required: 'Colour Name ENG is required.',
      },
      ControlcolourNameUNI: {
        required: 'Colour Name UNI is required.',
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
      ControlcolourCode: ['', []],
      ControlcolourNameENG: ['', [
        Validators.required]],
      ControlcolourNameUNI: ['', []],
      ControlisActive: ['', []],
    });
    this.form.controls['ControlcolourCode'].disable();
    this.WithoutFilterObj = this.arrOject;
    console.log(this.arrOject);
    this.bindObj = {
      colourCode: null,
      colourNameENG: null,
      colourNameUNI: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => { const str = parameterMap.get('id'); this.getcolour(str); });

  }

  private getcolour(ColourCode: string) {
    this.bindObj = {
      colourCode: null,
      colourNameENG: null,
      colourNameUNI: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (ColourCode === null || ColourCode === '') {
      this.bindObj = {
        colourCode: null,
        colourNameENG: null,
        colourNameUNI: null,
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.colourService.getColour(ColourCode).subscribe(
        (par) => this.bindObj = this.colourTransfarmer.ColourTransfarmerEntity(par),
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
  save(): void {
    if (status !== 'Update') {
      this.bindObj.colourCode = null;
      this.colourService.Save(this.colourTransfarmer.ColourTransfarmer(this.bindObj)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
           // clusterForm.reset();
            this.router.navigate(['ColourList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );

    } else {
      this.colourService.Update(this.colourTransfarmer.ColourTransfarmer(this.bindObj)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
           // clusterForm.reset();
            this.router.navigate(['ColourList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );
    }
  }

  resultChanged(): void {
  }

  ExportToExcel(): void {
    alasql('SELECT zoneCode,zoneNameENG,zoneNameUNI,' +
      'isActive INTO XLSX("zoneList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
