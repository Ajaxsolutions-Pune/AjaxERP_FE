import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { NgForm } from '@angular/forms';
import { ItemGroup } from '../../../Components/Module/Masters/ItemGroup.model';
import { ItemGroupService } from '../../../Components/Services/Masters/ItemGroupService';
import { ItemSubGroupService } from '../../../Components/Services/Masters/ItemSubGroupService';
import { ItemSubGroup } from '../../../Components/Module/Masters/ItemSubGroup.model';
@Component({
  selector: 'app-item-sub-group',
  templateUrl: './item-sub-group.component.html',
  styleUrls: ['./item-sub-group.component.scss']
})
export class ItemSubGroupComponent implements OnInit {
  itemSubGroup: ItemSubGroup;
  str: string;
  constructor(private route: ActivatedRoute,
    private itemSubGroupService: ItemSubGroupService, private router: Router) {
  }
  ngOnInit() {
    status = '';
    this.itemSubGroup = {
      SubGroup_Code: null,
      Group_Code: null,
      SubGroup_Name_ENg: null,
      SubGroup_Name_Uni: null,
      IsActive: null,
    };
    this.route.paramMap.subscribe(parameterMap => { const str = parameterMap.get('id'); this.getItemSubGroup(str); });
    console.log(this.itemSubGroup.Group_Code);
  }
  save(countryForm: NgForm): void {
    if (status !== 'Update') {

      this.itemSubGroupService.Save(this.itemSubGroup);
    } else {
      this.itemSubGroupService.Update(this.itemSubGroup);
    }
    this.router.navigate(['ItemSubGroupList']);

  }

  private getItemSubGroup(Group_Code: string) {
    this.itemSubGroup = {
      SubGroup_Code: null,
      Group_Code: null,
      SubGroup_Name_ENg: null,
      SubGroup_Name_Uni: null,
      IsActive: null,
    };
    if (Group_Code === null || Group_Code === '') {
      this.itemSubGroup = {
        SubGroup_Code: null,
        Group_Code: null,
        SubGroup_Name_ENg: null,
        SubGroup_Name_Uni: null,
        IsActive: null,
      };
      status = '';

    } else {

      this.itemSubGroup = this.itemSubGroupService.getItemSubGroup(Group_Code)[0];
      status = 'Update';
    }
  }
}
