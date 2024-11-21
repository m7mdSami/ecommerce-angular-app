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
    // Map the orders and calculate the total price of each order
    const orders = this.orders().map(order => {
      // Calculate total price of the order
      const total = order.Products.reduce((total, product) => {
        const productItem = this.getProductById(product.ProductId);
        // Check if the product is already in the order
        const isExist = order.ProductList?.find(item => item.ProductId === product.ProductId)
        if(!isExist) {
          order.ProductList = order.ProductList?.length ? [...order.ProductList, productItem] : [productItem];
        }
        // Calculate the total price of the order
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

  // Get Product by id
  getProductById(id: number): Product {
    // Find the product with the given id
    const product = this.products().find(product => product.ProductId === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }

  // Get User by id
  getUserById(userId: string): User {
    const user = this.users().find(user => user.Id === userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    return user;
  }

  // Get Order by id
  getOrder(orderId: number): Order {
    const order = this.orders().find(order => +order.OrderId === +orderId);
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }
    return order;
  }

}
