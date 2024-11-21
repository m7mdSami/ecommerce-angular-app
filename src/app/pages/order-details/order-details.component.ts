import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal, WritableSignal } from '@angular/core';
import { Order, Product, User } from '@app/modals';
import { DbService } from '@app/services/db.service';

@Component({
  selector: 'e-commerce-app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {
  private dbService: DbService = inject(DbService);
  orderId = input<number>()
  order: WritableSignal<Order> = signal({} as Order);
  
  ngOnInit(): void {
    this.dbService.getOrders();
    this.getOrder();
  }

  // Get order details
  getOrder() {
    this.order.set(this.dbService.getOrder(this.orderId()!));
  }
}
