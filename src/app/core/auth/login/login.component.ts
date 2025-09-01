import { join } from 'node:path';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { AuthenticationService } from '../services/Authentication/authentication.service';
import { SuccessAlertComponent } from '../shared/components/success-alert/success-alert.component';
import { Subscription } from 'rxjs';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    AlertComponent,
    SuccessAlertComponent,
    InputFieldComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  /* Dependency Injection */
  /* Inject AuthenticationService service through function injection */
  private readonly authenticationService = inject(AuthenticationService);
  /* Inject Router service through function injection */
  private readonly router = inject(Router);

  /* Properties */
  loginForm!: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;
  errMsg: string = '';
  successMsg: boolean = false;
  username!: string;
  submitLoginFormSubscription: Subscription = new Subscription();

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A function to initiate Login form group with all its child
  # form controls
  #------------------------------------------------------------------------------
  # @params:void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to get response data after a login form is submitted 
  # through posting register form data to Route E-Commerce API on '/auth/signin'
  # endpoint
  #------------------------------------------------------------------------------
  # @params:
  # @Param(1): FormData:object
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  submitLoginFormData(FormData: object): void {
    this.submitLoginFormSubscription = this.authenticationService
      .submitLoginForm(FormData)
      .subscribe({
        next: (response) => {
          if (response.message === 'success') {
            /* Extract the first word of returned username if it's space separated */
            this.username = response.user.name.split(' ', 1).join();
            /* Reset any previous error messages (if any) */
            this.errMsg = '';
            /* Set successMsg flag */
            this.successMsg = true;
            /* Wait for 2 secs then navigate to home page */
            setTimeout(
              () =>
                /* Navigate to Home Page through programming routing */
                this.router.navigate(['/home']),
              2000
            );
          }
          /* Reset isLoading flag */
          this.isLoading = false;
        },
        error: (err) => {
          /* Log error message returned from backend in case of failure on console */
          console.log('%c Error: ', 'color:red', err.error.message);
          /* Reset password form control value and mark it as untouched */
          this.loginForm?.get('password')?.setValue(null);
          this.loginForm.markAsUntouched();
          /* Get error message */
          this.errMsg = err.error.message;
          /* Reset isLoading flag */
          this.isLoading = false;
        },
      });
  }

  /*-----------------------------------------------------------------------------
  # Description: A function that's called when login form is submitted and it
  # sends login credentials data to backend through Route E-commerce API on 
  # '/auth/login' endpoint
  #------------------------------------------------------------------------------
  # @params:void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  submitForm(): void {
    /* Check if submitted login form is valid */
    if (this.loginForm.valid) {
      /* Unsubscribe from submitLoginFormSubscription */
      this.submitLoginFormSubscription.unsubscribe();
      /* Set isLoading flag */
      this.isLoading = true;
      /* Send Submitted Login Form Data to Backend */
      this.submitLoginFormData(this.loginForm.value);
    } else {
      /* Mark all login form controls as touched in case form group is invalid */
      this.loginForm.markAllAsTouched();
    }
  }

  /* Component Lifecycle Hooks */
  ngOnInit(): void {
    /* Initialize Login Form on Component Initialization */
    this.initForm();
  }
}
