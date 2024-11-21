import { Component, inject, Input, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order, Product, User } from '@app/modals';
import { DbService } from '@app/services/db.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'e-commerce-app-add-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.scss'
})
export class AddOrderComponent {
  private dbService: DbService = inject(DbService);
  private router: Router = inject(Router);
  activeModal: NgbActiveModal = inject(NgbActiveModal);
  formBuilder: FormBuilder = inject(FormBuilder);
  users: WritableSignal<User[]> = this.dbService.users;
  orders: WritableSignal<Order[]> = this.dbService.orders;

  @Input() quantity: string = '';
  @Input() product?: WritableSignal<Product>;

  form: FormGroup<{
    Id: FormControl<string>,
    Name: FormControl<string>,
    Email: FormControl<string>,
    Phone: FormControl<string>,
    Address: FormControl<string>,
    RegisterDate: FormControl<string>
  }> = this.formBuilder.group({
      Id: this.formBuilder.nonNullable.control<string>('', { validators: [] }),
      Name: this.formBuilder.nonNullable.control<string>('', { validators: [Validators.required] }),
      Email: this.formBuilder.nonNullable.control<string>('', { validators: [Validators.required] }),
      Phone: this.formBuilder.nonNullable.control<string>('', { validators: [Validators.required] }),
      Address: this.formBuilder.nonNullable.control<string>('', { validators: [Validators.required] }),
      RegisterDate: this.formBuilder.nonNullable.control<string>('', { validators: [] }),
    })

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // this.activeModal.close(this.form.value);
    this.form.patchValue({
      Id: this.generateId(),
      RegisterDate: new Date().toISOString()
    });

    this.users.set([...this.users(), this.form.value as User]);

    const order: Order = {
      OrderId: this.orders()[this.orders().length - 1].OrderId + 1,
      OrderDate: new Date().toISOString(),
      UserId: this.form.value.Id!,
      Products: [{
        ProductId: this.product ? +this.product().ProductId! : 0,
        Quantity: +this.quantity
      }],
      PaymentType: 'Cash',
      User: this.form.value as User
    };
    this.orders.set([...this.orders(), order]);
    this.activeModal.close();
    this.router.navigate(['/orders']);
  }

  generateId(): string {
    const part1 = Math.floor(1000 + Math.random() * 9000).toString();
    const part2 = Math.floor(1000 + Math.random() * 9000).toString();
    const part3 = Math.floor(10000 + Math.random() * 90000).toString();
    return `${part1}-${part2}-${part3}`;
  }
}
