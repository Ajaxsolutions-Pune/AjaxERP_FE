import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { DashboardProd } from '../../../Components/Module/DashboardProd.model';
import { DashboardProdCount } from '../../../Components/Module/DashboardProdCount.model';
import { LoginUser } from '../../../Components/Module/LoginUser';
import { DatePipe } from '@angular/common';
import { DashboardService } from '../../../Components/Services/Dashboard.service';
import { DashboardProdNextDay } from '../../../Components/Module/DashboardProdNextDay.model';


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
