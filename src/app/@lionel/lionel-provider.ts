import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/observable/forkJoin';

import { UUID } from 'angular2-uuid';

import { ILionelItem } from './lionel-item.interface';
import { ILionelProviver } from './lionel-provider.interface';

export abstract class LionelProvider implements ILionelProviver {


    constructor(protected http: Http) {

    }

    public abstract getTitle = (html: any): string => { return null };
    public abstract getDesc = (html: any): string => { return null };
    public abstract getCategoryId = (html: any): number => { return null };
    public abstract getCategoryBySource = (html: any): string => { return null };
    public abstract getLionelExternalId = (html: any): string => { return null };
    public abstract getLionelPartId = (html: any): string => { return null };
    public abstract getEraId = (html: any): number => { return null };
    public abstract getImages = (html: any): Array<string> => { return [] };
    public abstract URLs: Observable<Array<string>>;

    public abstract mapForPage = (response): any => { return null };

    public getLionelItems = (): Observable<ILionelItem[]> => {
/*
        let ret = Observable.create(observer => {

            this.getHTTPpromises().subscribe(promises => {
                console.log('promises',promises)
                observer.next(Observable.forkJoin(promises)
                    .map(this.parsePages));
                
            });

        });
        */

        /**/

        return Observable.create(observer => {

            this.getHTTPpromises()
                .subscribe(fork => {

                    fork.subscribe(pages => {
                        observer.next(pages.filter(p => !p.skip).map(this.parsePages));
                        observer.complete();
                    });
                });

        });
        /*
        return this.getHTTPpromises()
            .map(this.parsePages);*/
    }

    private parsePages = (page): ILionelItem => {

        return {
            lionelId: UUID.UUID(),
            title: this.getTitle(page),
            desc: this.getDesc(page),
            categoryId: this.getCategoryId(page),
            categoryBySource: this.getCategoryBySource(page),
            images: this.getImages(page),
            lionelExternalId: this.getLionelExternalId(page),
            lionelPartId: this.getLionelPartId(page),
            lionelEraId: this.getEraId(page)
        };
    }
    
    private getHTTPpromises = (): Observable<any> => {

        return this.URLs
            .map((urls) => {

                let ret: Array<Observable<any>> = [];
                urls.forEach(u => {
                    ret.push(this.http.get(u).map(this.mapForPage));
                });

                return ret;
            })
            .map(promises => {
                return Observable.forkJoin(promises);
            });
            
    }

}


//1iVYS6XMviFJPkZqNqQ-mcujExUA66X0c9apvkhQ3