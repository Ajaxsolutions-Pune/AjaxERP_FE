import { Component, OnInit } from '@angular/core';
import { Region } from '../../../Compound/Module/Masters/Region.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers/default-layout/default-layout.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {
  bindObj: Region;
  str: string;
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent, private router: Router) {
  }
  ngOnInit() {
    status = '';
    this.bindObj = {
      regionCode: null,
      regionNameENG: null,
      regionNameUNI: null,
      isActive: null
    };
    this.route.paramMap.subscribe(parameterMap => { const str = parameterMap.get('id'); this.getquestion(str); });
  }
  save(ObjForm: NgForm): void {
  }

  private getquestion(Question_Code: string) {
  }
}
