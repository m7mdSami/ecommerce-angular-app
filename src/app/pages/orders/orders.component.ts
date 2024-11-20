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
  orders: WritableSignal<Order[]> = signal([]);
  products: WritableSignal<Product[]> = this.dbService.products;


  ngOnInit(): void {
    this.getOrderWithTotalPrice();
  }
  
  getOrderWithTotalPrice(): void {
    const orders = this.dbService.orders().map(order => {
      const total = order.Products.reduce((total, product) => {
        const productItem = this.getProductById(product.ProductId);
        return total + productItem.ProductPrice * product.Quantity;
      }, 0);
      order.TotalPrice = total;
      return order;
    });
    this.orders.set(orders);
  }

  getProductById(id: number): Product {
    const product = this.products().find(product => product.ProductId === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }
}
