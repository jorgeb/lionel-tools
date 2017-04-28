import { Inject } from '@angular/core';
import { ILionelItem, LionelProvider } from '../@lionel';
import { Http, Response } from '@angular/http';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import 'rxjs/observable/forkJoin';

import { LionelPWService } from './lionelpw.service';

export class LionelPWProvider extends LionelProvider {

    constructor( @Inject(Http) http: Http, urls?: Array<string>) {
        super(http);

        if (urls) {
            this.URLs = Observable.create(observer => {
                observer.next(urls);
                observer.complete();
            });
        } else {
            this.URLs = this.getUrls();
        }
        
    }
    
    public getTitle = (html: any): string => {
        return $('H1.TitleHeading', html).text();
    };

    public getDesc = (html: any): string => {

        //CategoryDescription
          
        return $('.CategoryDescription > p, .CategoryDescription > ul', html)
            .toArray()
            .slice(1)
            .map(p => {
                if (p.tagName === 'UL') {
                    let li = $('li', p)
                        .toArray()
                        .map(l => {
                            return $('strong', l).text() + '<==>' + l['innerText'];
                        })

                    return li.join('\n');

                } else {
                    let sp = $('span', p).not('span span')
                        .toArray()
                        .map(s => {
                            return s['innerText'];
                        })

                    return sp.join('<==>');
                }
            })
            .join('\n');
    };
    public getCategoryId = (html: any): number => {

        return null
    };

    public getCategoryBySource = (html: any): string => {
        console.log($(html).filter('title').text())
        return $(html).filter('title').text();
    };
    public getLionelExternalId = (html: any): string => {
        return this.getTitle(html).split(' ')[0];
    };
    public getLionelPartId = (html: any): string => { return null };

    public getEraId = (html: any): number => {
        return 1
    };

    public getImages = (html: any): Array<string> => {
        //__mce_add_custom__
        return [$('.__mce_add_custom__', html).data('src')];
    };
    public URLs: Observable<Array<string>>;

    public inURLs: Array<string> = [];

    public mapForPage = (response): any => {

        let $html: any = $(response._body
            .replace(/src=/g, "data-src="));

        if ($('.side-menu', $html).length > 0) {

            $html.skip = true;
            this.inURLs = this.inURLs.concat($('.side-menu a', $html)
                .toArray().map(a => {
                    return 'http://localhost:3001/url/'
                        + encodeURIComponent(a['href'])
                }));

        } else {
            $html.skip = false;
        }

        return $html;
    };

    private getUrls = (): Observable<Array<string>> => {
        
        return this.http
            .get('http://localhost:3001/url/'
            + encodeURIComponent(`http://postwarlionel.com/`))
            .map(this.parseMenu);
    }

    private parseMenu = (response): Array<string> => {
        //sf-menu 
        let $html: any = $(response._body
            .replace(/src=/g, "data-src="));

        let $menu = $('.sf-menu', $html);

        let links: Array<any> = $('ul ul li a', $menu).not('ul')
            .toArray().map(a => {
                return 'http://localhost:3001/url/'
                    + encodeURIComponent(a['href']);
            }).slice(8,10);

        return links;
        
    };

}


/*    
    public getImages = (html: any): Array<string> => {

        let ret = [];

        ret.push('http://ambrosebauer.com'
            + $('img[width="500"]', html).data('src'));

        let rawImgs = $('img[height="170"]', html)
            .get()
            .map((e) => {
            return 'http://ambrosebauer.com' + $(e).data('src');
            }).filter(url => {
                return (url.indexOf('/grey.gif') === -1);
            });

        return ret.concat(rawImgs);
  
    };
    */
