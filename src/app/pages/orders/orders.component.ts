import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Order, Product } from '@app/modals';
import { DbService } from '@app/services/db.service';

@Component({
  selector: 'e-commerce-app-orders',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private dbService: DbService = inject(DbService);
  orders: WritableSignal<Order[]> = this.dbService.orders;
  products: WritableSignal<Product[]> = this.dbService.products;


  ngOnInit(): void {
    this.dbService.getOrders();
  }
  
}
