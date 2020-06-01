import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-share-data',
  templateUrl: './share-data.component.html',
  styleUrls: ['./share-data.component.scss']
})
export class ShareDataComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backPage() {
    this.router.navigate(["/homepage"]);
  }

}
