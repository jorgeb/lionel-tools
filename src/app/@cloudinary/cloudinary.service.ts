import { Injectable } from '@angular/core';
import { ICloudinaryResource } from './cloudinary-resource.interface';
import { CLOUDINARY_API_KEY,
    CLOUDINARY_USER } from '../@options/constants';

import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class CloudinaryService {

    constructor(private http: Http) {

    }

    public getUploaded = (tag: string): Observable<any> => {

        const endPoint: string =
        `https://res.cloudinary.com/${CLOUDINARY_USER}/image/list/${tag}.json`;

        return this.http.get(endPoint)
            .map( (data) => data.json().resources);
    }

    public getLionelImages = (): Observable<any> => {
        return this.getUploaded('MyLionel');
    }
}
