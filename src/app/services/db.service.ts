import { Injectable, signal, WritableSignal } from '@angular/core';
import * as products from '../../../db/products.json';
import * as orders from '../../../db/orders.json';
import * as users from '../../../db/users.json';
import { Database, Order, Product, User } from '@app/modals';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  products: WritableSignal<Product[]> = signal((products as any).default);
  orders: WritableSignal<Order[]> = signal((orders as any).default);
  users: WritableSignal<User[]> = signal((users as any).default);

  // Get all orders
  getOrders(): void {
    const orders = this.orders().map(order => {
      // Calculate total price of the order
      const total = order.Products.reduce((total, product) => {
        const productItem = this.getProductById(product.ProductId);
        order.ProductList = order.ProductList?.length ? [...order.ProductList, productItem] : [productItem];
        return total + productItem.ProductPrice * product.Quantity;
      }, 0);

      // Get the user for the order
      order.User = this.getUserById(order.UserId);

      // Set the total price of the order
      order.TotalPrice = total;

      // Return the order
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

  getUserById(userId: string): User {
    const user = this.users().find(user => user.Id === userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    return user;
  }

  getOrder(orderId: number): Order {
    const order = this.orders().find(order => +order.OrderId === +orderId);
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }
    return order;
  }

}
