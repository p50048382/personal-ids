import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing/routing.module';
import { NgxSpinnerModule } from "ngx-spinner";

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { AadharComponent } from './components/aadhar/aadhar.component';
import { PanComponent } from './components/pan/pan.component';
import { PassportComponent } from './components/passport/passport.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AadharComponent,
    PanComponent,
    PassportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    NgxSpinnerModule
	//RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
