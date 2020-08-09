import { Component, OnInit, ViewChild } from '@angular/core';
import { LogIn } from '../../Compound/Module/login.model';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { LogInService } from '../../Compound/Services/LogIn.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginUser } from '../Module/LoginUser';
import { User } from '../Module/User.model';
import { environment } from '../Module/environment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LogInComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  public loginobj: LogIn;
  env = environment;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private logInService: LogInService,
    private authService: AuthService
  ) {
  }

  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/game';

    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        console.log('aa');
        const username = this.form.get('userName').value;
        const password = this.form.get('password').value;
        this.loginobj = {
          ouCode: this.env.OuCode,
          password: username,
          username: password
        };

        this.authService.Login(this.loginobj).subscribe(
          (par) => {
            console.log(par);
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
