import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Role, RoleEntity } from '../../../Components/Module/Masters/Role.model';
import { RoleTransfarmer } from '../../../Components/Transformer/Masters/Role-Transfarmer';
import { RoleService } from '../../../Components/Services/Masters/RoleService';
import * as alasql from 'alasql';
import { environment } from '../../../Components/Module/environment';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
    selector: 'app-role-list',
    templateUrl: './Role-list.component.html'
    //styleUrls: ['./Answer-list.component.scss']
  })


  export class RoleListComponent implements OnInit 
  {
    @Input() RoleInput: Role;
    roles: Role[];
    rolesEntity: RoleEntity[];
    config: any;
    env = environment;

    WithoutFilterRole: Role[];
    Resultrole: Role[];
    SerachCri: number;
    objRole: Role;
    constructor(private _router: Router,
      objTrans: RoleTransfarmer,
      private roleService: RoleService,
      private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this._router.navigate(['login']);
      }
      this.rolesEntity = this.route.snapshot.data['RoleList'];
      this.roles = objTrans.RoleTransfarmers(this.rolesEntity);
      this.WithoutFilterRole = this.roles;
      this.config = {
        itemsPerPage:  this.env.paginationPageSize,
        currentPage: 1,
        totalItems: this.roles.length
      };
    }
    
    ngOnInit() {
        this.WithoutFilterRole = this.roles;
        this.objRole = {
            roleId: null,
            roleName: null,
            roleDescription : null,
            roleCreateFor : null,
            roleLevel : null,    
            isActive  : '3' ,
            createdBy: null,
            createdDate : null,
            modifiedBy: null,
            modifiedDate: null  
         };
      }

      pageChanged(event) {
        this.config.currentPage = event;
      }

      resultChanged(): void {
        this.SerachCri = 0;
        this.Resultrole = this.WithoutFilterRole;

        if (this.objRole.roleName !== null && this.objRole.roleName !== '') {
          console.log(this.objRole.roleName.toString().toLowerCase());
          this.Resultrole = this.Resultrole.filter(SubResult =>
            SubResult.roleName.toLowerCase().indexOf(this.objRole.roleName.toString().toLowerCase()) !== -1);
          this.SerachCri = 1;
        }

        if (this.objRole.roleId !== null && this.objRole.roleId.toString() !== '') {
          this.Resultrole = this.Resultrole.filter(SubResult =>
            SubResult.roleId.toString().toLowerCase().indexOf(this.objRole.roleId.toString().toLowerCase()) !== -1);
          this.SerachCri = 1;
        }
    
        if (this.objRole.isActive !== null && this.objRole.isActive.toString() !== '-1') {
          if (this.objRole.isActive.toString() === '3') {
            this.Resultrole = this.Resultrole.filter(SubResultProd =>
              SubResultProd.isActive.toString() === 'Active'
              || SubResultProd.isActive.toString() === 'Inactive');
          } else {
            this.Resultrole = this.Resultrole.filter(SubResultProd =>
              SubResultProd.isActive.toString() === this.objRole.isActive.toString());
          }
          this.SerachCri = 1;
        }

        if (this.SerachCri === 0) {
          this.Resultrole = this.WithoutFilterRole;
        }
        this.roles = this.Resultrole;
        this.config = {
          itemsPerPage: this.env.paginationPageSize,
          currentPage: 1,
          totalItems: this.roles.length
        };
      }

      ExportToExcel(): void {
        alasql('SELECT roleId Role_Id,roleName Role_Name, roleDescription Role_Description , rolecreatefor Role_Create_For , isActive Is_Active' +
         ' INTO XLSX("RoleList.xlsx",{headers:true}) FROM ?', [this.roles]);
      }

  }

