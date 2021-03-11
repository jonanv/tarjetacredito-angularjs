import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Imports forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import routing
import { AppRoutingModule } from './app-routing.module';

// Imports components
import { AppComponent } from './app.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';

@NgModule({
  declarations: [
    AppComponent,
    CreditCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
