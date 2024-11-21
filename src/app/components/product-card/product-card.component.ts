import { Component, inject, input, signal, WritableSignal } from '@angular/core';
import { Product } from '@app/modals';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddOrderComponent } from '../add-order/add-order.component';

@Component({
  selector: 'e-commerce-app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  product = input.required<Product>();
  private modalService: NgbModal = inject(NgbModal);
  quantity: WritableSignal<number> = signal(1);


	open() {
		const modalRef = this.modalService.open(AddOrderComponent);
		modalRef.componentInstance.quantity = this.quantity();
		modalRef.componentInstance.product = this.product;
	}
}
