import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../Components/Module/environment';
import { Contact, ContactEntity } from '../../../Components/Module/Masters/Contact.model';
import { ContactTransfarmer } from '../../../Components/Transformer/Masters/Contact-Transfarmer';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  @Input() questionInput: Contact;
  arrOject: Contact[];
  arrOjectEntity: ContactEntity[];

  WithoutFilterObj: Contact[];
  ResultOject: Contact[];
  SerachCri: number;
  bindObj: Contact;
  config: any;
  env = environment;
  constructor(private _router: Router,
    objTrans: ContactTransfarmer,
    private route: ActivatedRoute) {   
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        window.location.href='login';
      }
    this.arrOjectEntity = this.route.snapshot.data['ContactList'];
    this.arrOject = objTrans.ContactTransfarmers(this.arrOjectEntity);
    this.WithoutFilterObj = this.arrOject;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.arrOject.length
    };
  }
  ngOnInit() {
    this.WithoutFilterObj = this.arrOject;
    this.bindObj = {
      isActive: '3',
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
      url: null,
      relation_With_Nominee: null,
      gstin: null,
      oucode: null,
      pan: null,
      tin: null,
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultOject = this.WithoutFilterObj;
    if (this.bindObj.fullNameENG !== null && this.bindObj.fullNameENG !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.fullNameENG.toLowerCase().indexOf(this.bindObj.fullNameENG.toString().toLowerCase())
        !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.contactCode !== null && this.bindObj.contactCode.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.contactCode.toString().toLowerCase().indexOf(
          this.bindObj.contactCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.isActive !== null && this.bindObj.isActive.toString() !== '-1') {
      if (this.bindObj.isActive.toString() === '3') {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.isActive.toString() === 'Active' || SubResultProd.isActive.toString() === 'Inactive');
      } else {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.isActive.toString() === this.bindObj.isActive.toString());
      }
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.ResultOject = this.WithoutFilterObj;
    }
    this.arrOject = this.ResultOject;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.arrOject.length
    };
  }

  ExportToExcel(): void {
    alasql('SELECT ContactCode Asset_Category_Code,assetGroupNameENG Asset_GroupName,' +
      'isActive INTO XLSX("AssetGroupList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
