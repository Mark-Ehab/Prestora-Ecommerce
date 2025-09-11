import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../services/Authentication/authentication.service';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { SuccessAlertComponent } from '../shared/components/success-alert/success-alert.component';
import { Subscription } from 'rxjs';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';

@Component({
  selector: 'app-signup',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    AlertComponent,
    SuccessAlertComponent,
    InputFieldComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  /* Dependency Injection */
  /* Inject AuthenticationService service through function injection */
  private readonly authenticationService = inject(AuthenticationService);
  /* Inject Router service through function injection */
  private readonly router = inject(Router);

  /* Properties */
  registerForm!: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isLoading: boolean = false;
  errMsg: string = '';
  successMsg: boolean = false;
  registerFormSubmissionSubscription: Subscription = new Subscription();

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A function to initiate register form group with all its child
  # form controls
  #------------------------------------------------------------------------------
  # @params:void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  initForm(): void {
    this.registerForm = new FormGroup(
      {
        name: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
          ),
        ]),
        rePassword: new FormControl(null, [
          Validators.required,
          this.checkConfirmPasswordControlValue,
        ]),
        phone: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^\+?2?01[0125][0-9]{8}$/),
        ]),
      },
      { validators: [this.checkConfirmPasswordControlValue] }
    );
  }

  /*-----------------------------------------------------------------------------
  # Description: A custom validation function to check if confirm password control
  # value is the same as password control value inside a form group
  #------------------------------------------------------------------------------
  # @params:
  # @param(1): formGroup: AbstractControl
  #------------------------------------------------------------------------------
  # return type: object | null
  -----------------------------------------------------------------------------*/
  checkConfirmPasswordControlValue(
    formControl: AbstractControl
  ): object | null {
    if (formControl?.parent) {
      return formControl?.value === null ||
        formControl?.value === formControl.parent?.get('password')?.value
        ? null
        : { passwordMismatch: true };
    } else {
      if (
        formControl.get('rePassword')?.value === null ||
        formControl.get('rePassword')?.value ===
          formControl.get('password')?.value
      ) {
        if (
          formControl.get('rePassword')?.errors &&
          formControl.get('rePassword')?.value !== null
        ) {
          formControl.get('rePassword')?.setErrors(null);
        }
        return null;
      } else {
        return { passwordMismatch: true };
      }
    }
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to get response data after a register form is submitted 
  # through posting register form data to Route E-Commerce API on '/auth/signup'
  # endpoint
  #------------------------------------------------------------------------------
  # @params:
  # @Param(1): FormData:object
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  submitRegisterFormData(FormData: object): void {
    this.registerFormSubmissionSubscription = this.authenticationService
      .submitRegisterForm(FormData)
      .subscribe({
        next: (response) => {
          if (response.message === 'success') {
            /* Reset any previous error messages (if any) */
            this.errMsg = '';
            /* Set successMsg flag in case of request success */
            this.successMsg = true;
            /* Wait for 2 secs then navigate to login page */
            setTimeout(
              () =>
                /* Navigate to Login Page through programming routing */
                this.router.navigate(['/login']),
              2000
            );
          }
          /* Reset isLoading flag */
          this.isLoading = false;
        },
        error: (err) => {
          /* Log error message returned from backend in case of failure on console */
          console.log('%c Error: ', 'color:red', err.error.message);
          /* Reset email form control value and mark it as touched */
          this.registerForm.get('email')?.setValue(null);
          this.registerForm.get('email')?.markAsUntouched();
          /* Get error message */
          this.errMsg = err.error.message;
          /* Reset isLoading flag */
          this.isLoading = false;
        },
      });
  }

  /*-----------------------------------------------------------------------------
  # Description: A function that's called when register form is submitted and it
  # sends registery data to backend through Route E-commerce API on '/auth/signup'
  # endpoint
  #------------------------------------------------------------------------------
  # @params:void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  submitForm(): void {
    /* Check if register form is valid after form submission */
    if (this.registerForm.valid) {
      /* Unsubscribe from registerFormSubmissionSubscription */
      this.registerFormSubmissionSubscription.unsubscribe();
      /* Set isLoading flag */
      this.isLoading = true;
      /* Send Submitted Register Form Data to Backend */
      this.submitRegisterFormData(this.registerForm.value);
    } else {
      /* Mark all register form controls as touched in case form group is invalid */
      this.registerForm.markAllAsTouched();
    }
  }

  /* Component Lifecycle Hooks */
  ngOnInit(): void {
    /* Initialize Register Form on Component Initialization */
    this.initForm();
  }
}
