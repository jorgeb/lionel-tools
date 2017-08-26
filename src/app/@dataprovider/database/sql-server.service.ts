import { Observable, Observer } from 'rxjs';
import {
  Http,
  URLSearchParams,
  Headers,
  XHRBackend,
  ConnectionBackend,
  BrowserXhr, ResponseOptions, XSRFStrategy, BaseResponseOptions, 
  CookieXSRFStrategy, RequestOptions, BaseRequestOptions
} from '@angular/http';
/*
  Leer => 
  https://eapyl.github.io/article/Use-WebSQL-and-IndexedDB-in-Typescript-25-November-2016.html
*/
export class SQLService {
  public static execute(table: string, method: string, values: any): Observable<any> {
    let browserXhr: BrowserXhr = new BrowserXhr();
    let baseResponseOptions: ResponseOptions = new ResponseOptions();
    let xsrfStrategy: CookieXSRFStrategy = new CookieXSRFStrategy();
    let backend: XHRBackend = new XHRBackend(browserXhr, baseResponseOptions, xsrfStrategy);
    let requestOptions: RequestOptions = new RequestOptions();
    let http: Http = new Http(backend, requestOptions);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    if (method === 'POST') {
      return http.post(SQLService.endPoint + table,
        JSON.stringify(values),
        { headers });
    } else {
      return http.get(SQLService.endPoint + table);
    }
  }

  private static endPoint: string = 'http://localhost:3001/sql/';
}
