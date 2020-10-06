import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../Components/Module/environment';
import { Contact, ContactEntity } from '../../../Components/Module/Masters/Contact.model';
import { MasterDrp } from '../../../Components/Module/Masters/MasterDrp.model';
import { TransmissionLine } from '../../../Components/Module/Masters/TransmissionLine.model';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { ContactService } from '../../../Components/Services/Masters/ContactService';
import { TransmissionLineService } from '../../../Components/Services/Masters/TransmissionLineService';
import { ContactTransfarmer } from '../../../Components/Transformer/Masters/Contact-Transfarmer';
import { TransmissionLineTransfarmer } from '../../../Components/Transformer/Masters/TransmissionLine-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends FormComponentBase implements OnInit, AfterViewInit {

  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  bindObj: Contact;
  str: string;
  env = environment;
  bindObjEntity: ContactEntity;
  constructor(private route: ActivatedRoute,
    private contactService: ContactService,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private router: Router,
    private transmissionLineService: TransmissionLineService,
    private transmissionLineTransfarmer: TransmissionLineTransfarmer,
    private globalService: GlobalService,
    private contactTransfarmer: ContactTransfarmer,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlContactCode: {
        required: 'Contact Code is required.',
        pattern: 'Value cross max limit of Contact Code.',
      },
      ControlcontactType: {
        required: 'Contact Type is required.'
      },
      ControlContactNameENG: {
        required: 'Contact Name is required.'
      }
    };
    this.formErrors = {
      ControlisActive: '',
    };
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      ControlContactCode: ['',
        [Validators.required]],
        ControlcontactType: ['',
          [Validators.required]],
          ControlContactNameENG: ['',
            [Validators.required]],
            ControlisActive: ['',
              []]
    });
    this.form.controls['ControlContactCode'].disable();
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href='login';
    }
    status = '';
    this.bindObj = {
      contactCode: null,
      contactType: null,
      salutationCode: null,
      firstNameENG: null,
      middleNameENG: null,
      surnameNameENG: null,
      fullNameENG: null,
      firstNameUNI: null,
      middleNameUNI: null,
      surnameNameUNI: null,
      fullNameUNI: null,
      countryCode: null,
      stateCode: null,
      districtCode: null,
      cityCode: null,
      addressENG: null,
      addressUNI: null,
      mobile: null,
      phone: null,
      emailID: null,
      fax: null,
      nationlId_A: null,
      nationlId_V: null,
      nationlId_DL: null,
      nationlId_P: null,
      reg_DOB: null,
      gender_Code: null,
      occupation_Code: null,
      bank_Code: null,
      bankAccountNo: null,
      bankBranchCode: null,
      religinion_Code: null,
      cast_Category_Code: null,
      cast_Code: null,
      nominee_First_Name_ENG: null,
      nominee_Middle_Name_ENG: null,
      nominee_Surname_Name_ENG: null,
      nominee_First_Name_UNI: null,
      nominee_Middle_Name_UNI: null,
      nominee_Surname_Name_UNI: null,
      isActive: null,
      url: null,
      relation_With_Nominee: null,
      gstin: null,
      oucode: null,
      pan: null,
      tin: null,
    };
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      this.getregion(str);
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 250);
    this.startControlMonitoring(this.form);
  }

  save(ObjForm: NgForm): void {
    // this.bindObj.createdBy = localStorage.getItem('username');
    // this.bindObj.createdDate = this.globalService.GerCurrntDateStamp();
    // this.bindObj.modifiedBy = localStorage.getItem('username');
    // this.bindObj.modifiedDate = this.globalService.GerCurrntDateStamp();
    if (status !== 'Update') {
      // this.bindObj.tlCode = null;
      this.contactService.Save(this.contactTransfarmer.
        ContactTransfarmer(this.bindObj)).subscribe(
          (par) => {
            if (par !== null) {
              this.defaultLayoutComponent.Massage('',
                'Data saved successfully !', 'modal-info');
              ObjForm.reset();
              this.router.navigate(['ContactList']);
            } else {
              this.defaultLayoutComponent.Massage('',
                'Somethig Wrong', 'modal-info');
            }
          }
        );

    } else {
      this.contactService.Update(this.contactTransfarmer.
        ContactTransfarmer(this.bindObj)).subscribe(
          (par) => {
            if (par !== null) {
              this.defaultLayoutComponent.Massage('',
                'Data saved successfully !', 'modal-info');
              ObjForm.reset();
              this.router.navigate(['ContactList']);
            } else {
              this.defaultLayoutComponent.Massage('',
                'Somethig Wrong', 'modal-info');
            }
          }
        );
    }
  }
  private getregion(Contact_Code: string) {
    this.bindObj = {
      contactCode: null,
      contactType: null,
      salutationCode: null,
      firstNameENG: null,
      middleNameENG: null,
      surnameNameENG: null,
      fullNameENG: null,
      firstNameUNI: null,
      middleNameUNI: null,
      surnameNameUNI: null,
      fullNameUNI: null,
      countryCode: null,
      stateCode: null,
      districtCode: null,
      cityCode: null,
      addressENG: null,
      addressUNI: null,
      mobile: null,
      phone: null,
      emailID: null,
      fax: null,
      nationlId_A: null,
      nationlId_V: null,
      nationlId_DL: null,
      nationlId_P: null,
      reg_DOB: null,
      gender_Code: null,
      occupation_Code: null,
      bank_Code: null,
      bankAccountNo: null,
      bankBranchCode: null,
      religinion_Code: null,
      cast_Category_Code: null,
      cast_Code: null,
      nominee_First_Name_ENG: null,
      nominee_Middle_Name_ENG: null,
      nominee_Surname_Name_ENG: null,
      nominee_First_Name_UNI: null,
      nominee_Middle_Name_UNI: null,
      nominee_Surname_Name_UNI: null,
      isActive: null,
      url: null,
      relation_With_Nominee: null,
      gstin: null,
      oucode: null,
      pan: null,
      tin: null,
    };
    if (Contact_Code === null || Contact_Code === '') {
      this.bindObj = {
        contactCode: null,
        contactType: null,
        salutationCode: null,
        firstNameENG: null,
        middleNameENG: null,
        surnameNameENG: null,
        fullNameENG: null,
        firstNameUNI: null,
        middleNameUNI: null,
        surnameNameUNI: null,
        fullNameUNI: null,
        countryCode: null,
        stateCode: null,
        districtCode: null,
        cityCode: null,
        addressENG: null,
        addressUNI: null,
        mobile: null,
        phone: null,
        emailID: null,
        fax: null,
        nationlId_A: null,
        nationlId_V: null,
        nationlId_DL: null,
        nationlId_P: null,
        reg_DOB: null,
        gender_Code: null,
        occupation_Code: null,
        bank_Code: null,
        bankAccountNo: null,
        bankBranchCode: null,
        religinion_Code: null,
        cast_Category_Code: null,
        cast_Code: null,
        nominee_First_Name_ENG: null,
        nominee_Middle_Name_ENG: null,
        nominee_Surname_Name_ENG: null,
        nominee_First_Name_UNI: null,
        nominee_Middle_Name_UNI: null,
        nominee_Surname_Name_UNI: null,
        isActive: null,
        url: null,
        relation_With_Nominee: null,
        gstin: null,
        oucode: null,
        pan: null,
        tin: null,
      };
      status = '';

    } else {
      this.contactService.getContact(Contact_Code).subscribe(
        (par) => {
          this.bindObjEntity = par;
          this.form.controls['ControlContactCode'].disable();
          if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
            window.location.href='login';
          }
          this.bindObj = this.contactTransfarmer.
            ContactTransfarmerEntity(this.bindObjEntity);
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
