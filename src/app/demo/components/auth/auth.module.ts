import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';


@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        PasswordModule,
        CheckboxModule,
        FormsModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
      SignupComponent
    ]
})
export class AuthModule { }
