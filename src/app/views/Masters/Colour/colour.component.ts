import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Colour, ColourEntity } from '../../../Components/Module/Masters/Colour.model';
import { Router } from '@angular/router';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';

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
      isActive: null
    };
  }

  resultChanged(): void {
  }

  ExportToExcel(): void {
    alasql('SELECT zoneCode,zoneNameENG,zoneNameUNI,' +
      'isActive INTO XLSX("zoneList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
