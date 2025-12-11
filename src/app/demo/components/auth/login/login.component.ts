import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { GlobalService } from 'src/app/global.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserModel } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {
    loader : boolean = false 
    valCheck: string[] = ['remember'];

    password!: string;
    defaultAuth: any = {
        email: 'admin@demo.com',
        password: 'demo',
      };
      loginForm: FormGroup;
      hasError: boolean;
      returnUrl: string;
      isLoading$: Observable<boolean>;

      // private fields
      private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

      constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        public layoutService: LayoutService,
        public global:GlobalService
      ) {
        this.isLoading$ = this.authService.isLoading$;
        // redirect to home if already logged in
        if (this.authService.currentUserValue) {
          this.router.navigate(['/']);
        }
      }

      ngOnInit(): void {
        this.initForm();
        // get return url from route parameters or default to '/'
        this.returnUrl =
          this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
      }

      // convenience getter for easy access to form fields
      get f() {
        return this.loginForm.controls;
      }

      initForm() {
        this.loginForm = this.fb.group({
          email: [
            this.defaultAuth.email,
            Validators.compose([
              Validators.required,
              Validators.email,
              Validators.minLength(3),
              Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
            ]),
          ],
          password: [
            this.defaultAuth.password,
            Validators.compose([
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(100),
            ]),
          ],
        });
      }

      submit() {
        this.loader = true
        this.hasError = false;
        const loginSubscr = this.authService
          .login(this.f['email'].value, this.f['password'].value)
          .pipe(first())
          .subscribe((user: UserModel | undefined) => {
            if (user) {
              this.global.showToast('success','Success','Sign in Successfully')
              this.router.navigate(['/main']);
            } else {
              this.hasError = true;
            }
            this.loader = false
          });
        this.unsubscribe.push(loginSubscr);
      }

      ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
      }
}
