import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'DatePickerInput',
  templateUrl: './DatePickerInput.component.html',
  styleUrls: ['./DatePickerInput.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatePickerInputComponent),
      multi: true,
    },
    DatePipe
  ],
})
export class DatePickerInputComponent implements ControlValueAccessor {
  @Input() control!: any
  @Input() placeholder: string = '';
  @Input() MinData!: Date;
  @Input() MaxDate!: Date;
  @Input() defaultDate!: Date;
  private _required: boolean = true;

  @Input()
  set required(value: boolean) {
    this._required = value;
    this.updateValidators();
  }
  get required(): boolean {
    return this._required;
  }
  // public inputControl = new FormControl('',[Validators.required]);
  public inputControl = new FormControl('', this.required ? [Validators.required] : []);

  constructor(
    private datePipe: DatePipe,
  ) {
    this.inputControl.valueChanges.subscribe((value) => {
      value = this.datePipe.transform(value, 'yyyy-MM-ddTHH:mm:ss');
      this.onChange(value);
      this.onTouched();
    });
  }

  validate() {
    const errors: { [key: string]: any } = {};

    if (this.inputControl.hasError('required')) {
      errors['required'] = true;
    }

    if (this.inputControl.hasError('min')) {
      errors['min'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  // Implement ControlValueAccessor methods
  writeValue(value: any): void {
    value = this.datePipe.transform(value, 'yyyy-MM-ddTHH:mm:ss');

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
  private updateValidators(): void {
    this.inputControl.setValidators(this.required ? [Validators.required] : null);
    this.inputControl.updateValueAndValidity();
  }

}