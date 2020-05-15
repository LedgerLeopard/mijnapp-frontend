import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { order } from './steps/steps.component';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  checkPreconditions() {
    return this.http.get(`${environment.endPoint}/journey/9d76fb58-0711-4437-acc4-9f4d9d403cdf/checkPreconditions`).toPromise();
  }

  GetAddress(postalcode: string, number: string, numberAddition: string): Promise<any> {
    return this.http.get(`${environment.endPoint}/address/${postalcode}/${number}/${numberAddition}`).toPromise();
  }

  saveOrder(orders: any[], requestType: string) {
    orders.push({"question": "END"});
    const request = {
      requestType,
      data: orders

    }
    return this.http.post(`${environment.endPoint}/order`, request).toPromise();
  }

}
