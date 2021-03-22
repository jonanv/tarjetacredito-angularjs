import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Imports

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  @Input() private formCreditCard: FormGroup;
  @Input() public changeFaceCard: boolean = false;
  @Output() private changeFaceCardEmitter: EventEmitter<boolean> = new EventEmitter()
  public rotateButton: boolean = false;
  @Output() private rotateButtonEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.rotateButtonEmitter.emit(this.rotateButton);
    this.changeFaceCardEmitter.emit(this.changeFaceCard);
  }

  public showFormCreditCardRotateButton(): void {
    this.rotateButton = !this.rotateButton;
    this.rotateButtonEmitter.emit(this.rotateButton);
  }

  public showCardFrontChangeFaceCard(): void {
    this.changeFaceCard = !this.changeFaceCard;
    this.changeFaceCardEmitter.emit(this.changeFaceCard);
  }

  public get getImageCreditCard(): string {
    let numberCreditCard = this.formCreditCard.get('numberCardCredit').value[0];
    if (numberCreditCard === '3') {
      return 'american-express';
    } else if (numberCreditCard === '4') {
      return 'visa';
    } else if (numberCreditCard === '5') {
      return 'mastercard'
    };
    return null;
  }

  public get getNumberCardCreditValue(): string {
    return this.formCreditCard.get('numberCardCredit').value;
  }

  public get getNameHolderValue(): string {
    return this.formCreditCard.get('nameHolder').value ?
      this.formCreditCard.get('nameHolder').value : 'JHON DOE';
  }

  public get getMonthExpirationValue(): string {
    return this.formCreditCard.get('monthExpiration').value !== '0' ?
      this.formCreditCard.get('monthExpiration').value : 'MM';
  }

  public get getYearExpirationValue(): string {
    return this.formCreditCard.get('yearExpiration').value !== '0' ?
      this.formCreditCard.get('yearExpiration').value : 'YY';
  }

  public get getCvvValue(): string {
    return this.formCreditCard.get('cvv').value;
  }

}
