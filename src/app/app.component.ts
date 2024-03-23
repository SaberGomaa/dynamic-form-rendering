import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dynamic-form-rendering';
  data: any = {};
  jsonControls: any = {
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
                "Class": "form-control",
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
                "Options": ["Yes", "No"]
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
            "Class": "col-md-7",
            "Childs": [
              {
                "TagName": "employee-list",
                "Label": "الادارة",
                "Bind": "item.EmployeeListValue",
                "Name": "EmployeeList",
                "Required": true,
                "Errors": {
                  "required": "اجبارى",
                  "pattern": "غير صحيح"
                }
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
      },

    ]
  };

  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // Assuming controls is your JSON data
    this.form = this.createForm(this.jsonControls.controls);
  }

  createForm(controls: any[]): FormGroup {
    const group: { [key: string]: any } = {};

    controls.forEach(control => {
      // Assuming control.Name represents the form control's name
      group[control.Name] = this.fb.control('');
    });

    return this.fb.group(group);
  }

  onSubmit() {
    console.log('ssssssss');

    // Here you can access the form values using this.form.value
    console.log(this.form);
    // Do whatever you need with the form values, such as sending them to a server
  }


}
