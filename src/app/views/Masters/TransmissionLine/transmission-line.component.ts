import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TransmissionLine, TransmissionLineEntity } from '../../../Components/Module/Masters/TransmissionLine.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { AssetGroupEntity, AssetGroup } from '../../../Components/Module/Masters/AssetGroup.model';
import { Colour } from '../../../Components/Module/Masters/Colour.model';
import { ColourTransfarmer } from '../../../Components/Transformer/Masters/Colour-Transfarmer';
import { ColourService } from '../../../Components/Services/Masters/ColourService';
import { DefaultLayoutComponent } from '../../../containers';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { TransmissionLineService } from '../../../Components/Services/Masters/TransmissionLineService';
import { TransmissionLineTransfarmer } from '../../../Components/Transformer/Masters/TransmissionLine-Transfarmer';
import { env } from 'process';
import { ProjectTransfarmer } from '../../../Components/Transformer/Masters/Project-Transfarmer';
import { environment } from '../../../Components/Module/environment';
import { MasterDrp } from '../../../Components/Module/Masters/MasterDrp.model';
import { Project } from '../../../Components/Module/Masters/Project.model';
import { ProjectService } from '../../../Components/Services/Masters/ProjectService';
import { transmissionAsyncValidator } from '../../../helper/async-validator';

@Component({
  selector: 'app-transmission-line',
  templateUrl: './transmission-line.component.html',
  styleUrls: ['./transmission-line.component.scss']
})

export class TransmissionLineComponent extends FormComponentBase implements OnInit, AfterViewInit {

  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  bindObj: TransmissionLine;
  str: string;
  colourdrp: Colour[];
  TransmissionLineTypeDrp: MasterDrp[];
  TransmissionLineGroupDrp: MasterDrp[];
  projectDrp: Array<Project> = [];
  projectDrpWtihFilter: Array<Project> = [];
  env = environment;
  bindObjEntity: TransmissionLineEntity;

  @ViewChild('multiusersearch', { static: false }) multiUsersearchInput: ElementRef;

