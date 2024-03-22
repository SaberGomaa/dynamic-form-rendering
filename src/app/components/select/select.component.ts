import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormControl } from '@angular/forms';

@Component({
  selector: 'cust-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ]
})
export class SelectComponent implements ControlValueAccessor {
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
