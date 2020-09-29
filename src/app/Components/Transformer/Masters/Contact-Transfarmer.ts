import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { ContactEntity, Contact } from '../../Module/Masters/Contact.model';

@Injectable()
export class ContactTransfarmer {
    str: string;
    contactEntity: ContactEntity;
    contact: Contact;
    contacts: Contact[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    ContactTransfarmers(Entity: ContactEntity[]): Contact[] {
        this.contacts = [];
        Entity.forEach(element => {
            this.contact = new Contact();
            this.contact.contactCode = element.contactCode;
            this.contact.contactType = element.contactType;
            this.contact.salutationCode = element.salutationCode;
            this.contact.firstNameENG = element.firstNameENG;
            this.contact.middleNameENG = element.middleNameENG;
            this.contact.surnameNameENG = element.surnameNameENG;
            this.contact.fullNameENG = element.fullNameENG;
            this.contact.firstNameUNI = element.firstNameUNI;
            this.contact.middleNameUNI = element.middleNameUNI;
            this.contact.surnameNameUNI = element.surnameNameUNI;
            this.contact.fullNameUNI = element.fullNameUNI;
            this.contact.countryCode = element.countryCode;
            this.contact.stateCode = element.stateCode;
            this.contact.districtCode = element.districtCode;
            this.contact.cityCode = element.cityCode;
            this.contact.addressENG = element.addressENG;
            this.contact.addressUNI = element.addressUNI;
            this.contact.mobile = element.mobile;
            this.contact.phone = element.phone;
            this.contact.emailID = element.emailID;
            this.contact.fax = element.fax;
            this.contact.nationlId_A = element.nationlId_A;
            this.contact.nationlId_V = element.nationlId_V;
            this.contact.nationlId_DL = element.nationlId_DL;
            this.contact.nationlId_P = element.nationlId_P;
            this.contact.reg_DOB = element.reg_DOB;
            this.contact.gender_Code = element.gender_Code;
            this.contact.occupation_Code = element.occupation_Code;
            this.contact.bank_Code = element.bank_Code;
            this.contact.bankAccountNo = element.bankAccountNo;
            this.contact.bankBranchCode = element.bankBranchCode;
            this.contact.religinion_Code = element.religinion_Code;
            this.contact.cast_Category_Code = element.cast_Category_Code;
            this.contact.cast_Code = element.cast_Code;
            this.contact.nominee_First_Name_ENG = element.nominee_First_Name_ENG;
            this.contact.nominee_Middle_Name_ENG = element.nominee_Middle_Name_ENG;
            this.contact.nominee_Surname_Name_ENG = element.nominee_Surname_Name_ENG;
            this.contact.nominee_First_Name_UNI = element.nominee_First_Name_UNI;
            this.contact.nominee_Middle_Name_UNI = element.nominee_Middle_Name_UNI;
            this.contact.nominee_Surname_Name_UNI = element.nominee_Surname_Name_UNI;
            this.contact.isActive = element.isActive;
            this.contact.url = element.url;
            this.contact.relation_With_Nominee = element.relation_With_Nominee;
            this.contact.gstin = element.gstin;
            this.contact.oucode = element.oucode;
            this.contact.pan = element.pan;
            this.contact.tin = element.tin;
            if (element.isActive === '1') {
                this.contact.isActive = 'Active'.toString().trim();
            } else { this.contact.isActive = 'Inactive'.toString().trim(); }
            this.contacts.push(this.contact);
        });
        return this.contacts;
    }
    ContactTransfarmerEntity(Entity: ContactEntity): Contact {
        this.contact = new Contact();
        this.contact.contactCode = Entity.contactCode;
        this.contact.contactType = Entity.contactType;
        this.contact.salutationCode = Entity.salutationCode;
        this.contact.firstNameENG = Entity.firstNameENG;
        this.contact.middleNameENG = Entity.middleNameENG;
        this.contact.surnameNameENG = Entity.surnameNameENG;
        this.contact.fullNameENG = Entity.fullNameENG;
        this.contact.firstNameUNI = Entity.firstNameUNI;
        this.contact.middleNameUNI = Entity.middleNameUNI;
        this.contact.surnameNameUNI = Entity.surnameNameUNI;
        this.contact.fullNameUNI = Entity.fullNameUNI;
        this.contact.countryCode = Entity.countryCode;
        this.contact.stateCode = Entity.stateCode;
        this.contact.districtCode = Entity.districtCode;
        this.contact.cityCode = Entity.cityCode;
        this.contact.addressENG = Entity.addressENG;
        this.contact.addressUNI = Entity.addressUNI;
        this.contact.mobile = Entity.mobile;
        this.contact.phone = Entity.phone;
        this.contact.emailID = Entity.emailID;
        this.contact.fax = Entity.fax;
        this.contact.nationlId_A = Entity.nationlId_A;
        this.contact.nationlId_V = Entity.nationlId_V;
        this.contact.nationlId_DL = Entity.nationlId_DL;
        this.contact.nationlId_P = Entity.nationlId_P;
        this.contact.reg_DOB = Entity.reg_DOB;
        this.contact.gender_Code = Entity.gender_Code;
        this.contact.occupation_Code = Entity.occupation_Code;
        this.contact.bank_Code = Entity.bank_Code;
        this.contact.bankAccountNo = Entity.bankAccountNo;
        this.contact.bankBranchCode = Entity.bankBranchCode;
        this.contact.religinion_Code = Entity.religinion_Code;
        this.contact.cast_Category_Code = Entity.cast_Category_Code;
        this.contact.cast_Code = Entity.cast_Code;
        this.contact.nominee_First_Name_ENG = Entity.nominee_First_Name_ENG;
        this.contact.nominee_Middle_Name_ENG = Entity.nominee_Middle_Name_ENG;
        this.contact.nominee_Surname_Name_ENG = Entity.nominee_Surname_Name_ENG;
        this.contact.nominee_First_Name_UNI = Entity.nominee_First_Name_UNI;
        this.contact.nominee_Middle_Name_UNI = Entity.nominee_Middle_Name_UNI;
        this.contact.nominee_Surname_Name_UNI = Entity.nominee_Surname_Name_UNI;
        this.contact.isActive = Entity.isActive;
        this.contact.url = Entity.url;
        this.contact.relation_With_Nominee = Entity.relation_With_Nominee;
        this.contact.gstin = Entity.gstin;
        this.contact.oucode = Entity.oucode;
        this.contact.pan = Entity.pan;
        this.contact.tin = Entity.tin;
        if (Entity.isActive === '1') {
            this.contact.isActive = 'true'.toString().trim();
        } else { this.contact.isActive = ''.toString().trim(); }
        return this.contact;
    }

    ContactTransfarmer(contact: Contact): ContactEntity {
        this.contactEntity = new ContactEntity();
        this.contactEntity.contactCode = contact.contactCode;
        this.contactEntity.contactType = contact.contactType;
        this.contactEntity.salutationCode = contact.salutationCode;
        this.contactEntity.firstNameENG = contact.firstNameENG;
        this.contactEntity.middleNameENG = contact.middleNameENG;
        this.contactEntity.surnameNameENG = contact.surnameNameENG;
        this.contactEntity.fullNameENG = contact.fullNameENG;
        this.contactEntity.firstNameUNI = contact.firstNameUNI;
        this.contactEntity.middleNameUNI = contact.middleNameUNI;
        this.contactEntity.surnameNameUNI = contact.surnameNameUNI;
        this.contactEntity.fullNameUNI = contact.fullNameUNI;
        this.contactEntity.countryCode = contact.countryCode;
        this.contactEntity.stateCode = contact.stateCode;
        this.contactEntity.districtCode = contact.districtCode;
        this.contactEntity.cityCode = contact.cityCode;
        this.contactEntity.addressENG = contact.addressENG;
        this.contactEntity.addressUNI = contact.addressUNI;
        this.contactEntity.mobile = contact.mobile;
        this.contactEntity.phone = contact.phone;
        this.contactEntity.emailID = contact.emailID;
        this.contactEntity.fax = contact.fax;
        this.contactEntity.nationlId_A = contact.nationlId_A;
        this.contactEntity.nationlId_V = contact.nationlId_V;
        this.contactEntity.nationlId_DL = contact.nationlId_DL;
        this.contactEntity.nationlId_P = contact.nationlId_P;
        this.contactEntity.reg_DOB = contact.reg_DOB;
        this.contactEntity.gender_Code = contact.gender_Code;
        this.contactEntity.occupation_Code = contact.occupation_Code;
        this.contactEntity.bank_Code = contact.bank_Code;
        this.contactEntity.bankAccountNo = contact.bankAccountNo;
        this.contactEntity.bankBranchCode = contact.bankBranchCode;
        this.contactEntity.religinion_Code = contact.religinion_Code;
        this.contactEntity.cast_Category_Code = contact.cast_Category_Code;
        this.contactEntity.cast_Code = contact.cast_Code;
        this.contactEntity.nominee_First_Name_ENG = contact.nominee_First_Name_ENG;
        this.contactEntity.nominee_Middle_Name_ENG = contact.nominee_Middle_Name_ENG;
        this.contactEntity.nominee_Surname_Name_ENG = contact.nominee_Surname_Name_ENG;
        this.contactEntity.nominee_First_Name_UNI = contact.nominee_First_Name_UNI;
        this.contactEntity.nominee_Middle_Name_UNI = contact.nominee_Middle_Name_UNI;
        this.contactEntity.nominee_Surname_Name_UNI = contact.nominee_Surname_Name_UNI;
        this.contactEntity.isActive = contact.isActive;
        this.contactEntity.url = contact.url;
        this.contactEntity.relation_With_Nominee = contact.relation_With_Nominee;
        this.contactEntity.gstin = contact.gstin;
        this.contactEntity.oucode = contact.oucode;
        this.contactEntity.pan = contact.pan;
        this.contactEntity.tin = contact.tin;
        if (contact.isActive.toString().trim() === 'true') {
            this.contactEntity.isActive = '1';
        } else { this.contactEntity.isActive = '0'; }
        return this.contactEntity;
    }
}
