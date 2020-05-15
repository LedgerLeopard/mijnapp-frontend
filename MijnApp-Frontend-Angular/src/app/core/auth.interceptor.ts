import {
    HTTP_INTERCEPTORS,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpResponseBase
} from '@angular/common/http';
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable, NEVER, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private toastr: ToastrService
        //private translateService: TranslateService,
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedReq = this.setHeader(req);
        if(!!clonedReq) {
        return next.handle(clonedReq)
            .pipe(
                tap(
                    (ev: HttpEvent<any>) => {
                        if (this.checkUnauthorized(ev as HttpResponseBase)) return NEVER;
                        this.getHeader(ev);
                    },
                    response => {
                        if (this.checkUnauthorized(response)) return NEVER;
                        this.getHeader(response);
                        return throwError(response);
                    }
                )
            );
        }
        return next.handle(req);

    }

    checkUnauthorized(res: HttpResponseBase): boolean {
        if (res instanceof HttpErrorResponse || res instanceof HttpResponse) {
            if (res.status === 401 || res.status === 402 || res.statusText === 'Unauthorized') {
                this.redirectRoute();
                return true;
            }
            if (res.status === 403) {
                this.toastr.error('Not enough rights for this action');
                return true;
            }
        }
        return false;
    }

    redirectRoute() {
        sessionStorage.clear();
        if (window.location.pathname === '/' || window.location.pathname === '/login') return;
        this.toastr.error('Session was expired');
        this.router.navigate(['/login']);
    }

    setHeader(req: any): any {
        const idToken = sessionStorage.getItem('token');
        if (idToken) {
            return req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + idToken)
            });
        }
    }

    getHeader(res: HttpEvent<any>) {
        if ((res instanceof HttpResponse || res instanceof HttpErrorResponse) && res.headers && res.headers.has('Token')) {
            sessionStorage.setItem('token', res.headers.get('Token'));
        }
    }
}

export const authInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  };