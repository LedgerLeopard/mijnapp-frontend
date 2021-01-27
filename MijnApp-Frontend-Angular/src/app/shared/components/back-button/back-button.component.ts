import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {
  @Input() title = 'Terug naar Start';
  @Input() routerLink;
  @Input() position: 'top' | 'bottom' = 'top';
  @Output() back = new EventEmitter<any>();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onBack() {
    if(!!this.routerLink) {
      this.router.navigate([this.routerLink]);
    } else {
      this.back.emit();
    }
  }
}
