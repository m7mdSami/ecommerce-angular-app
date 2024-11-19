import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as products from '../../db/products.json'

@Component({
  selector: 'e-commerce-app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'e-commerce';
  httpClient: HttpClient = inject(HttpClient);

  private jsonUrl = 'assets/products.json'; // Path to your local JSON file

  products: any = (products as any).default;

  constructor() {
    console.log(this.products);
    // this.getProducts();
  }

  getProducts() {
    this.httpClient.get(this.jsonUrl).subscribe((res) => {
      console.log(res);
    })
  }
}
