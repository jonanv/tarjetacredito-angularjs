import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
