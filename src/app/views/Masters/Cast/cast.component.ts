import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { CityService } from '../../../Components/Services/Masters/CityService';
import { NgForm } from '@angular/forms';
import { CastCategoryService } from '../../../Components/Services/Masters/CastCategoryService';
import { Cast } from '../../../Components/Module/Masters/Cast';
import { CastService } from '../../../Components/Services/Masters/CastService';
import { CastCategory } from '../../../Components/Module/Masters/CastCategory';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.scss']
})
export class CastComponent implements OnInit {
  cast: Cast;
  str: string;
  castList: Cast[];
  categoryDrpList: CastCategory[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    castCategoryService: CastCategoryService,
    private castService: CastService, private router: Router) {
    this.categoryDrpList = castCategoryService.getCastCategorys();
    const status = '';
  }
  ngOnInit() {
    status = '';
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id'); this.getcasts(id); });

  }
  save(castForm: NgForm): void {
    if (status !== 'Update') {
      this.cast.Id = this.castService.getMaxCastId() + 1;
      this.castService.Save(this.cast);
    } else {
      this.castService.Update(this.cast);
    }
    this.router.navigate(['CastList']);

  }

  private getcasts(Id: number) {

    console.log(Id);
    console.log(status);
    this.cast = {
      Id: null,
      Cast_Code: null,
      Cast_Description_ENG: null,
      Cast_Description_UNI: null,
      IsActive: true,
      CastCategory: null
    };

    if (Id === null || Id === 0) {
      this.cast = {
        CastCategory: null,
        Id: null,
        Cast_Code: null,
        Cast_Description_ENG: null,
        Cast_Description_UNI: null,
        IsActive: true,
      };

      status = '';

    } else {

      this.cast = this.castService.getCast(Id)[0];
      status = 'Update';
    }
  }
}
