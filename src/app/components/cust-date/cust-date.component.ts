import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'cust-date',
  templateUrl: './cust-date.component.html',
  styleUrls: ['./cust-date.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustDateComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustDateComponent),
      multi: true,
    },
  ]
})
export class CustDateComponent implements ControlValueAccessor {
  @Input() control!: any

  public inputControl = new FormControl('', []);

  constructor() {
    // Subscribe to inputControl value changes and propagate them to the parent form
    this.inputControl.valueChanges.subscribe((value) => {
      this.onChange(value);
      this.onTouched();
    });
  }
  validate() {
    if (this.inputControl.hasError('required')) {
      return { required: true };
    }
    if (this.inputControl.hasError('pattern')) {
      return { pattern: true };
    }
    return null;
  }

  // Implement ControlValueAccessor methods
  writeValue(value: any): void {
    this.inputControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  // Custom method to send data to the parent component
  sendData() {
    this.onChange(this.inputControl.value);
  }

}
