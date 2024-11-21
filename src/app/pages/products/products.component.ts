import { Component, inject, WritableSignal } from '@angular/core';
import { Product } from '@app/modals';
import { DbService } from '@app/services/db.service';
import { ProductCardComponent } from "../../components/product-card/product-card.component";

@Component({
  selector: 'e-commerce-app-products',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  private dbService: DbService = inject(DbService);
  products: WritableSignal<Product[]> = this.dbService.products;

}
