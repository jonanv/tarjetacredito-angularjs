import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Imports forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import routing
import { AppRoutingModule } from './app-routing.module';

// Imports components
import { AppComponent } from './app.component';
import { TarjetaCreditoComponent } from './components/tarjeta-credito/tarjeta-credito.component';

@NgModule({
  declarations: [
    AppComponent,
    TarjetaCreditoComponent
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
