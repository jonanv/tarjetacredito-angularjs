import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Imports forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import routing
import { AppRoutingModule } from './app-routing.module';

// Imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
    ReactiveFormsModule,
    BrowserAnimationsModule,  // required animations module
    ToastrModule.forRoot(),   // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
