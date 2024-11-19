import { Component, inject, WritableSignal } from '@angular/core';
import { Product } from '@app/modals';
import { DbService } from '@app/services/db.service';

@Component({
  selector: 'e-commerce-app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  private dbService: DbService = inject(DbService);
  private products: WritableSignal<Product[]> = this.dbService.products;

  constructor() {}

}
