import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isMessageCurrentRoute = false;

  constructor(public router: Router,private authService: AuthenticationService, private toastr: ToastrService) {
    this.isMessageCurrentRoute = this.router.url === '/messages';
  }

  ngOnInit() {
  }

  _signOut() {
    this.authService.signOut().subscribe(res => {
      this._handleSignOutResponse();
    },() => {
      this._handleSignOutResponse();
    })
  }

  _handleSignOutResponse() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
    this.toastr.success("Succesvol uitgelogd");
  }

}
