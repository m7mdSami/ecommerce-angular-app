export interface Order {
  OrderId: number;
  OrderDate: string;
  UserId: string;
  Products: ProductOrder[];
  PaymentType: string;
}

export interface ProductOrder {
  ProductId: number;
  Quantity: number;
}
