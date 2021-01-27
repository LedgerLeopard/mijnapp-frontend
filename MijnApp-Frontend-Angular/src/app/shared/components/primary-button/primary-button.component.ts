import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss']
})
export class PrimaryButtonComponent implements OnInit {
  @Input() text;
  @Input() disabled = false;
  @Input() routerLink;
  @Input() isButtonWithIcon = true;
  @Output() click = new EventEmitter<any>();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick() {
    if(!!this.routerLink) {
      this.router.navigate([this.routerLink]);
    } else {
    this.click.emit();
  }
  }

}
