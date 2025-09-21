import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { Order } from './models/order.interface';
import { TermPipe } from '../../shared/pipes/Term/term-pipe';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [RouterLink, TermPipe, CurrencyPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
//  implements OnInit, OnDestroy
export class OrdersComponent {
  /* Dependency Injection */
  /* Inject OrdersService service through function injection */
  private readonly ordersService = inject(OrdersService);
  /* Inject ActivatedRoute service through function injection */
  private readonly activatedRoute = inject(ActivatedRoute);

  /* Properties */
  allOrders: Order[] = this.activatedRoute.snapshot.data['ordersList'];

  /* Properties */
  // private signinDecodedToken: DecodedSigninToken | undefined =
  //   {} as DecodedSigninToken;
  // private getSpecificUserOrdersSubscription!: Subscription;
  // allOrders: Order[] = [] as Order[];

  /* Methods */
  /*-----------------------------------------------------------------------------
  # Description: A function to get the data of all orders of a logged user through 
  # Route E-Commerce API on '/orders/user' endpoint
  #------------------------------------------------------------------------------
  # @params: 
  # @param 1: userId: string | undefined
  #------------------------------------------------------------------------------
  # return type: Observable<any>
  -----------------------------------------------------------------------------*/
  // getSpecificUserOrdersData(userId: string | undefined): void {
  //   this.getSpecificUserOrdersSubscription = this.ordersService
  //     .getSpecificUserOrders(userId)
  //     .subscribe({
  //       next: (response) => {
  //         this.allOrders = response;
  //       },
  //       error: (err) => console.log('%c Error: ', 'color:red', err.message),
  //     });
  // }

  // /* Component Lifecycle Hooks */
  // ngOnInit(): void {
  //   /* Get decoded signin token */
  //   this.signinDecodedToken = this.authenticationService.decodeSigninToken();
  //   /* Get specific user orders on component initialization */
  //   this.getSpecificUserOrdersData(this.signinDecodedToken?.id);
  // }
  // ngOnDestroy(): void {
  //   /* Unsubscribe from getSpecificUserOrdersSubscription subscription on component destruction */
  //   this.getSpecificUserOrdersSubscription.unsubscribe();
  // }
}
