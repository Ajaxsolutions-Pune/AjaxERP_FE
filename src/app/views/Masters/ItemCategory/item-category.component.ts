import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { ItemCategory } from '../../../Components/Module/Masters/ItemCategory';
import { ItemCategoryService } from '../../../Components/Services/Masters/ItemCategoryService';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-itemcategory',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.scss']
})
export class ItemCategoryComponent implements OnInit {
  itemcategory: ItemCategory;
  str: string;
  itemcategoryList: ItemCategory[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private itemcategoryService: ItemCategoryService, private router: Router) {
    const status = '';
  }
  ngOnInit() {
    status = '';
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id'); this.getitemcategorys(id); });

  }
  save(itemcategoryForm: NgForm): void {
    if (status !== 'Update') {
      this.itemcategory.Id = this.itemcategoryService.getMaxItemCategoryId() + 1;
      this.itemcategoryService.Save(this.itemcategory);
    } else {
      this.itemcategoryService.Update(this.itemcategory);
    }
    this.router.navigate(['ItemCategoryList']);

  }

  private getitemcategorys(Id: number) {

    console.log(Id);
    console.log(status);
    this.itemcategory = {
      Id: null,
      oUCode: null,
      itemCategoryCode: null,
      itemCategoryNameEng: null,
      itemCategoryNameUni: null,
      isActive: true,
    };

    if (Id === null || Id === 0) {
      this.itemcategory = {
        Id: null,
        oUCode: null,
        itemCategoryCode: null,
        itemCategoryNameEng: null,
        itemCategoryNameUni: null,
        isActive: true,
      };

      status = '';

    } else {

      this.itemcategory = this.itemcategoryService.getItemCategory(Id)[0];
      status = 'Update';
    }
  }
}
