import { Component, OnInit } from '@angular/core';

// Imports forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditCard } from 'src/app/interfaces/credit-card.interface';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  creditCards: CreditCard[] = [
    {
      name: 'Juan Perez',
      cardNumber: '432424344',
      dateExpiration: '11/23',
      cvv: '123'
    },
    {
      name: 'Juan Perez',
      cardNumber: '432424344',
      dateExpiration: '11/23',
      cvv: '123'
    }
  ];
  formCard: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formCard = this.formBuilder.group({
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

  get f() {
    return this.formCard.controls;
  }

  get getName(): boolean {
    return this.formCard.get('name').invalid && this.formCard.get('name').touched;
  }

  get getCardNumber(): boolean {
    return this.formCard.get('cardNumber').invalid && this.formCard.get('cardNumber').touched;
  }

  get getDateExpiration(): boolean {
    return this.formCard.get('dateExpiration').invalid && this.formCard.get('dateExpiration').touched;
  }

  get getCvv(): boolean {
    return this.formCard.get('cvv').invalid && this.formCard.get('cvv').touched;
  }

  addCard() {
    if (this.formCard.invalid) {
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
    console.log(this.formCard);
    // const card: CreditCard = {
    //   name: this.formCard.get('name').value,
    //   cardNumber: this.formCard.get('cardNumber').value,
    //   dateExpiration: this.formCard.get('dateExpiration').value,
    //   cvv: this.formCard.get('cvv').value
    // }
    // this.creditCards.push(card);
  }

}
