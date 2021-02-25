import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hasFakeLoginEnabled = environment.HAS_FAKE_INLOG_ENABLED;

  constructor(private authService: AuthenticationService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  _signInWithDigiDFake() {
    this.authService.signInWithDigiDFake().subscribe(res => {
      sessionStorage.setItem('token', res['token']);
      this.router.navigate(['/messages']);
    },
    error => {
      this.toastr.error(error['message']);
    });
  }

}
