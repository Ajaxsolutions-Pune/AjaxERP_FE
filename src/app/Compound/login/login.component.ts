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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/game';

    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });

    if (true) {
      await this.router.navigate([this.returnUrl]);
    }
  }

  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        // await this.authService.login(username, password);
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
