import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Imports
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

// Import routing
import { AppRoutingModule } from './app-routing.module';

// Imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Imports components
import { AppComponent } from './app.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { CreditCardFormComponent } from './components/credit-card-form/credit-card-form.component';
import { CreditCardListComponent } from './components/credit-card-list/credit-card-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CreditCardComponent,
    CreditCardFormComponent,
    CreditCardListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,  // required animations module
    ToastrModule.forRoot(),   // ToastrModule added
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
