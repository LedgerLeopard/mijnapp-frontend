import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  signInWithDigiDFake() {
    return this.http.post(`${environment.endPoint}/jwt/signinfake`,{});
  }

  signOut() {
    return this.http.post(`${environment.endPoint}/jwt/signout`,{});
  }
}
