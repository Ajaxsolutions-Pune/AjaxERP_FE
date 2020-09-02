import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemSubGroup } from '../../../Components/Module/Masters/ItemSubGroup.model';
import { ItemSubGroupService } from '../../../Components/Services/Masters/ItemSubGroupService';
@Component({
  selector: 'app-item-sub-group-list',
  templateUrl: './item-sub-group-list.component.html',
  styleUrls: ['./item-sub-group-list.component.scss']
})
export class ItemSubGroupListComponent implements OnInit {
  @Input() ItemGroupInput: ItemSubGroup;
  itemSubGroups: ItemSubGroup[];

  WithoutFilteritemSubGroups: ItemSubGroup[];
  ResultitemSubGroups: ItemSubGroup[];
  SerachCri: number;
  itemSubGroup: ItemSubGroup;

  constructor(private _router: Router,
    private itemSubGroupService: ItemSubGroupService,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this._router.navigate(['login']);
      }
    this.itemSubGroups = this.itemSubGroupService.getItemSubGroups();
    this.WithoutFilteritemSubGroups = this.itemSubGroups;
  }

  ngOnInit() {
    this.itemSubGroups = this.itemSubGroupService.getItemSubGroups();
    this.WithoutFilteritemSubGroups = this.itemSubGroups;
    this.itemSubGroup = {
      Group_Code: null,
      SubGroup_Name_ENg: null,
      SubGroup_Name_Uni: null,
      SubGroup_Code: null,
      IsActive: null
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultitemSubGroups = this.WithoutFilteritemSubGroups;
    if (this.itemSubGroup.SubGroup_Name_ENg !== null && this.itemSubGroup.SubGroup_Name_ENg !== '') {
      this.ResultitemSubGroups = this.ResultitemSubGroups.filter(SubResult =>
        SubResult.SubGroup_Name_ENg.toLowerCase().indexOf(this.itemSubGroup.SubGroup_Name_ENg.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.itemSubGroup.SubGroup_Code !== null && this.itemSubGroup.SubGroup_Code.toString() !== '') {
      this.ResultitemSubGroups = this.ResultitemSubGroups.filter(SubResult =>
        SubResult.SubGroup_Code.toString().toLowerCase().indexOf(this.itemSubGroup.SubGroup_Code.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.ResultitemSubGroups = this.WithoutFilteritemSubGroups;
    }
    this.itemSubGroups = this.ResultitemSubGroups;
  }

  ExportToExcel(): void {
    alasql('SELECT Brand_Code,Brand_Id,Brand_Name_ENg,Brand_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("brandList.xlsx",{headers:true}) FROM ?', [this.itemSubGroups]);
  }
}
