export interface Order {
  OrderId: number;
  OrderDate: string;
  UserId: string;
  Products: ProductOrder[];
  PaymentType: string;
  TotalPrice?: number;
}

export interface ProductOrder {
  ProductId: number;
  Quantity: number;
}
