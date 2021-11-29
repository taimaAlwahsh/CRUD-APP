import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class MyInterceptor implements HttpInterceptor {
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const API_KEY = 'c139eaa7e713ee42e0b03c426ff1d713b86b651a6d7206eca673ca965c952f78';
        return next.handle(httpRequest.clone({ setHeaders: { Authorization: `Bearer ${API_KEY}` } }));

    }
}