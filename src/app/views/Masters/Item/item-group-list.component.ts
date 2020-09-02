import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemGroup } from '../../../Components/Module/Masters/ItemGroup.model';
import { ItemGroupService } from '../../../Components/Services/Masters/ItemGroupService';
@Component({
  selector: 'app-item-group-list',
  templateUrl: './item-group-list.component.html',
  styleUrls: ['./item-group-list.component.scss']
})
export class ItemGroupListComponent implements OnInit {
  @Input() ItemGroupInput: ItemGroup;
  itemGroups: ItemGroup[];

  WithoutFilteritemGroups: ItemGroup[];
  ResultitemGroups: ItemGroup[];
  SerachCri: number;
  itemGroup: ItemGroup;

  constructor(private _router: Router,
    private itemGroupService: ItemGroupService,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this._router.navigate(['login']);
      }
    this.itemGroups = this.itemGroupService.getItemGroups();
    this.WithoutFilteritemGroups = this.itemGroups;
  }

  ngOnInit() {
    this.itemGroups = this.itemGroupService.getItemGroups();
    this.WithoutFilteritemGroups = this.itemGroups;
    this.itemGroup = {
      Group_Code: null,
      Group_Name_ENg: null,
      Group_Name_Uni: null,
      IsActive: null
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultitemGroups = this.WithoutFilteritemGroups;
    if (this.itemGroup.Group_Name_ENg !== null && this.itemGroup.Group_Name_ENg !== '') {
      this.ResultitemGroups = this.ResultitemGroups.filter(SubResult =>
        SubResult.Group_Name_ENg.toLowerCase().indexOf(this.itemGroup.Group_Name_ENg.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.itemGroup.Group_Code !== null && this.itemGroup.Group_Code.toString() !== '') {
      this.ResultitemGroups = this.ResultitemGroups.filter(SubResult =>
        SubResult.Group_Code.toString().toLowerCase().indexOf(this.itemGroup.Group_Code.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.ResultitemGroups = this.WithoutFilteritemGroups;
    }
    this.itemGroups = this.ResultitemGroups;
  }

  ExportToExcel(): void {
    alasql('SELECT Brand_Code,Brand_Id,Brand_Name_ENg,Brand_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("brandList.xlsx",{headers:true}) FROM ?', [this.itemGroups]);
  }
}
