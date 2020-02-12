import { Component, OnDestroy, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LoginUser } from '../../Compound/Module/LoginUser';
import { Router, ActivatedRoute } from '@angular/router';
import { Utils } from 'ngx-bootstrap/utils/ngx-bootstrap-utils';
import { LogInService } from '../../Compound/Services/LogIn.service';
import { Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnDestroy {
  showLoddingIndicator = true;
  // Popup Massage Property
  HederStr: string;
  UserName: string;
  EmployeId: number;
  bodyStr: string;
  massageStyle: string;
  @ViewChild('myModal', { static: false }) public myModal: ModalDirective;
  // end
  str: string;
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  myDate = new Date();
  constructor(
    private router: Router,
    private loginservice: LogInService,
    @Inject(DOCUMENT) _document?: any) {

    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoddingIndicator = true;

      }

      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
        this.showLoddingIndicator = false;

      }
    });
  }

  ngOnDestroy(): void {
    this.Logout();
    this.changes.disconnect();
  }
  Massage(Heder: string, body: string, Style: string) {
    this.HederStr = Heder;
    this.bodyStr = body;
    this.massageStyle = Style;
    this.myModal.show();
  }
  Logout() {
    this.str = '';
    this.loginservice.Logout(LoginUser.BranchNo.toString(), '55').subscribe(
      (data) => console.log(data), (err: any) => console.error(err)
    );

    LoginUser.UserID = '';
    LoginUser.UserName = '';
    LoginUser.UserNo = 0;
    LoginUser.BranchNo = 0;
    LoginUser.Password = '';
    LoginUser.RoleId = 0;
    LoginUser.IsActive = false;
    LoginUser.EmpId = 0;
    this.router.navigate(['login']);
  }
}
