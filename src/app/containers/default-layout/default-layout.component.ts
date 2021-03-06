import { Component, OnDestroy, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { environment } from '../../Components/Module/environment';
import '../../../assets/JS/Global.js';
import { NavMenuObj } from '../../Components/Module/Role/Navobj.model';
import { ThemeService } from 'ng2-charts';
declare var jQuery: any;
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
  // public navItems: NavMenuObj[];
  public navItems = navItems;
  public itemsObj: NavMenuObj;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  myDate = new Date();
  env = environment;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) _document?: any) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        // (function ($) {
        //   $(document).ready(function () {
        //   //  alert("dasdasdddd");
        //     $("#defaultMain").bind("click", function () {
        //       alert("dddd");
        //     });
        //
        //   });
        // })(jQuery);
        this.showLoddingIndicator = true;

      }
      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
        this.showLoddingIndicator = false;

      }
    });

   // var retrievedObject = localStorage.getItem('navMenuList');
   // this.navItems = JSON.parse(retrievedObject);
   // [{ name: 'Dashboard', icon: 'icon-speedometer', url: '/dashboard', children: null }].concat(this.navItems);
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
    // this.router.navigate(['login']);
    // localStorage.removeItem('token');
    // window.location.href='login';
  }

  omit_special_char(event) {
    let k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32 || (k >= 48 && k <= 57));
  }
}
