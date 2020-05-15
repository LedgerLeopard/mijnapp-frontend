import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonalInformationService {

  constructor(private http: HttpClient) { }

  getPersonalInformation(): Promise<any> {
    return this.http.get(`${environment.endPoint}/person`).toPromise();
  }

  GetPersonsMovingAsync() {
    return this.http.get(`${environment.endPoint}/familyfirstgrade`).toPromise();
  }
}
