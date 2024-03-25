import { AfterViewChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'dynamicForm',
  templateUrl: './dynamicForm.component.html',
  styleUrls: ['./dynamicForm.component.css']
})
export class DynamicFormComponent implements OnInit {
  @Input() controls!: any[];
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({});
    this.traverseControls(this.controls, this.formGroup);
  }

  traverseControls(controls: any[], group: FormGroup, parentName: string = ''): void {
    controls.forEach(control => {
      const controlName = control.Name;
      if (control.TagName === 'div' && control.Childs) {
        const nestedGroup: FormGroup = this.fb.group({});
        this.traverseControls(control.Childs, nestedGroup, controlName);
        group.addControl(controlName, nestedGroup);
      } else {
        const validators = control.Required ? [Validators.required] : [];
        group.addControl(controlName, this.fb.control(null, validators));
      }
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup);
    } else {
      console.log('Form is invalid');
    }
  }
}
