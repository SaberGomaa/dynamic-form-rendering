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

    constructor() { }

    JsonToString(obj: any): string {
        return JSON.stringify(obj);
    }

    submitForm() {
        console.log(this.data);
    }

}
