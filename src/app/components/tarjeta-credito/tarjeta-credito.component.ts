import { Component, OnInit } from '@angular/core';

// Imports forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  creditCards: any[] = [
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
        Validators.required
      ]],
      cardNumber: ['', [
        Validators.required,
        Validators.pattern('^[0-9]+'),
        Validators.maxLength(16),
        Validators.minLength(16)
      ]],
      dateExpiration: ['', [
        Validators.required
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

  addCard() {
    if (this.formCard.invalid) {
      Object.values(this.f)
        .forEach(control => {
          control.markAllAsTouched();
        });
    }
    console.log(this.formCard.value);
  }

}
