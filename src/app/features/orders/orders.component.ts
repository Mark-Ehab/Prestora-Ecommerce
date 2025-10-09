import { Component, inject } from '@angular/core';
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
export class OrdersComponent {
  /* Dependency Injection */
  /* Inject OrdersService service through function injection */
  private readonly ordersService = inject(OrdersService);
  /* Inject ActivatedRoute service through function injection */
  private readonly activatedRoute = inject(ActivatedRoute);

  /* Properties */
  allOrders: Order[] = this.activatedRoute.snapshot.data['ordersList'];
}
