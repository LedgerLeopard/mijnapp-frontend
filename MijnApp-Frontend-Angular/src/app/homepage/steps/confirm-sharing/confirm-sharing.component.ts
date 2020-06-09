import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-sharing',
  templateUrl: './confirm-sharing.component.html',
  styleUrls: ['./confirm-sharing.component.scss']
})
export class ConfirmSharingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backPage() {
    this.router.navigate(["/homepage"]);
  }

}
