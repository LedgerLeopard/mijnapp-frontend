import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-share-time',
  templateUrl: './share-time.component.html',
  styleUrls: ['./share-time.component.scss']
})
export class ShareTimeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backPage() {
    this.router.navigate(["/homepage"]);
  }

}
