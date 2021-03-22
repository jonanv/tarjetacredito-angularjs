import { Component, OnInit } from '@angular/core';

// Imports
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/interfaces/credit-card.interface';
import { CreditCardService } from '../../services/credit-card.service';
import { first, timeout } from 'rxjs/operators';
import Swal from "sweetalert2";
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  public creditCards: CreditCard[];
  public formCreditCard: FormGroup;
  public loading: boolean = false;
  private id: number | undefined;
  public action: string;
  public changeFaceCard: boolean = false;
  public rotateButton: boolean = false;
  public monthSelector: string[] = [];
  public yearSelector: string[] = [];
  private yearActual: number = new Date().getFullYear();
  private monthActual: number = new Date().getMonth();

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private creditCardService: CreditCardService,
    private validatorsService: ValidatorsService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getCreditCards();
    this.action = 'Agregar';
    this.fillSelectors();
  }

  private fillSelectors(): void {
    for (let i = 1; i <= 12; i++) {
      let k = (i < 10) ? ('0' + i) : i;
      this.monthSelector.push(k.toString());
    }

    let year = this.yearActual.toFixed().split('');
    let yearActualModified = parseInt(year[2] + year[3]);
    for (let k = yearActualModified; k <= (yearActualModified+ 8); k++) {
      this.yearSelector.push(k.toString());
    }
  }

  private createForm() {
    this.formCreditCard = this.formBuilder.group({
      nameHolder: ['', [
        Validators.required,
        Validators.pattern('[A-Za-zá-úÁ-Ú ]*')
      ]],
      numberCardCredit: ['', [
        Validators.required,
        Validators.pattern('^[0-9]+'),
        Validators.maxLength(16),
        Validators.minLength(16)
      ]],
      monthExpiration: ['0', [
        Validators.required,
        this.validatorsService.validateOptionZero
      ]],
      yearExpiration: ['0', [
        Validators.required,
        this.validatorsService.validateOptionZero
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

  public get getNameHolder(): boolean {
    return this.formCreditCard.get('nameHolder').invalid && this.formCreditCard.get('nameHolder').touched;
  }

  public get getNumberCardCredit(): boolean {
    return this.formCreditCard.get('numberCardCredit').invalid && this.formCreditCard.get('numberCardCredit').touched;
  }

  public get getMonthExpiration(): boolean {
    return this.formCreditCard.get('monthExpiration').invalid && this.formCreditCard.get('monthExpiration').touched
      || this.formCreditCard.get('monthExpiration').dirty && this.formCreditCard.get('monthExpiration').value === '0';
  }

  public get getYearExpiration(): boolean {
    return this.formCreditCard.get('yearExpiration').invalid && this.formCreditCard.get('yearExpiration').touched
      || this.formCreditCard.get('yearExpiration').dirty && this.formCreditCard.get('yearExpiration').value === '0';
  }

  public get getMonthAndYearExpiration(): boolean {
    let year = this.yearActual.toFixed().split('');
    let yearActualModified = parseInt(year[2] + year[3]);

    return parseInt(this.formCreditCard.get('monthExpiration').value) <= (this.monthActual + 1)
      && parseInt(this.formCreditCard.get('yearExpiration').value) === yearActualModified;
  }

  public get getMonthExpirationValueZero(): boolean {
    return this.formCreditCard.get('monthExpiration').value === '0';
  }

  public get getYearExpirationValueZero(): boolean {
    return this.formCreditCard.get('yearExpiration').value === '0';
  }

  public get getCvv(): boolean {
    return this.formCreditCard.get('cvv').invalid && this.formCreditCard.get('cvv').touched;
  }

  private createCreditCard(): CreditCard {
    const creditCard: CreditCard = {
      nameHolder: this.formCreditCard.get('nameHolder').value,
      numberCardCredit: this.formCreditCard.get('numberCardCredit').value,
      monthExpiration: this.formCreditCard.get('monthExpiration').value,
      yearExpiration: this.formCreditCard.get('yearExpiration').value,
      cvv: this.formCreditCard.get('cvv').value
    }
    return creditCard;
  }

  public saveCreditCard(): void {
    if (this.formCreditCard.invalid) {
      Object.values(this.f)
        .forEach(control => {
          control.markAllAsTouched();
        });
    }
    else {
      this.loading = true;
      let creditCard = this.createCreditCard();

      if (this.id === undefined) {
        // Agregar tarjeta
        this.creditCardService.saveCreditCard(creditCard)
          .pipe(first())
          .subscribe((response: CreditCard) => {
            if (response) {
              this.toastrService.success('La tarjeta fue registrada con éxito', 'Tarjeta registrada!');
            }
            this.resetForm();
            this.getCreditCards();
            this.loading = false;
          }, (error) => {
            this.toastrService.error('Ha ocurrido un error al guardar la tajeta!', 'Error!');
            console.error(error);
          });
      } else {
        // Editar tarjeta
        creditCard['id'] = this.id;
        this.creditCardService.updateCreditCard(this.id, creditCard)
          .pipe(first())
          .subscribe((response: any) => {
            if (response.message) {
              this.toastrService.info(response.message, 'Tarjeta actualizada!');
              this.resetForm();
              this.getCreditCards();
              this.action = 'Agregar';
              this.id = undefined;
              this.loading = false;
            }
          }, (error) => {
            this.toastrService.error('Ha ocurrido un error al editar la tarjeta!', 'Error!');
            console.error(error);
          });
      }
    }
  }

  private getCreditCards(): void {
    this.loading = true;
    setTimeout(() => {
      this.creditCardService.getCreditCards()
        .pipe(first())
        .subscribe((response: CreditCard[]) => {
          this.creditCards = response;
          this.loading = false;
        }, (error) => {
          console.error(error);
        });
    }, 1000);
  }

  public removeCreditCard(index: number, creditCard: CreditCard): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ creditCard.nameHolder }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(response => {
      if (response.value) {
        this.loading = true;
        this.creditCardService.deleteCreditCard(index)
          .pipe(first())
          .subscribe((response: any) => {
            if (response.message) {
              this.toastrService.error(response.message, 'Tarjeta eliminada!');
              this.getCreditCards();
              this.resetForm();
              this.action = 'Agregar';
              this.loading = false;
            }
          }, (error) => {
            console.error(error);
          });
      }
    });
  }

  public updateCreditCard(creditCard: CreditCard): void {
    this.action = 'Id: ' + creditCard['id'] + ' - Editar';
    this.id = creditCard['id'];

    this.formCreditCard.patchValue({
      nameHolder: creditCard.nameHolder,
      numberCardCredit: creditCard.numberCardCredit,
      monthExpiration: creditCard.monthExpiration,
      yearExpiration: creditCard.yearExpiration,
      cvv: creditCard.cvv
    });
  }

  private resetForm(): void {
    this.formCreditCard.reset({
      nameHolder: '',
      numberCardCredit: '',
      monthExpiration: '0',
      yearExpiration: '0',
      cvv: ''
    });
  }

  public showCardFront(value: boolean): void {
    this.changeFaceCard = value;
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
