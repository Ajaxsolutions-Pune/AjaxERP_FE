import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component
import { LoginUser } from './Compound/Module/LoginUser';
import { environment } from './Compound/Module/environment';
import { LocalStorageService } from 'ngx-webstorage';
import { CookieService } from 'ngx-cookie-service';

import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private router: Router,
    private UserSessionStorage: LocalStorageService,
    private cookieService: CookieService,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private bnIdle: BnNgIdleService) {
    this.bnIdle.startWatching(environment.SessionTimeOut * 60).subscribe((res) => {
      if (res) {
        // LoginUser.UserID = '';
        // LoginUser.UserName = '';
        //  LoginUser.UserNo = 0;
        //  LoginUser.BranchNo = 0;
        // LoginUser.Password = '';
        // LoginUser.RoleName = '';
        //  this.router.navigate(['login']);
      }
    });
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
