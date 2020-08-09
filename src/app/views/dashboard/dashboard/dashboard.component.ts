import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { DashboardProd } from '../../../Compound/Module/DashboardProd.model';
import { DashboardProdCount } from '../../../Compound/Module/DashboardProdCount.model';
import { LoginUser } from '../../../Compound/Module/LoginUser';
import { DatePipe } from '@angular/common';
import { DashboardService } from '../../../Compound/Services/Dashboard.service';
import { DashboardProdNextDay } from '../../../Compound/Module/DashboardProdNextDay.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  search(): void {
  }

}
