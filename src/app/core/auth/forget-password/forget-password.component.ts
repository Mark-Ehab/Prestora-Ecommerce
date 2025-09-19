import { response } from 'express';
import { PinCodeDigitFocus } from './../../../shared/directives/PinCodeDigitFocus/pin-code-digit-focus';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../services/Authentication/authentication.service';
import { Router } from '@angular/router';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, InputFieldComponent, PinCodeDigitFocus],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent implements OnInit {
  /* Dependency Injection */
  /* Inject AuthenticationService service through function injection */
  private readonly authenticationService = inject(AuthenticationService);
  /* Inject FormBuilder service through function injection */
  private readonly fb = inject(FormBuilder);
  /* Inject ToastrService service through function injection */
  private readonly toastrService = inject(ToastrService);
  /* Inject Router service through function injection */
  private readonly router = inject(Router);

  /* Properties */
  verifyEmailForm!: FormGroup;
  verifyCodeForm!: FormGroup;
  setNewPasswordForm!: FormGroup;
  verifyEmailSubscription: Subscription = new Subscription();
  verifyCodeSubscription: Subscription = new Subscription();
  setNewPasswordSubscription: Subscription = new Subscription();
  verifiedEmail!: string;
  extractedResetCode!: { resetCode: string };
  newPassordObj!: { email: string; newPassword: string };
  step: number = 1;

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A function to get the status after an email is sent to the backend 
  # to verify if it's registered in the system ornot through Route E-Commerce API 
  # on '/auth/forgotPasswords' endpoint to proceed in forget password proccess and 
  # recover the account
  #------------------------------------------------------------------------------
  # @params: verifyEmailFormObj:Object
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  forgotPasswordEmailVerification(verifyEmailFormObj: Object) {
    /* Unsubscribe from verifyEmailSubscription subscription */
    this.verifyEmailSubscription.unsubscribe();
    /*
     * Sent email extracted from verifyEmailForm to the backend to
     * check if any account on the system with the same email exists
     */
    this.verifyEmailSubscription = this.authenticationService
      .forgotPassword(verifyEmailFormObj)
      .subscribe({
        next: (response) => {
          /* Check if sent email is verified successfully */
          if (response.statusMsg === 'success') {
            /* Notify the user that a reset code is sent to his email through a toastr success message */
            this.toastrService.success(response.message, 'Prestora');
            /* Keep the verified email */
            this.verifiedEmail = (
              verifyEmailFormObj as { email: string }
            ).email;
            /* Change step value */
            this.step = 2;
          }
        },
        error: (err) =>
          console.log('%c Error:', 'color:red', ` ${err.message}`),
      });
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to get the status after a reset code is sent to the 
  # backend through Route E-Commerce API on '/auth/ verifyResetCode' endpoint to 
  # proceed in forget password proccess, reset the old password with new one and 
  # recover the account
  #------------------------------------------------------------------------------
  # @params: verifyCodeFormObj:Object
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  resetCodeVerification(verifyCodeFormObj: Object): void {
    /* Unsubscribe from verifyCodeSubscription subscription */
    this.verifyCodeSubscription.unsubscribe();
    /*
     * Sent code extracted from verifyCodeForm to the backend to
     * check if it's valid or not
     */
    this.verifyCodeSubscription = this.authenticationService
      .verifyResetCode(verifyCodeFormObj)
      .subscribe({
        next: (response) => {
          /* Check if reset code is verified successfully */
          if (response.status) {
            /* Notify the user that reset code is verified successfully through a toastr success message */
            this.toastrService.success(
              'Reset code is verified successfully',
              'Prestora'
            );
            /* Change step value */
            this.step = 3;
          }
        },
        error: (err) => {
          console.log('%c Error:', 'color:red', ` ${err.error.message}`);
          this.verifyCodeForm.get('codeDigit1')?.setValue(null);
          this.verifyCodeForm.get('codeDigit2')?.setValue(null);
          this.verifyCodeForm.get('codeDigit3')?.setValue(null);
          this.verifyCodeForm.get('codeDigit4')?.setValue(null);
          this.verifyCodeForm.get('codeDigit5')?.setValue(null);
          this.verifyCodeForm.get('codeDigit6')?.setValue(null);
        },
      });
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to get the authentication token after a new password is 
  # set and sent to the backend through Route E-Commerce API on '/auth/resetPassword' 
  # endpoint to recover the account
  #------------------------------------------------------------------------------
  # @params: setNewPasswordFormObj:Object
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  sendNewPassword(setNewPasswordFormObj: Object): void {
    /* Unsubscribe from setNewPasswordSubscription subscription */
    this.setNewPasswordSubscription.unsubscribe();
    /* Sent new password extracted from setNewPasswordForm to the backend */
    this.setNewPasswordSubscription = this.authenticationService
      .resetPassword(setNewPasswordFormObj)
      .subscribe({
        next: (response) => {
          /* Check if password is reset successfully with new one */
          if (response.token) {
            /* Notify the user that password is reset successfully through a toastr success message */
            this.toastrService.success(
              'Password is reset successfully',
              'Prestora'
            );

            /* Navigate to login page */
            this.router.navigate(['/login']);
          }
        },
        error: (err) =>
          console.log('%c Error:', 'color:red', ` ${err.error.message}`),
      });
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to initiate Forget Password form groups with all their 
  # child form controls
  #------------------------------------------------------------------------------
  # @params:void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  initForms() {
    this.verifyEmailForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
    this.verifyCodeForm = this.fb.group({
      codeDigit1: [null, [Validators.required, Validators.pattern(/^\d{1}/)]],
      codeDigit2: [null, [Validators.required, Validators.pattern(/^\d{1}/)]],
      codeDigit3: [null, [Validators.required, Validators.pattern(/^\d{1}/)]],
      codeDigit4: [null, [Validators.required, Validators.pattern(/^\d{1}/)]],
      codeDigit5: [null, [Validators.required, Validators.pattern(/^\d{1}/)]],
      codeDigit6: [null, [Validators.required, Validators.pattern(/^\d{1}/)]],
    });
    this.setNewPasswordForm = this.fb.group({
      newPassword: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
          ),
        ],
      ],
    });
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to submit verify email form
  #------------------------------------------------------------------------------
  # @params:void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  submitVerifyEmailFrom() {
    /* Check if the form is valid */
    if (this.verifyEmailForm.valid) {
      /* Send the form data to the backend */
      this.forgotPasswordEmailVerification(this.verifyEmailForm.value);
    }
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to submit verify code form
  #------------------------------------------------------------------------------
  # @params:void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  submitVerifyCodeFrom() {
    /* Check if the form is valid */
    if (this.verifyCodeForm.valid) {
      /* Construct the body object that will be sent to backend to verify the code */
      this.extractedResetCode = {
        resetCode: Object.values(this.verifyCodeForm.value).join(''),
      };
      /* Send the form data to the backend */
      this.resetCodeVerification(this.extractedResetCode);
    }
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to submit set new password form
  #------------------------------------------------------------------------------
  # @params:void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  submitSetNewPasswordForm() {
    /* Check if the form is valid */
    if (this.setNewPasswordForm.valid) {
      /* Construct the new password body object that will be sent to backend */
      this.setNewPasswordForm.value.email = this.verifiedEmail;
      this.newPassordObj = this.setNewPasswordForm.value;
      /* Send the form data to the backend */
      this.sendNewPassword(this.newPassordObj);
    }
  }

  /* Component Lifecycle Hooks */
  ngOnInit(): void {
    /* Initialize Forget Password forms on component initialization */
    this.initForms();
  }
}
