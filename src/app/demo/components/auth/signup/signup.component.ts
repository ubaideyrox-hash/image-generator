import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserModel } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { ConfirmPasswordValidator } from './confirm-password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    loader : boolean = false
    valCheck: string[] = ['remember'];

    password!: string;
    registrationForm: FormGroup;
    hasError: boolean;
    isLoading$: Observable<boolean>;
  
    // private fields
    private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  
    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
      public layoutService: LayoutService
    ) {
      this.isLoading$ = this.authService.isLoading$;
      // redirect to home if already logged in
      if (this.authService.currentUserValue) {
        this.router.navigate(['/']);
      }
    }
  
    ngOnInit(): void {
      this.initForm();
    }
  
    // convenience getter for easy access to form fields
    get f() {
      return this.registrationForm.controls;
    }
  
    initForm() {
      this.registrationForm = this.fb.group(
        {
          fullname: [
            '',
            Validators.compose([
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(100),
            ]),
          ],
          email: [
            '',
            Validators.compose([
              Validators.required,
              Validators.email,
              Validators.minLength(3),
              Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
            ]),
          ],
          password: [
            '',
            Validators.compose([
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(100),
            ]),
          ],
          cPassword: [
            '',
            Validators.compose([
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(100),
            ]),
          ],
         // agree: [false, Validators.compose([Validators.required])],
        },
        {
          validator: ConfirmPasswordValidator.MatchPassword,
        }
      );
    }
  
    submit() {
      this.loader = true
      this.hasError = false;
      const result: {
        [key: string]: string;
      } = {};
      Object.keys(this.f).forEach((key) => {
        result[key] = this.f[key].value;
      });
  
      const registerData = {name:result['fullname'], email: result['email'], password: result['password'] , admin:true }
      const registrationSubscr = this.authService
        .registration(registerData)
        .pipe(first())
        .subscribe((user: UserModel) => {
          this.loader = false
          if (user) {
            this.router.navigate(['/']);
          } else {
            this.hasError = true;
          }
        });
      this.unsubscribe.push(registrationSubscr);
    }
  
    ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}
