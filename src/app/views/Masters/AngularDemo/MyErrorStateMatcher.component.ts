import { Component } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

@Component({
  selector: 'app-angular-demo',
  templateUrl: './angular-demo.component.html',
  styleUrls: ['./angular-demo.component.scss']
})
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid);
    const isSubmitted = !!(form && form.submitted);
    const invalidParent = !!(control && control.parent && control.parent.invalid);
    return (invalidCtrl || invalidParent || isSubmitted);
  }
}
