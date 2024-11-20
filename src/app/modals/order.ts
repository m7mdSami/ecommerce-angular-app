import { Product } from "./product";
import { User } from './user';

export interface Order {
  OrderId: number;
  OrderDate: string;
  UserId: string;
  Products: ProductOrder[];
  PaymentType: string;
  TotalPrice?: number;
  ProductList?: Product[];
  User?: User;
}

export interface ProductOrder {
  ProductId: number;
  Quantity: number;
}
