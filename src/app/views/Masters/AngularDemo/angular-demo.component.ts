import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'input-error-state-matcher-example',
  templateUrl: './angular-demo.component.html',
  styleUrls: ['./angular-demo.component.scss']
})
export class AngularDemoComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent, private router: Router) {
    const status = '';
  }
  ngOnInit() {
    status = '';
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id');
    // this.getcountrys(id.toString());
   });

  }
}
