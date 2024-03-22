import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'custom-control',
  templateUrl: './custom-control.component.html',
  styleUrls: ['./custom-control.component.css']
})
export class CustomControlComponent {//implements OnInit {


  @Input() controls!: Array<any>
  formStructure = {
    "reports": [
      {
        "Name": "Rep1",
        "DisplayName": "نموذج 1"
      }
    ],
    "options": [
      {
        "Name": "YesNo",
        "Values": [
          {
            "Label": "نعم",
            "Value": true
          },
          {
            "Label": "لا",
            "Value": false
          }
        ]
      }
    ],
    "controls": [
      {
        "TagName": "div",
        "Class": "row",
        "Childs": [
          {
            "TagName": "div",
            "Class": "col-md-3",
            "Childs": [
              {
                "TagName": "text",
                "Label": "رقم المعاينة ",
                "Bind": "item.ReviewNumber",
                "Name": "ReviewNumber",
                "Required": false,
                "Class": "form-control",
                "Errors": {
                  "required": "اجبارى",
                  "pattern": "غير صحيح"
                },
                "Pattern": "RegistrationNoFormat"
              }
            ]
          },
          {
            "TagName": "div",
            "Class": "col-md-3",
            "Childs": [
              {
                "TagName": "cust-date",
                "Label": "تاريخ المخطط",
                "Bind": "item.PlannedDate",
                "Name": "PlannedDate",
                "Required": true,
                "Errors": {
                  "required": "اجبارى",
                  "pattern": "غير صحيح"
                },
                "Pattern": "RegistrationNoFormat"
              }
            ]
          },
          {
            "TagName": "div",
            "Class": "col-md-3",
            "Childs": [
              {
                "TagName": "select",
                "Class": "form-control",
                "Label": "تم طلاء الوجهات",
                "Bind": "item.FrontHasBeenPainted",
                "Name": "FrontHasBeenPainted",
                "Required": true,
                "Errors": {
                  "required": "اجبارى"
                },
                "Options": "YesNo"
              }
            ]
          }
        ]
      },
      {
        "TagName": "div",
        "Class": "row",
        "Childs": [
          {
            "TagName": "div",
            "Class": "col-md-12",
            "Childs": [
              {
                "Class": "form-control",
                "TagName": "textarea",
                "Label": "ملاحظات",
                "Bind": "item.Notes",
                "Name": "Notes",
                "Required": false,
                "Errors": {
                  "pattern": "غير صحيح"
                }
              }
            ]
          }
        ]
      }
    ]
  }

  dynamicForm: FormGroup = this.fb.group({});
  constructor(private fb: FormBuilder) {
    this.formBuild(this.formStructure.controls)
  }

  formBuild(childs: any) {
    let formGroup: Record<string, any> = {};
    childs.forEach((control: any) => {
      control.Childs.forEach((e: any) => {
        e.Childs.forEach((element: any) => {
          formGroup[element.Name] = [element.value || ''];
        });
      })
    });
    this.dynamicForm = this.fb.group(formGroup);
  }

  onSubmit(val: any) {
    // this.dynamicForm.controls['Notes'].patchValue('ssssss')
    console.log(val.value);
  }

  form: any = new FormGroup({});
  group: any = new FormGroup({});



  // createFormGroup(controls: any[]): FormGroup {

  //   controls.forEach(control => {
  //     if (control.Childs) {
  //       this.createFormGroup(control.Childs)
  //     } else {
  //       this.group.addControl(control.Name, new FormControl('', Validators.required));
  //     }
  //   });
  //   return this.group;
  // }

  // ngOnInit(): void {
  //   this.form = this.createFormGroup(this.formStructure.controls);
  // }

  // save() {
  //   console.log(this.form);
  //   console.log(this.form.value);

  // }

}