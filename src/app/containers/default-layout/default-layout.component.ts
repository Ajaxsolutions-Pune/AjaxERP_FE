import { Component, OnDestroy, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { environment } from '../../Components/Module/environment';
import '../../../assets/JS/Global.js';
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
  env = environment;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) _document?: any) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      this.router.navigate(['/login']);
    }
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
    this.router.navigate(['login']);
    localStorage.removeItem('token');
  }

  omit_special_char(event) {
    console.log('omit_special_char');
    let k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32 || (k >= 48 && k <= 57));
  }
}
