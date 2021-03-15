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
      titular: ['', [
        Validators.required,
        Validators.pattern('[A-Za-zá-úÁ-Ú ]*')
      ]],
      numeroTarjeta: ['', [
        Validators.required,
        Validators.pattern('^[0-9]+'),
        Validators.maxLength(16),
        Validators.minLength(16)
      ]],
      fechaExpiracion: ['', [
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

  public get getTitular(): boolean {
    return this.formCreditCard.get('titular').invalid && this.formCreditCard.get('titular').touched;
  }

  public get getNumeroTarjeta(): boolean {
    return this.formCreditCard.get('numeroTarjeta').invalid && this.formCreditCard.get('numeroTarjeta').touched;
  }

  public get getFechaExpiracion(): boolean {
    return this.formCreditCard.get('fechaExpiracion').invalid && this.formCreditCard.get('fechaExpiracion').touched;
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
        const card: CreditCard = {
          titular: this.formCreditCard.get('titular').value,
          numeroTarjeta: this.formCreditCard.get('numeroTarjeta').value,
          fechaExpiracion: this.formCreditCard.get('fechaExpiracion').value,
          cvv: this.formCreditCard.get('cvv').value
        }
        this.formCreditCard.reset();
        this.toastrService.success('La tarjeta fue registrada con éxito', 'Tarjeta registrada!');
        this.loading = false;
      }, 1000);
    }
    console.log(this.formCreditCard);
  }

}
