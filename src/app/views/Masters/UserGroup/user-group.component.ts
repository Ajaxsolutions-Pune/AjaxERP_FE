import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmPassErrorStateMatcher } from '../../../Components/ErrorStateMatcher/ConfirmPassErrorStateMatcher.component';
import { DefaultLayoutComponent } from '../../../containers';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent extends FormComponentBase implements OnInit {
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  matcher = new ConfirmPassErrorStateMatcher();
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private router: Router, private formBuilder: FormBuilder) {
    super();

  }

  ngOnInit() {
    status = '';
    this.form = this.formBuilder.group({
    //  ControlloginID: ['', []] 
    });
  }
  
  registerClicked(): void {
    if (this.form.invalid) {
      return;
    }
    alert('Registration Complete');
  }

}


