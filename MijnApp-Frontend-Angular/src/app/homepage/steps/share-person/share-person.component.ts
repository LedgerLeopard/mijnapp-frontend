import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-share-person',
  templateUrl: './share-person.component.html',
  styleUrls: ['./share-person.component.scss']
})
export class SharePersonComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backPage() {
    this.router.navigate(["/homepage"]);
  }

}
