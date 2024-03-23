import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'dynamicForm',
  templateUrl: './dynamicForm.component.html',
  styleUrls: ['./dynamicForm.component.css']
})
export class DynamicFormComponent implements OnInit {
  @Input() controls: any[] = [];
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    const group: any = {};

    this.traverseControls(this.controls, group);

    return this.fb.group(group);
  }

  traverseControls(controls: any[], group: any, parentName: string = ''): void {
    controls.forEach(control => {
      const controlName = control.Bind ? control.Bind.split('.')[1] : null;

      if (control.TagName === 'div' && control.Childs) {
        this.traverseControls(control.Childs, group, parentName);
      } else if (controlName) {
        group[controlName] = [null, this.getValidators(control)];
      }
    });
  }

  getValidators(control: any): any[] {
    const validators = [];

    if (control.Required) {
      validators.push(Validators.required);
    }

    // Add other validators as needed

    return validators;
  }


  onSubmit(): void {
    console.log(this.formGroup.value);
  }
}
