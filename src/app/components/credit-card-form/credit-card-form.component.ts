import { Component, Input, OnInit } from '@angular/core';

// Imports forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/interfaces/credit-card.interface';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.css']
})
export class CreditCardFormComponent implements OnInit {

  @Input() creditCards: CreditCard[];
  formCreditCard: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.formCreditCard = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.pattern('[A-Za-zá-úÁ-Ú ]*')
      ]],
      cardNumber: ['', [
        Validators.required,
        Validators.pattern('^[0-9]+'),
        Validators.maxLength(16),
        Validators.minLength(16)
      ]],
      dateExpiration: ['', [
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(5)
      ]],
      cvv: ['', [
        Validators.required,
        Validators.pattern('^[0-9]+'),
        Validators.maxLength(3),
        Validators.minLength(3)
      ]]
    });
  }

  public get f() {
    return this.formCreditCard.controls;
  }

  public get getName(): boolean {
    return this.formCreditCard.get('name').invalid && this.formCreditCard.get('name').touched;
  }

  public get getCardNumber(): boolean {
    return this.formCreditCard.get('cardNumber').invalid && this.formCreditCard.get('cardNumber').touched;
  }

  public get getDateExpiration(): boolean {
    return this.formCreditCard.get('dateExpiration').invalid && this.formCreditCard.get('dateExpiration').touched;
  }

  public get getCvv(): boolean {
    return this.formCreditCard.get('cvv').invalid && this.formCreditCard.get('cvv').touched;
  }

  public addCard() {
    if (this.formCreditCard.invalid) {
      Object.values(this.f)
        .forEach(control => {
          control.markAllAsTouched();
        });
    }
    else {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);

    }
    console.log(this.formCreditCard);
    const card: CreditCard = {
      name: this.formCreditCard.get('name').value,
      cardNumber: this.formCreditCard.get('cardNumber').value,
      dateExpiration: this.formCreditCard.get('dateExpiration').value,
      cvv: this.formCreditCard.get('cvv').value
    }
    this.creditCards.push(card);
    this.toastrService.success('La tarjeta fue registrada con éxito', 'Tarjeta registrada!');
  }

}
