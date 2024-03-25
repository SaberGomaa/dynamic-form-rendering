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
                                "bind": "reviewNumber",
                                "name": "ReviewNumber",
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
                                "bind": "PlannedDate",
                                "name": "PlannedDate",
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
                                "bind": "FrontHasBeenPainted",
                                "name": "FrontHasBeenPainted",
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
                        "Class": "col-md-12",
                        "Childs": [
                            {
                                "Class": "form-control",
                                "TagName": "textarea",
                                "Label": "ملاحظات",
                                "bind": "Notes",
                                "name": "Notes",
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
    JsonToString(obj: any): string {
        return JSON.stringify(obj);
    }
    createForm(controls: any[]): FormGroup {
        const group: { [key: string]: any } = {};

        controls.forEach(control => {
            // Assuming control.Name represents the form control's name
            group[control.Name] = this.fb.control('');
        });

        return this.fb.group(group);
    }

    onSubmit(formData: any) {
        console.log('Form Dataaaaaaa:', this.form);
    }


}
