import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component
import { environment } from './Components/Module/environment';
import { LocalStorageService } from 'ngx-webstorage';
import { CookieService } from 'ngx-cookie-service';

import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';
import { HttpHeaders } from '@angular/common/http';
declare function logout(): any;
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  env = environment;
  constructor(private router: Router,
    private UserSessionStorage: LocalStorageService,
    private cookieService: CookieService,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private bnIdle: BnNgIdleService) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      this.router.navigate(['login']);
    }
    const httpOptions = {
      headers:
        new HttpHeaders({
          'Content-Type': 'application/json',
          // tslint:disable-next-line:max-line-length
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
    };
    this.env.httpOptions = httpOptions;
    this.bnIdle.startWatching(environment.SessionTimeOut * 60).subscribe((res) => {
      if (res) {
        logout();
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
