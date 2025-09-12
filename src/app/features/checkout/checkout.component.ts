import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InputFieldComponent } from '../../shared/components/input-field/input-field.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertComponent } from '../../core/auth/shared/components/alert/alert.component';
import { OrdersService } from '../../core/services/orders/orders.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-checkout',
  imports: [
    RouterLink,
    InputFieldComponent,
    ReactiveFormsModule,
    AlertComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  /* Dependency Injection */
  /* Inject FormBuilder service through function injection */
  private readonly fb = inject(FormBuilder);
  /* Inject OrdersService service through function injection */
  private readonly ordersService = inject(OrdersService);
  /* Inject ActivatedRoute Service through function injection*/
  private readonly activatedRoute = inject(ActivatedRoute);
  /* Inject ToastrService Service through function injection*/
  private readonly toastrService = inject(ToastrService);
  /* Inject Router Service through function injection*/
  private readonly router = inject(Router);

  /* Properties */
  checkoutForm!: FormGroup;
  paymentMethodControl!: FormControl;
  private cashPaymentSubscription: Subscription = new Subscription();
  private visaPaymentSubscription: Subscription = new Subscription();
  private paramMapSubscription!: Subscription;
  private cartId: string | null = null;

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A function to initiate Checkout form group with all its child
  # form controls
  #------------------------------------------------------------------------------
  # @params:void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  initForm(): void {
    this.checkoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [
          null,
          [Validators.required, Validators.pattern(/^\+?2?01[0125][0-9]{8}$/)],
        ],
        city: [null, [Validators.required]],
      }),
    });
    this.paymentMethodControl = new FormControl(null, [Validators.required]);
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to get cart id passed as path parameter from URL
  #------------------------------------------------------------------------------
  # @params:void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  getCartIdFromUrl(): void {
    this.paramMapSubscription = this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.cartId = urlParams.get('id');
      },
    });
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to get status of a cash payment for a logged user cart 
  # through Route E-Commerce API on '/orders'endpoint
  #------------------------------------------------------------------------------
  # @params: 
  # @param 1: shippingAddress:Object
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  payWithCash(shippingAddress: Object): void {
    this.getCartIdFromUrl();
    this.cashPaymentSubscription = this.ordersService
      .createCashOrder(this.cartId as string, shippingAddress)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            /* Show order success message to the user */
            this.toastrService.success(
              'Order is placed successfully',
              'Prestora'
            );
            /* Navigate to allorders page */
            this.router.navigate(['/allorders']);
          }
        },
        error: (err) => console.log('%c Error: ', 'color:red', err.message),
      });
  }

  /*-----------------------------------------------------------------------------
  # Description: A function to get status of a visa payment for a logged user cart 
  # through Route E-Commerce API on '/orders'endpoint
  #------------------------------------------------------------------------------
  # @params: 
  # @param 1: shippingAddress:Object
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  payWithVisa(shippingAddress: Object): void {
    this.getCartIdFromUrl();
    this.visaPaymentSubscription = this.ordersService
      .createVisaOrder(this.cartId as string, shippingAddress)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            /* Navigate to Stripe payment gatway to complete payment proccess */
            window.open(`${response.session.url}`, '_self');
          }
        },
        error: (err) => console.log('%c Error: ', 'color:red', err.message),
      });
  }

  /*-----------------------------------------------------------------------------
  # Description: A function that's called when checkout form is submitted and it
  # sends shipping address data to backend through Route E-commerce API on 
  # '/orders' endpoint
  #------------------------------------------------------------------------------
  # @params:void
  #------------------------------------------------------------------------------
  # return type: void
  -----------------------------------------------------------------------------*/
  submitForm(): void {
    if (this.checkoutForm.valid && this.paymentMethodControl.valid) {
      if (this.paymentMethodControl.value === 'cash') {
        /* Unsubscribe from cashPaymentSubscription */
        this.cashPaymentSubscription.unsubscribe();
        /* Pay with cash */
        this.payWithCash(this.checkoutForm.value);
      } else {
        /* Unsubscribe from visaPaymentSubscription */
        this.visaPaymentSubscription.unsubscribe();
        /* Pay with visa */
        this.payWithVisa(this.checkoutForm.value);
      }
    } else {
      this.checkoutForm.markAllAsTouched();
      this.paymentMethodControl.markAsTouched();
    }
  }

  /* Component Lifecycle Hooks */
  ngOnInit(): void {
    /* Initialize Checkout Form on Component Initialization */
    this.initForm();
  }
}
