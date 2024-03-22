import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cust-textarea',
  templateUrl: './cust-textarea.component.html',
  styleUrls: ['./cust-textarea.component.css']
})
export class CustTextareaComponent implements OnInit {
  @Input() control!: any

  constructor() { }

  ngOnInit() {
  }

}