  constructor(private _router: Router, private route: ActivatedRoute,
    private transmissionLineService: TransmissionLineService,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private router: Router,
    private globalService: GlobalService,
    private transmissionLineTransfarmer: TransmissionLineTransfarmer,
    private colourService: ColourService,
    private colourTransfarmer: ColourTransfarmer,
    private projectService: ProjectService,
    private ProjectTransfarmer: ProjectTransfarmer,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControltlCode: {
        required: 'Transmission Line Code is required.',
      },
      ControlProject: {
        required: 'Project is required.',
      },
      ControlTransmissionLineNameUNI: {
        required: 'Category Name UNI is required.',
      },
      ControltlTypeCode: {
        required: 'Transmission Line Type is required.',
      },
      ControltlGroupCode: {
        required: 'Transmission Line Group is required.',
      }
    };
    this.formErrors = {
      ControlisActive: '',
    };
  }

  isQueExist(): boolean {
    return this.form.get('ControltlNameENG').hasError('queExist');
  }
  special_char_val(event) {
    let k;
    k = event.charCode;
    return this.globalService.SpecialCharValidator(k);

  }
  onInputChange() {
    console.log(this.multiUsersearchInput.nativeElement.value);
    const searchInput = this.multiUsersearchInput.nativeElement.value ?
      this.multiUsersearchInput.nativeElement.value.toLowerCase() : '';
    if (searchInput != "") {
      this.projectDrpWtihFilter = this.projectDrp.filter(u => {
        const name: string = u.projectName.toLowerCase();
        return name.indexOf(searchInput) > -1;
      })
    }
    else {
      this.projectDrpWtihFilter = this.projectDrp

    }
    console.log("onInputChange");
  }
  onChangeSearch(val: string) {
    console.log("onChangeSearch");
    console.log(val);
  }
  ngOnInit() {
    this.projectService.fillDrpProjects().subscribe(
      (par) => {
        this.projectDrpWtihFilter = this.projectDrp = this.ProjectTransfarmer.ProjectTransfarmers(par);
      },
      (err: any) => console.log(err));
    status = '';
    this.colourService.fillColoursDrp().subscribe(
      (par) => {
        this.colourdrp = this.colourTransfarmer.ColourTransfarmers(par);
      },
      (err: any) => console.log(err));
    // this.projectService.fillDrpProjects().subscribe(
    //   (par) => {
    //     this.projectDrp = this.ProjectTransfarmer.ProjectTransfarmers(par);
    //   },
    //   (err: any) => console.log(err));
    this.globalService.fillMasterDrp('TRLTY').subscribe(
      (par) => {
        this.TransmissionLineTypeDrp = par;
      },
      (err: any) => console.log(err));
    this.globalService.fillMasterDrp('TRLGR').subscribe(
      (par) => {
        this.TransmissionLineGroupDrp = par;
      },
      (err: any) => console.log(err));
    this.bindObj = {
      ouCode: this.env.OuCode,
      projectCode: null,
      sortBy: '1',
      tlCode: null,
      tlGroupCode: null,
      tlNameENG: null,
      tlTypeCode: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };


    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      this.getregion(str);

      this.form = this.formBuilder.group({
        ControltlCode: ['', [Validators.required]],
        ControltlNameENG: ['', [Validators.required],
          [transmissionAsyncValidator(this.transmissionLineService, str)]],
        ControlTransmissionLineNameUNI: ['', []],
        ControlProject: ['', [
          Validators.required]],
        ControltlTypeCode: ['', [
          Validators.required]],
        ControltlGroupCode: ['', [
          Validators.required]],
        ControlisActive: ['', []],
      });
      // this.form.controls['ControltlCode'].disable();

    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 250);
    this.startControlMonitoring(this.form);
  }

  save(ObjForm: NgForm): void {
    this.bindObj.createdBy = localStorage.getItem('username');
    this.bindObj.createdDate = this.globalService.GerCurrntDateStamp();
    this.bindObj.modifiedBy = localStorage.getItem('username');
    this.bindObj.modifiedDate = this.globalService.GerCurrntDateStamp();
    if (status !== 'Update') {

      this.transmissionLineService.getTransmissionLine(this.bindObj.tlCode).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'This Transmission Line code already exist !', 'modal-danger');
            return;
          }
          this.transmissionLineService.Save(this.transmissionLineTransfarmer.
            TransmissionLineTransfarmer(this.bindObj)).subscribe(
              (par) => {
                if (par !== null) {
                  this.defaultLayoutComponent.Massage('',
                    'Data saved successfully !', 'modal-info');
                  ObjForm.reset();
                  this.router.navigate(['TransmissionLineList']);
                } else {
                  this.defaultLayoutComponent.Massage('',
                    'Technical Error Please connect to Ajax Support team', 'modal-info');
                }
              }
            );
        },
        (err: any) => console.log(err));

    } else {
      this.transmissionLineService.Update(this.transmissionLineTransfarmer.
        TransmissionLineTransfarmer(this.bindObj)).subscribe(
          (par) => {
            if (par !== null) {
              this.defaultLayoutComponent.Massage('',
                'Data saved successfully !', 'modal-info');
              ObjForm.reset();
              this.router.navigate(['TransmissionLineList']);
            } else {
              this.defaultLayoutComponent.Massage('',
                'Technical Error Please connect to Ajax Support team', 'modal-info');
            }
          }
        );
    }
  }
  private getregion(TransmissionLine_Code: string) {
    this.bindObj = {
      ouCode: this.env.OuCode,
      projectCode: null,
      sortBy: '1',
      tlCode: null,
      tlGroupCode: null,
      tlNameENG: null,
      tlTypeCode: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (TransmissionLine_Code === null || TransmissionLine_Code === '') {
      this.bindObj = {
        ouCode: this.env.OuCode,
        projectCode: null,
        sortBy: '1',
        tlCode: null,
        tlGroupCode: null,
        tlNameENG: null,
        tlTypeCode: null,
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.transmissionLineService.getTransmissionLine(TransmissionLine_Code).subscribe(
        (par) => {
          //this.form.controls['ControltlCode'].disable();
          if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
            window.location.href = 'login';
          }
          this.bindObjEntity = par;
          this.bindObj = this.transmissionLineTransfarmer.
            TransmissionLineTransfarmerEntity(this.bindObjEntity);


        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}