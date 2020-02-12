import { Component, OnInit, ViewChild } from '@angular/core';
import { LogIn } from '../../Compound/Module/login.model';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { LogInService } from '../../Compound/Services/LogIn.service';
import { NgForm } from '@angular/forms';
import { LoginUser } from '../Module/LoginUser';
import { User } from '../Module/User.model';
import { environment } from '../Module/environment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LogInComponent implements OnInit {
  showLoddingIndicator = true;

  login: LogIn;
  user: User;
  str: string;
  // Popup Massage Property
  HederStr: string;
  UserName: string;
  EmployeId: number;
  bodyStr: string;
  massageStyle: string;
  @ViewChild('myModal', { static: false }) public myModal: ModalDirective;
  // end
  constructor(private route: ActivatedRoute,
    private loginservice: LogInService,
    private router: Router) {
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

  ngOnInit() {
    this.login = {
      UserNo: null,
      UserID: null,
      UserName: null,
      BranchNo: 1,
      Password: null,
      RoleId: null,
      CreDate: null,
      CreUser: null,
      ModUser: null,
      ModDate: null,
      Active: null,
      status: null,
      EmpId: null
    };
  }

  logIn(): void {
    if (this.login.UserName === null) {
      this.Massage('Somethig Wrong', 'Pls Enter User Name', 'modal-danger');
      this.router.navigate(['']);
    } else if (this.login.Password === null) {
      this.Massage('Somethig Wrong', 'Pls Enter Password', 'modal-danger');
      this.router.navigate(['']);
    } else {
      if (this.login.UserName.toUpperCase() === environment.GlobalUserName.toUpperCase()
        && this.login.Password === environment.GlobalUserPassword) {

        LoginUser.UserID = environment.GlobalUserName.toUpperCase();
        LoginUser.UserName = environment.GlobalUserName.toUpperCase();
        LoginUser.UserNo = 1;
        LoginUser.BranchNo = 1;
        LoginUser.Password = this.login.Password;
        LoginUser.RoleId = 1;
        LoginUser.IsActive = true;
        LoginUser.EmpId = -1;
        this.router.navigate(['dashboard']);
      } else {
        this.loginservice.LogIn(this.login.UserName, this.login.Password).subscribe(
          (data) => {
            this.user = data;
            console.log(this.user);
            if (this.user.status === 'Log In Successful') {
              LoginUser.UserID = this.user.UserID;
              LoginUser.UserName = this.user.UserName;
              LoginUser.UserNo = this.user.UserNo;
              LoginUser.BranchNo = this.user.BranchNo;
              LoginUser.Password = this.user.Password;
              LoginUser.RoleId = this.user.RoleId;
              LoginUser.IsActive = this.user.IsActive;
              LoginUser.EmpId = this.user.EmpId;
              this.router.navigate(['dashboard']);
            } else {
              this.Massage('Somethig Wrong', this.user.status, 'modal-danger');
              console.log(this.user.status);
              LoginUser.UserID = '';
              LoginUser.UserName = '';
              LoginUser.UserNo = 0;
              LoginUser.BranchNo = 0;
              LoginUser.Password = '';
              LoginUser.RoleId = 0;
              LoginUser.IsActive = false;
              LoginUser.EmpId = 0;
            }
          }
        );

      }
    }
  }

  ForgotPassword(): void {
    this.router.navigate(['EditUser/1']);
  }
  Massage(Heder: string, body: string, Style: string) {
    this.HederStr = Heder;
    this.bodyStr = body;
    this.massageStyle = Style;
    this.myModal.show();
  }

}
