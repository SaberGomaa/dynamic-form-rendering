import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'custom-control',
  templateUrl: './custom-control.component.html',
  styleUrls: ['./custom-control.component.css']
})
export class CustomControlComponent {
  @Input() controls!: any;
  @Input() formdata!: any;
  // @Output() formdataChange!: EventEmitter<any>;

  getBind(bindName: string) {
    return this.formdata[bindName];
  }
  setBind(bindName: string, $event: any) {
    // debugger;
    this.formdata[bindName] = $event;
    // this.formdataChange.emit();
  }

  // JsonToString(obj: any): string {
  //   return JSON.stringify(obj);
  // }
}