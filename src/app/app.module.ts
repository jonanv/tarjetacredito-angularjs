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
import { NgxMaskModule } from "ngx-mask";

// Imports components
import { AppComponent } from './app.component';
import { CreditCardContainerComponent } from './components/credit-card-container/credit-card-container.component';
import { CreditCardFormComponent } from './components/credit-card-form/credit-card-form.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';

@NgModule({
  declarations: [
    AppComponent,
    CreditCardContainerComponent,
    CreditCardFormComponent,
    CreditCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,  // required animations module
    ToastrModule.forRoot(),   // ToastrModule added
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
