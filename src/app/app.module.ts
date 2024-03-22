import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomControlComponent } from './components/custom-control/custom-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomTextboxComponent } from './components/custom-textbox/custom-textbox.component';
import { CustDateComponent } from './components/cust-date/cust-date.component';
import { CalendarModule } from 'primeng/calendar';
import { SelectComponent } from './components/select/select.component';
import { CustTextareaComponent } from './components/cust-textarea/cust-textarea.component';
import { DynamicFormComponent } from './Module/dynamic-form/dynamic-form.component';
import { DatePickerInputComponent } from './components/DatePickerInput/DatePickerInput.component';
@NgModule({
  declarations: [
    AppComponent,
    CustomControlComponent,
    CustomTextboxComponent,
    CustDateComponent,
    SelectComponent,
    CustTextareaComponent,
    DynamicFormComponent,
    DatePickerInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
