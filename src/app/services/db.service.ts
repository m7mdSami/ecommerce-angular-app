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
  users: WritableSignal<Database<User>> = signal((users as any).default);

}
