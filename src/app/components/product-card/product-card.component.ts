import { Component, input } from '@angular/core';
import { Product } from '@app/modals';

@Component({
  selector: 'e-commerce-app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  product = input.required<Product>();
}
