import { Injectable } from '@angular/core';
import { ReflectiveInjector } from '@angular/core';
import {
    Http,
    URLSearchParams,
    Headers,
    XHRBackend,
    ConnectionBackend,
    BrowserXhr, ResponseOptions, XSRFStrategy, BaseResponseOptions, 
    CookieXSRFStrategy, RequestOptions, BaseRequestOptions
} from '@angular/http';

import { Observable } from 'rxjs';

declare var gapi: any;

export class FusionTableService {

    private static endPoint: string = 'https://www.googleapis.com/fusiontables/v2/query';
    //private static APIkey: string = 'AIzaSyCR5C3CuV1B7fucJLmIYIITSOmb6hap38o';
    private static APIkey: string = 'AIzaSyDHitjuCrTBW7h9meDsW-59iuDZE55hSw8';
    
    constructor() {
    }

    public static execute(query: string, post?: boolean): Observable<any> {
        /*
        let injector: Injector = ReflectiveInjector.resolveAndCreate([Http, HttpModule]);
        let http: Http = injector.get(Http);
        */
        /*
        let http = ReflectiveInjector.resolveAndCreate([
            Http, BrowserXhr,
            { provide: ConnectionBackend, useClass: XHRBackend },
            { provide: ResponseOptions, useClass: BaseResponseOptions },
            { provide: RequestOptions, useClass: BaseRequestOptions }
        ]).get(Http);
        */
        let browserXhr: BrowserXhr = new BrowserXhr();
        let baseResponseOptions: ResponseOptions = new ResponseOptions();
        let xsrfStrategy: CookieXSRFStrategy = new CookieXSRFStrategy();
        let backend: XHRBackend = new XHRBackend(browserXhr, baseResponseOptions, xsrfStrategy);
        let requestOptions: RequestOptions = new RequestOptions();
        let http: Http = new Http(backend, requestOptions);
        

        let params: URLSearchParams = new URLSearchParams();
        params.set('sql', query);
        params.set('key', this.APIkey);
        //params.set('typed', 'true');

        if (post) {

            return http.post(this.endPoint + '?' + params.toString(), null,
                {
                    headers: this.getHeaders()
                });
        } else {
            return http.get(this.endPoint, {
                search: params
            });
        }
    }

    private static getHeaders(): Headers {
        let headers = new Headers();

        ////let token = this.authService.getCurrentToken();
        let token = { access_token: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token }; // Get this from your auth service.
        if (token) {
            headers.set('Authorization', 'Bearer ' + token.access_token);
        }

        return headers;
    }

}
