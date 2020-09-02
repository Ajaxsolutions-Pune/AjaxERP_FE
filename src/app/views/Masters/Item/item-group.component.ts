import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { NgForm } from '@angular/forms';
import { ItemGroup } from '../../../Components/Module/Masters/ItemGroup.model';
import { ItemGroupService } from '../../../Components/Services/Masters/ItemGroupService';
@Component({
  selector: 'app-item-group',
  templateUrl: './item-group.component.html',
  styleUrls: ['./item-group.component.scss']
})
export class ItemGroupComponent implements OnInit {
  itemGroup: ItemGroup;
  str: string;
  constructor(private route: ActivatedRoute,
    private itemGroupService: ItemGroupService, private router: Router) {
  }
  ngOnInit() {
    status = '';
    this.itemGroup = {
      Group_Code: null,
      Group_Name_ENg: null,
      Group_Name_Uni: null,
      IsActive: null,
    };
    this.route.paramMap.subscribe(parameterMap => { const str = parameterMap.get('id'); this.getItemGroup(str); });
    console.log(this.itemGroup.Group_Code);
  }
  save(countryForm: NgForm): void {
    if (status !== 'Update') {

      this.itemGroupService.Save(this.itemGroup);
    } else {
      this.itemGroupService.Update(this.itemGroup);
    }
    this.router.navigate(['ItemGroupList']);

  }

  private getItemGroup(Group_Code: string) {
    this.itemGroup = {
      Group_Code: null,
      Group_Name_ENg: null,
      Group_Name_Uni: null,
      IsActive: null,
    };
    if (Group_Code === null || Group_Code === '') {
      this.itemGroup = {
        Group_Code: null,
        Group_Name_ENg: null,
        Group_Name_Uni: null,
        IsActive: null,
      };
      status = '';

    } else {

      this.itemGroup = this.itemGroupService.getItemGroup(Group_Code)[0];
      status = 'Update';
    }
  }
}
