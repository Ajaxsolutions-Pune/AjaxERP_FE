import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginUser } from '../Module/LoginUser';
import { User } from '../Module/User.model';
import { environment } from '../Module/environment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AuthService } from './auth.service';
import { Insertstatus } from '../Module/Masters/Insert_status.model';
import { HttpHeaders } from '@angular/common/http';
import { LogInService } from '../Services/LogIn.service';
import { LogIn } from '../Module/login.model';
import { DatePipe } from '@angular/common';
import { GlobalService } from '../Services/GlobalServices/Global.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LogInComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  public loginobj: LogIn;
  hidePassword: boolean = true;
  public loginstatus: Insertstatus;

  public logo = 'ajaxsolutionlogo';
  env = environment;
  insertstatus = Insertstatus;
  myDate = new Date();
  constructor(
    private fb: FormBuilder,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router,
    private logInService: LogInService
  ) {
  }

  async ngOnInit() {
    console.log(this.globalService.GerCurrntDateStamp());
    this.loginInvalid = false;
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    // tslint:disable-next-line:no-unused-expression
    const today = (new Date(), 'yyyy-MM-dd HH:mm:ss Z');
    // console.log(today);

    const date = new Date();
    console.log(Date.now);

  }
  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('userName').value;
        const password = this.form.get('password').value;
        this.loginobj = {
          ouCode: this.env.OuCode,
          password: password,
          username: username
        };

        this.logInService.Login(this.loginobj).subscribe(
          (par) => {
            this.loginstatus = par;
            if (this.loginstatus.status.toLowerCase() === 'success') {
             

              localStorage.setItem('token', this.loginstatus.token);
              const httpOptions = {
                headers:
                  new HttpHeaders({
                    'Content-Type': 'application/json',
                    // tslint:disable-next-line:max-line-length
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                  })
              };
              this.env.httpOptions = httpOptions;
              LoginUser.ouCode = this.env.OuCode;
              
              localStorage.setItem('username',username)
              LoginUser.status = 'Login';
              this.router.navigate(['dashboard']);
            } else {
              this.loginInvalid = true;
            }
          },
          (err: any) => console.log(err));
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
