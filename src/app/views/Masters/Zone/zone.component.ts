import { Component, OnInit } from '@angular/core';
import { Zone } from '../../../Compound/Module/Masters/Zone.model';
import { DefaultLayoutComponent } from '../../../containers/default-layout';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {
  bindObj: Zone;
  str: string;
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent, private router: Router) {
  }
  ngOnInit() {
    status = '';
    this.bindObj = {
      zoneCode: null,
      zoneNameENG: null,
      zoneNameUNI: null,
      isActive: null
    };
    this.route.paramMap.subscribe(parameterMap => { const str = parameterMap.get('id'); this.getquestion(str); });
  }
  save(ObjForm: NgForm): void {
  }

  private getquestion(Question_Code: string) {
  }
}
